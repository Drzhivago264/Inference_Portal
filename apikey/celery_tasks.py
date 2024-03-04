
from celery import shared_task
from django.core.mail import send_mail
from django.utils import timezone
import random
import requests
import json
from .models import  InferenceServer, PromptResponse, LLM
from decouple import config
import boto3
from openai import OpenAI
from .util.commond_func import get_model_url, command_EC2, update_server_status_in_db, send_request, log_prompt_response, inference_mode, response_mode, send_request_openai
from .util.constant import * 
from celery.utils.log import get_task_logger
logger = get_task_logger(__name__)
aws = config("aws_access_key_id")
aws_secret = config("aws_secret_access_key")
region = REGION

from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

@shared_task
def send_email_( subject, message, email_from, recipient_list):
    send_mail(subject, message, email_from, recipient_list)
    return

@shared_task()
def periodically_monitor_EC2_instance():
    available_server = InferenceServer.objects.filter(availability = "Available")
    for server in available_server:
        ec2_resource = boto3.resource('ec2', region_name=region, aws_access_key_id=aws, aws_secret_access_key= aws_secret)
        try:
            instance = ec2_resource.Instance(server.name)
            server.status = instance.state['Name']
            server.save()
            return instance.state['Name']
        except Exception as e:
            return e

@shared_task()
def periodically_shutdown_EC2_instance():
    available_server = InferenceServer.objects.filter(availability = "Available")
    for server in available_server:
        un_used_time = timezone.now() - server.last_message_time
        if un_used_time.total_seconds() > SERVER_TTL and (server.status != "stopped" or server.status != "stopping"):
            command_EC2(server.name, region = region, action = "off")
            server.status = "stopping"
            server.save()
        else:
            pass
        
@shared_task
def Inference(unique, mode, type_, key, key_name, credit, room_group_name, model, stream ,top_k, top_p, best_of, temperature, max_tokens, presense_penalty, frequency_penalty, length_penalty, early_stopping,beam,prompt):
        if beam == "false" or beam == False:
            beam = False
            length_penalty = 1
            early_stopping = False
            best_of = int(1)
        else:
            beam = True
            best_of = int(best_of)
            if best_of == 1:
                best_of += 1
            length_penalty = float(length_penalty)
            if early_stopping == "true":
                early_stopping = True
            else:
                early_stopping = True       
        processed_prompt = inference_mode(model=model, key = key, mode=mode, prompt=prompt)
        context = {
            "prompt": processed_prompt,
            "n": 1,
            'best_of': best_of,
            'presence_penalty': float(presense_penalty),
            "use_beam_search": beam,
            "temperature": float(temperature),
            "max_tokens": int(max_tokens),
            "stream": stream,
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
            update_server_status_in_db(instance_id=instance_id, update_type="time")
            if server_status == "running":
                
                if not stream:
                    response = send_request(stream=False, url=url, instance_id=instance_id,context=context)
                    response = response_mode(model=model, response=response, mode=mode, prompt=processed_prompt)
                else:
                    response =  send_request(stream=True, url=url, instance_id=instance_id,context=context)
           
                    if not isinstance(response, str):
                        previous_output = str()
                        full_response = str()
                        for chunk in response.iter_lines(chunk_size=8192,
                                                            decode_unicode=False,
                                                            delimiter=b"\0"):
                            if chunk:
                                data = json.loads(chunk.decode("utf-8"))
                                output = data["text"][0]
                                output = response_mode(model=model, response=output, mode=mode, prompt=processed_prompt)
                                re = output.replace(previous_output, "")
                                full_response += re
                                previous_output = output
                                channel_layer = get_channel_layer()
                                async_to_sync(channel_layer.group_send)(
                                    room_group_name,
                                    {
                                            "type": "chat_message", 
                                            "role": model,
                                            "message": re, 
                                            'credit': credit,
                                            'unique': unique
                                    }
                                )
                        log_prompt_response(key, key_name, model, prompt, full_response, type_=type_)
                        
                            
            elif server_status == "stopped" or "stopping":
                command_EC2(instance_id, region = region, action = "on")
                response = "Server is starting up, try again in 400 seconds"
                update_server_status_in_db(instance_id=instance_id, update_type="status")
            elif server_status == "pending":
                response = "Server is setting up, try again in 30 seconds"
            else:
                response = "Unknown Server state, wait 5 seconds"
        else:
            response = "Model is currently offline"

        if type_ == "chatroom" and isinstance(response, str):
            channel_layer = get_channel_layer()
            async_to_sync(channel_layer.group_send)(
                room_group_name,
                {
                        "type": "chat_message", 
                        "role": model,
                        "message": response, 
                        'credit': credit,
                        'unique': unique
                }
            )            
        elif type_ == "prompt":
            log_prompt_response(key, key_name, model, prompt, response, type_=type_)


@shared_task
def Agent_Inference(current_turn_inner, stream, model, unique,credit ,room_group_name,agent_instruction, message, session_history, model_type, max_turns):
    client = OpenAI(api_key=config("GPT_KEY"))
    clean_response = ""
    if current_turn_inner == 0:
        prompt = [
            {'role': 'system', 'content': f"{agent_instruction}"}, {'role': 'user', 'content': f'{message}'}
        ]
        session_history.extend(prompt)
        send_request_openai(client=client, 
                        session_history=session_history, 
                        model=model, 
                        model_type=model_type, 
                        credit=credit, 
                        unique=unique,
                        current_turn_inner=current_turn_inner,
                        stream=stream,
                        room_group_name=room_group_name,
                        clean_response=clean_response)

    elif current_turn_inner > 0 and current_turn_inner < (max_turns-1):
        prompt = [
            {'role': 'system', 'content': f'Response:{message}\n'}
        ]
        session_history.extend(prompt)
        send_request_openai(client=client, 
                        session_history=session_history, 
                        model=model, 
                        model_type=model_type, 
                        credit=credit, 
                        unique=unique,
                        current_turn_inner=current_turn_inner,
                        stream=stream,
                        room_group_name=room_group_name,
                        clean_response=clean_response)
        
    elif  current_turn_inner == (max_turns-1):
        force_stop = "You should directly give results based on history information."
        prompt = [
            {'role': 'system', 'content': f'Response:{force_stop}\n'}
        ]
        session_history.extend(prompt)
        send_request_openai(client=client, 
                        session_history=session_history, 
                        model=model, 
                        model_type=model_type, 
                        credit=credit, 
                        unique=unique,
                        current_turn_inner=current_turn_inner,
                        stream=stream,
                        room_group_name=room_group_name,
                        clean_response=clean_response)
    else:
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            room_group_name,
            {
                    "type": "chat_message", 
                    "max_turn_reached": True,
            }
        ) 



  