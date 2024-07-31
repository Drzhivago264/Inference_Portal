from celery import shared_task

from server.models import APIKEY, LLM
from server.utils.sync_.log_database import log_prompt_response


@shared_task()
def celery_log_prompt_response(
    is_session_start_node: bool | None,
    key_object_id: int,
    llm_id: int,
    prompt: str,
    response: str,
    type_: str,
) -> None:
    """
    This function stores a log entry in the database and builds a memory tree of chat history.

    Args:
        is_session_start_node (bool | None): Indicates if this is the start of a session.
        key_object_id (int): The ID of the API key object.
        llm_id (int): The ID of the language model.
        prompt (str): The prompt text.
        response (str): The response text.
        type_ (str): The type of interaction.
    """
    llm = LLM.objects.get(id=llm_id)
    key_object = APIKEY.objects.get(id=key_object_id)
    log_prompt_response(
        is_session_start_node=is_session_start_node,
        key_object=key_object,
        llm=llm,
        prompt=prompt,
        response=response,
        type_=type_,
    )
