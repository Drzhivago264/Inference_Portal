import httpx
import random
from transformers import AutoTokenizer
from asgiref.sync import sync_to_async

from ninja import Router
from ninja.errors import HttpError

from django.http import StreamingHttpResponse
from django_ratelimit.core import is_ratelimited

from api.api_schema import (
    Error,
    AgentResponse,
    AgentSchema,

)
from api.utils import (
    get_model,
    get_model_url,
    command_EC2,
    update_server_status_in_db,
    log_prompt_response,
    send_request_async,
    send_stream_request_agent_async,
    get_system_template,
    get_user_template
)

from server.models import UserInstructionTree, InstructionTree
from server.utils import constant

router = Router()

@router.post("/agent", tags=["Inference"], summary="Infer Agents", response={200: AgentResponse, 401: Error, 442: Error, 404: Error, 429: Error})
async def agentcompletion(request, data: AgentSchema):
    key_object =  request.auth
    user_object = await sync_to_async(lambda: key_object.user)()
    if is_ratelimited(
        request,
        group="text_completion",
        key="header:X-API-KEY",
        rate="5/s",
        increment=True,
    ):
        raise HttpError(
            429, "You have exceeded your quota of requests in an interval.  Please slow down and try again soon.")
    elif not await sync_to_async(user_object.has_perm)('server.allow_agent_api'):
        raise HttpError(
            401, "Your key is not authorised to use agent api")
    else:
        model = await get_model(data.model)
        if not model:
            raise HttpError(404, "Unknown Model Error. Check your model name.")
        else:
            available_server_list = await get_model_url(data.model)
            if not available_server_list:
                raise HttpError(442, "Server is currently offline")
            else:
                inference_server = random.choice(available_server_list)
                server_status = inference_server.status
                if not data.beam:
                    best_of = 1
                else:
                    best_of = data.best_of
                    if best_of == 1:
                        best_of += 1

                child_template_name = data.child_template_name
                parent_template_name = data.parent_template_name
                use_my_template = data.use_my_template
                if use_my_template:
                    try:
                        parent_template = await get_user_template(name=parent_template_name, user_object=await sync_to_async(lambda: request.auth.user)()) if parent_template_name is not None else ""
                    except UserInstructionTree.DoesNotExist:
                        raise HttpError(
                            404, "parent_template_name is incorrect")
                    try:
                        child_template = await get_user_template(name=child_template_name, user_object=await sync_to_async(lambda: request.auth.user)()) if child_template_name is not None else ""
                    except UserInstructionTree.DoesNotExist:
                        raise HttpError(
                            404, "child_template_name is incorrect")
                else:
                    try:
                        parent_template = await get_system_template(name=parent_template_name) if parent_template_name is not None else ""
                    except InstructionTree.DoesNotExist:
                        raise HttpError(
                            404, "parent_template_name is incorrect")
                    try:
                        child_template = await get_system_template(name=child_template_name) if child_template_name is not None else ""
                    except InstructionTree.DoesNotExist:
                        raise HttpError(
                            404, "child_template_name is incorrect")

                tokeniser = AutoTokenizer.from_pretrained(model.base)
                if not data.working_memory:
                    chat = [
                        {"role": "system",
                            "content": f"{parent_template + child_template}"},
                        {"role": "user", "content": f"{data.prompt}"}
                    ]
                else:
                    chat = data.working_memory + \
                        [{"role": "user", "content": f"{data.prompt}"}]
                processed_prompt = tokeniser.apply_chat_template(
                    chat, tokenize=False)
                context = {
                    "prompt": processed_prompt,
                    "n": data.n,
                    'best_of': best_of,
                    'presence_penalty': data.presence_penalty,
                    "temperature": data.temperature if not data.beam else 0,
                    "max_tokens": data.max_tokens,
                    "top_k": int(data.top_k),
                    "top_p": data.top_p if not data.beam else 1,
                    "length_penalty": data.length_penalty if data.beam else 1,
                    "frequency_penalty": data.frequency_penalty,
                    "early_stopping": data.early_stopping if data.beam else False,
                    "stream": data.stream,
                    "use_beam_search": data.beam,
                }
                await update_server_status_in_db(instance_id=inference_server.name, update_type="time")
                if server_status == "running":
                    if not data.stream:
                        try:
                            response = await send_request_async(inference_server.url, context)
                            if not response:
                                raise HttpError(404, "Time Out! Slow down")
                            else:
                                response = response.replace(
                                    processed_prompt, "")
                                await log_prompt_response(key_object=key_object, model=data.model, prompt=data.prompt, response=response, type_="agent_api")
                                return 200, {
                                    'context': context,
                                    'parent_template_name': parent_template_name,
                                    'child_template_name': child_template_name,
                                    'use_my_template': use_my_template,
                                    'working_memory': chat + [{"role": "assistant", "content": f"{response}"
                                                               }]}
                        except httpx.ReadTimeout:
                            raise HttpError(404, "Time Out!")
                    else:
                        try:
                            res = StreamingHttpResponse(send_stream_request_agent_async(url=inference_server.url,
                                                                                        context=context,
                                                                                        processed_prompt=processed_prompt,
                                                                                        request=request,
                                                                                        working_nemory=chat,
                                                                                        parent_template_name=parent_template_name,
                                                                                        child_template_name=child_template_name,
                                                                                        use_my_template=use_my_template,
                                                                                        data=data
                                                                                        ), content_type="text/event-stream")
                            res['X-Accel-Buffering'] = 'no'
                            res['Cache-Control'] = 'no-cache'
                            return res
                        except:
                            raise HttpError(404, "Time Out! Slow down")
                elif server_status == "stopped" or "stopping":
                    await command_EC2(inference_server.name, region=constant.REGION, action="on")
                    await update_server_status_in_db(
                        instance_id=inference_server.name, update_type="status")
                    raise HttpError(
                        442, "Server is starting up, try again in 400 seconds")
                elif server_status == "pending":
                    raise HttpError(
                        442, "Server is setting up, try again in 300 seconds")
