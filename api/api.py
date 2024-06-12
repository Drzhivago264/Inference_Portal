from ninja import NinjaAPI, Schema
from decouple import config
from server.utils import constant
from ninja.security import HttpBearer
from server.models import APIKEY
from server.utils.llm_toolbox import (Emotion,
                                      TopicClassification,
                                      ParaphaseDocument,
                                      SummarizeDocument,
                                      ChangeWrittingStyle
                                      )
import dspy
from asgiref.sync import sync_to_async
from django.http import StreamingHttpResponse
from ninja.errors import HttpError
import httpx
from typing import List
import random
from .api_schema import (
    Error,
    ChatResponse,
    PromptResponse,
    ChatSchema,
    PromptSchema,
    ResponseLogRequest,
    ResponseLogResponse,
    AgentResponse,
    AgentSchema,
    BaseLLMSchema,
    SummarizeSchema,
    SummarizeResponseSchema,
    RestyleSchema,
    RestyleResponseSchema,
    ClassificationSchema,
    BaseLLMResponseSchema,
    ClassificationResponseSchema
)
from .utils import (get_chat_context,
                    get_model,
                    get_model_url,
                    command_EC2,
                    update_server_status_in_db,
                    log_prompt_response,
                    send_request_async,
                    send_stream_request_async,
                    send_stream_request_agent_async,
                    query_response_log,
                    get_system_template,
                    get_user_template
                    )

from django_ratelimit.core import is_ratelimited
from django_ratelimit.exceptions import Ratelimited as RateLimitedError
from transformers import AutoTokenizer
from server.models import UserInstructionTree, InstructionTree
from api.completion_api import router as completion_router
from api.chat_api import router as chat_router
from api.agent_api import router as agent_router
from api.llm_functions_api import router as llm_function_router

class GlobalAuth(HttpBearer):
    @sync_to_async
    def authenticate(self, request, token):
        try:
            key_object = APIKEY.objects.get_from_key(token)
            return key_object
        except APIKEY.DoesNotExist:
            pass


api = NinjaAPI(auth=GlobalAuth(),
               title="Professor Parakeet API")

api.add_router("/", completion_router) 
api.add_router("/", chat_router)
api.add_router("/", agent_router)
api.add_router("/", llm_function_router)

@api.post("/responselog", tags=["Log"], summary="Get log", response={200: List[ResponseLogResponse], 401: Error, 429: Error})
async def log(request, data: ResponseLogRequest):
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



