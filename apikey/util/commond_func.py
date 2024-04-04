from django.core.cache import cache
from django.utils import timezone
import requests
from apikey.models import InferenceServer, LLM, PromptResponse, APIKEY
from . import constant
from decouple import config
import boto3
import json
import tiktoken
import regex as re
from django.core.exceptions import ObjectDoesNotExist
from django.db.models.query import QuerySet
from botocore.exceptions import ClientError
from celery.utils.log import get_task_logger
import openai
from channels.layers import get_channel_layer
from vectordb import  vectordb
from asgiref.sync import async_to_sync, sync_to_async
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


def inference_mode(model: str, key_object: object,  mode: str, prompt: str, include_memory: bool, agent_availability: bool) -> str:
    """_summary_

    Args:
        model (_type_): _description_
        key (_type_): _description_
        mode (_type_): _description_
        prompt (_type_): _description_

    Returns:
        _type_: _description_
    """
    if mode == "chat":
        if not agent_availability:
            template = constant.SHORTEN_TEMPLATE_TABLE[model]
            prompt_ = template.format(prompt, "")
            if include_memory:
                chat_history = get_chat_context(model=model, 
                                                key_object=key_object,
                                                raw_prompt=prompt, 
                                                agent_availability=agent_availability)
                prompt_ = chat_history + "\n" + prompt_
                return prompt_
            else:
                return prompt_
        else:
            prompt_ = {"role": "user", "content": f"{prompt}"}
            if include_memory:
                chat_history = get_chat_context(model=model, 
                                                key_object=key_object,
                                                raw_prompt=prompt, 
                                                agent_availability=agent_availability)
                chat_history.append(prompt_)
                return chat_history
            else:
                return prompt_
    elif mode == "generate":
        return prompt


def response_mode(mode: str, response: str, prompt: str) -> str:
    """_summary_

    Args:
        model (_type_): _description_
        mode (_type_): _description_
        response (_type_): _description_
        prompt (_type_): _description_

    Returns:
        _type_: _description_
    """
    if mode == "chat":
        response_ = response.replace(prompt, "")
        return response_
    elif mode == "generate":
        return response


def log_prompt_response(key_object: object, model: str, prompt: str, response: str, type_: str) -> None:
    """_summary_

    Args:
        key (string): _description_
        model (string): the name of the model
        prompt (string): the user's prompt
        response (string): the response from GPU
        type_ (_type_): _description_
    """

    llm = LLM.objects.get(name=model)
    pair_save = PromptResponse(
        prompt=prompt, response=response, key=key_object, model=llm, p_type=type_)
    pair_save.save()

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


def update_server_status_in_db(instance_id: str, update_type:str) -> None:
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
                url,  json=context,  stream=stream, timeout=10)
            response = response.json()['text'][0]
        elif stream:
            response = requests.post(
                url,  json=context,  stream=stream, timeout=10)
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
    
def send_request_openai(stream: bool, 
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
        if current_turn_inner:
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
        else:
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
    except ObjectDoesNotExist:
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
    except ObjectDoesNotExist:
        return False

def get_chat_context(model: str, key_object: object, raw_prompt: str, agent_availability: bool) -> str | list:
    """_summary_

    Args:
        model (str): model name
        key (str): they users' api key

    Returns:
        str: chat history of user including 3 relevant responses
    """

    hashed_key = key_object.hashed_key
    message_list_vector = vectordb.filter(metadata__key=hashed_key, metadata__model=model).search(raw_prompt, k= constant.DEFAULT_CHAT_HISTORY_VECTOR_OBJECT) 
    if not agent_availability:
        shorten_template = constant.SHORTEN_TEMPLATE_TABLE[model]
        full_instruct = ""
        max_history_length = constant.MAX_HISTORY_LENGTH[model]
        tokeniser = constant.TOKENIZER_TABLE[model]
        for mess in message_list_vector:
            template = shorten_template.format(mess.content_object.prompt, mess.content_object.response)
            full_instruct += "\n\n"
            full_instruct += template
            inputs = tokeniser(full_instruct)
            current_history_length = len(inputs['input_ids'])
            if current_history_length > int(max_history_length):
                full_instruct = full_instruct[:-(
                    current_history_length-max_history_length)]
        full_instruct = constant.SHORTEN_INSTRUCT_TABLE[model] + full_instruct
        return full_instruct
    else:
        try:
            tokeniser= tiktoken.encoding_for_model(model)
        except:
            tokeniser = tiktoken.encoding_for_model("gpt-4")
        max_history_length = constant.MAX_HISTORY_LENGTH["openai"]
        current_history_length = 0
        full_instruct_list = []
        for mess in message_list_vector:
            full_instruct_list += [
                {'role': 'user', 'content': f'{mess.content_object.prompt}'},
                {'role': 'assistant', 'content': f'{mess.content_object.response}'}
            ]
            current_history_length += len(tokeniser.encode(mess.content_object.prompt +" "+ mess.content_object.response))
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
    response = requests.post("http://127.0.0.1:18082/json_rpc", json=rpc_input, headers={"content-type": "application/json"}) 
    return response