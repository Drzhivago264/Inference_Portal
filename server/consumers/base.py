import json
import uuid

import pytz
from channels.generic.websocket import AsyncWebsocketConsumer
from django.utils import timezone

from server.rate_limit import rate_limit_initializer
from server.utils.async_.async_inference import AsyncInferenceMixin
from server.utils.async_.async_query_database import QueryDBMixin


class BaseBot(
    AsyncWebsocketConsumer,
    AsyncInferenceMixin,
    QueryDBMixin,
):
    """
    This class is the parent class of base_agent/Base_Agent and base_chatbot/Base_ChatBot.
    It cannot be initialised by itself.

    It inherite from:
    Args:
        AsyncWebsocketConsumer: Async consumer provided by Django Channels to handle websockets
        AsyncInferenceMixin: Mixin class that contains utility functions tp inference openai or self-hosted vLLM models
        QueryDBMixin: Mixin class that contains utility functions to interaction with db

                BaseBot
               /       \
       BaseAgent       BaseChatBot
            /            \
   Celery/AsyncAgent    Celery/AsyncChatBot  
    """

    def __new__(cls, *args, **kwargs):
        if cls is BaseBot:
            raise TypeError(f"only children of '{cls.__name__}' may be instantiated")
        return object.__new__(cls, *args, **kwargs)

    def __init__(self):
        super().__init__()
        self.session_history = []
        self.is_session_start_node = None
        self.backend = None
        self.permission_code = None
        self.destination = None
        self.type = None
        self.extra_body_availability = False

    async def connect(self):
        self.url = self.scope["url_route"]["kwargs"]["key"]
        self.timezone = self.scope["url_route"]["kwargs"]["tz"]
        self.time = timezone.localtime(
            timezone.now(), pytz.timezone(self.timezone)
        ).strftime("%Y-%m-%d %H:%M:%S")
        self.user = self.scope["user"]
        self.key_object, self.master_user, self.slave_key_object = (
            await self.get_master_key_and_master_user()
        )
        if self.key_object:
            self.rate_limiter = await rate_limit_initializer(
                key_object=self.key_object,
                strategy="moving_windown",
                slave_key_object=self.slave_key_object,
                namespace=self.type.label,
                timezone=self.timezone,
            )
        self.room_group_name = f"{self.destination}{self.url}{uuid.uuid4().hex[:8]}"
        # Join room group
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()
        is_authorised = await self.check_permission(
            permission_code=self.permission_code, destination=self.destination
        )

        if is_authorised and self.backend and self.key_object:
            await self.send_connect_message()

        elif not self.key_object:
            await self.send(
                text_data=json.dumps(
                    {
                        "message": f"Your token is expired, disconnecting ...",
                        "role": "Server",
                        "time": self.time,
                    }
                )
            )
            self.disconnect()

    async def send_connect_message(self):
        raise NotImplementedError("Implemented in child class!")

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data):
        raise NotImplementedError("Implemented in child class!")

    async def send_message_if_not_rate_limited(self):
        raise NotImplementedError("Implemented in child class!")

    async def inference(self):
        raise NotImplementedError("Implemented in child class!")
