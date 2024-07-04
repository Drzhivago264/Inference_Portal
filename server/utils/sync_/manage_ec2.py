from django.utils import timezone
from server.models import InferenceServer
from server.utils import constant
from decouple import config
import boto3
from celery.utils.log import get_task_logger
logger = get_task_logger(__name__)
aws = config("aws_access_key_id")
aws_secret = config("aws_secret_access_key")
region = constant.REGION


def get_EC2_status(instance_id: str, region: str) -> str:
    """_summary_

    Args:
        instance_id (_type_): _description_
        region (_type_): _description_

    Returns:
        _type_: _description_
    """
    ec2_resource = boto3.resource(
        'ec2', region_name=region, aws_access_key_id=aws, aws_secret_access_key=aws_secret)
    try:
        instance = ec2_resource.Instance(instance_id)
        return instance.state['Name']
    except Exception as e:
        return e
    

def update_server_status_in_db(instance_id: str, update_type: str) -> None:
    """_summary_

    Args:
        instance_id (str): the string of instance id
        update_type (str): the type of status change
    """
    ser_obj = InferenceServer.objects.get(name=instance_id)
    if update_type == "status":
        ser_obj.status = "pending"
        ser_obj.save()
    elif update_type == "time":
        ser_obj.last_message_time = timezone.now()
        ser_obj.save()
