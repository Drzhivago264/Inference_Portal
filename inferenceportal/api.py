from ninja import NinjaAPI, Schema
from apikey.util import constant, commond_func
from ninja.security import HttpBearer
from apikey.models import InferenceServer, LLM, PromptResponse, APIKEY
from django.core.exceptions import ObjectDoesNotExist
from django.db.models.query import QuerySet
from asgiref.sync import sync_to_async
from django.core.serializers.json import DjangoJSONEncoder
from ninja.errors import ValidationError
from django.http import StreamingHttpResponse
from django.db.models import Q
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
from .utils import get_chat_context, get_model, get_model_url, command_EC2, update_server_status_in_db, log_prompt_response, send_request_async, send_stream_request_async, query_response_log


class GlobalAuth(HttpBearer):
    @sync_to_async
    def authenticate(self, request, token):
        try:
            key_object = APIKEY.objects.get_from_key(token)
            return key_object
        except ObjectDoesNotExist:
            pass


api = NinjaAPI(auth=GlobalAuth(),
               title="Professor Parakeet API")


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
    include_memory: bool = constant.DEFAULT_MEMORY


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
            context = {
                "prompt": data.prompt,
                "n": data.n,
                'best_of': best_of,
                "use_beam_search": data.beam,
                "stream": False,
                "early_stopping": early_stopping,
                'presence_penalty': data.presence_penalty if -2 <= data.presence_penalty <= 2 else 0,
                "temperature": data.temperature if 0 <= data.temperature <= 1 else 0.73,
                "max_tokens": data.max_tokens if 0 < data.max_tokens <= 4096 else 128,
                "top_k": int(data.top_k) if 0 < data.top_k <= 100 else -1,
                "top_p": data.top_p if 0 <= data.top_p <= 1 else 0.73,
                "length_penalty": length_penalty if -2 <= data.length_penalty <= 2 else 0,
                "frequency_penalty": data.frequency_penalty if -2 <= data.frequency_penalty <= 2 else 0,
            }
            await update_server_status_in_db(instance_id=inference_server.name, update_type="time")
            if server_status == "running":
                try:
                    response = await send_request_async(inference_server.url, context)
                    if not response:
                        raise HttpError(404, "Time Out! Slow down")
                    else:
                        await log_prompt_response(key_object=request.auth, model=data.model, prompt=data.prompt, response=response, type_="prompt")
                        return 200, {'response': response,
                                     'context': context}
                except httpx.ReadTimeout:
                    raise HttpError(404, "Time Out! Slow down")
            elif server_status == "stopped" or "stopping":
                await command_EC2(inference_server.name, region=constant.REGION, action="on")
                await update_server_status_in_db(
                    instance_id=inference_server.name, update_type="status")
                raise HttpError(
                    442, "Server is starting up, try again in 400 seconds")
            elif server_status == "pending":
                raise HttpError(
                    442, "Server is setting up, try again in 300 seconds")


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
            if data.include_memory:
                chat_history = await get_chat_context(model=data.model, key_object=request.auth, raw_prompt=data.prompt)
                processed_prompt = chat_history + "\n" + chat_prompt
            else:
                processed_prompt = chat_prompt
            context = {
                "prompt": processed_prompt,
                "n": data.n,
                'best_of': best_of,
                'presence_penalty': data.presence_penalty if -2 <= data.presence_penalty <= 2 else 0,
                "temperature": data.temperature if 0 <= data.temperature <= 1 else 0.73,
                "max_tokens": data.max_tokens if 0 < data.max_tokens <= 4096 else 128,
                "top_k": int(data.top_k) if 0 < data.top_k <= 100 else -1,
                "top_p": data.top_p if 0 <= data.top_p <= 1 else 0.73,
                "length_penalty": length_penalty if -2 <= data.length_penalty <= 2 else 0,
                "frequency_penalty": data.frequency_penalty if -2 <= data.frequency_penalty <= 2 else 0,
                "early_stopping": early_stopping,
                "stream": data.stream,
                "use_beam_search": data.beam,
            }
            await update_server_status_in_db(instance_id=inference_server.name, update_type="time")
            if server_status == "running":
                if not data.stream:
                    try:
                        response = await send_request_async(inference_server.url, context)
                        if not response:
                            raise HttpError(404, "Time Out! Slow down")
                        else:
                            response = response.replace(processed_prompt, "")
                            await log_prompt_response(key_object=request.auth, model=data.model, prompt=data.prompt, response=response, type_="chatroom")
                            return 200, {'response': response,
                                         'context': context}
                    except httpx.ReadTimeout:
                        raise HttpError(404, "Time Out! Slow down")
                else:
                    try:
                        res = StreamingHttpResponse(send_stream_request_async(url=inference_server.url, context=context,
                                                    processed_prompt=processed_prompt, request=request, data=data), content_type="text/event-stream")
                        res['X-Accel-Buffering'] = 'no'
                        res['Cache-Control'] = 'no-cache'
                        return res
                    except:
                        raise HttpError(404, "Time Out! Slow down")
            elif server_status == "stopped" or "stopping":
                await command_EC2(inference_server.name, region=constant.REGION, action="on")
                await update_server_status_in_db(
                    instance_id=inference_server.name, update_type="status")
                raise HttpError(
                    442, "Server is starting up, try again in 400 seconds")
            elif server_status == "pending":
                raise HttpError(
                    442, "Server is setting up, try again in 300 seconds")


class ResponseLogRequest(Schema):
    quantity: int = 10
    lastest: bool = True
    filter_by: list = ["chatroom", "prompt", "open_ai"]


@api.post("/responselog")
async def log(request, data: ResponseLogRequest):
    quantity = 1 if data.quantity < 10 else data.quantity
    order = "-id" if data.lastest else "id"
    response_log = await query_response_log(key_object=request.auth, order=order, quantity=quantity, type_=data.filter_by)
    return response_log
