from celery import shared_task

from server.models.api_key import APIKEY
from server.models.llm_server import LLM
from server.utils.sync_.log_database import log_prompt_response
from server.utils.sync_.sync_cache import get_or_set_cache


@shared_task()
def celery_log_prompt_response(
    is_session_start_node: bool | None,
    key_object_id: int,
    llm_id: int,
    prompt: str,
    response: str,
    type_: int,
) -> None:
    """
    This function stores a log entry in the database and builds a memory tree of chat history.

    Args:
        is_session_start_node (bool | None): Indicates if this is the start of a session.
        key_object_id (int): The ID of the API key object.
        llm_id (int): The ID of the language model.
        prompt (str): The prompt text.
        response (str): The response text.
        type_ (int): The type of interaction.
    """
    llm = get_or_set_cache(
        prefix="system_model", key=llm_id, field_to_get="id", Model=LLM, timeout=84000
    )
    key_object = get_or_set_cache(
        prefix="api_key",
        key=key_object_id,
        field_to_get="id",
        Model=APIKEY,
        timeout=600,
    )
    log_prompt_response(
        is_session_start_node=is_session_start_node,
        key_object=key_object,
        llm=llm,
        prompt=prompt,
        response=response,
        type_=type_,
    )
