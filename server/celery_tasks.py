from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from celery import shared_task
from django.core.mail import send_mail
from django.utils import timezone
import random
import requests
import json
from .models import (InferenceServer,
                     LLM,
                     APIKEY,
                     Crypto,
                     )
from decouple import config
from botocore.exceptions import ClientError
import boto3
from openai import OpenAI
from server.utils.sync_.common_func import (get_model_url,
                                update_server_status_in_db,
                                send_request,
                                inference_mode,
                                send_agent_request_openai,
                                send_chat_request_openai,
                                log_prompt_response
                                )

import server.utils.constant as constant
from celery.utils.log import get_task_logger
from django.utils.timezone import datetime, timedelta
logger = get_task_logger(__name__)
aws = config("aws_access_key_id")
aws_secret = config("aws_secret_access_key")
region = constant.REGION
from transformers import AutoTokenizer


@shared_task
def send_email_(subject: str, message: str, email_from: str, recipient_list: list) -> None:
    send_mail(subject, message, email_from, recipient_list)
    return


@shared_task
def update_crypto_rate(coin: str):
    if coin == "xmr":
        try:
            url = "https://api.coingecko.com/api/v3/simple/price?ids=monero&vs_currencies=usd"
            response = requests.get(url)
            price = float(json.loads(response.text)['monero']['usd'])
            crypto = Crypto.objects.get(coin=coin)
            crypto.coin_usd_rate = price
            crypto.save()
        except KeyError:
            try:
                url = 'https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest'
                headers = {
                    'Accepts': 'application/json',
                    'X-CMC_PRO_API_KEY': config('CMC_API'),
                }
                params = {
                    'id': '328',
                    'convert': 'USD',
                }
                response = requests.get(url, headers=headers, params=params)
                price = json.loads(response.text)[
                    'data']['328']['quote']['USD']['price']
                crypto = Crypto.objects.get(coin=coin)
                crypto.coin_usd_rate = price
                crypto.save()
            except KeyError:
                pass


@shared_task
def periodically_delete_unused_key():
    APIKEY.objects.filter(created_at__lte=datetime.now(
    )-timedelta(days=constant.KEY_TTL), credit=0.0, monero_credit=0.0).delete()


@shared_task()
def periodically_monitor_EC2_instance() -> str:
    """This is a func to periodically update EC2 status of GPU server

    Returns:
        str : the status of the server
    """
    available_server = InferenceServer.objects.filter(availability="Available")
    for server in available_server:
        ec2_resource = boto3.resource(
            'ec2', region_name=region, aws_access_key_id=aws, aws_secret_access_key=aws_secret)
        try:
            instance = ec2_resource.Instance(server.name)
            server.status = instance.state['Name']
            server.private_ip = instance.private_ip_address
            server.url = "http://" + instance.private_ip_address + ":80/generate"
            if instance.public_ip_address:
                server.public_ip = instance.public_ip_address
                server.alternative_url = "http://" + instance.public_ip_address + ":80/generate"
            server.save()
            return instance.state['Name']
        except Exception as e:
            return e


@shared_task()
def periodically_shutdown_EC2_instance() -> None:
    """This is a func to shutdown unuse EC2 GPU instance ever 1200 secs
    """
    available_server = InferenceServer.objects.filter(availability="Available")
    for server in available_server:
        un_used_time = timezone.now() - server.last_message_time
        if un_used_time.total_seconds() > constant.SERVER_TTL and (server.status != "stopped" or server.status != "stopping"):
            command_EC2.delay(server.name, region=region, action="off")
            server.status = "stopping"
            server.save()
        else:
            pass


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
    ec2 = boto3.client('ec2', region_name=region,
                       aws_access_key_id=aws, aws_secret_access_key=aws_secret)
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

