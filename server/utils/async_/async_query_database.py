import random
from server.models import (
    InferenceServer,
    LLM
)
from django.db.models.query import QuerySet
from typing import Tuple

class QueryDBMixin:
    async def get_model(self) -> QuerySet[LLM] | bool:
        try:
            return await LLM.objects.aget(name=self.choosen_model)
        except LLM.DoesNotExist:
            return False
        
    async def get_model_url_async(self) -> Tuple[str, str, str] | Tuple[bool, bool, bool]:
        model_list = []
        try:
            async for m in InferenceServer.objects.filter(
                    hosted_model__name=self.choosen_model, availability="Available"):
                model_list.append(m)
            random_url = random.choice(model_list)
            url = random_url.url
            instance_id = random_url.name
            server_status = random_url.status
            return url, instance_id, server_status
        except Exception as e:
            return False, False, False



