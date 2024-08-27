from typing import Literal

import boto3
from celery.utils.log import get_task_logger
from constance import config as constant
from decouple import config
from django.utils import timezone

from server.models.llm_server import InferenceServer

logger = get_task_logger(__name__)
aws = config("aws_access_key_id")
aws_secret = config("aws_secret_access_key")
region = constant.REGION


def get_EC2_status(instance_id: str, region: str) -> str:
    """Retrieve the status of an AWS EC2 instance given its instance ID and region.

    Args:
        instance_id (str): The ID of the EC2 instance.
        region (str): The AWS region where the instance is located.

    Returns:
        str: The state of the EC2 instance as a string (e.g., 'running', 'stopped').
    """
    ec2_resource = boto3.resource("ec2", region_name=region)
    try:
        instance = ec2_resource.Instance(instance_id)
        return instance.state["Name"]
    except Exception as e:
        return str(e)


def update_server_status_in_db(
    instance_id: str, update_type: Literal["status", "time"]
) -> None:
    """
    Update the status or last message time of an InferenceServer instance in the database.

    Args:
        instance_id (str): The ID of the server instance.
        update_type (str): The type of update ("status" or "time").
    """
    server_object = InferenceServer.objects.get(name=instance_id)
    if update_type == "status":
        server_object.status = InferenceServer.StatusType.PENDING
    elif update_type == "time":
        server_object.last_message_time = timezone.now()

    server_object.save()
