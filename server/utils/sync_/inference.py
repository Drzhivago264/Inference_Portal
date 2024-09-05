from typing import Tuple

import openai
import regex as re
import requests
import tiktoken
from asgiref.sync import async_to_sync
from celery.utils.log import get_task_logger
from channels.layers import get_channel_layer
from constance import config as constant
from decouple import config
from transformers import AutoTokenizer

from server.models.api_key import APIKEY
from server.models.llm_server import LLM
from server.utils.sync_.query_database import (
    get_chat_context,
    get_data_record_by_embedding,
)

logger = get_task_logger(__name__)
aws = config("aws_access_key_id")
aws_secret = config("aws_secret_access_key")
region = constant.REGION


def correct_beam_best_of(beam: bool, best_of: int) -> Tuple[bool, int]:
    if not beam:
        best_of = 1
    elif beam and best_of <= 1:
        best_of = 2
    return beam, best_of


def inference_mode(
    llm: LLM,
    key_object: APIKEY,
    mode: str,
    prompt: str,
    include_memory: bool,
    include_current_memory: bool,
    include_dataset_memory: bool,
    session_history: list | None,
    dataset: str | None = None,
) -> str | list:
    try:
        tokeniser = (
            AutoTokenizer.from_pretrained(llm.base)
            if llm.is_self_host
            else tiktoken.encoding_for_model(llm.name)
        )
    except KeyError:
        tokeniser = tiktoken.encoding_for_model("gpt-4")
    if mode == "chat":
        prompt_ = {"role": "user", "content": f"{prompt}"}
        if include_current_memory:
            session = session_history
        elif include_memory:
            current_history_length = len(tokeniser.encode(prompt))
            chat_history = get_chat_context(
                llm=llm,
                key_object=key_object,
                raw_prompt=prompt,
                current_history_length=current_history_length,
                tokeniser=tokeniser,
            )
            chat_history.append(prompt_)
            session = chat_history
        elif include_dataset_memory:
            current_history_length = len(tokeniser.encode(prompt))
            chat_history = get_data_record_by_embedding(
                llm=llm,
                key_object=key_object,
                raw_prompt=prompt,
                current_history_length=current_history_length,
                tokeniser=tokeniser,
                dataset=dataset,
            )
            chat_history.append(prompt_)
            session = chat_history
        else:
            session = [prompt_]
        return session
    elif mode == "generate":
        prompt_ = [
            {"role": "system", "content": "Complete the following sentence"},
            {"role": "user", "content": f"{prompt}"},
        ]
        return prompt_


def action_parse_json(context: str) -> list | bool:
    pattern = re.compile(r"\{(?:[^{}]|(?R))*\}")
    action_match = pattern.findall(context)
    if not action_match:
        return False
    else:
        return action_match


def send_chat_request(
    stream: bool,
    session_history: list,
    model: str,
    unique: str,
    credit: float,
    room_group_name: str,
    client: object,
    max_tokens: int | None,
    frequency_penalty: float,
    temperature: float,
    top_p: float,
    presence_penalty: float,
    vllm_model: str | None = None,
    extra_body: dict | None = None,
) -> str:
    clean_response = ""
    channel_layer = get_channel_layer()
    try:
        raw_response = client.chat.completions.create(
            model=model if vllm_model is None else vllm_model,
            messages=session_history,
            stream=stream,
            max_tokens=max_tokens,
            temperature=temperature,
            top_p=top_p,
            frequency_penalty=frequency_penalty,
            presence_penalty=presence_penalty,
            extra_body=extra_body,
        )
        for chunk in raw_response:
            if chunk:
                data = chunk.choices[0].delta.content
                if data is not None:
                    clean_response += data
                    response_json = [
                        {"role": "assistant", "content": f"{clean_response}"}
                    ]
                    session_history.pop()
                    session_history.extend(response_json)
                    async_to_sync(channel_layer.group_send)(
                        room_group_name,
                        {
                            "type": "chat_message",
                            "role": model,
                            "message": data,
                            "credit": credit,
                            "unique": unique,
                            "session_history": session_history,
                        },
                    )
        return clean_response

    except openai.APIConnectionError as e:
        async_to_sync(channel_layer.group_send)(
            room_group_name,
            {
                "type": "chat_message",
                "role": model,
                "message": f"Failed to connect to OpenAI API: {e}",
                "credit": credit,
                "unique": unique,
            },
        )

    except openai.RateLimitError as e:
        async_to_sync(channel_layer.group_send)(
            room_group_name,
            {
                "type": "chat_message",
                "role": model,
                "message": f"OpenAI API request exceeded rate limit: {e}",
                "credit": credit,
                "unique": unique,
            },
        )

    except openai.APIError as e:
        async_to_sync(channel_layer.group_send)(
            room_group_name,
            {
                "type": "chat_message",
                "role": model,
                "message": f"OpenAI API returned an API Error: {e}",
                "credit": credit,
                "unique": unique,
            },
        )


def send_agent_request(
    stream: bool,
    session_history: list,
    current_turn_inner: int,
    model: str,
    unique: str,
    credit: float,
    room_group_name: str,
    client: object,
    max_tokens: int,
    frequency_penalty: float,
    temperature: float,
    top_p: float,
    presence_penalty: float,
    vllm_model: str | None = None,
) -> str:
    clean_response = ""
    channel_layer = get_channel_layer()
    try:
        raw_response = client.chat.completions.create(
            model=model if vllm_model is None else vllm_model,
            messages=session_history,
            stream=stream,
            max_tokens=max_tokens,
            temperature=temperature,
            top_p=top_p,
            frequency_penalty=frequency_penalty,
            presence_penalty=presence_penalty,
        )

        current_turn_inner += 1
        for chunk in raw_response:
            if chunk:
                data = chunk.choices[0].delta.content
                if data is not None:
                    clean_response += data
                    response_json = [
                        {"role": "assistant", "content": f"{clean_response}"}
                    ]
                    session_history.pop()
                    session_history.extend(response_json)
                    async_to_sync(channel_layer.group_send)(
                        room_group_name,
                        {
                            "type": "chat_message",
                            "role": model,
                            "message": data,
                            "credit": credit,
                            "unique": unique,
                            "session_history": session_history,
                            "current_turn": current_turn_inner,
                        },
                    )

        action_list = action_parse_json(session_history[-1]["content"])
        if action_list:
            async_to_sync(channel_layer.group_send)(
                room_group_name,
                {
                    "type": "chat_message",
                    "action_list": action_list,
                    "full_response": clean_response,
                },
            )

    except openai.APIConnectionError as e:
        async_to_sync(channel_layer.group_send)(
            room_group_name,
            {
                "type": "chat_message",
                "role": model,
                "message": f"Failed to connect to OpenAI API: {e}",
                "credit": credit,
                "unique": unique,
                "session_history": session_history,
                "current_turn": current_turn_inner,
            },
        )

    except openai.RateLimitError as e:
        async_to_sync(channel_layer.group_send)(
            room_group_name,
            {
                "type": "chat_message",
                "role": model,
                "message": f"OpenAI API request exceeded rate limit: {e}",
                "credit": credit,
                "unique": unique,
                "session_history": session_history,
                "current_turn": current_turn_inner,
            },
        )

    except openai.APIError as e:
        async_to_sync(channel_layer.group_send)(
            room_group_name,
            {
                "type": "chat_message",
                "role": model,
                "message": f"OpenAI API returned an API Error: {e}",
                "credit": credit,
                "unique": unique,
                "session_history": session_history,
                "current_turn": current_turn_inner,
            },
        )
