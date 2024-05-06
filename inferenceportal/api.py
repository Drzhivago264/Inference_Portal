from ninja import NinjaAPI, Schema
from decouple import config
from server.util import constant
from ninja.security import HttpBearer
from server.models import APIKEY
from server.util.llm_toolbox import (Emotion,
                                     TopicClassification,
                                     ParaphaseDocument,
                                     SummarizeDocument,
                                     ChangeWrittingStyle
                                     )
import dspy
from asgiref.sync import sync_to_async
from django.http import StreamingHttpResponse
from ninja.errors import HttpError
import httpx
from typing import List
import random
from .api_schema import (
    Error,
    ChatResponse,
    PromptResponse,
    ChatSchema,
    PromptSchema,
    ResponseLogRequest,
    ResponseLogResponse,
    BaseLLMSchema,
    SummarizeSchema,
    SummarizeResponseSchema,
    RestyleSchema,
    RestyleResponseSchema,
    ClassificationSchema,
    BaseLLMResponseSchema,
    ClassificationResponseSchema
)
from .utils import (get_chat_context,
                    get_model,
                    get_model_url,
                    command_EC2,
                    update_server_status_in_db,
                    log_prompt_response,
                    send_request_async,
                    send_stream_request_async,
                    query_response_log
                    )

from django_ratelimit.core import is_ratelimited
from django_ratelimit.exceptions import Ratelimited as RateLimitedError


class GlobalAuth(HttpBearer):
    @sync_to_async
    def authenticate(self, request, token):
        try:
            key_object = APIKEY.objects.get_from_key(token)
            return key_object
        except APIKEY.DoesNotExist:
            pass


api = NinjaAPI(auth=GlobalAuth(),
               title="Professor Parakeet API")


@api.post("/completion", tags=["Inference"], summary="Text completion", response={200: PromptResponse, 401: Error, 442: Error, 404: Error, 429: Error})
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
            print(available_server_list)
            if not available_server_list:
                raise HttpError(442, "Server is currently offline")
            else:
                inference_server = random.choice(available_server_list)
                server_status = inference_server.status
                if not data.beam:
                    length_penalty = 1
                    early_stopping = False
                    best_of = int(1)
                else:
                    best_of = data.best_of
                    length_penalty = data.length_penalty
                    early_stopping = True
                context = {
                    "prompt": data.prompt,
                    "n": data.n,
                    'best_of': best_of,
                    "use_beam_search": data.beam,
                    "stream": False,
                    "early_stopping": early_stopping,
                    'presence_penalty': data.presence_penalty,
                    "temperature": data.temperature,
                    "max_tokens": data.max_tokens,
                    "top_k": int(data.top_k),
                    "top_p": data.top_p,
                    "length_penalty": length_penalty,
                    "frequency_penalty": data.frequency_penalty
                }
                await update_server_status_in_db(instance_id=inference_server.name, update_type="time")
                if server_status == "running":
                    try:
                        response = await send_request_async(inference_server.url, context)
                        if not response:
                            raise HttpError(404, "Time Out! Slow down")
                        else:
                            await log_prompt_response(key_object=request.auth, model=data.model, prompt=data.prompt, response=response, type_="prompt")
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


@api.post("/chat", tags=["Inference"], summary="Infer Chatbots", response={200: ChatResponse, 401: Error, 442: Error, 404: Error, 429: Error})
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
                    best_of = int(1)
                else:
                    best_of = data.best_of
                    length_penalty = data.length_penalty
                    early_stopping = True
                template = constant.SHORTEN_TEMPLATE_TABLE[data.model]
                chat_prompt = template.format(data.prompt, "")
                if data.include_memory:
                    chat_history = await get_chat_context(model=data.model, key_object=request.auth, raw_prompt=data.prompt)
                    processed_prompt = chat_history + "\n" + chat_prompt
                else:
                    processed_prompt = chat_prompt
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
                                response = response.replace(processed_prompt, "")
                                await log_prompt_response(key_object=request.auth, model=data.model, prompt=data.prompt, response=response, type_="chatroom")
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


