import json

import pytz
from django.utils import timezone
from pydantic import ValidationError

from server.consumers.base_chatbot import BaseChatbot
from server.consumers.pydantic_validator import ChatSchema
from server.queue.model_inference import inference


class Consumer(BaseChatbot):

    def __init__(self):
        super().__init__()
        self.backend = "Celery"

    async def send_message_if_not_rate_limited(self, text_data):
        self.time = timezone.localtime(
            timezone.now(), pytz.timezone(self.timezone)
        ).strftime("%Y-%m-%d %H:%M:%S")
        try:
            validated = ChatSchema.model_validate_json(text_data)
            if not self.key_object:
                await self.send(
                    text_data=json.dumps(
                        {
                            "message": "Cannot find key, Disconnected! You need to login first",
                            "role": "Server",
                            "time": self.time,
                        }
                    )
                )
                await self.disconnect({"code": 3003})
            elif not validated.message.strip():
                await self.send(
                    text_data=json.dumps(
                        {
                            "message": "Empty string recieved",
                            "role": "Server",
                            "time": self.time,
                        }
                    )
                )
            elif self.key_object and validated.message.strip():
                self.load_parameter(validated=validated)
                context = {
                    "top_p": self.top_p,
                    "best_of": self.best_of,
                    "top_k": self.top_k if self.top_k > 0 else -1,
                    "max_tokens": self.max_tokens,
                    "frequency_penalty": self.frequency_penalty,
                    "presence_penalty": self.presence_penalty,
                    "temperature": self.temperature,
                    "beam": self.beam,
                    "early_stopping": self.early_stopping,
                    "length_penalty": self.length_penalty,
                    "stream": True,
                }

                # Send message to room group
                await self.channel_layer.group_send(
                    self.room_group_name,
                    {
                        "type": "chat_message",
                        "role": self.role,
                        "message": self.message,
                        "credit": self.key_object.credit,
                        "unique": self.unique_response_id,
                        "choosen_model": self.choosen_model,
                    },
                )
                inference.delay(
                    unique=self.unique_response_id,
                    is_session_start_node=self.is_session_start_node,
                    mode=self.mode,
                    type_=self.type,
                    key=self.key_object.hashed_key,
                    credit=self.key_object.credit,
                    room_group_name=self.room_group_name,
                    model=self.choosen_model,
                    context=context,
                    prompt=self.message,
                    include_memory=self.include_memory,
                    include_current_memory=self.include_current_memory,
                    include_dataset_memory=self.include_dataset_memory,
                    session_history=self.session_history,
                    dataset=self.dataset,
                )
        except ValidationError as e:
            await self.send(
                text_data=json.dumps(
                    {
                        "message": f"Error: {e.errors()}",
                        "role": "Server",
                        "time": self.time,
                    }
                )
            )

    # Receive message from room group

    async def chat_message(self, event):
        if "session_history" in event:
            self.session_history = event["session_history"]
        message = event["message"]
        role = event["role"]
        credit = event["credit"]
        self.time = timezone.localtime(
            timezone.now(), pytz.timezone(self.timezone)
        ).strftime("%Y-%m-%d %H:%M:%S")
        # Send message to WebSocket
        if role == "Human" or role == "Server":
            await self.send(
                text_data=json.dumps(
                    {"message": "\n" + message, "role": role, "time": self.time}
                )
            )
            if role == "Human":
                self.is_session_start_node = False
                unique_response_id = event["unique"]
                await self.send(
                    text_data=json.dumps(
                        {
                            "holder": "place_holder",
                            "holderid": unique_response_id,
                            "role": event["choosen_model"],
                            "time": self.time,
                            "credit": credit,
                        }
                    )
                )

        else:
            unique_response_id = event["unique"]
            await self.send(
                text_data=json.dumps(
                    {
                        "message": message,
                        "stream_id": unique_response_id,
                        "credit": credit,
                    }
                )
            )
