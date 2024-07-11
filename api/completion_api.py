from ninja import Router
from server.utils import constant
from ninja.errors import HttpError
import httpx
import random
from api.api_schema import (
    Error,
    PromptResponse,
    PromptSchema,
)
from api.utils import (
                    get_model,
                    get_model_url,
                    command_EC2,
                    update_server_status_in_db,
                    log_prompt_response,
                    send_request_async
                    )

from django_ratelimit.core import is_ratelimited
from transformers import AutoTokenizer

router = Router()

@router.post("/completion", tags=["Inference"], summary="Text completion", response={200: PromptResponse, 401: Error, 442: Error, 404: Error, 429: Error})
async def textcompletion(request, data: PromptSchema):
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
                    best_of = 1
                else:
                    best_of = data.best_of
                    if best_of == 1:
                        best_of += 1

                tokeniser = AutoTokenizer.from_pretrained(
                    constant.TOKENIZER_TABLE[data.model])
                chat = [
                    {"role": "system", "content": "Complete the following sentence."},
                    {"role": "user", "content": f"{data.prompt}"},
                ]
                processed_prompt = tokeniser.apply_chat_template(
                    chat, tokenize=False)
                context = {
                    "prompt": processed_prompt,
                    "n": data.n,
                    'best_of': best_of,
                    "use_beam_search": data.beam,
                    "stream": False,
                    'presence_penalty': data.presence_penalty,
                    "temperature": data.temperature if not data.beam else 0,
                    "max_tokens": data.max_tokens,
                    "top_k": int(data.top_k),
                    "top_p": data.top_p if not data.beam else 1,
                    "length_penalty": data.length_penalty if data.beam else 1,
                    "frequency_penalty": data.frequency_penalty,
                    "early_stopping": data.early_stopping if data.beam else False,

                }
                await update_server_status_in_db(instance_id=inference_server.name, update_type="time")
                if server_status == "running":
                    try:
                        response = await send_request_async(inference_server.url, context)
                        if not response:
                            raise HttpError(404, "Time Out!")
                        else:
                            response = response.replace(
                                processed_prompt, "")
                            await log_prompt_response(key_object=request.auth, model=data.model, prompt=data.prompt, response=response, type_="chatbot_api")
                            return 200, {'response': response,
                                         'context': context}
                    except httpx.ReadTimeout:
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