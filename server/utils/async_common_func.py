from server.utils import constant
from server.models import InferenceServer, LLM, PromptResponse, APIKEY
from django.db.models.query import QuerySet
from asgiref.sync import sync_to_async
from django.core.cache import cache
from decouple import config
import json
import boto3
import httpx
from botocore.exceptions import ClientError
from vectordb import vectordb
from django.utils import timezone


async def get_model(model: str) -> QuerySet[LLM] | bool:
    try:
        return await LLM.objects.aget(name=model)
    except LLM.DoesNotExist:
        return False


async def get_model_url(model: str) -> list | bool:
    model_list = []
    try:
        async for m in InferenceServer.objects.filter(
                hosted_model__name=model, availability="Available"):
            model_list.append(m)
        return model_list
    except:
        return False


async def update_server_status_in_db(instance_id: str, update_type: str) -> None:
    ser_obj = await InferenceServer.objects.aget(name=instance_id)
    if update_type == "status":
        ser_obj.status = "pending"
        await ser_obj.asave()
    elif update_type == "time":
        ser_obj.last_message_time = timezone.now()
        await ser_obj.asave()
    return


@sync_to_async
def command_EC2(instance_id: str, region: str, action: str) -> None | str:
    """This func is used to turn on, off, or reboot ec2 instances

    Args:
        instance_id (string): the id of EC2 instance
        region (string): the region of EC2 instances
        action (string): either turn on, off or reboot instance

    Returns:
        string or None: either return error or nothing
    """
    aws = config("aws_access_key_id")
    aws_secret = config("aws_secret_access_key")
    ec2 = boto3.client('ec2', region_name=region,
                       aws_access_key_id=aws, aws_secret_access_key=aws_secret)
    if action == "on":
        try:
            ec2.start_instances(InstanceIds=[instance_id], DryRun=True)
        except ClientError as e:
            if 'DryRunOperation' not in str(e):
                raise
        try:
            ec2.start_instances(InstanceIds=[instance_id], DryRun=False)
        except ClientError as e:
            return e
    elif action == "off":
        try:
            ec2.stop_instances(InstanceIds=[instance_id], DryRun=True)
        except ClientError as e:
            if 'DryRunOperation' not in str(e):
                raise
        try:
            ec2.stop_instances(InstanceIds=[instance_id], DryRun=False)
        except ClientError as e:
            return e
    elif action == "reboot":
        try:
            ec2.reboot_instances(InstanceIds=[instance_id], DryRun=True)
        except ClientError as e:
            if 'DryRunOperation' not in str(e):
                raise
        try:
            ec2.reboot_instances(InstanceIds=[instance_id], DryRun=False)
        except ClientError as e:
            return e
        return


@sync_to_async
def get_chat_context(model: str, key_object: object, raw_prompt: str) -> str:

    hashed_key = key_object.hashed_key
    message_list_vector = vectordb.filter(metadata__key=hashed_key, metadata__model=model).search(
        raw_prompt, k=constant.DEFAULT_CHAT_HISTORY_VECTOR_OBJECT)
    shorten_template = constant.SHORTEN_TEMPLATE_TABLE[model]
    full_instruct = ""
    max_history_length = constant.MAX_HISTORY_LENGTH[model]
    tokeniser = constant.TOKENIZER_TABLE[model]
    for mess in message_list_vector:
        template = shorten_template.format(
            mess.content_object.prompt, mess.content_object.response)
        full_instruct += "\n\n"
        full_instruct += template
        inputs = tokeniser(full_instruct)
        current_history_length = len(inputs['input_ids'])

        if current_history_length > int(max_history_length):
            full_instruct = full_instruct[:-(
                current_history_length-max_history_length)]
    full_instruct = constant.SHORTEN_INSTRUCT_TABLE[model] + full_instruct

    return full_instruct


async def log_prompt_response(key_object: object, model: str, prompt: str, response: str, type_: str) -> None:
    """_summary_

    Args:
        key (string): _description_
        model (string): the name of the model
        prompt (string): the user's prompt
        response (string): the response from GPU
        type_ (_type_): _description_
    """
    llm = await LLM.objects.aget(name=model)
    pair_save = PromptResponse(
        prompt=prompt, response=response, key=key_object, model=llm, p_type=type_)
    await pair_save.asave()


async def send_request_async(url, context):
    async with httpx.AsyncClient(transport=httpx.AsyncHTTPTransport(retries=2)) as client:
        response = await client.post(url, json=context,  timeout=60)
        response = response.json(
        )['text'][0] if response.status_code == 200 else None
        return response


async def send_stream_request_async(url: str, context: object, processed_prompt: str, request: object, data: object):
    client = httpx.AsyncClient()
    full_response = ""
    try:
        async with client.stream('POST', url, json=context) as response:
            async for chunk in response.aiter_text():
                try:
                    chunk = chunk[:-1]
                    c = json.loads(chunk)
                    output = c['text'][0].replace(processed_prompt, "")
                    yield str({"response": c, "delta": output.replace(full_response, "")}) + "\n"
                    full_response = output
                except:
                    pass
        await log_prompt_response(key_object=request.auth, model=data.model, prompt=data.prompt, response=full_response, type_="chatroom")
    except httpx.ReadTimeout:
        raise httpx.ReadTimeout


async def query_response_log(key_object: str,  order: str, quantity: int, type_: list) -> object:
    response = list()
    log = PromptResponse.objects.filter(
        key=key_object, p_type__in=type_).order_by(order)[:quantity]
    async for l in log:
        response.append({
            "prompt": l.prompt,
            "response": l.response,
            "created_at": l.created_at,
            "type": l.p_type,
            "model": await sync_to_async(lambda: l.model.name)()
        })
    return response