@api.post("/responselog", tags=["Log"], summary="Get log", response={200: List[ResponseLogResponse], 401: Error, 429: Error})
async def log(request, data: ResponseLogRequest):
    if is_ratelimited(
        request,
        group="log",
        key="header:X-API-KEY",
        rate="10/m",
        increment=True,
    ):
        raise HttpError(
            429, "You have exceeded your quota of requests in an interval.  Please slow down and try again soon.")
    else:
        quantity = 1 if data.quantity < 10 else data.quantity
        order = "-id" if data.lastest else "id"
        response_log = await query_response_log(key_object=request.auth, order=order, quantity=quantity, type_=data.filter_by)
        return response_log


@api.post("/predict/sentiment", tags=["Inference"], summary="Predict Sentiment", response={200: BaseLLMResponseSchema, 401: Error, 442: Error, 404: Error, 429: Error})
async def predict_sentiment(request, data: BaseLLMSchema):
    """
    To predict sentiment please choose among the following models:
     - **gpt-4**
     - **gpt-3.5-turbo-0125**
     - **gpt-3.5-turbo-instruct**
     - **gpt-4-0125-preview**
    """
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
            prompt = data.prompt
            presence_penalty = data.presence_penalty
            temperature = data.temperature
            max_tokens = data.max_tokens
            top_p = data.top_p
            frequency_penalty = data.frequency_penalty
            client = dspy.OpenAI(model=model.name,
                                max_tokens=max_tokens,
                                top_p=top_p,
                                presence_penalty=presence_penalty,
                                frequency_penalty=frequency_penalty,
                                temperature=temperature,
                                api_key=config("GPT_KEY"))
            dspy.configure(lm=client)
            predict = dspy.Predict('document -> sentiment')
            response = predict(document=prompt)
            return 200, {'response': response.sentiment,
                        'context': data}


@api.post("/predict/emotion", tags=["Inference"], summary="Predict Emotion", response={200: ClassificationResponseSchema, 401: Error, 442: Error, 404: Error, 429: Error})
async def predict_emotion(request, data: ClassificationSchema):
    """
    To predict emotion please choose among the following models:
     - **gpt-4**
     - **gpt-3.5-turbo-0125**
     - **gpt-3.5-turbo-instruct**
     - **gpt-4-0125-preview**
    """
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
            prompt = data.prompt
            presence_penalty = data.presence_penalty
            temperature = data.temperature
            max_tokens = data.max_tokens
            top_p = data.top_p
            frequency_penalty = data.frequency_penalty
            client = dspy.OpenAI(model=model.name,
                                max_tokens=max_tokens,
                                top_p=top_p,
                                presence_penalty=presence_penalty,
                                frequency_penalty=frequency_penalty,
                                temperature=temperature,
                                api_key=config("GPT_KEY"))
            dspy.configure(lm=client)
            emotion_list = data.classification_list
            if emotion_list is not None:
                Emotion_ = Emotion
                Emotion_.__doc__ = f"""Classify emotion among {emotion_list}."""
            else:
                Emotion_ = Emotion
            predict = dspy.Predict(Emotion_)
            response = predict(sentence=prompt)

            return 200, {'response': response.emotion,
                        'context': data}


@api.post("/tasks/paraphase", tags=["Inference"], summary="Paraphase Document", response={200: BaseLLMResponseSchema, 401: Error, 442: Error, 404: Error, 429: Error})
async def paraphase(request, data: BaseLLMSchema):
    """
    To paraphase please choose among the following models:
     - **gpt-4**
     - **gpt-3.5-turbo-0125**
     - **gpt-3.5-turbo-instruct**
     - **gpt-4-0125-preview**
    """
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
            prompt = data.prompt
            presence_penalty = data.presence_penalty
            temperature = data.temperature
            max_tokens = data.max_tokens
            top_p = data.top_p
            frequency_penalty = data.frequency_penalty
            client = dspy.OpenAI(model=model.name,
                                max_tokens=max_tokens,
                                top_p=top_p,
                                presence_penalty=presence_penalty,
                                frequency_penalty=frequency_penalty,
                                temperature=temperature,
                                api_key=config("GPT_KEY"))
            dspy.configure(lm=client)
            paraphaser = dspy.ChainOfThought(ParaphaseDocument)
            response = paraphaser(document=prompt)
            return 200, {'response': response.paraphased,
                        'context': data}


