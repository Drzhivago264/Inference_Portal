import json

import pytz
from channels.generic.websocket import AsyncWebsocketConsumer
from django.utils import timezone

from server.models.log import PromptResponse
from server.rate_limit import RateLimitError, rate_limit_initializer
from server.utils.async_.async_inference import (
    AsyncInferenceOpenaiMixin,
    AsyncInferenceVllmMixin,
)
from server.utils.async_.async_query_database import QueryDBMixin


class BaseChatbot(
    AsyncWebsocketConsumer,
    AsyncInferenceOpenaiMixin,
    AsyncInferenceVllmMixin,
    QueryDBMixin,
):

    async def connect(self):
        self.url = self.scope["url_route"]["kwargs"]["key"]
        self.timezone = self.scope["url_route"]["kwargs"]["tz"]
        self.time = timezone.localtime(
            timezone.now(), pytz.timezone(self.timezone)
        ).strftime("%Y-%m-%d %H:%M:%S")
        self.room_group_name = "chat_%s" % self.url
        self.is_session_start_node = True
        self.session_history = []
        self.user = self.scope["user"]
        self.type = PromptResponse.PromptType.CHATBOT

        self.key_object, self.master_user, self.slave_key_object = (
            await self.get_master_key_and_master_user()
        )
        self.rate_limiter = await rate_limit_initializer(
            key_object=self.key_object,
            strategy="moving_windown",
            slave_key_object=self.slave_key_object,
            namespace=self.type.label,
            timezone=self.timezone,
        )
        # Join room group
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()
        is_authorised = await self.check_permission(
            permission_code="server.allow_chat", destination="Chatbots"
        )
        if is_authorised:
            await self.send_connect_message()

    async def send_connect_message(self):
        raise Exception("Implemented in child class!")

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data):
        try:
            await self.rate_limiter.check_rate_limit()
            await self.send_message_if_not_rate_limited(text_data)
        except RateLimitError as e:
            await self.send(
                text_data=json.dumps(
                    {
                        "message": e.message,
                        "role": "Server",
                        "time": self.time,
                    }
                )
            )

    async def send_message_if_not_rate_limited(self):
        raise NotImplementedError("Implemented in child class!")