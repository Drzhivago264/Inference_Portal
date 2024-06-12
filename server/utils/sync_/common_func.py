from django.core.cache import cache
from django.utils import timezone
import requests
from server.models import (InferenceServer,
                           LLM,
                           PromptResponse,
                           APIKEY,
                           MemoryTree
                           )
from .. import constant
from decouple import config
from transformers import AutoTokenizer
import boto3
import json
import tiktoken
import regex as re
from django.core.exceptions import ObjectDoesNotExist
from django.db.models.query import QuerySet
from celery.utils.log import get_task_logger
import openai
from channels.layers import get_channel_layer
from vectordb import vectordb
from asgiref.sync import async_to_sync
logger = get_task_logger(__name__)
aws = config("aws_access_key_id")
aws_secret = config("aws_secret_access_key")
region = constant.REGION


def get_EC2_status(instance_id: str, region: str) -> str:
    """_summary_

    Args:
        instance_id (_type_): _description_
        region (_type_): _description_

    Returns:
        _type_: _description_
    """
    ec2_resource = boto3.resource(
        'ec2', region_name=region, aws_access_key_id=aws, aws_secret_access_key=aws_secret)
    try:
        instance = ec2_resource.Instance(instance_id)
        return instance.state['Name']
    except Exception as e:
        return e


def inference_mode(model: str, key_object: object,  mode: str, prompt: str, include_memory: bool, agent_availability: bool) -> str | list:

    if mode == "chat":
        if not agent_availability:
            tokeniser = AutoTokenizer.from_pretrained(constant.TOKENIZER_TABLE[model])
            inputs = tokeniser(prompt)
            current_history_length = len(inputs['input_ids'])
            if include_memory:
                chat = [{"role": "system", "content": f"{constant.SYSTEM_INSTRUCT_TABLE[model]}"}]
                prompt_ =  {"role": "user", "content": f"{prompt}"}
                chat_history = get_chat_context(model=model,
                                                key_object=key_object,
                                                raw_prompt=prompt,
                                                agent_availability=agent_availability,
                                                current_history_length=current_history_length,
                                                tokeniser=tokeniser)
                
                chat += chat_history
                chat.append(prompt_)
                prompt_ = tokeniser.apply_chat_template(chat, tokenize=False)
                return prompt_
            else:
                chat = [
                    {"role": "system", "content": f"{constant.SYSTEM_INSTRUCT_TABLE[model]}"},
                    {"role": "user", "content": f"{prompt}"},
                ]
                prompt_ = tokeniser.apply_chat_template(chat, tokenize=False)
                return prompt_
        else:
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



def log_prompt_response(is_session_start_node: bool | None, key_object: object, llm: object, prompt: str, response: str, type_: str) -> None:
    """This function store log into a db then build a memory tree of chat history
    Args:
        is_session_start_node (bool | None): _description_
        key_object (object): _description_
        model (str): _description_
        prompt (str): _description_
        response (str): _description_
        type_ (str): _description_
    """
    if not llm.is_self_host:
        try:
            tokeniser = tiktoken.encoding_for_model(llm.name)
        except KeyError:
            tokeniser = tiktoken.encoding_for_model("gpt-4")
        number_input_token = len(tokeniser.encode(prompt))
        number_output_token = len(tokeniser.encode(response))
        input_cost = number_input_token*llm.input_price
        output_cost = number_output_token*llm.output_price
    else:
        tokeniser = constant.TOKENIZER_TABLE[llm.name]
        number_input_token = len(AutoTokenizer.from_pretrained(
            tokeniser)(prompt)['input_ids'])
        number_output_token = len(AutoTokenizer.from_pretrained(
            tokeniser)(response)['input_ids'])
        input_cost = number_input_token*llm.input_price
        output_cost = number_output_token*llm.output_price

    pair_save = PromptResponse(
        prompt=prompt,
        response=response,
        key=key_object,
        model=llm,
        p_type=type_,
        number_input_tokens=number_input_token,
        number_output_tokens=number_output_token,
        input_cost=input_cost,
        output_cost=output_cost
    )
    pair_save.save()
    if is_session_start_node is not None:
        memory_tree_node_number = MemoryTree.objects.filter(
            key=key_object).count()
        if memory_tree_node_number == 0:
            MemoryTree.objects.create(name=key_object.hashed_key, key=key_object, prompt=prompt,
                                      response=response, model=llm, p_type=type_, is_session_start_node=True)

        elif memory_tree_node_number > 0 and is_session_start_node:
            most_similar_vector = vectordb.filter(
                metadata__key=key_object.hashed_key).search(prompt+response, k=2)
            most_similar_prompt = most_similar_vector[1].content_object.prompt
            most_similar_response = most_similar_vector[1].content_object.response
            most_similar_node = MemoryTree.objects.filter(
                key=key_object, prompt=most_similar_prompt, response=most_similar_response).order_by("-created_at")[0]
            MemoryTree.objects.create(name=f"{prompt} -- session_start_at {timezone.now()}", parent=most_similar_node,
                                      key=key_object, prompt=prompt, response=response, model=llm, p_type=type_, is_session_start_node=True)

        elif memory_tree_node_number > 0 and not is_session_start_node:
            parent_node = MemoryTree.objects.filter(
                key=key_object, is_session_start_node=True).latest('created_at')
            MemoryTree.objects.create(name=f"{prompt} -- child_node_added_at {timezone.now()}", parent=parent_node,
                                      key=key_object, prompt=prompt, response=response, model=llm, p_type=type_, is_session_start_node=False)


