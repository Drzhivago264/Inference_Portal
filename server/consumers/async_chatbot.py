import json
import uuid

import pytz
from asgiref.sync import sync_to_async
from django.utils import timezone
from pydantic import ValidationError

from server.consumers.base_chatbot import BaseChatbot
from server.consumers.pydantic_validator import ChatSchema
from server.utils.sync_.inference import inference_mode


class Consumer(BaseChatbot):

    def __init__(self):
        super().__init__()
        self.backend = "async"

    async def inference(self):
        if not self.beam:
            self.best_of = 1
        elif self.beam and self.best_of <= 1:
            self.best_of = 2

        llm = await self.get_model()
        if llm:
            session_list_to_string = await sync_to_async(
                inference_mode, thread_sensitive=True
            )(
                llm=llm,
                key_object=self.key_object,
                mode=self.mode,
                prompt=self.message,
                include_memory=self.include_memory,
                include_current_memory=self.include_current_memory,
                session_history=self.session_history,
            )

            if llm.is_self_host:
                context = {
                    "prompt": session_list_to_string,
                    "n": 1,
                    "best_of": self.best_of,
                    "presence_penalty": float(self.presence_penalty),
                    "use_beam_search": self.beam,
                    "temperature": float(self.temperature) if not self.beam else 0,
                    "max_tokens": self.max_tokens,
                    "stream": True,
                    "top_k": int(self.top_k),
                    "top_p": float(self.top_p) if not self.beam else 1,
                    "length_penalty": float(self.length_penalty) if self.beam else 1,
                    "frequency_penalty": float(self.frequency_penalty),
                    "early_stopping": self.early_stopping if self.beam else False,
                }
                await self.send_vllm_request_async(llm=llm, context=context)
            else:
                await self.send_chat_request_openai_async(
                    processed_prompt=session_list_to_string, llm=llm
                )
        else:
            await self.send(
                text_data=json.dumps(
                    {
                        "message": "Cannot find the choosen model",
                        "stream_id": self.unique_response_id,
                        "credit": self.key_object.credit,
                    }
                )
            )

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
                self.session_history.append(
                    {"role": "user", "content": f"{validated.message}"}
                )
                # Send message to room group
                await self.channel_layer.group_send(
                    self.room_group_name,
                    {
                        "type": "chat_message",
                        "role": self.role,
                        "message": self.message,
                    },
                )
                await self.channel_layer.group_send(
                    self.room_group_name,
                    {
                        "type": "chat_message",
                        "message": self.message,
                        "role": self.choosen_model,
                    },
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
        self.time = timezone.localtime(
            timezone.now(), pytz.timezone(self.timezone)
        ).strftime("%Y-%m-%d %H:%M:%S")
        # Send message to WebSocket
        if role == "Human" or role == "Server":
            credit = self.key_object.credit
            await self.send(
                text_data=json.dumps(
                    {"message": "\n" + message, "role": role, "time": self.time}
                )
            )
            if role == "Human":
                unique_response_id = self.unique_response_id
                await self.send(
                    text_data=json.dumps(
                        {
                            "holder": "place_holder",
                            "holderid": unique_response_id,
                            "role": self.choosen_model,
                            "time": self.time,
                            "credit": credit,
                        }
                    )
                )
        else:
            await self.inference()
            self.is_session_start_node = False
