from typing import TypeVar, Tuple
from django.utils import timezone
from django.core.cache import cache
from django.db import models
from django.contrib.auth.models import User
from server.models.api_key import APIKEY
from server.utils.sync_.sync_cache import prepare_cache_key

TModel = TypeVar("TModel", bound=models.Model)


async def get_or_set_cache(
    Model: TModel,
    prefix: str,
    key: str | int | list,
    field_to_get: str | list,
    timeout: int,
) -> TModel:
    """
    Retrieves a model instance from the cache if it exists; otherwise, fetches the model instance from the database,
    stores it in the cache, and returns it.

    Args:
        Model (TModel): The Django model class.
        prefix (str): The cache prefix.
        key (str): The cache key to look up.
        field_to_get (str): The field name to retrieve from the model.
        timeout (int, optional): The cache timeout in seconds. Defaults to 600.

    Returns:
        The value retrieved from the cache or the database.
    """
    cache_key = prepare_cache_key(prefix=prefix, key=key)
    model = await cache.aget(cache_key)
    if model is None:
        try:
            if isinstance(key, str) or isinstance(key, int):
                model = await Model.objects.aget(**{field_to_get: key})
            elif isinstance(key, list):
                model = await Model.objects.aget(**dict(zip(field_to_get, key)))
            await cache.aset(cache_key, model, timeout)
        except Model.DoesNotExist:
            return False

    return model

async def filter_or_set_cache(
    Model: TModel,
    prefix: str,
    key: str | int | list,
    field_to_get: str | list,
    timeout: int,
) -> list:
    """
    Filter a list of model instances from the cache if it exists; otherwise, fetches the model instances from the database,
    stores it in the cache, and returns it.

    Args:
        Model (TModel): The Django model class.
        prefix (str): The cache prefix.
        key (str): The cache key to look up.
        field_to_get (str): The field name to retrieve from the model.
        timeout (int, optional): The cache timeout in seconds. Defaults to 600.

    Returns:
        The value retrieved from the cache or the database.
    """
    cache_key = prepare_cache_key(prefix=prefix, key=key)
    model_list = await cache.aget(cache_key)
    if model_list is None:
        try:
            if isinstance(key, str) or isinstance(key, int):
                model_list = await [
                    m async for m in Model.objects.filter(**{field_to_get: key})
                ]
            elif isinstance(key, list):
                model_list = await [
                    m
                    async for m in Model.objects.filter(**dict(zip(field_to_get, key)))
                ]
            await cache.aset(cache_key, model_list, timeout)
        except Model.DoesNotExist:
            return False

    return model_list
