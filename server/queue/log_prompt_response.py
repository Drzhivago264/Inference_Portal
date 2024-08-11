from celery import shared_task

from server.models.api_key import APIKEY
from server.models.llm_server import LLM
from server.utils.sync_.log_database import log_prompt_response
from server.utils.sync_.sync_cache import get_or_set_cache


@shared_task()
def celery_log_prompt_response(
    is_session_start_node: bool | None,
    key_object_hashed_key: int,
    llm_name: str,
    prompt: str,
    response: str,
    type_: int,
) -> None:
    llm = get_or_set_cache(
        prefix="system_model", key=llm_name, field_to_get="name", Model=LLM, timeout=84000
    )
    key_object = get_or_set_cache(
        prefix="user_key_object",
        field_to_get="hashed_key",
        Model=APIKEY,
        timeout=60,
        key=key_object_hashed_key,
    )
    log_prompt_response(
        is_session_start_node=is_session_start_node,
        key_object=key_object,
        llm=llm,
        prompt=prompt,
        response=response,
        type_=type_,
    )
