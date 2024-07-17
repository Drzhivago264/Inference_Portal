from ninja import NinjaAPI
from ninja.security import HttpBearer
from ninja.errors import HttpError

from django_ratelimit.core import is_ratelimited

from server.models import APIKEY, FineGrainAPIKEY

from asgiref.sync import sync_to_async
from typing import List

from api.api_schema import (
    Error,
    ResponseLogRequest,
    ResponseLogResponse,
)
from api.utils import query_response_log, check_permission
from api.completion_api import router as completion_router
from api.chat_api import router as chat_router
from api.agent_api import router as agent_router
from api.llm_functions_api import router as llm_function_router


class GlobalAuth(HttpBearer):
    @sync_to_async
    def authenticate(self, request, token):
        model_dispatcher = {
            '41': APIKEY,
            '73': FineGrainAPIKEY
        }
        try:
            key_object = model_dispatcher[str(len(token))].objects.get_from_key(token)
            if key_object.user.groups.filter(name='master_user').exists():
                user = key_object.user
                return key_object, user
            elif key_object.user.groups.filter(name="slave_user").exists():
                return key_object, key_object.master_key.user
        except (APIKEY.DoesNotExist, FineGrainAPIKEY.DoesNotExist, KeyError):
            pass
         


api = NinjaAPI(auth=GlobalAuth(),
               title="Professor Parakeet API")

api.add_router("/", completion_router)
api.add_router("/", chat_router)
api.add_router("/", agent_router)
api.add_router("/", llm_function_router)


@api.post("/responselog", tags=["Log"], summary="Get log", response={200: List[ResponseLogResponse], 401: Error, 429: Error})
async def log(request, data: ResponseLogRequest):
    key_object = request.auth
    user_object = await sync_to_async(lambda: key_object.user)()
    await check_permission(user_object=user_object, permission='server.allow_view_log', destination='log')
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
