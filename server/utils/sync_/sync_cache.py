from typing import TypeVar

from django.core.cache import cache
from django.db import models

TModel = TypeVar("TModel", bound=models.Model)


def prepare_cache_key(prefix: str, key: str | list) -> str:
    if isinstance(key, str) or isinstance(key, int):
        cache_key = f"{prefix}_{str(key)}"
    elif isinstance(key, list):
        key_list_to_string = ""
        for k in key:
            if isinstance(k, str) or isinstance(key, int):
                key_list_to_string += f"{str(k)}_"
            else:
                key_list_to_string += f"{k.id}_"
        cache_key = f"{prefix}_{key_list_to_string}"
    return cache_key


def get_or_set_cache(
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
    model = cache.get(cache_key)

    if model is None:
        try:
            if isinstance(key, str) or isinstance(key, int):
                model = Model.objects.get(**{field_to_get: key})
            elif isinstance(key, list):
                model = Model.objects.get(**dict(zip(field_to_get, key)))
            cache.set(cache_key, model, timeout)
        except Model.DoesNotExist:
            return False
    else:
        print("cache hit")
    return model


def delete_cache(prefix: str, key: str | list):
    cache_key = prepare_cache_key(prefix=prefix, key=key)
    cache.delete(cache_key)
