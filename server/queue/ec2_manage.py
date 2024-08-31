import boto3
from botocore.exceptions import ClientError
from celery import shared_task
from celery.utils.log import get_task_logger
from constance import config as constant
from decouple import config
from django.utils import timezone

from server.models.llm_server import InferenceServer

logger = get_task_logger(__name__)
aws = config("aws_access_key_id")
aws_secret = config("aws_secret_access_key")

region = constant.REGION


@shared_task()
def periodically_monitor_EC2_instance() -> str:
    """This is a func to periodically update EC2 status of GPU server

    Returns:
        str : the status of the server
    """
    available_server = InferenceServer.objects.filter(
        availability=InferenceServer.AvailabilityType.AVAILABLE
    )
    for server in available_server:
        ec2_resource = boto3.resource(
            "ec2",
            region_name=region,
            aws_access_key_id=aws,
            aws_secret_access_key=aws_secret,
        )
        status_name_dispatch = {
            "running": InferenceServer.StatusType.RUNNING,
            "stopping": InferenceServer.StatusType.STOPPING,
            "stopped": InferenceServer.StatusType.STOPPED,
            "pending": InferenceServer.StatusType.PENDING,
            "shutting-down": InferenceServer.StatusType.SHUTTING_DOWN,
            "terminated": InferenceServer.StatusType.TERMINATED,
        }
        try:
            instance = ec2_resource.Instance(server.name)
            server.status = status_name_dispatch[instance.state["Name"]]
            server.private_ip = instance.private_ip_address
            server.url = f"http://{instance.private_ip_address}:80"
            if instance.public_ip_address:
                server.public_ip = instance.public_ip_address
                server.alternative_url = f"http://{instance.public_ip_address}:80"
            server.save()
            return instance.state["Name"]
        except Exception as e:
            return e


@shared_task()
def periodically_shutdown_EC2_instance() -> None:
    """Periodically shutdown unused EC2 GPU instances every 1200 seconds."""
    available_servers = InferenceServer.objects.filter(
        availability=InferenceServer.AvailabilityType.AVAILABLE
    )
    for server in available_servers:
        unused_time = timezone.now() - server.last_message_time
        if unused_time.total_seconds() > constant.SERVER_TTL and server.status not in [
            InferenceServer.StatusType.STOPPED,
            InferenceServer.StatusType.STOPPING,
        ]:
            command_EC2.delay(server.name, region=region, action="off")
            server.status = InferenceServer.StatusType.STOPPING
            server.save()


@shared_task()
def command_EC2(instance_id: str, region: str, action: str) -> None | str:
    """This func is used to turn on, off, or reboot ec2 instances

    Args:
        instance_id (string): the id of EC2 instance
        region (string): the region of EC2 instances
        action (string): either turn on, off or reboot instance

    Returns:
        string or None: either return error or nothing
    """
    aws = config("aws_access_key_id")
    aws_secret = config("aws_secret_access_key")
    ec2 = boto3.client(
        "ec2",
        region_name=region,
        aws_access_key_id=aws,
        aws_secret_access_key=aws_secret,
    )
    if action == "on":
        try:
            ec2.start_instances(InstanceIds=[instance_id], DryRun=True)
        except ClientError as e:
            if "DryRunOperation" not in str(e):
                raise
        try:
            ec2.start_instances(InstanceIds=[instance_id], DryRun=False)
        except ClientError as e:
            return e
    elif action == "off":
        try:
            ec2.stop_instances(InstanceIds=[instance_id], DryRun=True)
        except ClientError as e:
            if "DryRunOperation" not in str(e):
                raise
        try:
            ec2.stop_instances(InstanceIds=[instance_id], DryRun=False)
        except ClientError as e:
            return e
    elif action == "reboot":
        try:
            ec2.reboot_instances(InstanceIds=[instance_id], DryRun=True)
        except ClientError as e:
            if "DryRunOperation" not in str(e):
                raise
        try:
            ec2.reboot_instances(InstanceIds=[instance_id], DryRun=False)
        except ClientError as e:
            return e
