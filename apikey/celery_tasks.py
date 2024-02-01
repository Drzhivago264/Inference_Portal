
from celery import shared_task
from django.core.mail import send_mail

import random
import requests
from .models import  InferenceServer
from decouple import config
import boto3
from botocore.exceptions import ClientError
aws = config("aws_access_key_id")
aws_secret = config("aws_secret_access_key")
region = "us-east-1"

from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

"""EC status can be: stopped, stopping, pending, running"""

def get_EC2_status(instance_id, region):
    ec2_resource = boto3.resource('ec2', region_name=region, aws_access_key_id=aws, aws_secret_access_key= aws_secret)
    try:
        instance = ec2_resource.Instance(instance_id)
        return instance.state['Name']
    except Exception as e:
        return e

def command_EC2(instance_id, region, action):
    aws = config("aws_access_key_id")
    aws_secret = config("aws_secret_access_key")
    ec2 = boto3.client('ec2', region_name = region, aws_access_key_id=aws, aws_secret_access_key= aws_secret)
    if action == "on":
        try:
            ec2.start_instances(InstanceIds=[instance_id], DryRun=True)
        except ClientError as e:
            if 'DryRunOperation' not in str(e):
                raise
        try:
            ec2.start_instances(InstanceIds=[instance_id], DryRun=False)
        except ClientError as e:
            return e
    elif action == "off":
        try:
            ec2.stop_instances(InstanceIds=[instance_id], DryRun=True)
        except ClientError as e:
            if 'DryRunOperation' not in str(e):
                raise
        try:
            ec2.stop_instances(InstanceIds=[instance_id], DryRun=False)
        except ClientError as e:
            return e
    elif action == "reboot":
        try:
            ec2.reboot_instances(InstanceIds=[instance_id], DryRun=True)
        except ClientError as e:
            if 'DryRunOperation' not in str(e):
                raise
        try:
            ec2.reboot_instances(InstanceIds=[instance_id], DryRun=False)
        except ClientError as e:
            return e
        return 

def get_model_url(model):
    avaiable_model_list = []
    try:
        model_list = list(InferenceServer.objects.filter(hosted_model__name=model))
        for m in model_list:
            avaiable_model_list.append(m)
        return avaiable_model_list
    
    except:
        return False
 
def update_server_status_in_db(instance_id):
    ser_obj = InferenceServer.objects.get(name=instance_id)
    ser_obj.status = "pending"
    ser_obj.save()
    return

def send_request(url, instance_id,context):
    try:
        response = requests.post(url,   json=context,  timeout=10 ) 
        response = response.json()['text']
    except requests.exceptions.Timeout:
        response = "Request Timeout, Cannot connect to the model. "
        ser_obj = InferenceServer.objects.get(name=instance_id)
        ser_obj.status = "stopped"
        ser_obj.save()
    except requests.exceptions.InvalidJSONError:
        response = "You messed up the parameters. Return them to the defaults."
    return response

@shared_task
def send_email_( subject, message, email_from, recipient_list):
    send_mail(subject, message, email_from, recipient_list)
    return

@shared_task()
def periodically_monitor_EC2_instance():
    available_server = InferenceServer.objects.all()
    for server in available_server:
        ec2_resource = boto3.resource('ec2', region_name=region, aws_access_key_id=aws, aws_secret_access_key= aws_secret)
        try:
            instance = ec2_resource.Instance(server.name)
            server.status = instance.state['Name']
            server.save()
            return instance.state['Name']
        except Exception as e:
            return e
    
@shared_task
def chat_inference( credit, room_group_name, model, top_k, top_p, best_of, temperature, max_tokens, presense_penalty, frequency_penalty, length_penalty, early_stopping,beam,prompt):

        if beam == "false":
            beam = False
            length_penalty = 1
            early_stopping = False
            best_of = int(1)
        else:
            beam = True
            best_of = int(best_of)
            length_penalty = float(length_penalty)
            if early_stopping == "true":
                early_stopping = True
            else:
                early_stopping = True       
            
        context = {
            "prompt": prompt,
            "n": 1,
            'best_of': best_of,
            'presence_penalty': float(presense_penalty),
            "use_beam_search": beam,
            "temperature": float(temperature),
            "max_tokens": int(max_tokens),
            "stream": False,
            "top_k": float(top_k),
            "top_p": float(top_p),
            "length_penalty": float(length_penalty),
            "frequency_penalty": float(frequency_penalty),
            "early_stopping": early_stopping,
            
        }
        ''' Query a list of inference servers for a given model, pick a random one '''

        url_list = get_model_url(model) 
        if url_list:
            random_url = random.choice(url_list)
            url = random_url.url
            instance_id = random_url.name
            server_status = random_url.status
            if server_status == "running":
                response = send_request(url=url, instance_id=instance_id,context=context)
            elif server_status == "stopped" or "stopping":
                command_EC2(instance_id, region = region, action = "on")
                response = "Server is starting up, try again in 400 seconds"
                update_server_status_in_db(instance_id=instance_id)
            elif server_status == "pending":
                response = "Server is setting up, try again in 30 seconds"
            else:
                response = send_request(url, context)
        else:
            response = "Model is currently offline"
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            room_group_name,
            {
                    "type": "chat_message", 
                    "role": model,
                    "message": response, 
                    'credit': credit
            }
        )
  