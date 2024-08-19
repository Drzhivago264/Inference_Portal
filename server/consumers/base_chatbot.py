import json
import uuid

import pytz
from constance import config as constant
from django.utils import timezone

from server.consumers.base import BaseBot
from server.models.log import PromptResponse
from server.rate_limit import RateLimitError


class BaseChatbot(BaseBot):

    def __new__(cls, *args, **kwargs):
        if cls is BaseBot:
            raise TypeError(f"only children of '{cls.__name__}' may be instantiated")
        return BaseBot.__new__(cls, *args, **kwargs)

    def __init__(self):
        super().__init__()
        self.permission_code = "server.allow_chat"
        self.destination = "Chatbots"
        self.is_session_start_node = True
        self.type = PromptResponse.PromptType.CHATBOT

    async def send_connect_message(self):
        await self.send(
            text_data=json.dumps(
                {
                    "message": f"You are currently using {self.backend} backend. Default to {constant.DEFAULT_SELF_HOST} or choose model on the panel.\nWe are cheaping out on HDD for our GPU server so it will be painfully slow when booting up, but the inference speed is still great.\nWe consider this inconvenience an acceptable price to pay for independence while being poor",
                    "role": "Server",
                    "time": self.time,
                }
            )
        )

    def load_parameter(self, validated):
        self.mode = validated.mode
        self.message = validated.message
        self.top_p = validated.top_p
        self.best_of = validated.best_of
        self.top_k = validated.top_k if validated.top_k > 0 else -1
        self.max_tokens = validated.max_tokens
        self.frequency_penalty = validated.frequency_penalty
        self.presence_penalty = validated.presence_penalty
        self.temperature = validated.temperature
        self.beam = validated.beam
        self.early_stopping = validated.early_stopping
        self.length_penalty = validated.length_penalty
        self.choosen_model = validated.choosen_model
        self.include_memory = validated.include_memory
        self.include_current_memory = validated.include_current_memory
        self.role = validated.role
        self.unique_response_id = uuid.uuid4().hex
        self.session_history.append({"role": "user", "content": f"{validated.message}"})

    async def receive(self, text_data):
        self.time = timezone.localtime(
            timezone.now(), pytz.timezone(self.timezone)
        ).strftime("%Y-%m-%d %H:%M:%S")
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
