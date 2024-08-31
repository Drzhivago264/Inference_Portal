import random
from typing import Callable, Tuple, Union

from constance import config as constant
from django.core.cache import cache
from vectordb import vectordb

from server.models.api_key import APIKEY
from server.models.llm_server import LLM, InferenceServer
from server.utils.sync_.sync_cache import get_or_set_cache


def get_model_url(model: LLM) -> Tuple[str, str, str] | Tuple[bool, bool, bool]:
    """Retrieve URL, name, and status of an available inference server for a given model.

    Args:
        model (LLM): An instance of the LLM class representing the model.

    Returns:
        Tuple[str, str, str] | Tuple[bool, bool, bool]: A tuple containing URL, name, and status of a server or False values.
    """
    try:
        server_list = cache.get(f"{model}_link_list")
        if server_list is None:
            server_list = list(
                InferenceServer.objects.filter(
                    hosted_model=model,
                    availability=InferenceServer.AvailabilityType.AVAILABLE,
                )
            )
            cache.set(
                f"{model}_link_list", server_list, constant.CACHE_SERVER_LINK_RETRIVAL
            )

        if server_list:
            random_url = random.choice(server_list)
            return random_url.url, random_url.name, random_url.status
        else:
            return False, False, False
    except (IndexError, AttributeError):
        return False, False, False


def get_model(model: str) -> Union[LLM, bool]:
    """
    Retrieves an object from the LLM model based on the provided model name.

    Args:
        model (str): The name of the model to retrieve.

    Returns:
        Union[LLM, bool]: The LLM object if found, False otherwise.
    """

    return get_or_set_cache(
        prefix="system_model", key=model, field_to_get="name", Model=LLM, timeout=84000
    )


def get_chat_context(
    llm: LLM,
    key_object: APIKEY,
    raw_prompt: str,
    current_history_length: int,
    tokeniser: Callable,
) -> Union[str, list]:
    """
    Generate a chat context based on the provided inputs.

    Args:
        llm (LLM): an instance of a language model
        key_object (APIKEY): an API key object
        raw_prompt (str): a string containing the raw prompt
        current_history_length (int): an integer representing the current history length
        tokeniser (Callable): a function for tokenising text

    Returns:
        Union[str, list]: either a string or a list representing the generated chat context
    """
    hashed_key = key_object.hashed_key
    message_list_vector = vectordb.filter(
        metadata__key=hashed_key, metadata__model=llm.name
    ).search(raw_prompt, k=constant.DEFAULT_CHAT_HISTORY_VECTOR_OBJECT)
    max_history_length = llm.max_history_length
    full_instruct_list = []
    for mess in message_list_vector:
        if mess.distance <= constant.DEFAULT_MAX_DISTANCE:
            full_instruct_list += [
                {"role": "user", "content": f"{mess.content_object.prompt}"},
                {"role": "assistant", "content": f"{mess.content_object.response}"},
            ]
            current_history_length += len(
                tokeniser.encode(
                    mess.content_object.prompt + " " + mess.content_object.response
                )
            )
            if current_history_length > int(max_history_length):
                full_instruct_list = full_instruct_list[: -2 or None]
    return full_instruct_list
