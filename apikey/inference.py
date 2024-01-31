from vllm import LLM, SamplingParams
import requests
""" ami = "ami-0810c2d824776b340"
prompt = "In 50 words, explain a beautiful woman"
context = {
 "prompt": "hola",
  "name": "1",
  "key": "tQ6MXKAFj3bw7OoJ20Gh92ldaNmA3aYAma6cAWohe2sYpbBnTyAc3R_kP2DRcUUsZjzB1MjB8FSZLH8L9pYZkw",
  "model" :  "Mixtral 7B"
}

for i in range(10000):
    response = requests.post("http://127.0.0.1:8000/api/",   json=context ) 
    print(response.json())
 """
""" for i in range(10000):
    response = requests.post("http://52.203.121.84:80/generate",   json={ "prompt": f"A chat between a curious user and an artificial intelligence assistant. The assistant gives helpful, detailed, and polite answers to the users questions. USER: {prompt} ASSISTANT:", "max_tokens": 512,  "temperature": 0} ) 
    print(response.json())
 """
from decouple import config
import boto3
from botocore.exceptions import ClientError

aws = config("aws_access_key_id")
aws_secret = config("aws_secret_access_key")
instance_id = "i-095e2e6fc2e296353"
action = "OFF"

ec2 = boto3.client('ec2', region_name = "us-east-1", aws_access_key_id=aws, aws_secret_access_key= aws_secret)


if action == 'ON':
    # Do a dryrun first to verify permissions
    try:
        ec2.start_instances(InstanceIds=[instance_id], DryRun=True)
    except ClientError as e:
        if 'DryRunOperation' not in str(e):
            raise

    # Dry run succeeded, run start_instances without dryrun
    try:
        response = ec2.start_instances(InstanceIds=[instance_id], DryRun=False)
     
    except ClientError as e:
        print(e)
else:
    # Do a dryrun first to verify permissions
    try:
        ec2.stop_instances(InstanceIds=[instance_id], DryRun=True)
    except ClientError as e:
        if 'DryRunOperation' not in str(e):
            raise

    # Dry run succeeded, call stop_instances without dryrun
    try:
        response = ec2.stop_instances(InstanceIds=[instance_id], DryRun=False)

    except ClientError as e:
        print(e) 
ec2_resource = boto3.resource('ec2', region_name="us-east-1", aws_access_key_id=aws, aws_secret_access_key= aws_secret)
instance = ec2_resource.Instance("i-095e2e6fc2e296353")
print(instance.state)