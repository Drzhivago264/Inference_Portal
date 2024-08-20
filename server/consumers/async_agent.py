import json

import pytz
from django.utils import timezone
from pydantic import ValidationError
from transformers import AutoTokenizer

from server.consumers.base_agent import BaseAgent
from server.consumers.pydantic_validator import AgentSchemaMessage
from server.models.log import PromptResponse


class Consumer(BaseAgent):

    def __init__(self):
        super().__init__()
        self.backend = "async"

    async def inference(self):
        self.time = timezone.localtime(
            timezone.now(), pytz.timezone(self.timezone)
        ).strftime("%Y-%m-%d %H:%M:%S")
        if self.current_turn >= 0 and self.current_turn <= (self.max_turns - 1):
            if self.current_turn == 0:
                prompt = [
                    {"role": "system", "content": f"{self.agent_instruction}"},
                    {"role": "user", "content": f"{self.message}"},
                ]
            elif self.current_turn > 0 and self.current_turn < (self.max_turns - 1):
                prompt = [{"role": "user", "content": f"Response: {self.message}"}]

            elif self.current_turn == (self.max_turns - 1):
                prompt = [
                    {"role": "user", "content": f"Response: {self.message}"},
                    {"role": "system", "content": f"Response: {self.force_stop}"},
                ]
            self.session_history.extend(prompt)
            llm = await self.get_model()
            if llm:
                if not llm.is_self_host:
                    await self.send_agent_request_openai_async(llm=llm)
                else:
                    await self.send_agent_request_vllm_async(llm=llm)
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
        else:
            self.session_history = []
            self.current_turn = 0
            await self.send_message_max_turn_reach()

    async def send_message_if_not_rate_limited(self, text_data):
        text_data_json = json.loads(text_data)
        self.time = timezone.localtime(
            timezone.now(), pytz.timezone(self.timezone)
        ).strftime("%Y-%m-%d %H:%M:%S")
        if "message" in text_data_json:
            try:
                validated = AgentSchemaMessage.model_validate_json(text_data)
                if not self.key_object:
                    await self.send(
                        text_data=json.dumps(
                            {
                                "message": "Cannot find your key, disconnected! Refresh the page to try again",
                                "role": "Server",
                                "time": self.time,
                            }
                        )
                    )
                    await self.disconnect({"code": 3003})
                elif not text_data_json["message"].strip():
                    await self.send(
                        text_data=json.dumps(
                            {
                                "message": "Empty string recieved",
                                "role": "Server",
                                "time": self.time,
                            }
                        )
                    )
                elif self.key_object and text_data_json["message"].strip():
                    self.load_parameter(validated=validated)
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

    async def chat_message(self, event):
        self.time = timezone.localtime(
            timezone.now(), pytz.timezone(self.timezone)
        ).strftime("%Y-%m-%d %H:%M:%S")
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
                            "role": self.choosen_template,
                            "time": self.time,
                            "credit": credit,
                        }
                    )
                )
        else:
            await self.inference()
