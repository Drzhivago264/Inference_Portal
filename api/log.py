import hashlib
from typing import List

from asgiref.sync import sync_to_async
from django.core.cache import cache
from django.utils import timezone
from server.rate_limit import RateLimitError, rate_limit_initializer
from ninja import NinjaAPI, Swagger
from ninja.errors import HttpError
from ninja.security import HttpBearer

from api.agent_api import router as agent_router
from api.api_schema import Error, ResponseLogRequest, ResponseLogResponse
from api.chat_api import router as chat_router
from api.completion_api import router as completion_router
from api.llm_functions_api import router as llm_function_router
from api.utils import check_permission, query_response_log
from server.models.api_key import APIKEY, FineGrainAPIKEY
from server.models.log import PromptResponse
import inspect
from functools import partial, wraps
from typing import Any, Callable, Tuple, Type
from ninja import Router
from asgiref.sync import sync_to_async
from django.db.models import QuerySet
from ninja.constants import NOT_SET
from ninja.pagination import LimitOffsetPagination, PaginationBase, make_response_paginated
from ninja.types import DictStrAny

router = Router()
class AsyncLimitOffsetPagination(LimitOffsetPagination):
    async def paginate_queryset(
        self,
        queryset: QuerySet,
        pagination: LimitOffsetPagination.Input,
        **params: DictStrAny,
    ):
        offset = pagination.offset
        limit: int = pagination.limit

        @sync_to_async
        def process_query_set():
            return {
                "items": queryset[offset : offset + limit] if queryset else [],
                "count": self._items_count(queryset) if queryset else 0,
            }

        return await process_query_set()


def apaginate(func_or_pgn_class: Any = NOT_SET, **paginator_params: DictStrAny) -> Callable:

    isfunction = inspect.isfunction(func_or_pgn_class)
    isnotset = func_or_pgn_class == NOT_SET

    pagination_class: Type[PaginationBase] = AsyncLimitOffsetPagination

    if isfunction:
        return _inject_pagination(func_or_pgn_class, pagination_class)

    if not isnotset:
        pagination_class = func_or_pgn_class

    async def wrapper(func: Callable) -> Any:
        return await _inject_pagination(func, pagination_class, **paginator_params)

    return wrapper


def _inject_pagination(
    func: Callable,
    paginator_class: Type[PaginationBase],
    **paginator_params: Any,
) -> Callable:
    paginator: PaginationBase = paginator_class(**paginator_params)

    @wraps(func)
    async def view_with_pagination(*args: Tuple[Any], **kwargs: DictStrAny) -> Any:
        pagination_params = kwargs.pop("ninja_pagination")
        if paginator.pass_parameter:
            kwargs[paginator.pass_parameter] = pagination_params

        items = await func(*args, **kwargs)

        result = await paginator.paginate_queryset(items, pagination=pagination_params, **kwargs)
        if paginator.Output:
            result[paginator.items_attribute] = list(result[paginator.items_attribute])
            # ^ forcing queryset evaluation #TODO: check why pydantic did not do it here
        return result

    view_with_pagination._ninja_contribute_args = [  # type: ignore
        (
            "ninja_pagination",
            paginator.Input,
            paginator.InputSource,
        ),
    ]

    if paginator.Output:
        view_with_pagination._ninja_contribute_to_operation = [partial(  # type: ignore
                    make_response_paginated,
                    paginator,
                )]

    return view_with_pagination

@router.post(
    "/responselog",
    tags=["Log"],
    summary="Get log",
    response={200: List[ResponseLogResponse], 401: Error, 429: Error},
)
@apaginate
async def log(request, data: ResponseLogRequest):

    """
    To filter log type you can choose among the following option (supply the corresponding interger or list of intergers):

        CHATBOT = 1, "chatbot"
        CHATBOT_API = 2, "chatbot_api"
        AGENT = 3, "agent"
        AGENT_API = 4, "agent_api"
        TOOLBOX = 5, "toolbox"
        TOOLBOX_API = 6, "toolbox_api"
        DATA_SYNTHESIS = 7, "data_synthesis"
    To get all log you can ignore the **filter_by** parameter or set it to None.
    """
    key_object, user_object, slave_key_object = request.auth
    rate_limiter = await rate_limit_initializer(
        key_object=key_object,
        strategy="moving_windown",
        slave_key_object=slave_key_object,
        namespace="api",
        timezone="none",
    )
    await check_permission(
        user_object=user_object, permission="server.allow_view_log", destination="log"
    )
    try:
        await rate_limiter.check_rate_limit()
        order = "-id" if data.lastest else "id"
        if isinstance(data.filter_by, int):
            response_log = PromptResponse.objects.filter(key=key_object, type=data.filter_by).order_by(order)
        elif isinstance(data.filter_by, list):
            response_log = PromptResponse.objects.filter(key=key_object, type__in=data.filter_by).order_by(order)
        else:
            response_log = PromptResponse.objects.filter(key=key_object).order_by(order)
        return response_log
    except RateLimitError as e:
        raise HttpError(
            429,
            e.message,
        )

