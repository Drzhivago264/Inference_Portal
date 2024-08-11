import httpx
from asgiref.sync import sync_to_async
from django.http import StreamingHttpResponse
from ninja import Router
from ninja.errors import HttpError
from transformers import AutoTokenizer

from api.api_schema import ChatResponse, ChatSchema, Error
from api.utils import check_permission, send_request_async, send_stream_request_async
from server import constant
from server.models.log import PromptResponse
from server.queue.ec2_manage import command_EC2
from server.queue.log_prompt_response import celery_log_prompt_response
from server.rate_limit import RateLimitError, rate_limit_initializer
from server.utils.async_.async_manage_ec2 import update_server_status_in_db_async
from server.utils.async_.async_query_database import QueryDBMixin
from server.utils.sync_.inference import correct_beam_best_of
from server.utils.sync_.query_database import get_chat_context

router = Router()


@router.post(
    "/chat",
    tags=["Inference"],
    summary="Infer Chatbots",
    response={200: ChatResponse, 401: Error, 442: Error, 404: Error, 429: Error},
)
async def chatcompletion(request, data: ChatSchema):
    """
    To chat please choose the following model:
     - **"Llama 3 Instruct AWQ"**
    """
    key_object, user_object, slave_key_object = request.auth
    rate_limiter = await rate_limit_initializer(
        key_object=key_object,
        strategy="moving_windown",
        slave_key_object=slave_key_object,
        namespace="api",
        timezone="none",
    )
    query_db_mixin = QueryDBMixin()
    await check_permission(
        user_object=user_object, permission="server.allow_chat_api", destination="chat"
    )

    try:
        await rate_limiter.check_rate_limit()
        model = await query_db_mixin.get_model(data.model)
        if not model:
            raise HttpError(404, "Unknown Model Error. Check your model name.")
        else:
            url, instance_id, server_status = await query_db_mixin.get_model_url_async(
                name=data.model
            )
            if not url:
                raise HttpError(442, "Server is currently offline")
            else:
                beam, best_of = correct_beam_best_of(data.beam, data.best_of)
                tokeniser = AutoTokenizer.from_pretrained(model.base)
                inputs = tokeniser(data.prompt)
                current_history_length = len(inputs["input_ids"])
                if data.include_memory:
                    chat_history = await sync_to_async(get_chat_context)(
                        llm=model,
                        key_object=key_object,
                        raw_prompt=data.prompt,
                        current_history_length=current_history_length,
                        tokeniser=tokeniser,
                    )
                    chat = []
                    prompt_ = {"role": "user", "content": f"{data.prompt}"}
                    chat += chat_history
                    chat.append(prompt_)
                    processed_prompt = tokeniser.apply_chat_template(
                        chat, tokenize=False
                    )
                else:
                    if isinstance(data.prompt, str):
                        chat = [
                            {"role": "user", "content": f"{data.prompt}"},
                        ]
                    else:
                        if data.include_current_memory:
                            chat = data.prompt
                        else:
                            chat = [data.prompt[0]]
                    processed_prompt = tokeniser.apply_chat_template(
                        chat, tokenize=False
                    )
                context = {
                    "prompt": processed_prompt,
                    "n": data.n,
                    "best_of": best_of,
                    "presence_penalty": data.presence_penalty,
                    "temperature": data.temperature if not beam else 0,
                    "max_tokens": data.max_tokens,
                    "top_k": int(data.top_k),
                    "top_p": data.top_p if not beam else 1,
                    "length_penalty": data.length_penalty if beam else 1,
                    "frequency_penalty": data.frequency_penalty,
                    "early_stopping": data.early_stopping if beam else False,
                    "stream": data.stream,
                    "use_beam_search": beam,
                }
                await update_server_status_in_db_async(
                    instance_id=instance_id, update_type="time"
                )
                if server_status == "running":
                    if not data.stream:
                        try:
                            response = await send_request_async(url, context)
                            if not response:
                                raise HttpError(404, "Time Out!")
                            else:
                                response = response.replace(processed_prompt, "")
                                celery_log_prompt_response.delay(
                                    is_session_start_node=None,
                                    key_object_hashed_key=key_object.hashed_key,
                                    llm_name=model.name,
                                    prompt=data.prompt,
                                    response=response,
                                    type_=PromptResponse.PromptType.CHATBOT_API,
                                )

                                return 200, {"response": response, "context": context}
                        except httpx.ReadTimeout:
                            raise HttpError(404, "Time Out! Slow down")
                    else:
                        try:
                            res = StreamingHttpResponse(
                                send_stream_request_async(
                                    url=url,
                                    context=context,
                                    processed_prompt=processed_prompt,
                                    key_object=key_object,
                                    model=model,
                                    data=data,
                                ),
                                content_type="text/event-stream",
                            )
                            res["X-Accel-Buffering"] = "no"
                            res["Cache-Control"] = "no-cache"
                            return res
                        except:
                            raise HttpError(404, "Time Out! Slow down")
                elif server_status == "stopped" or "stopping":
                    command_EC2.delay(instance_id, region=constant.REGION, action="on")
                    await update_server_status_in_db_async(
                        instance_id=instance_id, update_type="status"
                    )
                    raise HttpError(
                        442, "Server is starting up, try again in 400 seconds"
                    )
                elif server_status == "pending":
                    raise HttpError(
                        442, "Server is setting up, try again in 300 seconds"
                    )

    except RateLimitError as e:
        raise HttpError(
            429,
            e.message,
        )
