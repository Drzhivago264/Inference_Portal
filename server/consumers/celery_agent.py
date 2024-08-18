import json

import pytz
import regex as re
from django.utils import timezone
from pydantic import ValidationError

from server.consumers.base_agent import BaseAgent
from server.consumers.pydantic_validator import AgentSchemaMessage
from server.queue.model_inference import agent_inference


class Consumer(BaseAgent):

    def __init__(self):
        super().__init__()
        self.backend = "Celery"

    # Receive message from WebSocket
    async def send_message_if_not_rate_limited(self, text_data):

        text_data_json = json.loads(text_data)
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

                    context = {
                        "stream": True,
                        "top_p": self.top_p,
                        "max_tokens": self.max_tokens,
                        "frequency_penalty": self.frequency_penalty,
                        "presence_penalty": self.presence_penalty,
                        "temperature": self.temperature,
                    }
                    agent_inference.delay(
                        type_=self.type,
                        is_session_start_node=self.is_session_start_node,
                        unique=self.unique_response_id,
                        key=self.key_object.hashed_key,
                        message=self.message,
                        credit=self.key_object.credit,
                        room_group_name=self.room_group_name,
                        model=self.choosen_model,
                        max_turns=self.max_turns,
                        current_turn_inner=self.current_turn,
                        agent_instruction=self.agent_instruction,
                        session_history=self.session_history,
                        choosen_model=self.choosen_model,
                        context=context,
                        force_stop=self.force_stop,
                    )
                    await self.channel_layer.group_send(
                        self.room_group_name,
                        {
                            "type": "chat_message",
                            "role": self.role,
                            "message": self.message,
                            "credit": self.key_object.credit,
                            "unique": self.unique_response_id,
                            "choosen_model": self.choosen_template,
                            "current_turn": self.current_turn,
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
        if "max_turn_reached" in event:
            self.session_history = []
            self.current_turn = 0
            await self.send_message_max_turn_reach()

        if "session_history" in event:
            self.session_history = event["session_history"]
            self.current_turn = event["current_turn"]
        if "message" in event:
            message = event["message"]
            role = event["role"]
            credit = event["credit"]
            self.time = timezone.localtime(
                timezone.now(), pytz.timezone(self.timezone)
            ).strftime("%Y-%m-%d %H:%M:%S")
            # Send message to WebSocket
            if role == "Human" or role == "Server":
                await self.send(
                    text_data=json.dumps(
                        {"message": "\n" + message, "role": role, "time": self.time}
                    )
                )
                if role == "Human":
                    unique_response_id = event["unique"]
                    await self.send(
                        text_data=json.dumps(
                            {
                                "holder": "place_holder",
                                "holderid": unique_response_id,
                                "role": event["choosen_model"],
                                "time": self.time,
                                "credit": credit,
                            }
                        )
                    )
            else:
                unique_response_id = event["unique"]
                await self.send(
                    text_data=json.dumps(
                        {
                            "message": message,
                            "stream_id": unique_response_id,
                            "credit": credit,
                        }
                    )
                )

        if "action_list" in event:
            action_list = event["action_list"]
            full_response = event["full_response"]
            await self.execute_action(action_list, full_response)
