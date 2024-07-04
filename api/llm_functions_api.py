from ninja import Router
from ninja.errors import HttpError
from decouple import config
import dspy

from server.utils.llm_toolbox import (
    Emotion,
    TopicClassification,
    ParaphaseDocument,
    SummarizeDocument,
    ChangeWrittingStyle
)

from django_ratelimit.core import is_ratelimited

from api.api_schema import (
    Error,
    BaseLLMSchema,
    SummarizeSchema,
    SummarizeResponseSchema,
    RestyleSchema,
    RestyleResponseSchema,
    ClassificationSchema,
    BaseLLMResponseSchema,
    ClassificationResponseSchema
)
from api.utils import get_model



router = Router()


@router.post("/predict/sentiment", tags=["LLM Functions"], summary="Predict Sentiment", response={200: BaseLLMResponseSchema, 401: Error, 442: Error, 404: Error, 429: Error})
async def predict_sentiment(request, data: BaseLLMSchema):
    """
    To predict sentiment please choose among the following models:
     - **gpt-4**
     - **gpt-3.5-turbo-0125**
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


@router.post("/predict/emotion", tags=["LLM Functions"], summary="Predict Emotion", response={200: ClassificationResponseSchema, 401: Error, 442: Error, 404: Error, 429: Error})
async def predict_emotion(request, data: ClassificationSchema):
    """
    To predict emotion please choose among the following models:
     - **gpt-4**
     - **gpt-3.5-turbo-0125**
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


@router.post("/tasks/paraphase", tags=["LLM Functions"], summary="Paraphase Document", response={200: BaseLLMResponseSchema, 401: Error, 442: Error, 404: Error, 429: Error})
async def paraphase(request, data: BaseLLMSchema):
    """
    To paraphase please choose among the following models:
     - **gpt-4**
     - **gpt-3.5-turbo-0125**
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


@router.post("/tasks/summarize", tags=["LLM Functions"], summary="Summarize Document", response={200: SummarizeResponseSchema, 401: Error, 442: Error, 404: Error, 429: Error})
async def summarize_document(request, data: SummarizeSchema):
    """
    To summarize document please choose among the following models:
     - **gpt-4**
     - **gpt-3.5-turbo-0125**
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


@router.post("/tasks/classify", tags=["LLM Functions"], summary="Classify Document", response={200: ClassificationResponseSchema, 401: Error, 442: Error, 404: Error, 429: Error})
async def classify_document(request, data: ClassificationSchema):
    """
    To classify document please choose among the following models:
     - **gpt-4**
     - **gpt-3.5-turbo-0125**
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


@router.post("/tasks/restyle", tags=["LLM Functions"], summary="Restyle Document", response={200: RestyleResponseSchema, 401: Error, 442: Error, 404: Error, 429: Error})
async def restyle_document(request, data: RestyleSchema):
    """
    To writting document in a new style please choose among the following models:
     - **gpt-4**
     - **gpt-3.5-turbo-0125**
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