@api.post("/tasks/summarize", tags=["Inference"], summary="Summarize Document", response={200: SummarizeResponseSchema, 401: Error, 442: Error, 404: Error, 429: Error})
async def summarize_document(request, data: SummarizeSchema):
    """
    To summarize document please choose among the following models:
     - **gpt-4**
     - **gpt-3.5-turbo-0125**
     - **gpt-3.5-turbo-instruct**
     - **gpt-4-0125-preview**

    You can choose to classify the document in a specific number of words with **number_of_word** parameter. 
    This number of words is only respected if it is smaller than the number of words decided by the model and presented in your document.
    """
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
            prompt = data.prompt
            number_of_word = data.number_of_word
            presence_penalty = data.presence_penalty
            temperature = data.temperature
            max_tokens = data.max_tokens
            top_p = data.top_p
            frequency_penalty = data.frequency_penalty
            client = dspy.OpenAI(model=model.name,
                                max_tokens=max_tokens,
                                top_p=top_p,
                                presence_penalty=presence_penalty,
                                frequency_penalty=frequency_penalty,
                                temperature=temperature,
                                api_key=config("GPT_KEY"))
            dspy.configure(lm=client)
            if number_of_word is not None:
                Summarizer_ = SummarizeDocument
                Summarizer_.__doc__ = f"Compress document in {number_of_word} words."
            else:
                Summarizer_ = SummarizeDocument
            summarize = dspy.ChainOfThought(Summarizer_)
            response = summarize(document=prompt)
            return 200, {'response': response.summary,
                        'context': data}


@api.post("/tasks/classify", tags=["Inference"], summary="Classify Document", response={200: ClassificationResponseSchema, 401: Error, 442: Error, 404: Error, 429: Error})
async def classify_document(request, data: ClassificationSchema):
    """
    To classify document please choose among the following models:
     - **gpt-4**
     - **gpt-3.5-turbo-0125**
     - **gpt-3.5-turbo-instruct**
     - **gpt-4-0125-preview**
    """
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
            prompt = data.prompt
            presence_penalty = data.presence_penalty
            temperature = data.temperature
            max_tokens = data.max_tokens
            top_p = data.top_p
            frequency_penalty = data.frequency_penalty
            client = dspy.OpenAI(model=model.name,
                                max_tokens=max_tokens,
                                top_p=top_p,
                                presence_penalty=presence_penalty,
                                frequency_penalty=frequency_penalty,
                                temperature=temperature,
                                api_key=config("GPT_KEY"))
            dspy.configure(lm=client)
            topic_list = data.classification_list
            if topic_list is not None:
                Topic_ = TopicClassification
                Topic_.__doc__ = f"""Classify topic among {topic_list}."""
            else:
                Topic_ = TopicClassification
            predict = dspy.Predict(Topic_)
            response = predict(document=prompt)
            return 200, {'response': response.topic,
                        'context': data}


@api.post("/tasks/restyle", tags=["Inference"], summary="Restyle Document", response={200: RestyleResponseSchema, 401: Error, 442: Error, 404: Error, 429: Error})
async def restyle_document(request, data: RestyleSchema):
    """
    To writting document in a new style please choose among the following models:
     - **gpt-4**
     - **gpt-3.5-turbo-0125**
     - **gpt-3.5-turbo-instruct**
     - **gpt-4-0125-preview**

     The new style can be an adjective (e.g., **sad**) or multiple strings of adjectives (e.g., **professional**, **serious**)
    """
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
            prompt = data.prompt
            new_style = data.style_list
            presence_penalty = data.presence_penalty
            temperature = data.temperature
            max_tokens = data.max_tokens
            top_p = data.top_p
            frequency_penalty = data.frequency_penalty
            client = dspy.OpenAI(model=model.name,
                                max_tokens=max_tokens,
                                top_p=top_p,
                                presence_penalty=presence_penalty,
                                frequency_penalty=frequency_penalty,
                                temperature=temperature,
                                api_key=config("GPT_KEY"))
            dspy.configure(lm=client)
            if new_style is not None:
                Restyler_ = ChangeWrittingStyle
                Restyler_.__doc__ = f"""Writing document in {new_style} style."""
            else:
                Restyler_ = ChangeWrittingStyle
            restyler = dspy.ChainOfThought(Restyler_)
            response = restyler(document=prompt)
            return 200, {'response': response.styled,
                        'context': data}
