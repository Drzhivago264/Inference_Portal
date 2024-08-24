from typing import List

from ninja import Router
from ninja.errors import HttpError
from ninja.pagination import PageNumberPagination, paginate
from ninja.throttling import AuthRateThrottle

from api.api_schema import Error, ResponseLogRequest, ResponseLogResponse
from api.utils import check_permission_sync
from server.models.log import PromptResponse
from server.rate_limit import RateLimitError

router = Router(throttle=[AuthRateThrottle("100/m")])


@router.post(
    "/responselog",
    tags=["Log"],
    summary="Get log",
    response={200: List[ResponseLogResponse], 401: Error, 429: Error},
)
@paginate(PageNumberPagination)
def log(request, data: ResponseLogRequest):
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
    key_object, user_object, _ = request.auth

    check_permission_sync(
        user_object=user_object, permission="server.allow_view_log", destination="log"
    )
    try:
        order = "-id" if data.lastest else "id"
        if isinstance(data.filter_by, int):
            response_log = PromptResponse.objects.filter(
                key=key_object, type=data.filter_by
            ).order_by(order)
        elif isinstance(data.filter_by, list):
            response_log = PromptResponse.objects.filter(
                key=key_object, type__in=data.filter_by
            ).order_by(order)
        else:
            response_log = PromptResponse.objects.filter(key=key_object).order_by(order)
        return response_log
    except RateLimitError as e:
        raise HttpError(
            429,
            e.message,
        )
