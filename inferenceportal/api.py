from ninja import NinjaAPI, Schema
from apikey.util import constant, commond_func
from ninja.security import HttpBearer
from apikey.models import InferenceServer, LLM, PromptResponse, APIKEY
from django.core.exceptions import ObjectDoesNotExist
from django.db.models.query import QuerySet
from asgiref.sync import sync_to_async
import asyncio
from ninja.errors import ValidationError
from django.http import StreamingHttpResponse
from ninja.errors import HttpError
from django.core.cache import cache
from decouple import config
import time
import json
import boto3
import re
import httpx
from botocore.exceptions import ClientError
import random
from django.utils import timezone
class GlobalAuth(HttpBearer):
    @sync_to_async
    def authenticate(self, request, token):
        try:
            APIKEY.objects.get_from_key(token)
            return token
        except ObjectDoesNotExist:
            pass



api = NinjaAPI(auth=GlobalAuth())


class PromptSchema(Schema):
    prompt: str = ""
    model: str = constant.DEFAULT_MODEL
    top_p: float = constant.DEFAULT_TOP_P
    top_k: int = constant.DEFAULT_TOP_K
    temperature: float = constant.DEFAULT_TEMPERATURE
    beam: bool = constant.DEFAULT_BEAM
    best_of: int = constant.DEFAULT_BEST_OF
    max_tokens: int = constant.DEFAULT_MAX_TOKENS
    presence_penalty: float = constant.DEFAULT_PRESENCE_PENALTY
    frequency_penalty: float = constant.DEFAULT_FREQUENCY_PENALTY
    length_penalty: float = constant.DEFAULT_LENGTH_PENALTY
    early_stopping: bool = constant.DEFAULT_EARLY_STOPPING
    n: int = constant.DEFAULT_N


class ChatSchema(Schema):
    prompt: str = ""
    model: str = constant.DEFAULT_MODEL
    top_p: float = constant.DEFAULT_TOP_P
    top_k: int = constant.DEFAULT_TOP_K
    temperature: float = constant.DEFAULT_TEMPERATURE
    beam: bool = constant.DEFAULT_BEAM
    best_of: int = constant.DEFAULT_BEST_OF
    max_tokens: int = constant.DEFAULT_MAX_TOKENS
    presence_penalty: float = constant.DEFAULT_PRESENCE_PENALTY
    frequency_penalty: float = constant.DEFAULT_FREQUENCY_PENALTY
    length_penalty: float = constant.DEFAULT_LENGTH_PENALTY
    early_stopping: bool = constant.DEFAULT_EARLY_STOPPING
    n: int = constant.DEFAULT_N
    stream: bool = False

async def get_model(model: str) -> QuerySet[LLM] | bool:
    try:
        return await LLM.objects.aget(name=model)
    except LLM.DoesNotExist as e:
        return False  
      
@sync_to_async
def get_model_url(model: str) -> list | bool:
    try:
        model_list = cache.get(f"{model}_link_list")
        if model_list == None:
            model_list = list(InferenceServer.objects.filter(
                hosted_model__name=model, availability="Available"))
            cache.set(f"{model}_link_list", model_list,
                      constant.CACHE_SERVER_LINK_RETRIVAL)
        return model_list
    except:
        return False

async def update_server_status_in_db(instance_id: str, update_type: str) -> None:
    ser_obj = await InferenceServer.objects.aget(name=instance_id)
    if update_type == "status":
        ser_obj.status = "pending"
        await ser_obj.asave()
    elif update_type == "time":
        ser_obj.last_message_time = timezone.now()
        await ser_obj.asave()
    return

@sync_to_async
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
    
@sync_to_async
def get_chat_context(model: str, key: str) -> str:
    key_ = APIKEY.objects.get_from_key(key)
    message_list = list(reversed(PromptResponse.objects.filter(
        model__name=model, key=key_, p_type="chatroom").order_by("-id")[:10]))
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
            full_instruct = full_instruct[(
                current_history_length-max_history_length):]
    full_instruct = constant.SHORTEN_INSTRUCT_TABLE[model] + full_instruct
    return full_instruct

@sync_to_async
def log_prompt_response(key: str, model: str, prompt: str, response: str, type_:str) -> None:
    """_summary_

    Args:
        key (string): _description_
        model (string): the name of the model
        prompt (string): the user's prompt
        response (string): the response from GPU
        type_ (_type_): _description_
    """
    key_ = APIKEY.objects.get_from_key(key)
    llm = LLM.objects.get(name=model)
    pair_save = PromptResponse(
        prompt=prompt, response=response, key=key_, model=llm, p_type=type_)
    pair_save.save()

