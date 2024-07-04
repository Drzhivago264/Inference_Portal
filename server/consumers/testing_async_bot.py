import json
import uuid
import pytz
from channels.generic.websocket import AsyncWebsocketConsumer
from server.utils import constant
from server.consumers.pydantic_validator import ChatSchema
from pydantic import ValidationError
from server.utils.async_.async_bot_inference import async_inference
from django.utils import timezone
from asgiref.sync import sync_to_async

class Consumer(AsyncWebsocketConsumer):

    async def connect(self):
        self.url = self.scope["url_route"]["kwargs"]["key"]
        self.timezone = self.scope["url_route"]["kwargs"]["tz"]
        self.time = timezone.localtime(timezone.now(), pytz.timezone(self.timezone)).strftime('%Y-%m-%d %H:%M:%S')
        self.room_group_name = "chat_%s" % self.url
        self.is_session_start_node = True
        self.session_history = []
        self.user = self.scope['user']
        self.key_object = await sync_to_async(lambda: self.user.apikey)()

        # Join room group
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()
        await self.send(text_data=json.dumps({"message": f"You are currently using async backend. Default to {constant.DEFAULT_SELF_HOST} or choose model on the right.\nWe are cheaping out on HDD for our GPU server so it will be painfully show when booting up, but the inference speed is still great.\nWe consider this inconvenience an acceptable price to pay for independence while being poor", "role": "Server", "time": self.time}))

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)
    # Receive message from WebSocket

    async def receive(self, text_data):
        try:
            validated = ChatSchema.model_validate_json(text_data)
            if not self.key_object:
                await self.send(text_data=json.dumps({"message": "Cannot find key, Disconnected! You need to login first", "role": "Server", "time": self.time}))
                await self.disconnect(self)
            elif not validated.message.strip():
                await self.send(text_data=json.dumps({"message": "Empty string recieved", "role": "Server", "time": self.time}))
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
                self.choosen_models = validated.choosen_models
                self.include_memory = validated.include_memory
                self.include_current_memory = validated.include_current_memory
                self.role = validated.role
                self.unique_response_id = str(uuid.uuid4())
                self.session_history.append({"role": "user", "content": f"{validated.message}"})
                # Send message to room group
                await self.channel_layer.group_send(
                    self.room_group_name, {"type": "chat_message",
                                           "role": self.role,
                                           "message": self.message,
                                           }
                )
                await self.channel_layer.group_send(
                    self.room_group_name, {"type": "chat_message",
                                           "message": self.message,
                                           "role": self.choosen_models,
                                           }
                )
        except ValidationError as e:
            await self.send(text_data=json.dumps({"message": f"Error: {e.errors()}", "role": "Server", "time": self.time}))
    # Receive message from room group

    async def chat_message(self, event):
        message = event["message"]
        role = event["role"]
        self.time = timezone.localtime(timezone.now(), pytz.timezone(self.timezone)).strftime('%Y-%m-%d %H:%M:%S')
        # Send message to WebSocket
        if role == "Human" or role == "Server":
            credit = self.key_object.credit
            await self.send(text_data=json.dumps({"message": "\n" + message, "role": role,  "time": self.time}))
            if role == "Human":
                unique_response_id = self.unique_response_id
                await self.send(text_data=json.dumps({"holder": "place_holder", "holderid":  unique_response_id, "role": self.choosen_models, "time": self.time, "credit": credit}))
        else:
            await async_inference(self)
            self.is_session_start_node = False