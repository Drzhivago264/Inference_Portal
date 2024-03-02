from django.utils import timezone
import requests
from apikey.models import  InferenceServer, LLM, Key, PromptResponse
from . import constant
from decouple import config
from transformers import AutoTokenizer
import boto3
import re
from botocore.exceptions import ClientError
from celery.utils.log import get_task_logger
from openai import OpenAI
import openai
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
logger = get_task_logger(__name__)
from django.core.cache import cache
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
    
def inference_mode(model, key,  mode, prompt):
    template = constant.SHORTEN_TEMPLATE_TABLE[model]
    if mode == "chat":
        prompt_ =  template.format(prompt, "")
        chat_history = get_chat_context(model=model, key = key)
        prompt_ = chat_history + "\n" + prompt_
        return prompt_
    elif mode == "generate":
        return prompt

def response_mode(model, mode, response, prompt):
    if mode == "chat":
        response_ = response.replace(prompt, "")
        return response_
    elif mode == "generate":
        return response
        
def log_prompt_response(key, key_name, model, prompt, response, type_):
    key_ = Key.objects.get(key=key, owner=key_name)
    llm = LLM.objects.get(name = model)
    pair_save = PromptResponse(prompt=prompt, response=response, key=key_, model = llm, p_type= type_)
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
    try:
        model_list = cache.get(f"{model}_link_list")
        if model_list == None:
            model_list = list(InferenceServer.objects.filter(hosted_model__name=model, availability = "Available"))
            cache.set(f"{model}_link_list", model_list, constant.CACHE_SERVER_LINK_RETRIVAL)
        return model_list
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
            response = requests.post(url,  json=context,  stream = stream, timeout=10 ) 
            response = response.json()['text'][0]
        elif stream:
            response = requests.post(url,  json=context,  stream = stream, timeout=10 )    
    except requests.exceptions.Timeout:
        response = "Request Timeout. Cannot connect to the model. If you just booted the GPU server, wait for 400 seconds, and try again"
    except requests.exceptions.InvalidJSONError:
        response = "You messed up the parameters. Return them to the defaults."
    except requests.exceptions.ConnectionError:
        ser_obj = InferenceServer.objects.get(name=instance_id)
        ser_obj.status = "pending"
        ser_obj.save()
        response = "Server is setting up, wait."
    return response

def action_parse(context):
    action_regex = f"/ACTION: (.*?)/"
    action_match = re.findall(action_regex, context)
    if not action_match:
        return False
    else:
        return action_match
    
def send_request_openai(stream, session_history, model_type, current_turn_inner, model, unique, credit, room_group_name, client, clean_response):
    channel_layer = get_channel_layer()
    try:
        raw_response = client.chat.completions.create(model=model_type,
                                                    messages=session_history,
                                                    stream= stream  
                                                    )
        current_turn_inner += 1
        for chunk in raw_response:
            if chunk:
                data = chunk.choices[0].delta.content
                if data != None:
                    clean_response += data
                    response_json = [
                            {'role': 'assistant', 'content': f'{clean_response}'}
                    ]
                    session_history.pop()
                    session_history.extend(response_json)    
                    async_to_sync(channel_layer.group_send)(
                        room_group_name,
                        {
                                "type": "chat_message", 
                                "role": model,
                                "message": data, 
                                'credit': credit,
                                'unique': unique,
                                "session_history": session_history,
                                "current_turn":current_turn_inner
                        }
                    ) 
         
        action_list = action_parse(session_history[-1]['content'])
        logger.info(action_list)
        if action_list:
            if "STOP" in action_list:
                async_to_sync(channel_layer.group_send)(
                    room_group_name,
                    {
                            "type": "chat_message", 
                            "agent_action": "STOP"
                    }
                ) 

    except openai.APIConnectionError as e:
        async_to_sync(channel_layer.group_send)(
            room_group_name,
            {
                    "type": "chat_message", 
                    "role": model,
                    "message": f"Failed to connect to OpenAI API: {e}", 
                    'credit': credit,
                    'unique': unique,
                    "session_history": session_history,
                    "current_turn":current_turn_inner
            }
        ) 
    except openai.RateLimitError as e:
        async_to_sync(channel_layer.group_send)(
            room_group_name,
            {
                    "type": "chat_message", 
                    "role": model,
                    "message": f"OpenAI API request exceeded rate limit: {e}", 
                    'credit': credit,
                    'unique': unique,
                    "session_history": session_history,
                    "current_turn":current_turn_inner
            }
        ) 

    except openai.APIError as e:
        async_to_sync(channel_layer.group_send)(
            room_group_name,
            {
                    "type": "chat_message", 
                    "role": model,
                    "message": f"OpenAI API returned an API Error: {e}", 
                    'credit': credit,
                    'unique': unique,
                    "session_history": session_history,
                    "current_turn":current_turn_inner
            }
        ) 



  

def get_key(name, key):
    try:
        return Key.objects.get(owner=name, key = key)
    except Key.DoesNotExist:
        return False
    
def get_model(model):
    try:
        return LLM.objects.get(name=model)
    except LLM.DoesNotExist as e:
        return False   
    
def static_view_inference(model, mode, key, server_status,instance_id, inference_url, top_k, top_p, best_of, temperature, max_tokens, presense_penalty, frequency_penalty, length_penalty, early_stopping,beam,prompt):
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
    processed_prompt = inference_mode(model=model, key=key,mode=mode, prompt=prompt)        
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
        response = response_mode(model=model, response=response, mode=mode, prompt=processed_prompt)
    elif server_status == "stopped" or "stopping":
        command_EC2(instance_id, region = region, action = "on")
        response = "Server is starting up, try again in 400 seconds"
        update_server_status_in_db(instance_id=instance_id, update_type="status")
    elif server_status == "pending":
        response = "Server is setting up, try again in 300 seconds"
    else:
        response = send_request(stream=False, url=inference_url, instance_id=instance_id, context=context)
        response = response_mode(model=model, response=response, mode=mode, prompt=processed_prompt)
    return response

def get_chat_context(model, key):
    message_list = list(reversed(PromptResponse.objects.filter(model__name=model, key__key = key, p_type= "chatroom").order_by("-id")[:10]))
    shorten_template = constant.SHORTEN_TEMPLATE_TABLE[model]
    full_instruct = ""
    max_history_length = constant.MAX_HISTORY_LENGTH[model]
    tokeniser = constant.TOKENIZER_TABLE[model] 
    for i, mess in enumerate(message_list):
        template = shorten_template.format(mess.prompt, mess.response)
        full_instruct += "\n\n"
        full_instruct += template
        inputs = tokeniser(full_instruct)
        current_history_length = len(inputs['input_ids'])

        if current_history_length > int(max_history_length):
            full_instruct = full_instruct[(current_history_length-max_history_length):]
    full_instruct = constant.SHORTEN_INSTRUCT_TABLE[model] + full_instruct
    return full_instruct