@shared_task
def Inference(unique: str,
              is_session_start_node: bool | None,
              mode: str,
              type_: str,
              key: str,
              credit: float,
              room_group_name: str,
              model: str,
              stream: bool,
              top_k: int,
              top_p: float,
              best_of: int,
              temperature: float,
              max_tokens: int,
              presence_penalty: float,
              frequency_penalty: float,
              length_penalty: float,
              early_stopping: bool,
              beam: bool,
              prompt: str,
              include_memory: bool) -> None:
    """_summary_

    Args:
        unique (str): _description_
        mode (str): _description_
        type_ (str): _description_
        key (str): _description_
        credit (float): _description_
        room_group_name (str): _description_
        model (str): _description_
        stream (bool): _description_
        top_k (int): _description_
        top_p (float): _description_
        best_of (int): _description_
        temperature (float): _description_
        max_tokens (int): _description_
        presence_penalty (float): _description_
        frequency_penalty (float): _description_
        length_penalty (float): _description_
        early_stopping (bool): _description_
        beam (bool): _description_
        prompt (str): _description_
        include_memory (bool): _description_
    """
    channel_layer = get_channel_layer()
    key_object = APIKEY.objects.get(hashed_key=key)
    if not beam:
        best_of = 1
    else:
        if best_of == 1:
            best_of += 1

    llm = LLM.objects.get(name=model)
    url_list = get_model_url(llm)

    processed_prompt = inference_mode(
        model=model, key_object=key_object, mode=mode, prompt=prompt, include_memory=include_memory, agent_availability=llm.agent_availability)

    if llm.is_self_host:
        tokeniser = AutoTokenizer.from_pretrained(constant.TOKENIZER_TABLE[model])
        session_list_to_string = tokeniser.apply_chat_template( processed_prompt, tokenize=False)
        context = {
            "prompt": session_list_to_string,
            "n": 1,
            'best_of': best_of,
            'presence_penalty': float(presence_penalty),
            "use_beam_search": beam,
            "temperature": float(temperature) if not beam else 0,
            "max_tokens": max_tokens,
            "stream": stream,
            "top_k": int(top_k),
            "top_p": float(top_p) if not beam else 1,
            "length_penalty": float(length_penalty),
            "length_penalty": float(length_penalty) if beam else 1,
            "early_stopping": early_stopping if beam else False,
        }
        ''' Query a list of inference servers for a given model, pick a random one '''
        if url_list:
            random_url = random.choice(url_list)
            url = random_url.url
            instance_id = random_url.name
            server_status = random_url.status
            update_server_status_in_db(
                instance_id=instance_id, update_type="time")
            if server_status == "running":
                response = send_request(
                    stream=True, url=url, instance_id=instance_id, context=context)
                if not isinstance(response, str):
                    previous_output = str()
                    full_response = str()
                    for chunk in response.iter_lines(chunk_size=8192,
                                                     decode_unicode=False,
                                                     delimiter=b"\0"):
                        if chunk:
                            data = json.loads(chunk.decode("utf-8"))
                            output = data["text"][0]
                            output = output.replace(session_list_to_string, "")
                            re = output.replace(previous_output, "")
                            full_response += re
                            previous_output = output
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
                    log_prompt_response(is_session_start_node=is_session_start_node, key_object=key_object, llm=llm, prompt=prompt,
                                        response=full_response, type_=type_)

            elif server_status == "stopped" or "stopping":
                command_EC2.delay(instance_id, region=region, action="on")
                response = "Server is starting up, try again in 400 seconds"
                update_server_status_in_db(
                    instance_id=instance_id, update_type="status")
            elif server_status == "pending":
                response = "Server is setting up, try again in 30 seconds"
            else:
                response = "Unknown Server state, wait 5 seconds"
        else:
            response = "Model is currently offline"
        if  isinstance(response, str):
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
    else:
        client = OpenAI(api_key=config("GPT_KEY"), timeout=constant.TIMEOUT, max_retries=constant.RETRY)
        clean_response = ""
        clean_response = send_chat_request_openai(client=client,
                                                  session_history=processed_prompt,
                                                  model=model,
                                                  model_type=model,
                                                  credit=credit,
                                                  unique=unique,
                                                  stream=stream,
                                                  room_group_name=room_group_name,
                                                  clean_response=clean_response,
                                                  frequency_penalty=frequency_penalty,
                                                  top_p=top_p,
                                                  max_tokens=max_tokens,
                                                  temperature=temperature,
                                                  presence_penalty=presence_penalty)
        log_prompt_response(is_session_start_node=is_session_start_node, key_object=key_object, llm=llm, prompt=prompt,
                            response=clean_response, type_="open_ai")


@shared_task
def Agent_Inference(key: str,
                    is_session_start_node: bool | None,
                    current_turn_inner: int,
                    stream: bool,
                    model: str,
                    unique: str,
                    credit: float,
                    room_group_name: int,
                    agent_instruction: str,
                    message: str,
                    session_history: list,
                    model_type: str,
                    max_turns: int,
                    temperature: float,
                    max_tokens: int,
                    top_p: float,
                    frequency_penalty: float,
                    presence_penalty: float) -> None:
    """_summary_

    Args:
        key (str): _description_
        current_turn_inner (int): _description_
        stream (bool): _description_
        model (str): _description_
        unique (str): _description_
        credit (float): _description_
        room_group_name (int): _description_
        agent_instruction (str): _description_
        message (str): _description_
        session_history (list): _description_
        model_type (str): _description_
        max_turns (int): _description_
        temperature (float): _description_
        max_tokens (int): _description_
        top_p (float): _description_
        frequency_penalty (float): _description_
        presence_penalty (float): _description_
    """
    client = OpenAI(api_key=config("GPT_KEY"), timeout=constant.TIMEOUT, max_retries=constant.RETRY)
    key_object = APIKEY.objects.get(hashed_key=key)
    llm = LLM.objects.get(name=model)
    clean_response = ""
    if current_turn_inner >= 0 and current_turn_inner <= (max_turns-1):
        if current_turn_inner == 0:
            prompt = [
                {'role': 'system', 'content': f"{agent_instruction}"}, {
                    'role': 'user', 'content': f'{message}'}
            ]
        elif current_turn_inner > 0 and current_turn_inner < (max_turns-1):
            prompt = [
                {'role': 'user', 'content': f'Response: {message}'}
            ]

        elif current_turn_inner == (max_turns-1):
            force_stop = "You should directly give results based on history information."
            prompt = [
                 {'role': 'user', 'content': f'Response: {message}'},
                {'role': 'system', 'content': f'Response: {force_stop}'}
            ]
        session_history.extend(prompt)
        clean_response = send_agent_request_openai(client=client,
                                                   session_history=session_history,
                                                   model=model,
                                                   model_type=model_type,
                                                   credit=credit,
                                                   unique=unique,
                                                   current_turn_inner=current_turn_inner,
                                                   stream=stream,
                                                   room_group_name=room_group_name,
                                                   clean_response=clean_response,
                                                   frequency_penalty=frequency_penalty,
                                                   top_p=top_p,
                                                   max_tokens=max_tokens,
                                                   temperature=temperature,
                                                   presence_penalty=presence_penalty)
        log_prompt_response(is_session_start_node=is_session_start_node, key_object=key_object, llm=llm, prompt=message,
                            response=clean_response, type_="open_ai")
    else:
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            room_group_name,
            {
                "type": "chat_message",
                "max_turn_reached": True,
            }
        )
