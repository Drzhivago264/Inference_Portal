import json
import uuid

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
                    if validated.instruct_change and self.current_turn > 0:
                        self.current_turn = 0
                        self.session_history = []
                    agent_instruction = validated.agent_instruction
                    child_instruction = validated.child_instruction
                    currentParagraph = validated.currentParagraph
                    self.working_paragraph = currentParagraph
                    message = validated.message
                    self.choosen_model = validated.choosen_model
                    choosen_template = validated.choosen_template
                    role = validated.role
                    unique_response_id = uuid.uuid4().hex
                    self.max_turns = validated.max_turn
                    context = {
                        "stream": True,
                        "top_p": validated.top_p,
                        "max_tokens": validated.max_tokens,
                        "frequency_penalty": validated.frequency_penalty,
                        "presence_penalty": validated.presence_penalty,
                        "temperature": validated.temperature,
                    }
                    agent_instruction += child_instruction
                    agent_inference.delay(
                        type_=self.type,
                        is_session_start_node=self.is_session_start_node,
                        unique=unique_response_id,
                        key=self.key_object.hashed_key,
                        message=message,
                        credit=self.key_object.credit,
                        room_group_name=self.room_group_name,
                        model=self.choosen_model,
                        max_turns=self.max_turns,
                        current_turn_inner=self.current_turn,
                        agent_instruction=agent_instruction,
                        session_history=self.session_history,
                        choosen_model=self.choosen_model,
                        context=context,
                    )
                    await self.channel_layer.group_send(
                        self.room_group_name,
                        {
                            "type": "chat_message",
                            "role": role,
                            "message": message,
                            "credit": self.key_object.credit,
                            "unique": unique_response_id,
                            "choosen_model": choosen_template,
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
            await self.send(
                text_data=json.dumps(
                    {
                        "message": f"Max Turns reached, click on the paragraphs on the left to write again",
                        "role": "Server",
                        "time": self.time,
                    }
                )
            )
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

        if "agent_action" in event:
            agent_action = event["agent_action"]
            if agent_action == "STOP":
                full_result = self.session_history[-1]["content"]
                full_result = full_result.replace('{"Action": "STOP"}', "")
                full_result = full_result.replace("Final Answer:", "")
                thought_match = re.findall("Thought: (.*)\n", full_result)
                full_result = full_result.replace(thought_match[0], "")
                full_result = full_result.replace("Thought:", "")
                full_result = full_result.replace("\n\n\n", "")
                await self.send(
                    text_data=json.dumps(
                        {
                            "message": f"Your request is finished, the result is moved to the textbox on the left",
                            "role": "Server",
                            "time": self.time,
                        }
                    )
                )
                await self.send(
                    text_data=json.dumps(
                        {
                            "agent_action": agent_action,
                            "result_id": self.working_paragraph,
                            "full_result": full_result,
                        }
                    )
                )
                self.session_history = []
                self.current_turn = 0