def get_model_url(model: object) -> list | bool:
    """Get a list of EC2 instance enpoints that serve a given model

    Args:
        model (string): the name of the model.

    Returns:
        list: the list of available enpoints
    """
    try:
        model_list = cache.get(f"{model}_link_list")
        if model_list == None:
            model_list = list(InferenceServer.objects.filter(
                hosted_model=model, availability="Available"))
            cache.set(f"{model}_link_list", model_list,
                      constant.CACHE_SERVER_LINK_RETRIVAL)
        return model_list
    except:
        return False


def update_server_status_in_db(instance_id: str, update_type: str) -> None:
    """_summary_

    Args:
        instance_id (str): the string of instance id
        update_type (str): the type of status change
    """
    ser_obj = InferenceServer.objects.get(name=instance_id)
    if update_type == "status":
        ser_obj.status = "pending"
        ser_obj.save()
    elif update_type == "time":
        ser_obj.last_message_time = timezone.now()
        ser_obj.save()
    return


def send_request(stream: bool, url: str, instance_id: str, context) -> str:
    """_summary_

    Args:
        stream (bool): _description_
        url (string): _description_
        instance_id (string): _description_
        context (json): _description_

    Returns:
        _type_: _description_
    """
    try:
        if not stream:
            response = requests.post(
                url,  json=context,  stream=stream, timeout=constant.TIMEOUT)
            response = response.json()['text'][0]
        elif stream:
            response = requests.post(
                url,  json=context,  stream=stream, timeout=constant.TIMEOUT)
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
    """_summary_

    Args:
        context (str): _description_

    Returns:
        list | bool: _description_
    """
    pattern = re.compile(r"\{(?:[^{}]|(?R))*\}")
    action_match = pattern.findall(context)
    if not action_match:
        return False
    else:
        return action_match


def send_chat_request_openai(stream: bool,
                             session_history: list,
                             model_type: str,
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
        raw_response = client.chat.completions.create(model=model_type,
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
                              model_type: str,
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
    """_summary_

    Args:
        stream (bool): _description_
        session_history (list): _description_
        model_type (str): _description_
        current_turn_inner (int): _description_
        model (str): _description_
        unique (str): _description_
        credit (float): _description_
        room_group_name (str): _description_
        client (object): _description_
        clean_response (str): _description_
        max_tokens (int): _description_
        frequency_penalty (float): _description_
        temperature (float): _description_
        top_p (float): _description_
        presence_penalty (float): _description_

    Returns:
        str: _description_
    """
    channel_layer = get_channel_layer()
    try:
        raw_response = client.chat.completions.create(model=model_type,
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


def get_key(name: str, key: str) -> object | QuerySet[APIKEY]:
    """Get API key from name and key

    Args:
        name (string): key name
        key (string): key

    Returns:
        key object: key object
    """
    try:
        key_ = APIKEY.objects.get_from_key(key)
        return key_
    except APIKEY.DoesNotExist:
        return False


def get_model(model: str) -> QuerySet[LLM] | bool:
    """get LLM by name

    Args:
        model (string): the name of the llm model

    Returns:
        llm object: the Object of LLM
    """
    try:
        return LLM.objects.get(name=model)
    except LLM.DoesNotExist:
        return False


def get_chat_context(model: str, key_object: object, raw_prompt: str, agent_availability: bool, current_history_length: int, tokeniser: object) -> str | list:


    hashed_key = key_object.hashed_key
    message_list_vector = vectordb.filter(metadata__key=hashed_key, metadata__model=model).search(
        raw_prompt, k=constant.DEFAULT_CHAT_HISTORY_VECTOR_OBJECT)
    if not agent_availability:
        max_history_length = constant.MAX_HISTORY_LENGTH[model]
    else:
        max_history_length = constant.MAX_HISTORY_LENGTH["openai"]
    full_instruct_list = []
    for mess in message_list_vector:
        full_instruct_list += [
            {'role': 'user', 'content': f'{mess.content_object.prompt}'},
            {'role': 'assistant', 'content': f'{mess.content_object.response}'}
        ]
        current_history_length += len(tokeniser.encode(
            mess.content_object.prompt + " " + mess.content_object.response))
        if current_history_length > int(max_history_length):
            full_instruct_list = full_instruct_list[:-2 or None]
    return full_instruct_list


def manage_monero(command, params=None):
    rpc_input = {
        "method": command
    }
    if params is not None:
        rpc_input.update({'params': params})
    rpc_input.update({"jsonrpc": "2.0", "id": "0"})
    response = requests.post("http://127.0.0.1:18082/json_rpc",
                             json=rpc_input, headers={"content-type": "application/json"})
    return response
