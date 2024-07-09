import random
from vectordb import vectordb
from typing import Tuple

from django.db.models.query import QuerySet
from django.core.cache import cache

from server.models import (
    InferenceServer,
    LLM,
    APIKEY
)
from server.utils import constant




def get_model_url(model: LLM) -> Tuple[str, str, str] | Tuple[bool, bool, bool]:
    try:
        server_list = cache.get(f"{model}_link_list")
        if server_list is None:
            server_list = list(InferenceServer.objects.filter(
                hosted_model=model, availability="Available"))
            cache.set(f"{model}_link_list", server_list,
                      constant.CACHE_SERVER_LINK_RETRIVAL)
        if server_list:
            random_url = random.choice(server_list)
            url = random_url.url
            instance_id = random_url.name
            server_status = random_url.status
            return url, instance_id, server_status
        else:
            return False, False, False
    except IndexError:
        return False, False, False


def get_model(model: str) -> QuerySet[LLM] | bool:
    try:
        return LLM.objects.get(name=model)
    except LLM.DoesNotExist:
        return False


def get_chat_context(llm: LLM, key_object: APIKEY, raw_prompt: str, current_history_length: int, tokeniser: object) -> str | list:

    hashed_key = key_object.hashed_key
    message_list_vector = vectordb.filter(metadata__key=hashed_key, metadata__model=llm.name).search(
        raw_prompt, k=constant.DEFAULT_CHAT_HISTORY_VECTOR_OBJECT)


    max_history_length = llm.max_history_length

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
