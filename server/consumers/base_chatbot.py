import json

from server.consumers.base import BaseBot
from server.models.log import PromptResponse
from server.rate_limit import RateLimitError
from server.utils import constant


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
                    "message": f"You are currently using {self.backend} backend. Default to {constant.DEFAULT_SELF_HOST} or choose model on the right.\nWe are cheaping out on HDD for our GPU server so it will be painfully slow when booting up, but the inference speed is still great.\nWe consider this inconvenience an acceptable price to pay for independence while being poor",
                    "role": "Server",
                    "time": self.time,
                }
            )
        )

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

