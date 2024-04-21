import json
import uuid
from datetime import datetime
from django.core.cache import cache
from apikey.models import APIKEY
from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from apikey.celery_tasks import Inference
from apikey.util import constant
from apikey.pydantic_validator import ChatSchema
from pydantic import ValidationError


class Consumer(AsyncWebsocketConsumer):
    @database_sync_to_async
    def check_key(self):
        try:
            key = APIKEY.objects.get_from_key(self.key)
            return key
        except APIKEY.DoesNotExist:
            return False

    async def connect(self):
        self.url = self.scope["url_route"]["kwargs"]["key"]
        self.time = datetime.today().strftime('%Y-%m-%d %H:%M:%S')
        self.room_group_name = "chat_%s" % self.url
        self.is_session_start_node = True
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
            self.key = validated.key
            key_object = cache.get(f"{self.key}")
            if key_object is None:
                key_object = await self.check_key()
            if not key_object:
                await self.send(text_data=json.dumps({"message": "Your key or key name is wrong, disconnected! Refresh the page to try again", "role": "Server", "time": self.time}))
                await self.disconnect(self)
            elif not validated.message.strip():
                await self.send(text_data=json.dumps({"message": "Empty string recieved", "role": "Server", "time": self.time}))
            elif key_object and validated.message.strip():
                cache.set(f"{self.key}", key_object,
                          constant.CACHE_AUTHENTICATION)
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
                                           "credit": key_object.credit,
                                           "unique": unique_response_id,
                                           "choosen_model": choosen_models
                                           }
                )
                Inference.delay(unique=unique_response_id,
                                is_session_start_node = self.is_session_start_node,
                                mode=mode,
                                type_="chatroom",
                                stream=True,
                                key=self.key,
                                credit=key_object.credit,
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
        self.time = datetime.today().strftime('%Y-%m-%d %H:%M:%S')
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