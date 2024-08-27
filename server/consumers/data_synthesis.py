import asyncio
import json

import httpx
import pytz
from constance import config as constant
from decouple import config
from django.utils import timezone
from pydantic import ValidationError

from server.models.llm_server import InferenceServer
from server.consumers.base_agent import BaseAgent
from server.consumers.pydantic_validator import DataSynthesisSchema
from server.models.log import PromptResponse
from server.queue.log_prompt_response import celery_log_prompt_response
from server.utils.async_.async_manage_ec2 import update_server_status_in_db_async


class Consumer(BaseAgent):

    def __init__(self):
        super().__init__()
        self.backend = None
        self.permission_code = "server.allow_data_synthesis"
        self.destination = "DataSynthesis"
        self.type = PromptResponse.PromptType.DATA_SYNTHESIS

    async def inference(self) -> None:
        self.time = timezone.localtime(
            timezone.now(), pytz.timezone(self.timezone)
        ).strftime("%Y-%m-%d %H:%M:%S")
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
            if llm.is_self_host:
                url, instance_id, server_status = await self.get_model_url_async()
                if url:
                    await update_server_status_in_db_async(
                        instance_id=instance_id, update_type="time"
                    )
                    if server_status == InferenceServer.StatusType.RUNNING:
                        headers = {
                            "Content-Type": "application/json",
                            "Authorization": f'Bearer {config("VLLM_KEY")}',
                        }
                        url = f"{url}/v1/chat/completions"
                    else:
                        await self.manage_ec2_on_inference(server_status, instance_id)
                        return
                else:
                    await self.send(
                        text_data=json.dumps(
                            {
                                "message": "Model is currently offline",
                                "stream_id": self.unique_response_id,
                                "credit": self.key_object.credit,
                            }
                        )
                    )
                    return
            else:
                headers = {
                    "Content-Type": "application/json",
                    "Authorization": f'Bearer {config("GPT_KEY")}',
                }
                url = "https://api.openai.com/v1/chat/completions"

            response_list = list()
            async with httpx.AsyncClient(timeout=constant.TIMEOUT) as client:
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
                            key_object_hashed_key=self.key_object.hashed_key,
                            llm_name=llm.name,
                            prompt=processed_instruction_list[index][0]["content"]
                            + processed_instruction_list[index][1]["content"],
                            response=r.json()["choices"][0]["message"]["content"],
                            type_=self.type,
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

    async def send_message_if_not_rate_limited(self, text_data):
        self.time = timezone.localtime(
            timezone.now(), pytz.timezone(self.timezone)
        ).strftime("%Y-%m-%d %H:%M:%S")
        text_data_json = json.loads(text_data)
        if not "swap_template" in text_data_json:
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
        self.time = timezone.localtime(
            timezone.now(), pytz.timezone(self.timezone)
        ).strftime("%Y-%m-%d %H:%M:%S")
        await self.inference()
