import json
import pytz
import httpx
import asyncio

from channels.generic.websocket import AsyncWebsocketConsumer
from pydantic import ValidationError
from django.utils import timezone
from asgiref.sync import sync_to_async
from transformers import AutoTokenizer
from decouple import config

from server.consumers.pydantic_validator import DataSynthesisSchema
from server.utils.async_.async_query_database import QueryDBMixin
from server.utils.async_.async_manage_ec2 import (
    ManageEC2Mixin,
    update_server_status_in_db_async
)

class Consumer(AsyncWebsocketConsumer, ManageEC2Mixin, QueryDBMixin):

    async def inference(self) -> None:
        llm = await self.get_model()
        if llm:
            processed_instruction_list = []
            for child_instruction in self.child_instruction_list:
                prompt_ = [
                    {"role": "system",
                        "content": self.parent_instruction + "\n" +
                        child_instruction['default'] + "\n" +
                        self.seed_prompt + "\n" +
                        self.optional_instruction},
                ]

                if llm.is_self_host:
                    url, instance_id, server_status = await self.get_model_url_async()
                    if url:
                        await update_server_status_in_db_async(
                            instance_id=instance_id, update_type="time")
                        if server_status == "running":
                            tokeniser = AutoTokenizer.from_pretrained(llm.base)
                            processed_prompt = tokeniser.apply_chat_template(
                                prompt_, tokenize=False)
                            processed_instruction_list.append(processed_prompt)
                            context_list = [
                                {
                                    "prompt": processed_instruction,
                                    "top_p": self.top_p,
                                    "temperature": self.temperature,
                                    "max_tokens": self.max_tokens,
                                    "presence_penalty": self.presence_penalty,
                                    "frequency_penalty": self.frequency_penalty
                                }
                                for processed_instruction in processed_instruction_list
                            ]
                            headers = {'Content-Type': 'application/json'}
                            async with httpx.AsyncClient(timeout=120) as client:
                                tasks = [client.post(url, json=context, headers=headers)
                                        for context in context_list]
                                result = await asyncio.gather(*tasks)
                                self.time = timezone.localtime(timezone.now(), pytz.timezone(
                                    self.timezone)).strftime('%Y-%m-%d %H:%M:%S')

                                await self.send(text_data=json.dumps({"response_list": [r.json()['text'][0].replace(processed_instruction_list[index], "")
                                                                                        for index, r in enumerate(result)], "role": self.choosen_model, "time": self.time, "row_no": self.row_no}))
                        else:
                            await self.manage_ec2_on_inference(server_status, instance_id)
                    else:
                        await self.send(text_data=json.dumps({"message": f"Model is currently offline", "role": "Server", "time": self.time}))

                else:
                    headers = {'Content-Type': 'application/json',
                            "Authorization": f'Bearer {config("GPT_KEY")}'}
                    url = "https://api.openai.com/v1/chat/completions"
                    processed_instruction_list.append(prompt_)
                    context_list = [
                        {
                            "model": self.choosen_model,
                            "messages": processed_instruction,
                            "top_p": self.top_p,
                            "temperature": self.temperature,
                            "max_tokens": self.max_tokens,
                            "presence_penalty": self.presence_penalty,
                            "frequency_penalty": self.frequency_penalty
                        }
                        for processed_instruction in processed_instruction_list
                    ]

                    async with httpx.AsyncClient(timeout=120) as client:
                        tasks = [client.post(url, json=context, headers=headers)
                                for context in context_list]
                        result = await asyncio.gather(*tasks)
                        self.time = timezone.localtime(timezone.now(), pytz.timezone(
                            self.timezone)).strftime('%Y-%m-%d %H:%M:%S')
                        await self.send(text_data=json.dumps({"response_list": [i.json()['choices'][0]['message']['content']
                                                                                for i in result], "role": self.choosen_model, "time": self.time, "row_no": self.row_no}))
        else:
            await self.send(text_data=json.dumps({"message": f"Cannot find the choosen model", "role": "Server", "time": self.time}))

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
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

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
                    self.room_group_name, {
                        "type": "chat_message",
                        "message": self.seed_prompt,
                    }
                )

        except ValidationError as e:
            await self.send(text_data=json.dumps({"message": f"Error: {e.errors()}", "role": "Server", "time": self.time}))
    # Receive message from room group

    async def chat_message(self, event):
        await self.inference()
