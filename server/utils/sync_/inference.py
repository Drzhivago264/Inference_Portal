import requests
from decouple import config
import json
import tiktoken
import regex as re
from celery.utils.log import get_task_logger
import openai
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from server.models import InferenceServer
from server.utils import constant
from server.utils.sync_.query_database import get_chat_context
logger = get_task_logger(__name__)
aws = config("aws_access_key_id")
aws_secret = config("aws_secret_access_key")
region = constant.REGION

def inference_mode(model: str, key_object: object,  mode: str, prompt: str, include_memory: bool, agent_availability: bool) -> str | list:
    if mode == "chat":
        prompt_ = {"role": "user", "content": f"{prompt}"}
        if include_memory:
            try:
                tokeniser = tiktoken.encoding_for_model(model)
            except:
                tokeniser = tiktoken.encoding_for_model("gpt-4")
            current_history_length = len(tokeniser.encode(prompt))
            chat_history = get_chat_context(model=model,
                                            key_object=key_object,
                                            raw_prompt=prompt,
                                            agent_availability=agent_availability,
                                            current_history_length=current_history_length,
                                            tokeniser=tokeniser)
            chat_history.append(prompt_)
            return chat_history
        else:
            return [prompt_]
    elif mode == "generate":
        prompt_ = [
            {"role": "system", "content": "Complete the following sentence"},
            {"role": "user", "content": f"{prompt}"},
        ]
        return prompt_


def send_request(stream: bool, url: str, instance_id: str, context: dict) -> str:
    try:
        response = requests.post(
                url,  json=context,  stream=stream, timeout=constant.TIMEOUT)
        if not stream:
            response = response.json()['text'][0]
    except requests.exceptions.Timeout:
        response = "Request Timeout. Cannot connect to the model. If you just booted the GPU server, wait for 400 seconds, and try again"
    except requests.exceptions.InvalidJSONError:
        response = "You messed up the parameters. Return them to the defaults."
    except requests.exceptions.ConnectionError:
        ser_obj = InferenceServer.objects.get(name=instance_id)
        ser_obj.status = "pending"
        ser_obj.save()
        response = "Server is setting up, wait."
    return response


def action_parse_json(context: str) -> list | bool:
    pattern = re.compile(r"\{(?:[^{}]|(?R))*\}")
    action_match = pattern.findall(context)
    if not action_match:
        return False
    else:
        return action_match


def send_chat_request_openai(stream: bool,
                             session_history: list,
                             choosen_model: str,
                             model: str,
                             unique: str,
                             credit: float,
                             room_group_name: str,
                             client: object,
                             clean_response: str,
                             max_tokens: int | None,
                             frequency_penalty: float,
                             temperature: float,
                             top_p: float,
                             presence_penalty: float) -> str:

    try:
        channel_layer = get_channel_layer()
        raw_response = client.chat.completions.create(model=choosen_model,
                                                      messages=session_history,
                                                      stream=stream,
                                                      max_tokens=max_tokens,
                                                      temperature=temperature,
                                                      top_p=top_p,
                                                      frequency_penalty=frequency_penalty,
                                                      presence_penalty=presence_penalty
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
                            'credit': credit,
                            'unique': unique
                        }
                    )
        return clean_response

    except openai.APIConnectionError as e:
        async_to_sync(channel_layer.group_send)(
            room_group_name,
            {
                "type": "chat_message",
                "role": model,
                "message": f"Failed to connect to OpenAI API: {e}",
                'credit': credit,
                'unique': unique,
            }
        )
        return e
    except openai.RateLimitError as e:
        async_to_sync(channel_layer.group_send)(
            room_group_name,
            {
                "type": "chat_message",
                "role": model,
                "message": f"OpenAI API request exceeded rate limit: {e}",
                'credit': credit,
                'unique': unique,
            }
        )
        return e
    except openai.APIError as e:
        async_to_sync(channel_layer.group_send)(
            room_group_name,
            {
                "type": "chat_message",
                "role": model,
                "message": f"OpenAI API returned an API Error: {e}",
                'credit': credit,
                'unique': unique,
            }
        )
        return e


def send_agent_request_openai(stream: bool,
                              session_history: list,
                              choosen_model: str,
                              current_turn_inner: int,
                              model: str,
                              unique: str,
                              credit: float,
                              room_group_name: str,
                              client: object,
                              clean_response: str,
                              max_tokens: int,
                              frequency_penalty: float,
                              temperature: float,
                              top_p: float,
                              presence_penalty: float) -> str:

    channel_layer = get_channel_layer()
    try:
        raw_response = client.chat.completions.create(model=choosen_model,
                                                      messages=session_history,
                                                      stream=stream,
                                                      max_tokens=max_tokens,
                                                      temperature=temperature,
                                                      top_p=top_p,
                                                      frequency_penalty=frequency_penalty,
                                                      presence_penalty=presence_penalty
                                                      )

        current_turn_inner += 1
        for chunk in raw_response:
            if chunk:
                data = chunk.choices[0].delta.content
                if data != None:
                    clean_response += data
                    response_json = [
                        {'role': 'assistant', 'content': f'{clean_response}'}
                    ]
                    session_history.pop()
                    session_history.extend(response_json)
                    async_to_sync(channel_layer.group_send)(
                        room_group_name,
                        {
                            "type": "chat_message",
                            "role": model,
                            "message": data,
                            'credit': credit,
                            'unique': unique,
                            "session_history": session_history,
                            "current_turn": current_turn_inner
                        }
                    )

        action_list = action_parse_json(session_history[-1]['content'])
        if action_list:
            for act in action_list:
                action = json.loads(act)['Action']
                if "STOP" == action:
                    async_to_sync(channel_layer.group_send)(
                        room_group_name,
                        {
                            "type": "chat_message",
                            "agent_action": action
                        }
                    )
        return clean_response
    except openai.APIConnectionError as e:
        async_to_sync(channel_layer.group_send)(
            room_group_name,
            {
                "type": "chat_message",
                "role": model,
                "message": f"Failed to connect to OpenAI API: {e}",
                'credit': credit,
                'unique': unique,
                "session_history": session_history,
                "current_turn": current_turn_inner
            }
        )
        return e
    except openai.RateLimitError as e:
        async_to_sync(channel_layer.group_send)(
            room_group_name,
            {
                "type": "chat_message",
                "role": model,
                "message": f"OpenAI API request exceeded rate limit: {e}",
                'credit': credit,
                'unique': unique,
                "session_history": session_history,
                "current_turn": current_turn_inner
            }
        )
        return e
    except openai.APIError as e:
        async_to_sync(channel_layer.group_send)(
            room_group_name,
            {
                "type": "chat_message",
                "role": model,
                "message": f"OpenAI API returned an API Error: {e}",
                'credit': credit,
                'unique': unique,
                "session_history": session_history,
                "current_turn": current_turn_inner
            }
        )
        return e








