import json

from asgiref.sync import async_to_sync
from celery import shared_task
from celery.utils.log import get_task_logger
from channels.layers import get_channel_layer
from decouple import config
from openai import OpenAI

from server.models.api_key import APIKEY
from server.models.llm_server import LLM
from server.queue.ec2_manage import command_EC2
from server.utils import constant
from server.utils.sync_.inference import (
    inference_mode,
    send_agent_request_openai,
    send_chat_request_openai,
    send_request,
)
from server.utils.sync_.log_database import log_prompt_response
from server.utils.sync_.manage_ec2 import update_server_status_in_db
from server.utils.sync_.query_database import get_model, get_model_url

region = constant.REGION
logger = get_task_logger(__name__)


@shared_task()
def inference(
    unique: str,
    is_session_start_node: bool | None,
    mode: str,
    type_: int,
    key: str,
    credit: float,
    room_group_name: str,
    model: str,
    context: dict,
    prompt: str,
    include_memory: bool,
) -> None:
    """
    Perform inference using a specified model and generate a response based on the given prompt and context.
    Args:
        unique (str): Unique identifier for the inference request.
        is_session_start_node (bool | None): Indicates if the current prompt is the start of a new session.
        mode (str): Mode of operation for the inference process.
        type_ (int): Type of the inference request.
        key (str): Hashed key for authentication.
        credit (float): Credit available for the inference request.
        room_group_name (str): Name of the group where the chat messages are sent.
        model (str): Name of the model used for inference.
        context (dict): Parameters context of the prompt.
        prompt (str): Input prompt for the inference.
        include_memory (bool): Flag indicating if memory should be included in the inference process.
    Returns:
        None
    """
    channel_layer = get_channel_layer()
    key_object = APIKEY.objects.get(hashed_key=key)
    if not context["beam"]:
        context["best_of"] = 1
    elif not context["beam"] and context["best_of"] <= 1:
        context["best_of"] = 2

    llm = get_model(model=model)
    if llm:
        url, instance_id, server_status = get_model_url(llm)
        session_list_to_string = inference_mode(
            llm=llm,
            key_object=key_object,
            mode=mode,
            prompt=prompt,
            include_memory=include_memory,
            include_current_memory=False,
            session_history=None,
        )

        if llm.is_self_host:
            extra_context = {
                "prompt": session_list_to_string,
                "n": 1,
            }
            context.update(extra_context)
            """ Query a list of inference servers for a given model, pick a random one """
            if url:
                update_server_status_in_db(instance_id=instance_id, update_type="time")
                if server_status == "running":
                    response = send_request(
                        stream=True, url=url, instance_id=instance_id, context=context
                    )
                    if not isinstance(response, str):
                        previous_output = str()
                        full_response = str()
                        for chunk in response.iter_lines(
                            chunk_size=8192, decode_unicode=False, delimiter=b"\0"
                        ):
                            if chunk:
                                data = json.loads(chunk.decode("utf-8"))
                                output = data["text"][0]
                                output = output.replace(session_list_to_string, "")
                                re = output.replace(previous_output, "")
                                full_response += re
                                previous_output = output
                                async_to_sync(channel_layer.group_send)(
                                    room_group_name,
                                    {
                                        "type": "chat_message",
                                        "role": model,
                                        "message": re,
                                        "credit": credit,
                                        "unique": unique,
                                    },
                                )
                        if full_response and isinstance(full_response, str):
                            log_prompt_response(
                                is_session_start_node=is_session_start_node,
                                key_object=key_object,
                                llm=llm,
                                prompt=prompt,
                                response=full_response,
                                type_=type_,
                            )

                elif server_status == "stopped" or "stopping":
                    command_EC2.delay(instance_id, region=region, action="on")
                    response = "Server is starting up, try again in 400 seconds"
                    update_server_status_in_db(
                        instance_id=instance_id, update_type="status"
                    )
                elif server_status == "pending":
                    response = "Server is setting up, try again in 30 seconds"
                else:
                    response = "Unknown Server state, wait 5 seconds"
            else:
                response = "Model is currently offline"
            if isinstance(response, str):
                async_to_sync(channel_layer.group_send)(
                    room_group_name,
                    {
                        "type": "chat_message",
                        "role": model,
                        "message": response,
                        "credit": credit,
                        "unique": unique,
                    },
                )
        else:
            client = OpenAI(
                api_key=config("GPT_KEY"),
                timeout=constant.TIMEOUT,
                max_retries=constant.RETRY,
            )
            clean_response = send_chat_request_openai(
                client=client,
                session_history=session_list_to_string,
                model=model,
                choosen_model=model,
                credit=credit,
                unique=unique,
                stream=context["stream"],
                room_group_name=room_group_name,
                frequency_penalty=context["frequency_penalty"],
                top_p=context["top_p"],
                max_tokens=context["max_tokens"],
                temperature=context["temperature"],
                presence_penalty=context["presence_penalty"],
            )
            if clean_response and isinstance(clean_response, str):
                log_prompt_response(
                    is_session_start_node=is_session_start_node,
                    key_object=key_object,
                    llm=llm,
                    prompt=prompt,
                    response=clean_response,
                    type_=type_,
                )


