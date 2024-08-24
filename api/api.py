import hashlib

from asgiref.sync import sync_to_async
from django.core.cache import cache
from django.utils import timezone
from ninja import NinjaAPI, Swagger
from ninja.security import HttpBearer

from api.agent_api import router as agent_router
from api.chat_api import router as chat_router
from api.completion_api import router as completion_router
from api.llm_functions_api import router as llm_function_router
from api.log import router as log_router
from server.models.api_key import APIKEY, FineGrainAPIKEY


class GlobalAuth(HttpBearer):
    @sync_to_async
    def authenticate(self, request, token):
        model_dispatcher = {"41": APIKEY, "73": FineGrainAPIKEY}
        prefix = "api_user_tuple"
        cache_key = hashlib.sha512(token.encode("utf-8")).hexdigest()
        user_tuple = cache.get(f"{prefix}_{cache_key}")
        if user_tuple is None:
            try:
                key_object = model_dispatcher[str(len(token))].objects.get_from_key(
                    token
                )
                if key_object.user.groups.filter(name="master_user").exists():
                    user_tuple = (key_object, key_object.user, None)
                    cache.set(f"{prefix}_{cache_key}", user_tuple, timeout=10)
                    return user_tuple
                elif key_object.user.groups.filter(name="slave_user").exists():
                    if (
                        key_object.ttl + key_object.created_at > timezone.now()
                        or key_object.ttl is None
                    ):
                        user_tuple = (
                            key_object.master_key,
                            key_object.master_key.user,
                            key_object,
                        )
                        return user_tuple
                    else:
                        user_tuple = (False, False, False)
                    cache.set(f"{prefix}_{cache_key}", user_tuple, timeout=10)
            except (APIKEY.DoesNotExist, FineGrainAPIKEY.DoesNotExist, KeyError):
                user_tuple = (False, False, False)
                cache.set(f"{prefix}_{cache_key}", user_tuple, timeout=10)
                pass
        elif user_tuple == (False, False, False):
            pass
        else:
            return user_tuple


api = NinjaAPI(auth=GlobalAuth(), docs=Swagger(), title="Professor Parakeet API")

api.add_router("/", completion_router)
api.add_router("/", chat_router)
api.add_router("/", agent_router)
api.add_router("/", llm_function_router)
api.add_router("/", log_router)
