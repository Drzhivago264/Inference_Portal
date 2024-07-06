from server.models import (
    InferenceServer
)
from django.db.models.query import QuerySet
from asgiref.sync import sync_to_async

async def get_model_url_async(model: str) -> list | bool:
    model_list = []
    try:
        async for m in InferenceServer.objects.filter(
                hosted_model__name=model, availability="Available"):
            model_list.append(m)
        return model_list
    except Exception as e:
        return False



