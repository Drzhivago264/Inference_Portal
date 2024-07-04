from server.models import (
    InferenceServer, 
    LLM, 
    PromptResponse
)
from django.db.models.query import QuerySet
from asgiref.sync import sync_to_async

async def get_model(model: str) -> QuerySet[LLM] | bool:
    try:
        return await LLM.objects.aget(name=model)
    except LLM.DoesNotExist:
        return False

async def get_model_url_async(model: str) -> list | bool:
    model_list = []
    try:
        async for m in InferenceServer.objects.filter(
                hosted_model__name=model, availability="Available"):
            model_list.append(m)
        return model_list
    except:
        return False

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

async def get_model(model: str) -> QuerySet[LLM] | bool:
    try:
        return await LLM.objects.aget(name=model)
    except LLM.DoesNotExist:
        return False


