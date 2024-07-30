import asyncio
import json
import httpx
import pytz

from channels.generic.websocket import AsyncWebsocketConsumer
from decouple import config
from django.utils import timezone
from pydantic import ValidationError
from transformers import AutoTokenizer

from server.queue.log_prompt_response import celery_log_prompt_response
from server.consumers.pydantic_validator import (AgentSchemaTemplate,
                                                 DataSynthesisSchema)
from server.utils.async_.async_manage_ec2 import (
    ManageEC2Mixin, update_server_status_in_db_async)
from server.utils.async_.async_query_database import QueryDBMixin
from server.rate_limit import rate_limit_initializer, RateLimitError

class Consumer(AsyncWebsocketConsumer, ManageEC2Mixin, QueryDBMixin):

    async def inference(self) -> None:
        llm = await self.get_model()
        if llm:
            processed_instruction_list = [
                [
                    {
                        "role": "system",
                        "content": self.parent_instruction
                        + "\n"
                        + child_instruction["instruct"]
                        + "\n",
                    },
                    {
                        "role": "user",
                        "content": "#Given Prompt#:\n"
                        + self.seed_prompt
                        + "\n"
                        + self.optional_instruction,
                    },
                ]
                for child_instruction in self.child_instruction_list
            ]
            if llm.is_self_host:
                url, instance_id, server_status = await self.get_model_url_async()
                if url:
                    await update_server_status_in_db_async(
                        instance_id=instance_id, update_type="time"
                    )
                    if server_status == "running":
                        tokeniser = AutoTokenizer.from_pretrained(llm.base)
                        processed_instruction_list = [
                            tokeniser.apply_chat_template(prompt_, tokenize=False)
                            for prompt_ in processed_instruction_list
                        ]
                        context_list = [
                            {
                                "prompt": processed_instruction,
                                "top_p": self.top_p,
                                "temperature": self.temperature,
                                "max_tokens": self.max_tokens,
                                "presence_penalty": self.presence_penalty,
                                "frequency_penalty": self.frequency_penalty,
                            }
                            for processed_instruction in processed_instruction_list
                        ]
                        headers = {"Content-Type": "application/json"}
                        response_list = list()
                        async with httpx.AsyncClient(timeout=120) as client:
                            tasks = [
                                client.post(url, json=context, headers=headers)
                                for context in context_list
                            ]
                            result = await asyncio.gather(*tasks)
                            for index, r in enumerate(result):
                                if r.status_code == 200:
                                    response_list.append(
                                        r.json()["text"][0].replace(
                                            processed_instruction_list[index], ""
                                        )
                                    )
                                    await self.send(
                                        text_data=json.dumps(
                                            {
                                                "message": f"Row-{self.row_no} Instruct-{index}",
                                                "role": "Server",
                                                "time": self.time,
                                                "status": f"{r.status_code} Success",
                                            }
                                        )
                                    )
                                    celery_log_prompt_response.delay(
                                        is_session_start_node=None,
                                        key_object_id=self.key_object.id,
                                        llm_id=llm.id,
                                        prompt=processed_instruction_list[index],
                                        response=r.json()["choices"][0]["message"][
                                            "content"
                                        ],
                                        type_="data_synthesis",
                                    )
                                elif r.status_code == 429:
                                    response_list.append("Too many requests, slow down")
                                    await self.send(
                                        text_data=json.dumps(
                                            {
                                                "message": f"Row-{self.row_no} Instruct-{index}",
                                                "role": "Server",
                                                "time": self.time,
                                                "status": f"{r.status_code} Failed-Too many request",
                                            }
                                        )
                                    )
                            await self.send(
                                text_data=json.dumps(
                                    {
                                        "response_list": response_list,
                                        "role": self.choosen_model,
                                        "time": self.time,
                                        "row_no": self.row_no,
                                    }
                                )
                            )
                    else:
                        await self.manage_ec2_on_inference(server_status, instance_id)
                else:
                    await self.send(
                        text_data=json.dumps(
                            {
                                "message": f"Model is currently offline",
                                "role": "Server",
                                "time": self.time,
                            }
                        )
                    )
            else:
                headers = {
                    "Content-Type": "application/json",
                    "Authorization": f'Bearer {config("GPT_KEY")}',
                }
                url = "https://api.openai.com/v1/chat/completions"
                context_list = [
                    {
                        "model": self.choosen_model,
                        "messages": processed_instruction,
                        "top_p": self.top_p,
                        "temperature": self.temperature,
                        "max_tokens": self.max_tokens,
                        "presence_penalty": self.presence_penalty,
                        "frequency_penalty": self.frequency_penalty,
                    }
                    for processed_instruction in processed_instruction_list
                ]
                response_list = list()
                async with httpx.AsyncClient(timeout=120) as client:
                    tasks = [
                        client.post(url, json=context, headers=headers)
                        for context in context_list
                    ]
                    result = await asyncio.gather(*tasks)
                    for index, r in enumerate(result):
                        if r.status_code == 200:
                            response_list.append(
                                r.json()["choices"][0]["message"]["content"]
                            )
                            await self.send(
                                text_data=json.dumps(
                                    {
                                        "message": f"Row-{self.row_no} Instruct-{index}",
                                        "role": "Server",
                                        "time": self.time,
                                        "status": f"{r.status_code} Success",
                                    }
                                )
                            )
                            celery_log_prompt_response.delay(
                                is_session_start_node=None,
                                key_object_id=self.key_object.id,
                                llm_id=llm.id,
                                prompt=processed_instruction_list[index][0]["content"]
                                + processed_instruction_list[index][1]["content"],
                                response=r.json()["choices"][0]["message"]["content"],
                                type_="data_synthesis",
                            )
                        elif r.status_code == 429:
                            response_list.append("Too many requests, slow down")
                            await self.send(
                                text_data=json.dumps(
                                    {
                                        "message": f"Row-{self.row_no} Instruct-{index}",
                                        "role": "Server",
                                        "time": self.time,
                                        "status": f"{r.status_code} Failed-Too many request",
                                    }
                                )
                            )
                    await self.send(
                        text_data=json.dumps(
                            {
                                "response_list": response_list,
                                "role": self.choosen_model,
                                "time": self.time,
                                "row_no": self.row_no,
                            }
                        )
                    )
        else:
            await self.send(
                text_data=json.dumps(
                    {
                        "message": f"Cannot find the choosen model",
                        "role": "Server",
                        "time": self.time,
                    }
                )
            )

    async def connect(self):
        self.url = self.scope["url_route"]["kwargs"]["key"]
        self.timezone = self.scope["url_route"]["kwargs"]["tz"]
        self.time = timezone.localtime(
            timezone.now(), pytz.timezone(self.timezone)
        ).strftime("%M:%S")
        self.room_group_name = "chat_%s" % self.url
        self.user = self.scope["user"]
        self.p_type = "data_synthesis"

        self.key_object, self.master_user, self.slave_key_object = await self.get_master_key_and_master_user()
        self.rate_limiter = await rate_limit_initializer(key_object=self.key_object, strategy="moving_windown", slave_key_object=self.slave_key_object, namespace=self.p_type, timezone=self.timezone)
   
        # Join room group
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()
        await self.check_permission(
            permission_code="server.allow_data_synthesis", destination="Data Synthesis"
        )

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

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
            
    async def send_message_if_not_rate_limited(self, text_data):
        text_data_json = json.loads(text_data)
        if "swap_template" in text_data_json:
            try:
                data = AgentSchemaTemplate.model_validate_json(text_data)
                swap = data.swap_template
                template_type = data.template_type
                swap_template = await self.get_template(swap, template_type)
                child_template = await self.get_child_template_list(
                    swap_template, template_type
                )
                swap_instruction = swap_template.instruct
                await self.send(
                    text_data=json.dumps(
                        {
                            "message": f"Swap to {swap_template.displayed_name}",
                            "role": "Server",
                            "time": self.time,
                        }
                    )
                )
                await self.send(
                    text_data=json.dumps(
                        {
                            "swap_instruction": swap_instruction,
                            "child_template_name_list": child_template["name_list"],
                            "child_template_displayed_name_list": child_template[
                                "displayed_name_list"
                            ],
                            "child_template_instruct_list": child_template[
                                "instruct_list"
                            ],
                        }
                    )
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
        else:
            try:
                validated = DataSynthesisSchema.model_validate_json(text_data)
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
                        self.room_group_name,
                        {
                            "type": "chat_message",
                            "message": self.seed_prompt,
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
        await self.inference()
