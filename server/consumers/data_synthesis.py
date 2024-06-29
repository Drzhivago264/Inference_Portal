import json
import uuid
from datetime import datetime
from django.core.cache import cache
from server.models import APIKEY
from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from server.celery_tasks import Inference
from server.utils import constant
from server.consumers.pydantic_validator import DataSynthesisSchema
from pydantic import ValidationError

import pytz
from django.utils import timezone
from asgiref.sync import sync_to_async
from server.utils import constant
from server.models import LLM
from asgiref.sync import sync_to_async
import json
import random
from server.utils.sync_.common_func import inference_mode,  log_prompt_response
from transformers import AutoTokenizer
from server.utils.async_.async_common_func import (
    get_model_url_async,
    update_server_status_in_db_async,
    send_stream_request_async,
    manage_ec2_on_inference,
    send_chat_request_openai_async)


class Consumer(AsyncWebsocketConsumer):

    async def connect(self):
        self.url = self.scope["url_route"]["kwargs"]["key"]
        self.timezone = self.scope["url_route"]["kwargs"]["tz"]
        self.time = timezone.localtime(timezone.now(), pytz.timezone(
            self.timezone)).strftime('%Y-%m-%d %H:%M:%S')
        self.room_group_name = "chat_%s" % self.url
        self.is_session_start_node = True
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
                self.choosen_models = validated.choosen_models
                self.include_memory = validated.include_memory
                self.role = validated.role
                self.unique_response_id = str(uuid.uuid4())
                # Send message to room group
                await self.channel_layer.group_send(
                    self.room_group_name, {"type": "chat_message",
                                           "role": self.role,
                                           "message": self.seed_prompt,
                                           }
                )
                await self.channel_layer.group_send(
                    self.room_group_name, {"type": "chat_message",
                                           "message": self.seed_prompt,
                                           "role": self.choosen_models,
                                           }
                )
        except ValidationError as e:
            await self.send(text_data=json.dumps({"message": f"Error: {e.errors()}", "role": "Server", "time": self.time}))
    # Receive message from room group

    async def chat_message(self, event):
        async def async_data_synthesis_inference(self) -> None:
            credit = self.key_object.credit
            llm = await LLM.objects.aget(name=self.choosen_models)
            url_list = await get_model_url_async(llm)
            processed_instruction_list = []

            for child_instruction in self.child_instruction_list:

                prompt_ = [
                    {"role": "system",
                        "content": self.parent_instruction + child_instruction['default'] + self.optional_instruction},
                    {"role": "user", "content": self.seed_prompt},
                ]

                if llm.is_self_host:
                    tokeniser = AutoTokenizer.from_pretrained(
                        constant.TOKENIZER_TABLE[self.choosen_models])
                    processed_prompt = tokeniser.apply_chat_template(
                        prompt_, tokenize=False)
                    processed_instruction_list.append(processed_prompt)
                else:
                    processed_instruction_list.append(prompt_)

        role = event["role"]
        self.time = timezone.localtime(timezone.now(), pytz.timezone(
            self.timezone)).strftime('%Y-%m-%d %H:%M:%S')
        # Send message to WebSocket
        if role != "Human" and role != "Server":
            await async_data_synthesis_inference(self)
            self.is_session_start_node = False
