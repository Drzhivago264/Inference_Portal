import json
import pytz
from channels.generic.websocket import AsyncWebsocketConsumer
from pydantic import ValidationError
from django.utils import timezone
from asgiref.sync import sync_to_async
import json
from server.utils.async_.async_data_synthesis_inference import async_data_synthesis_inference
from server.consumers.pydantic_validator import DataSynthesisSchema

class Consumer(AsyncWebsocketConsumer):

    async def connect(self):
        self.url = self.scope["url_route"]["kwargs"]["key"]
        self.timezone = self.scope["url_route"]["kwargs"]["tz"]
        self.time = timezone.localtime(timezone.now(), pytz.timezone(
            self.timezone)).strftime('%Y-%m-%d %H:%M:%S')
        self.room_group_name = "chat_%s" % self.url
        self.user = self.scope['user']
        self.key_object = await sync_to_async(lambda: self.user.apikey)()
        # Join room group
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()
        await self.send(text_data=json.dumps({"message": f"Connected", "role": "Server", "time": self.time}))

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)
    # Receive message from WebSocket

    async def receive(self, text_data):
        try:
            validated = DataSynthesisSchema.model_validate_json(text_data)
            if not self.key_object:
                await self.send(text_data=json.dumps({"message": "Cannot find key, Disconnected! You need to login first", "role": "Server", "time": self.time}))
                await self.disconnect(self)

            elif self.key_object:
  
                self.seed_prompt = validated.seed_prompt
                self.child_instruction_list = validated.child_instruction_list
                self.parent_instruction = validated.parent_instruction
                self.optional_instruction = validated.optional_instruction
                self.top_p = validated.top_p
                self.max_tokens = validated.max_tokens
                self.frequency_penalty = validated.frequency_penalty
                self.presence_penalty = validated.presence_penalty
                self.temperature = validated.temperature
                self.choosen_model = validated.choosen_model
                self.row_no = validated.row_no
                # Send message to room group
                await self.channel_layer.group_send(
                    self.room_group_name, {"type": "chat_message",
                                           "message": self.seed_prompt,
                                           }
                )

        except ValidationError as e:
            await self.send(text_data=json.dumps({"message": f"Error: {e.errors()}", "role": "Server", "time": self.time}))
    # Receive message from room group

    async def chat_message(self, event):
        
        await async_data_synthesis_inference(self)

