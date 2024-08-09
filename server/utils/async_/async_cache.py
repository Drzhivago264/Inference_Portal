from django.core.cache import cache
from typing import TypeVar
from django.db import models
from server.utils.sync_.sync_cache import prepare_cache_key

TModel = TypeVar('TModel', bound=models.Model)



async def get_or_set_cache(Model: TModel, prefix: str, key: str | int | list, field_to_get: str | list, timeout: int) -> TModel:
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
        except model.DoesNotExist:
            return False
    else:
        print("cache hit")
    return model

