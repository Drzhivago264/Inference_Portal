import json
import uuid

import pytz
from django.utils import timezone
from pydantic import ValidationError

from server.consumers.base_chatbot import BaseChatbot
from server.consumers.pydantic_validator import ChatSchema
from server.queue.model_inference import inference
from server.utils import constant


class Consumer(BaseChatbot):

    def __init__(self):
        super().__init__()
        self.backend = "Celery"

    async def send_message_if_not_rate_limited(self, text_data):
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
                mode = validated.mode
                message = validated.message
                context = {
                    "top_p": validated.top_p,
                    "best_of": validated.best_of,
                    "top_k": validated.top_k if validated.top_k > 0 else -1,
                    "max_tokens": validated.max_tokens,
                    "frequency_penalty": validated.frequency_penalty,
                    "presence_penalty": validated.presence_penalty,
                    "temperature": validated.temperature,
                    "beam": validated.beam,
                    "early_stopping": validated.early_stopping,
                    "length_penalty": validated.length_penalty,
                    "stream": True,
                }
                choosen_model = validated.choosen_model
                include_memory = validated.include_memory
                role = validated.role
                unique_response_id = uuid.uuid4().hex
                # Send message to room group
                await self.channel_layer.group_send(
                    self.room_group_name,
                    {
                        "type": "chat_message",
                        "role": role,
                        "message": message,
                        "credit": self.key_object.credit,
                        "unique": unique_response_id,
                        "choosen_model": choosen_model,
                    },
                )
                inference.delay(
                    unique=unique_response_id,
                    is_session_start_node=self.is_session_start_node,
                    mode=mode,
                    type_=self.type,
                    key=self.key_object.hashed_key,
                    credit=self.key_object.credit,
                    room_group_name=self.room_group_name,
                    model=choosen_model,
                    context=context,
                    prompt=message,
                    include_memory=include_memory,
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