@api.post("/completion")
async def textcompletion(request, data: PromptSchema):
    model = await get_model(data.model)
    if not model:
        raise HttpError(442, "Unknown Model Error. Check your model name.")
    else:
        available_server_list = await get_model_url(data.model)
        if not available_server_list:
            raise HttpError(442, "Server is currently offline")
        else:
            inference_server = random.choice(available_server_list)
            server_status = inference_server.status
            if not data.beam:
                    length_penalty = 1
                    early_stopping = False
                    best_of = int(1)
            else:
                best_of = data.best_of
                length_penalty = data.length_penalty
                early_stopping = True
            if data.top_k <= 0:
                top_k = -1
            else:
                top_k = data.top_k
            context = {
                "prompt": data.prompt,
                "n": data.n,
                'best_of': best_of,
                'presence_penalty': data.presence_penalty,
                "use_beam_search": data.beam,
                "temperature": data.temperature,
                "max_tokens": data.max_tokens,
                "stream": False,
                "top_k": int(top_k),
                "top_p": data.top_p,
                "length_penalty": length_penalty,
                "frequency_penalty": data.frequency_penalty,
                "early_stopping": early_stopping,
            }
            await update_server_status_in_db(instance_id=inference_server.name, update_type="time")
            if server_status == "running":
                try:
                    async with httpx.AsyncClient(transport=httpx.AsyncHTTPTransport(retries=2)) as client:
                        response = await client.post(inference_server.url, json=context,  timeout=60)
                        response = response.json()['text'][0] if response.status_code == 200 else None
                        if not response:
                            raise HttpError(404, "Time Out! Slow down")  
                        else:
                            await log_prompt_response(key=request.auth, model=data.model, prompt=data.prompt, response=response, type_="prompt")
                            return 200, {'response': response,
                                        'context' : context}
                except httpx.ReadTimeout:
                    raise HttpError(404, "Time Out! Slow down")  
            elif server_status == "stopped" or "stopping":
                await command_EC2(inference_server.name, region=constant.REGION, action="on")
                await update_server_status_in_db(
                    instance_id=inference_server.name, update_type="status")
                raise HttpError(442, "Server is starting up, try again in 400 seconds")
            elif server_status == "pending":
                raise HttpError(442, "Server is setting up, try again in 300 seconds")

@api.post("/chat")
async def chatcompletion(request, data: ChatSchema):
    model = await get_model(data.model)
    if not model:
        raise HttpError(442, "Unknown Model Error. Check your model name.")
    else:
        available_server_list = await get_model_url(data.model)
        if not available_server_list:
            raise HttpError(442, "Server is currently offline")
        else:
            inference_server = random.choice(available_server_list)
            server_status = inference_server.status
            if not data.beam:
                    length_penalty = 1
                    early_stopping = False
                    best_of = int(1)
            else:
                best_of = data.best_of
                length_penalty = data.length_penalty
                early_stopping = True
            template = constant.SHORTEN_TEMPLATE_TABLE[data.model]
            chat_prompt = template.format(data.prompt, "")
            chat_history = await get_chat_context(model=data.model, key=request.auth)
            processed_prompt = chat_history + "\n" + chat_prompt
            context = {
                "prompt": processed_prompt,
                "n": data.n,
                'best_of': best_of,
                'presence_penalty': data.presence_penalty,
                "use_beam_search": data.beam,
                "temperature": data.temperature,
                "max_tokens": data.max_tokens,
                "stream": data.stream,
                "top_k": int(data.top_k),
                "top_p": data.top_p,
                "length_penalty": length_penalty,
                "frequency_penalty": data.frequency_penalty,
                "early_stopping": early_stopping,
            }
            await update_server_status_in_db(instance_id=inference_server.name, update_type="time")
            if server_status == "running":
                if not data.stream:
                    try:
                        async with httpx.AsyncClient(transport=httpx.AsyncHTTPTransport(retries=2)) as client:
                            response = await client.post(inference_server.url, json=context,  timeout=120)
                            response  = response.json()['text'][0] if response.status_code == 200 else None
                            if not response:
                                raise HttpError(404, "Time Out! Slow down")  
                            else:
                                response = response.replace(processed_prompt, "")
                                await log_prompt_response(key=request.auth, model=data.model, prompt=data.prompt, response=response, type_="chatroom")
                                return 200, {'response': response,
                                            'context' : context}
                    except httpx.ReadTimeout:
                        raise HttpError(404, "Time Out! Slow down")  
                else:
                    async def event_stream():
                        client = httpx.AsyncClient()
                        async with  client.stream('POST', inference_server.url, json=context) as response:
                            async for chunk in response.aiter_text():
                                chunk = chunk[:-1]
                                c = json.loads(chunk)
                                output = c['text'][0].replace(processed_prompt, "")
                                yield str({"response": c, "delta": output}) + "\n"
                    res = StreamingHttpResponse(event_stream(), content_type="text/event-stream")
                    res['X-Accel-Buffering'] = 'no' 
                    res['Cache-Control'] = 'no-cache'
                    return res 
            elif server_status == "stopped" or "stopping":
                await command_EC2(inference_server.name, region=constant.REGION, action="on")
                await update_server_status_in_db(
                    instance_id=inference_server.name, update_type="status")
                raise HttpError(442, "Server is starting up, try again in 400 seconds")
            elif server_status == "pending":
                raise HttpError(442, "Server is setting up, try again in 300 seconds")