@shared_task()
def agent_inference(
    key: str,
    is_session_start_node: bool | None,
    current_turn_inner: int,
    model: str,
    unique: str,
    credit: float,
    room_group_name: int,
    agent_instruction: str,
    message: str,
    session_history: list,
    choosen_model: str,
    max_turns: int,
    context: dict,
    type_: int,
) -> None:
    """
    Interacts with the OpenAI API to generate responses based on the conversation turn and session history.

    Args:
        key (str): API key for authentication.
        is_session_start_node (bool | None): Boolean indicating if it's the start of a session.
        current_turn_inner (int): Current turn in the conversation.
        model (str): Model name.
        unique (str): Unique identifier for the session.
        credit (float): Available credit.
        room_group_name (int): Room group name.
        agent_instruction (str): Instruction for the agent.
        message (str): User's message.
        session_history (list): Previous conversation turns.
        choosen_model (str): Chosen model.
        max_turns (int): Maximum number of turns allowed.
        max_tokens (int): Maximum number of tokens for the response.
        type_ (int): Type of the interaction.
        context (dict): Parameters context of the prompt.
    """
    client = OpenAI(
        api_key=config("GPT_KEY"), timeout=constant.TIMEOUT, max_retries=constant.RETRY
    )
    key_object = APIKEY.objects.get(hashed_key=key)
    llm = get_model(model=model)

    if llm:
        if 0 <= current_turn_inner < max_turns:
            if current_turn_inner == 0:
                prompt = [
                    {"role": "system", "content": f"{agent_instruction}"},
                    {"role": "user", "content": f"{message}"},
                ]
            elif 0 < current_turn_inner < max_turns - 1:
                prompt = [{"role": "user", "content": f"Response: {message}"}]
            else:
                force_stop = (
                    "You should directly give results based on history information."
                )
                prompt = [
                    {"role": "user", "content": f"Response: {message}"},
                    {"role": "system", "content": f"Response: {force_stop}"},
                ]

            session_history.extend(prompt)
            clean_response = send_agent_request_openai(
                client=client,
                session_history=session_history,
                model=model,
                choosen_model=choosen_model,
                credit=credit,
                unique=unique,
                current_turn_inner=current_turn_inner,
                stream=context["stream"],
                room_group_name=room_group_name,
                frequency_penalty=context["frequency_penalty"],
                top_p=context["top_p"],
                max_tokens=context["max_tokens"],
                temperature=context["temperature"],
                presence_penalty=context["presence_penalty"],
            )

            if clean_response and isinstance(clean_response, str):
                log_prompt_response(
                    is_session_start_node=is_session_start_node,
                    key_object=key_object,
                    llm=llm,
                    prompt=message,
                    response=clean_response,
                    type_=type_,
                )
        else:
            channel_layer = get_channel_layer()
            async_to_sync(channel_layer.group_send)(
                room_group_name,
                {
                    "type": "chat_message",
                    "max_turn_reached": True,
                },
            )
