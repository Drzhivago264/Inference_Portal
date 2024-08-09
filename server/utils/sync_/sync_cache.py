from typing import TypeVar, Tuple
from django.utils import timezone
from django.core.cache import cache
from django.db import models
from django.contrib.auth.models import User
from server.models.api_key import APIKEY
from server.models.instruction import InstructionTreeMP, UserInstructionTreeMP
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


def get_user_or_set_cache(prefix: str, key: str, timeout: int, current_user: User) -> Tuple[APIKEY, User] | Tuple[bool, bool]:
    cache_key = prepare_cache_key(prefix=prefix, key=key)
    user_tuple = cache.get(cache_key)
    if user_tuple is None:
        if current_user.groups.filter(name="master_user").exists():
            user_tuple = (current_user.apikey, current_user)
        elif current_user.groups.filter(name="slave_user").exists():
            if (
                current_user.finegrainapikey.ttl + current_user.finegrainapikey.created_at
                > timezone.now()
                or current_user.finegrainapikey.ttl is None
            ):
                user_tuple = (
                    current_user.finegrainapikey.master_key,
                    current_user.finegrainapikey.master_key.user,
                )
            else:
                user_tuple = (False, False)
        else:
            user_tuple = (False, False)
        cache.set(cache_key, user_tuple, timeout)

    return user_tuple


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
    return model


def get_descendants_or_cache(prefix: str, key: str, parent_instance: InstructionTreeMP | UserInstructionTreeMP, timeout: int):
    cache_key = prepare_cache_key(prefix, key)
    descendants = cache.get(cache_key)
    if descendants is None:
        descendants = parent_instance.get_descendants()
        cache.set(cache_key, descendants, timeout)
    return descendants


def filter_or_set_cache(
    Model: TModel,
    prefix: str,
    key: str | int | list,
    field_to_get: str | list,
    timeout: int,
) -> TModel:
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
    model_list = cache.get(cache_key)
    if model_list is None:
        try:
            if isinstance(key, str) or isinstance(key, int):
                model_list = [
                    m for m in Model.objects.filter(**{field_to_get: key})
                ]
            elif isinstance(key, list):
                model_list = [
                    m
                    for m in Model.objects.filter(**dict(zip(field_to_get, key)))
                ]
            cache.set(cache_key, model_list, timeout)
        except Model.DoesNotExist:
            return False
    return model_list


def delete_cache(prefix: str, key: str | list):
    cache_key = prepare_cache_key(prefix=prefix, key=key)
    cache.delete(cache_key)
