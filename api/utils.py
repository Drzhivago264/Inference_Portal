import json
from openai import AsyncOpenAI
from decouple import config
import httpx
import regex as re
from asgiref.sync import sync_to_async
from django.contrib.auth.models import User
from ninja.errors import HttpError

from api.api_schema import AgentSchema, ChatSchema
from constance import config as constant
from server.models.api_key import APIKEY
from server.models.instruction import InstructionTreeMP, UserInstructionTreeMP
from server.models.llm_server import LLM, InferenceServer
from server.models.log import PromptResponse
from server.queue.log_prompt_response import celery_log_prompt_response
from server.utils.async_.async_cache import get_or_set_cache


async def check_permission(user_object, permission, destination):
    if not await sync_to_async(user_object.has_perm)(permission):
        raise HttpError(401, f"Your key is not authorised to use {destination} api")


async def get_system_template(name: str) -> str:

    template = await get_or_set_cache(
        prefix="system_template",
        key=name,
        field_to_get="name",
        Model=InstructionTreeMP,
        timeout=84000,
    )
    if not template:
        raise HttpError(404, f"template: {name} is incorrect")
    else:
        return template.instruct


async def get_user_template(name: str, user_object: User) -> str:
    try:
        template = await UserInstructionTreeMP.objects.aget(
            displayed_name=name, user=user_object
        )
        return template.instruct
    except UserInstructionTreeMP.DoesNotExist:
        raise HttpError(404, f"template: {name} is incorrect")

    
async def send_request_async(url: str, context: dict, llm: LLM, processed_prompt: list, key_object: APIKEY, data: ChatSchema) -> httpx.Response:

    client = AsyncOpenAI(
        api_key=config("VLLM_KEY"),
        base_url=f"{url}/v1" if url else None,
        timeout=constant.TIMEOUT,
        max_retries=constant.RETRY,
        )
    raw_response = await client.chat.completions.create(
        model= llm.base,
        messages=processed_prompt,
        stream=context["stream"],
        n=context['n'],
        frequency_penalty=context["frequency_penalty"],
        top_p=context["top_p"],
        max_tokens=context["max_tokens"],
        temperature=context["temperature"],
        presence_penalty=context["presence_penalty"],
        extra_body={
            'best_of':context["best_of"],
            'use_beam_search': context["beam"],
            'top_k':context["top_k"],
            'length_penalty': context["length_penalty"],
            'early_stopping': context['early_stopping'] if context['beam'] else False
        }
    ) 
    if raw_response:
        full_response = raw_response.choices[0].message
        celery_log_prompt_response.delay(
            is_session_start_node=None,
            key_object_hashed_key=key_object.hashed_key,
            llm_name=llm.name,
            prompt=data.prompt,
            response=full_response,
            type_=PromptResponse.PromptType.CHATBOT_API,
        )
    return raw_response


async def send_stream_request_async(
    url: str,
    context: dict,
    processed_prompt: str,
    key_object: APIKEY,
    llm: LLM,
    data: ChatSchema,
):
    client = AsyncOpenAI(
        api_key=config("VLLM_KEY"),
        base_url=f"{url}/v1" if url else None,
        timeout=constant.TIMEOUT,
        max_retries=constant.RETRY,
        )
    raw_response = await client.chat.completions.create(
        model= llm.base,
        messages=processed_prompt,
        stream=context["stream"],
        n=context['n'],
        frequency_penalty=context["frequency_penalty"],
        top_p=context["top_p"],
        max_tokens=context["max_tokens"],
        temperature=context["temperature"],
        presence_penalty=context["presence_penalty"],
        extra_body={
            'best_of':context["best_of"],
            'use_beam_search': context["beam"],
            'top_k':context["top_k"],
            'length_penalty': context["length_penalty"],
            'early_stopping': context['early_stopping'] if context['beam'] else False
        }
    ) 
    if raw_response:
        full_response = str()
        async for chunk in raw_response:
            if chunk:
                data = chunk.choices[0].delta.content
                if data is not None:
                    full_response += data
                    yield str(
                        {"response": full_response, "delta": data}
                    ) + "\n"
        celery_log_prompt_response.delay(
            is_session_start_node=None,
            key_object_hashed_key=key_object.hashed_key,
            llm_name=llm.name,
            prompt=data.prompt,
            response=full_response,
            type_=PromptResponse.PromptType.CHATBOT_API,
        )


async def send_stream_request_agent_async(
    url: str,
    context: dict,
    processed_prompt: str,
    key_object: APIKEY,
    llm: LLM,
    data: AgentSchema,
    parent_template_name: str | None,
    child_template_name: str | None,
    working_nemory: list,
    use_my_template: str,
):
    client = AsyncOpenAI(
        api_key=config("VLLM_KEY"),
        base_url=f"{url}/v1" if url else None,
        timeout=constant.TIMEOUT,
        max_retries=constant.RETRY,
        )
    
    raw_response = await client.chat.completions.create(
        model= llm.base,
        messages=processed_prompt,
        stream=context["stream"],
        n=context['n'],
        frequency_penalty=context["frequency_penalty"],
        top_p=context["top_p"],
        max_tokens=context["max_tokens"],
        temperature=context["temperature"],
        presence_penalty=context["presence_penalty"],
        extra_body={
            'best_of':context["best_of"],
            'use_beam_search': context["beam"],
            'top_k':context["top_k"],
            'length_penalty': context["length_penalty"],
            'early_stopping': context['early_stopping'] if context['beam'] else False
        }
    ) 
  
    if raw_response:
        full_response = str()
        async for chunk in raw_response:
            if chunk:
                data = chunk.choices[0].delta.content
                full_response += data
                yield str(
                    {
                        "response": full_response,
                        "delta": data,
                        "use_my_template": use_my_template,
                        "working_memory": working_nemory
                        + [{"role": "assistant", "content": f"{c}"}],
                        "parent_template_name": parent_template_name,
                        "child_template_name": child_template_name,
                    }
                ) + "\n"

        celery_log_prompt_response.delay(
            is_session_start_node=None,
            key_object_hashed_key=key_object.hashed_key,
            llm_name=llm.name,
            prompt=data.prompt,
            response=full_response,
            type_=PromptResponse.PromptType.AGENT_API,
        )


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
