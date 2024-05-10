import json
import uuid
from datetime import datetime
from django.core.cache import cache
from server.models import APIKEY
from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from server.celery_tasks import Inference
from server.utils import constant
from server.pydantic_validator import ChatSchema
from pydantic import ValidationError
import pytz
from django.utils import timezone

class Consumer(AsyncWebsocketConsumer):

    @database_sync_to_async
    def get_api_key(self):
        return self.user.apikey
    
    async def connect(self):
        self.url = self.scope["url_route"]["kwargs"]["key"]
        self.timezone = self.scope["url_route"]["kwargs"]["tz"]
        self.time = timezone.localtime(timezone.now(), pytz.timezone(self.timezone)).strftime('%Y-%m-%d %H:%M:%S')
        self.room_group_name = "chat_%s" % self.url
        self.is_session_start_node = True
        self.user = self.scope['user']
        self.key_object = await self.get_api_key()

        # Join room group
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()
        await self.send(text_data=json.dumps({"message": "Default to Mistral Chat 13B or choose model on the left", "role": "Server", "time": self.time}))

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

                mode = validated.mode
                message = validated.message
                top_p = validated.top_p
                best_of = validated.best_of
                top_k = validated.top_k
                if top_k <= 0:
                    top_k = -1
                max_tokens = validated.max_tokens
                frequency_penalty = validated.frequency_penalty
                presence_penalty = validated.presence_penalty
                temperature = validated.temperature
                beam = validated.beam
                early_stopping = validated.early_stopping
                length_penalty = validated.length_penalty
                choosen_models = validated.choosen_models
                include_memory = validated.include_memory
                role = validated.role
                unique_response_id = str(uuid.uuid4())
                # Send message to room group
                await self.channel_layer.group_send(
                    self.room_group_name, {"type": "chat_message",
                                           "role": role,
                                           "message": message,
                                           "credit": self.key_object.credit,
                                           "unique": unique_response_id,
                                           "choosen_model": choosen_models
                                           }
                )
                Inference.delay(unique=unique_response_id,
                                is_session_start_node=self.is_session_start_node,
                                mode=mode,
                                type_="chatroom",
                                stream=True,
                                key=self.key_object.hashed_key,
                                credit= self.key_object.credit,
                                room_group_name=self.room_group_name,
                                model=choosen_models,
                                top_k=top_k,
                                top_p=top_p,
                                best_of=best_of,
                                temperature=temperature,
                                max_tokens=max_tokens,
                                presence_penalty=presence_penalty,
                                frequency_penalty=frequency_penalty,
                                length_penalty=length_penalty,
                                early_stopping=early_stopping,
                                beam=beam,
                                prompt=message,
                                include_memory=include_memory)
        except ValidationError as e:
            await self.send(text_data=json.dumps({"message": f"Error: {e.errors()}", "role": "Server", "time": self.time}))
    # Receive message from room group

    async def chat_message(self, event):
        message = event["message"]
        role = event["role"]
        credit = event["credit"]
        self.time = timezone.localtime(timezone.now(), pytz.timezone(self.timezone)).strftime('%Y-%m-%d %H:%M:%S')
        # Send message to WebSocket
        if role == "Human" or role == "Server":
            await self.send(text_data=json.dumps({"message": message, "role": role,  "time": self.time}))
            if role == "Human":
                self.is_session_start_node = False
                unique_response_id = event['unique']
                await self.send(text_data=json.dumps({"holder": "place_holder", "holderid":  unique_response_id, "role": event['choosen_model'], "time": self.time, "credit": credit}))

        else:
            unique_response_id = event['unique']
            await self.send(text_data=json.dumps({"message": message, "stream_id":  unique_response_id, "credit": credit}))
