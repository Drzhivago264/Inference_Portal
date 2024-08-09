import json

import httpx
from asgiref.sync import sync_to_async
from django.contrib.auth.models import User
from ninja.errors import HttpError

from api.api_schema import AgentSchema, ChatSchema
from server.models.api_key import APIKEY
from server.models.instruction import InstructionTreeMP, UserInstructionTreeMP
from server.models.llm_server import LLM, InferenceServer
from server.models.log import PromptResponse
from server.queue.log_prompt_response import celery_log_prompt_response
from server.utils import constant
from server.utils.async_.async_cache import get_or_set_cache


async def check_permission(user_object, permission, destination):
    if not await sync_to_async(user_object.has_perm)(permission):
        raise HttpError(401, f"Your key is not authorised to use {destination} api")


async def get_system_template(name: str) -> str:
    try:
        template = await get_or_set_cache(
            prefix="system_template",
            key=name,
            field_to_get="name",
            Model=InstructionTreeMP,
            timeout=84000,
        )
        return template.instruct
    except InstructionTreeMP.DoesNotExist:
        raise HttpError(404, f"template: {name} is incorrect")


async def get_user_template(name: str, user_object: User) -> str:
    try:
        template = await UserInstructionTreeMP.objects.aget(
            displayed_name=name, user=user_object
        )
        return template.instruct
    except UserInstructionTreeMP.DoesNotExist:
        raise HttpError(404, f"template: {name} is incorrect")


async def send_request_async(url: str, context: dict) -> httpx.Response:
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
            type_=PromptResponse.PromptType.CHATBOT_API,
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
            type_=PromptResponse.PromptType.AGENT_API,
        )
    except httpx.ReadTimeout:
        raise httpx.ReadTimeout


async def query_response_log(
    key_object: str, order: str, quantity: int, type_: list
) -> dict:
    response = list()
    log = PromptResponse.objects.filter(key=key_object, type__in=type_).order_by(order)[
        :quantity
    ]
    async for l in log:
        response.append(
            {
                "prompt": l.prompt,
                "response": l.response,
                "created_at": l.created_at,
                "type": l.type,
                "model": await sync_to_async(lambda: l.model.name)(),
            }
        )
    return response
