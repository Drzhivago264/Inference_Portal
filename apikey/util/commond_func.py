from django.utils import timezone
import requests
from apikey.models import  InferenceServer, LLM, Key, PromptResponse
from . import constant
from decouple import config
import boto3
from botocore.exceptions import ClientError
aws = config("aws_access_key_id")
aws_secret = config("aws_secret_access_key")
region = constant.REGION

def get_EC2_status(instance_id, region):
    ec2_resource = boto3.resource('ec2', region_name=region, aws_access_key_id=aws, aws_secret_access_key= aws_secret)
    try:
        instance = ec2_resource.Instance(instance_id)
        return instance.state['Name']
    except Exception as e:
        return e
    
def inference_mode(mode, prompt):
    if mode == "chat":
        prompt_ = f"A chat between a curious user and an artificial intelligence assistant. The assistant gives helpful, detailed, and polite answers to the users questions. USER: {prompt} ASSISTANT:"
        return prompt_
    elif mode == "generate":
        return prompt

def response_mode(mode, response, prompt):
    if mode == "chat":
        prompt_ = f"A chat between a curious user and an artificial intelligence assistant. The assistant gives helpful, detailed, and polite answers to the users questions. USER: {prompt} ASSISTANT:"
        response_ = response.replace(prompt_, "")
        return response_
    elif mode == "generate":
        return response
    
    
def log_prompt_response(key, key_name, model, prompt, response):
    key_ = Key.objects.get(key=key, owner=key_name)
    llm = LLM.objects.get(name = model)
    pair_save = PromptResponse(prompt=prompt, response=response, key=key_, model = llm)
    pair_save.save()
    
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
 
def update_server_status_in_db(instance_id, update_type):
    ser_obj = InferenceServer.objects.get(name=instance_id)
    if update_type == "status":
       
        ser_obj.status = "pending"
        ser_obj.save()
    elif update_type == "time":
        ser_obj.last_message_time = timezone.now()
        ser_obj.save()
    return

def send_request(stream, url, instance_id,context):
    try:
        if not stream:
            response = requests.post(url,   json=context,  timeout=10 ) 
            response = response.json()['text'][0]
        elif stream:
            response = requests.post(url,   json=context,  timeout=10 ) 
    except requests.exceptions.Timeout:
        response = "Request Timeout, Cannot connect to the model. "
        ser_obj = InferenceServer.objects.get(name=instance_id)
        ser_obj.status = "stopped"
        ser_obj.save()
    except requests.exceptions.InvalidJSONError:
        response = "You messed up the parameters. Return them to the defaults."
    except requests.exceptions.ConnectionError:
        ser_obj = InferenceServer.objects.get(name=instance_id)
        ser_obj.status = "pending"
        ser_obj.save()
        response = "Server is setting up, wait."
    return response

def get_key(name, key):
    try:
        return Key.objects.get(owner=name, key = key)
    except Key.DoesNotExist:
        return None
    
def get_model(model):
    try:
        return LLM.objects.get(name=model)
    except LLM.DoesNotExist as e:
        return e   
    
def static_view_inference(mode, server_status,instance_id, inference_url, top_k, top_p, best_of, temperature, max_tokens, presense_penalty, frequency_penalty, length_penalty, early_stopping,beam,prompt):
    if beam == False:
        length_penalty = 1
        early_stopping = False
        best_of = int(1)
    else:
        best_of = int(best_of)
        length_penalty = float(length_penalty)
        if early_stopping == "true":
            early_stopping = True
        else:
            early_stopping = True 
    processed_prompt = inference_mode(mode, prompt)        
    context = {
        "prompt": processed_prompt,
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
    update_server_status_in_db(instance_id=instance_id, update_type="time")
    if server_status == "running":
        response = send_request(stream=False, url=inference_url, instance_id=instance_id,context=context)
        response = response_mode(response=response, mode=mode, prompt=prompt)
    elif server_status == "stopped" or "stopping":
        command_EC2(instance_id, region = region, action = "on")
        response = "Server is starting up, try again in 400 seconds"
        update_server_status_in_db(instance_id=instance_id, update_type="status")
    elif server_status == "pending":
        response = "Server is setting up, try again in 300 seconds"
    else:
        response = send_request(stream=False, url=inference_url, instance_id=instance_id, context=context)
        response = response_mode(response=response, mode=mode, prompt=prompt)
    return response