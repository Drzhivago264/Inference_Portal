import openai
from asgiref.sync import sync_to_async
from constance import config as constant
from decouple import config
from django.contrib.auth.models import User
from ninja.errors import HttpError

from api.api_schema import AgentSchema, ChatSchema
from server.models.api_key import APIKEY
from server.models.instruction import InstructionTreeMP, UserInstructionTreeMP
from server.models.llm_server import LLM
from server.models.log import PromptResponse
from server.queue.log_prompt_response import celery_log_prompt_response
from server.utils.async_.async_cache import get_or_set_cache


async def check_permission(user_object, permission, destination):
    if not await sync_to_async(user_object.has_perm)(permission):
        raise HttpError(401, f"Your key is not authorised to use {destination} api")


def check_permission_sync(user_object, permission, destination):
    if not user_object.has_perm(permission):
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


async def send_request_async(
    url: str,
    context: dict,
    llm: LLM,
    processed_prompt: list,
    key_object: APIKEY,
    data: ChatSchema,
) -> str:
    client = openai.AsyncOpenAI(
        api_key=config("VLLM_KEY"),
        base_url=f"{url}/v1" if url else None,
        timeout=constant.TIMEOUT,
        max_retries=constant.RETRY,
    )
    try:
        raw_response = await client.chat.completions.create(
            model=llm.base,
            messages=processed_prompt,
            stream=context["stream"],
            n=context["n"],
            frequency_penalty=context["frequency_penalty"],
            top_p=context["top_p"],
            max_tokens=context["max_tokens"],
            temperature=context["temperature"],
            presence_penalty=context["presence_penalty"],
            extra_body={
                "best_of": context["best_of"],
                "use_beam_search": context["use_beam_search"],
                "top_k": context["top_k"],
                "length_penalty": context["length_penalty"],
                "early_stopping": (
                    context["early_stopping"] if context["use_beam_search"] else False
                ),
            },
        )
        if raw_response:
            full_response = raw_response.choices[0].message.content
            celery_log_prompt_response.delay(
                is_session_start_node=None,
                key_object_hashed_key=key_object.hashed_key,
                llm_name=llm.name,
                prompt=data.prompt,
                response=full_response,
                type_=PromptResponse.PromptType.CHATBOT_API,
            )
        return raw_response.choices[0].message.content
    except openai.APIConnectionError as e:
        raise HttpError(404, f"Failed to connect to vLLM API: {e}")
    except openai.RateLimitError as e:
        raise HttpError(429, f"vLLM API request exceeded rate limit: {e}")
    except openai.APIError as e:
        raise HttpError(503, f"vLLM API returned an API Error: {e}")


async def send_stream_request_async(
    url: str,
    context: dict,
    processed_prompt: str,
    key_object: APIKEY,
    llm: LLM,
    data: ChatSchema | AgentSchema,
    inference_type: PromptResponse.PromptType,
    parent_template_name: str | None = None,
    child_template_name: str | None = None,
    working_nemory: list | None = None,
    use_my_template: bool | None = None,
):
    client = openai.AsyncOpenAI(
        api_key=config("VLLM_KEY"),
        base_url=f"{url}/v1" if url else None,
        timeout=constant.TIMEOUT,
        max_retries=constant.RETRY,
    )
    try:
        raw_response = await client.chat.completions.create(
            model=llm.base,
            messages=processed_prompt,
            stream=context["stream"],
            n=context["n"],
            frequency_penalty=context["frequency_penalty"],
            top_p=context["top_p"],
            max_tokens=context["max_tokens"],
            temperature=context["temperature"],
            presence_penalty=context["presence_penalty"],
            extra_body={
                "best_of": context["best_of"],
                "use_beam_search": context["use_beam_search"],
                "top_k": context["top_k"],
                "length_penalty": context["length_penalty"],
                "early_stopping": (
                    context["early_stopping"] if context["use_beam_search"] else False
                ),
            },
        )
        if raw_response:
            full_response = str()
            async for chunk in raw_response:
                if chunk:
                    data = chunk.choices[0].delta.content
                    if data is not None:
                        full_response += data
                        if inference_type == PromptResponse.PromptType.CHATBOT_API:
                            yield str({"response": full_response, "delta": data}) + "\n"
                        elif inference_type == PromptResponse.PromptType.AGENT_API:
                            yield str(
                                {
                                    "response": full_response,
                                    "delta": data,
                                    "use_my_template": use_my_template,
                                    "working_memory": working_nemory
                                    + [
                                        {
                                            "role": "assistant",
                                            "content": f"{full_response}",
                                        }
                                    ],
                                    "parent_template_name": parent_template_name,
                                    "child_template_name": child_template_name,
                                }
                            ) + "\n"
            if full_response and isinstance(full_response, str):
                celery_log_prompt_response.delay(
                    is_session_start_node=None,
                    key_object_hashed_key=key_object.hashed_key,
                    llm_name=llm.name,
                    prompt=data.prompt,
                    response=full_response,
                    type_=inference_type,
                )
    except openai.APIConnectionError as e:
        raise HttpError(404, f"Failed to connect to vLLM API: {e}")
    except openai.RateLimitError as e:
        raise HttpError(429, f"vLLM API request exceeded rate limit: {e}")
    except openai.APIError as e:
        raise HttpError(503, f"vLLM API returned an API Error: {e}")
