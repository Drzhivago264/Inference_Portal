import json

import httpx
from asgiref.sync import sync_to_async
from ninja.errors import HttpError

from api.api_schema import AgentSchema, ChatSchema
from server.models import (
    APIKEY,
    LLM,
    InferenceServer,
    InstructionTree,
    PromptResponse,
    UserInstructionTree,
)
from server.queue.log_prompt_response import celery_log_prompt_response
from server.utils import constant


async def check_permission(user_object, permission, destination):
    if not await sync_to_async(user_object.has_perm)(permission):
        raise HttpError(401, f"Your key is not authorised to use {destination} api")


async def get_system_template(name: str) -> str:
    try:
        template = await InstructionTree.objects.aget(name=name)
        return template.instruct
    except InstructionTree.DoesNotExist:
        raise HttpError(404, f"template: {name} is incorrect")


async def get_user_template(name: str, user_object: object) -> str:
    try:
        template = await UserInstructionTree.objects.aget(
            displayed_name=name, user=user_object
        )
        return template.instruct
    except UserInstructionTree.DoesNotExist:
        raise HttpError(404, f"template: {name} is incorrect")


async def get_model_url(model: str) -> list | bool:
    model_list = []
    try:
        async for m in InferenceServer.objects.filter(
            hosted_model__name=model, availability="Available"
        ):
            model_list.append(m)
        return model_list
    except:
        return False


async def send_request_async(url: str, context: dict):
    async with httpx.AsyncClient(
        transport=httpx.AsyncHTTPTransport(retries=constant.RETRY),
        timeout=constant.TIMEOUT,
    ) as client:
        response = await client.post(url, json=context)
        response = response.json()["text"][0] if response.status_code == 200 else None
        return response


async def send_stream_request_async(
    url: str,
    context: dict,
    processed_prompt: str,
    key_object: APIKEY,
    model: LLM,
    data: ChatSchema,
):
    client = httpx.AsyncClient(
        transport=httpx.AsyncHTTPTransport(retries=constant.RETRY),
        timeout=constant.TIMEOUT,
    )
    full_response = ""
    try:
        async with client.stream("POST", url, json=context) as response:
            async for chunk in response.aiter_text():
                try:
                    chunk = chunk[:-1]
                    c = json.loads(chunk)
                    output = c["text"][0].replace(processed_prompt, "")
                    yield str(
                        {"response": c, "delta": output.replace(full_response, "")}
                    ) + "\n"
                    full_response = output
                except json.decoder.JSONDecodeError:
                    pass
        celery_log_prompt_response.delay(
            is_session_start_node=None,
            key_object_id=key_object.id,
            llm_id=model.id,
            prompt=data.prompt,
            response=response,
            type_="chat_api",
        )

    except httpx.ReadTimeout:
        raise httpx.ReadTimeout


async def send_stream_request_agent_async(
    url: str,
    context: dict,
    processed_prompt: str,
    key_object: APIKEY,
    model: LLM,
    data: AgentSchema,
    parent_template_name: str | None,
    child_template_name: str | None,
    working_nemory: list,
    use_my_template: str,
):
    client = httpx.AsyncClient(
        transport=httpx.AsyncHTTPTransport(retries=constant.RETRY),
        timeout=constant.TIMEOUT,
    )
    full_response = ""
    try:
        async with client.stream("POST", url, json=context) as response:
            async for chunk in response.aiter_text():
                try:
                    chunk = chunk[:-1]
                    c = json.loads(chunk)
                    output = c["text"][0].replace(processed_prompt, "")
                    yield str(
                        {
                            "response": c,
                            "delta": output.replace(full_response, ""),
                            "use_my_template": use_my_template,
                            "working_memory": working_nemory
                            + [{"role": "assistant", "content": f"{c}"}],
                            "parent_template_name": parent_template_name,
                            "child_template_name": child_template_name,
                        }
                    ) + "\n"
                    full_response = output
                except:
                    pass
        celery_log_prompt_response.delay(
            is_session_start_node=None,
            key_object_id=key_object.id,
            llm_id=model.id,
            prompt=data.prompt,
            response=response,
            type_="agent_api",
        )
    except httpx.ReadTimeout:
        raise httpx.ReadTimeout


async def query_response_log(
    key_object: str, order: str, quantity: int, type_: list
) -> object:
    response = list()
    log = PromptResponse.objects.filter(key=key_object, p_type__in=type_).order_by(
        order
    )[:quantity]
    async for l in log:
        response.append(
            {
                "prompt": l.prompt,
                "response": l.response,
                "created_at": l.created_at,
                "type": l.p_type,
                "model": await sync_to_async(lambda: l.model.name)(),
            }
        )
    return response
