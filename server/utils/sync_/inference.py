import json

import openai
import regex as re
import requests
import tiktoken
from asgiref.sync import async_to_sync
from celery.utils.log import get_task_logger
from channels.layers import get_channel_layer
from decouple import config
from transformers import AutoTokenizer

from server import constant
from server.models.api_key import APIKEY
from server.models.llm_server import LLM, InferenceServer
from server.utils.sync_.query_database import get_chat_context

logger = get_task_logger(__name__)
aws = config("aws_access_key_id")
aws_secret = config("aws_secret_access_key")
region = constant.REGION


def correct_beam_best_of(beam, best_of):
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
    session_history: list | None,
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
            session_list_to_string = (
                tokeniser.apply_chat_template(session_history, tokenize=False)
                if llm.is_self_host
                else session_history
            )
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
            session_list_to_string = (
                tokeniser.apply_chat_template(chat_history, tokenize=False)
                if llm.is_self_host
                else chat_history
            )
        else:
            session_list_to_string = (
                tokeniser.apply_chat_template([prompt_], tokenize=False)
                if llm.is_self_host
                else [prompt_]
            )
        return session_list_to_string
    elif mode == "generate":
        prompt_ = [
            {"role": "system", "content": "Complete the following sentence"},
            {"role": "user", "content": f"{prompt}"},
        ]
        session_list_to_string = (
            tokeniser.apply_chat_template(prompt_, tokenize=False)
            if llm.is_self_host
            else prompt_
        )
        return session_list_to_string


def send_request(stream: bool, url: str, instance_id: str, context: dict) -> str:
    try:
        response = requests.post(
            url, json=context, stream=stream, timeout=constant.TIMEOUT
        )
        if not stream:
            response = response.json()["text"][0]
    except requests.exceptions.Timeout:
        response = "Request Timeout. Cannot connect to the model. If you just booted the GPU server, wait for 400 seconds, and try again"
    except requests.exceptions.InvalidJSONError:
        response = "You messed up the parameters. Return them to the defaults."
    except requests.exceptions.ConnectionError:
        server_object = InferenceServer.objects.get(name=instance_id)
        server_object.status = "pending"
        server_object.save()
        response = "Server is setting up, wait."
    return response


def action_parse_json(context: str) -> list | bool:
    pattern = re.compile(r"\{(?:[^{}]|(?R))*\}")
    action_match = pattern.findall(context)
    if not action_match:
        return False
    else:
        return action_match


def send_chat_request_openai(
    stream: bool,
    session_history: list,
    choosen_model: str,
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
) -> str:
    clean_response = ""
    channel_layer = get_channel_layer()
    try:
        raw_response = client.chat.completions.create(
            model=choosen_model,
            messages=session_history,
            stream=stream,
            max_tokens=max_tokens,
            temperature=temperature,
            top_p=top_p,
            frequency_penalty=frequency_penalty,
            presence_penalty=presence_penalty,
        )
        for chunk in raw_response:
            if chunk:
                data = chunk.choices[0].delta.content
                if data != None:
                    clean_response += data
                    async_to_sync(channel_layer.group_send)(
                        room_group_name,
                        {
                            "type": "chat_message",
                            "role": model,
                            "message": data,
                            "credit": credit,
                            "unique": unique,
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


def send_agent_request_openai(
    stream: bool,
    session_history: list,
    choosen_model: str,
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
) -> str:
    clean_response = ""
    channel_layer = get_channel_layer()
    try:
        raw_response = client.chat.completions.create(
            model=choosen_model,
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
                if data != None:
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
            for act in action_list:
                action = json.loads(act)["Action"]
                if "STOP" == action:
                    async_to_sync(channel_layer.group_send)(
                        room_group_name,
                        {"type": "chat_message", "agent_action": action},
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
