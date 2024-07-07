import random
from django.core.cache import cache
from server.models import (InferenceServer,
                           LLM,
                           APIKEY
                           )
from server.utils import constant
from decouple import config
from django.db.models.query import QuerySet
from celery.utils.log import get_task_logger
from vectordb import vectordb
from typing import Tuple

logger = get_task_logger(__name__)
aws = config("aws_access_key_id")
aws_secret = config("aws_secret_access_key")
region = constant.REGION

def get_model_url(model: LLM) -> Tuple[str, str, str] | Tuple[bool, bool, bool]:
    try:
        model_list = cache.get(f"{model}_link_list")
        if model_list == None:
            model_list = list(InferenceServer.objects.filter(
                hosted_model=model, availability="Available"))
            cache.set(f"{model}_link_list", model_list,
                      constant.CACHE_SERVER_LINK_RETRIVAL)
        random_url = random.choice(model_list)
        url = random_url.url
        instance_id = random_url.name
        server_status = random_url.status
        return url, instance_id, server_status
    except:
        return False, False, False


def get_model(model: str) -> QuerySet[LLM] | bool:
    try:
        return LLM.objects.get(name=model)
    except LLM.DoesNotExist:
        return False
    
def get_chat_context(model: str, key_object: APIKEY, raw_prompt: str, agent_availability: bool, current_history_length: int, tokeniser: object) -> str | list:

    hashed_key = key_object.hashed_key
    message_list_vector = vectordb.filter(metadata__key=hashed_key, metadata__model=model).search(
        raw_prompt, k=constant.DEFAULT_CHAT_HISTORY_VECTOR_OBJECT)

    if not agent_availability:
        max_history_length = constant.MAX_HISTORY_LENGTH[model]
    else:
        max_history_length = constant.MAX_HISTORY_LENGTH["openai"]
    full_instruct_list = []
    for mess in message_list_vector:
        if mess.distance <= constant.DEFAULT_MAX_DISTANCE:
            full_instruct_list += [
                {'role': 'user', 'content': f'{mess.content_object.prompt}'},
                {'role': 'assistant', 'content': f'{mess.content_object.response}'}
            ]
            current_history_length += len(tokeniser.encode(
                mess.content_object.prompt + " " + mess.content_object.response))
            if current_history_length > int(max_history_length):
                full_instruct_list = full_instruct_list[:-2 or None]
    return full_instruct_list