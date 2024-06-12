from ninja import Router

from server.utils import constant

from asgiref.sync import sync_to_async
from django.http import StreamingHttpResponse
from ninja.errors import HttpError
import httpx
import random
from .api_schema import (
    Error,
    ChatResponse,
    ChatSchema,
)
from .utils import (
                    get_model,
                    get_model_url,
                    command_EC2,
                    update_server_status_in_db,
                    log_prompt_response,
                    send_request_async,
                    get_chat_context,
                    send_stream_request_async
                    )

from django_ratelimit.core import is_ratelimited
from django_ratelimit.exceptions import Ratelimited as RateLimitedError
from transformers import AutoTokenizer

router = Router()

@router.post("/chat", tags=["Inference"], summary="Infer Chatbots", response={200: ChatResponse, 401: Error, 442: Error, 404: Error, 429: Error})
async def chatcompletion(request, data: ChatSchema):
    if is_ratelimited(
        request,
        group="text_completion",
        key="header:X-API-KEY",
        rate="5/s",
        increment=True,
    ):
        raise HttpError(
            429, "You have exceeded your quota of requests in an interval.  Please slow down and try again soon.")
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
                    length_penalty = 1
                    early_stopping = False
                    best_of = 1
                else:
                    best_of = data.best_of
                    length_penalty = data.length_penalty
                    early_stopping = True

                tokeniser = AutoTokenizer.from_pretrained(
                    constant.TOKENIZER_TABLE[data.model])
                inputs = tokeniser(data.prompt)
                current_history_length = len(inputs['input_ids'])
                if data.include_memory:
                    chat_history = await get_chat_context(model=data.model, key_object=request.auth, raw_prompt=data.prompt, agent_availability=False, current_history_length=current_history_length, tokeniser=tokeniser)
                    chat = [
                        {"role": "system", "content": f"{constant.SYSTEM_INSTRUCT_TABLE[data.model]}"}]
                    prompt_ = {"role": "user", "content": f"{data.prompt}"}
                    chat += chat_history
                    chat.append(prompt_)
                    processed_prompt = tokeniser.apply_chat_template(
                        chat, tokenize=False)
                else:
                    chat = [
                        {"role": "system",
                            "content": f"{constant.SYSTEM_INSTRUCT_TABLE[data.model]}"},
                        {"role": "user", "content": f"{data.prompt}"},
                    ]
                    processed_prompt = tokeniser.apply_chat_template(
                        chat, tokenize=False)
                context = {
                    "prompt": processed_prompt,
                    "n": data.n,
                    'best_of': best_of,
                    'presence_penalty': data.presence_penalty,
                    "temperature": data.temperature,
                    "max_tokens": data.max_tokens,
                    "top_k": int(data.top_k),
                    "top_p": data.top_p,
                    "length_penalty": length_penalty,
                    "frequency_penalty": data.frequency_penalty,
                    "early_stopping": early_stopping,
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
                                await log_prompt_response(key_object=request.auth, model=data.model, prompt=data.prompt, response=response, type_="chat_api")
                                return 200, {'response': response,
                                             'context': context}
                        except httpx.ReadTimeout:
                            raise HttpError(404, "Time Out! Slow down")
                    else:
                        try:
                            res = StreamingHttpResponse(send_stream_request_async(url=inference_server.url, context=context,
                                                        processed_prompt=processed_prompt, request=request, data=data), content_type="text/event-stream")
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