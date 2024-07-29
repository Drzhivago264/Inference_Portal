import json
import uuid

import pytz

from channels.generic.websocket import AsyncWebsocketConsumer
from django.utils import timezone
from pydantic import ValidationError
from transformers import AutoTokenizer

from server.consumers.pydantic_validator import (AgentSchemaInstruct,
                                                 AgentSchemaMessage,
                                                 AgentSchemaParagraph,
                                                 AgentSchemaTemplate)
from server.utils.async_.async_inference import (AsyncInferenceOpenaiMixin,
                                                 AsyncInferenceVllmMixin)
from server.utils.async_.async_query_database import QueryDBMixin


class Consumer(
    AsyncWebsocketConsumer,
    AsyncInferenceOpenaiMixin,
    AsyncInferenceVllmMixin,
    QueryDBMixin,
):

    async def inference(self):
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
                    tokeniser = AutoTokenizer.from_pretrained(llm.base)
                    session_list_to_string = tokeniser.apply_chat_template(
                        self.session_history, tokenize=False
                    )
                    context = {
                        "prompt": session_list_to_string,
                        "n": 1,
                        "presence_penalty": float(self.presence_penalty),
                        "temperature": float(self.temperature),
                        "max_tokens": self.max_tokens,
                        "stream": True,
                        "top_p": float(self.top_p),
                        "frequency_penalty": float(self.frequency_penalty),
                    }
                    await self.send_vllm_request_async(llm=llm, context=context)
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
            await self.send(
                text_data=json.dumps(
                    {
                        "message": "Max Turns reached",
                        "stream_id": self.unique_response_id,
                        "credit": self.key_object.credit,
                    }
                )
            )
            await self.send(
                text_data=json.dumps(
                    {
                        "message": f"Reseting working memory",
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
        ).strftime("%Y-%m-%d %H:%M:%S")
        self.current_turn = 0
        self.session_history = []
        self.working_paragraph = ""
        self.is_session_start_node = None
        self.user = self.scope["user"]
        self.key_object, self.master_user = await self.get_master_key_and_master_user()
        self.choosen_model = ""
        self.room_group_name = "agent_%s" % self.url
        self.use_summary = False
        self.agent_instruction = ""
        self.child_instruction = ""
        self.p_type = "agent"
        # Join room group
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()
        is_authorised = await self.check_permission(
            permission_code="server.allow_agent", destination="Agents"
        )

        if is_authorised:
            await self.send(
                text_data=json.dumps(
                    {
                        "message": "You are currently using Celery backend. Default to GPT4 or choose model on the right.",
                        "role": "Server",
                        "time": self.time,
                    }
                )
            )
            await self.send(
                text_data=json.dumps(
                    {
                        "message": """Instruction to the user:\n1. Click on the paragraph that you want to work on, then give the agent instructions to write \n2. If you face any bug, refresh and retry.\n3. Shift-Enter to drop line in chatbox.\n4. You can export all paragraphs by clicking on [Export] on the left.""",
                        "role": "Server",
                        "time": self.time,
                    }
                )
            )

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    # Receive message from WebSocket

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        if "paragraph" in text_data_json:
            try:
                paragraph = AgentSchemaParagraph.model_validate_json(
                    text_data
                ).paragraph
                if self.working_paragraph != paragraph:
                    self.working_paragraph = paragraph
                    if not self.use_summary:
                        self.current_turn = 0
                        self.session_history = []
                        await self.send(
                            text_data=json.dumps(
                                {
                                    "message": f"Working on block {paragraph}, what do you want me to write?",
                                    "role": "Server",
                                    "time": self.time,
                                }
                            )
                        )
                    else:
                        await self.send(
                            text_data=json.dumps(
                                {
                                    "message": f"Working on block {paragraph}",
                                    "role": "Server",
                                    "time": self.time,
                                }
                            )
                        )
                    await self.send(text_data=json.dumps({"paragraph": paragraph}))

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
        elif "swap_template" in text_data_json:
            try:
                data = AgentSchemaTemplate.model_validate_json(text_data)
                swap = data.swap_template
                template_type = data.template_type
                swap_template = await self.get_template(swap, template_type)
                child_template = await self.get_child_template_list(
                    swap_template, template_type
                )
                swap_instruction = swap_template.instruct
                swap_template_ = swap_template.default_editor_template
                self.current_turn = 0
                self.session_history = []

                await self.send(
                    text_data=json.dumps(
                        {
                            "message": f"Swap to {swap_template.name if template_type == 'system' else swap_template.displayed_name}, what do you want me to write?",
                            "role": "Server",
                            "time": self.time,
                        }
                    )
                )
                await self.send(
                    text_data=json.dumps(
                        {
                            "swap_instruction": swap_instruction,
                            "swap_template": swap_template_,
                            "child_template_name_list": child_template["name_list"],
                            "child_template_displayed_name_list": (
                                []
                                if template_type == "system"
                                else child_template["displayed_name_list"]
                            ),
                            "default_child": child_template["default_child"],
                            "default_child_instruct": child_template[
                                "default_instruct"
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
        elif "swap_child_instruct" in text_data_json:
            try:
                data = AgentSchemaInstruct.model_validate_json(text_data)
                swap_child_instruct = data.swap_child_instruct
                template_type = data.template_type
                child_instruct = await self.get_template(
                    swap_child_instruct, template_type
                )
                child_instruct = child_instruct.instruct
                self.current_turn = 0
                self.session_history = []
                await self.send(
                    text_data=json.dumps({"child_instruct": child_instruct})
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
        elif "message" in text_data_json:
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
                    # Reset the working memory if the instruction(s) change
                    if validated.instruct_change and self.current_turn > 0:
                        self.current_turn = 0
                        self.session_history = []
                    self.agent_instruction = validated.agent_instruction
                    self.child_instruction = validated.child_instruction
                    self.working_paragraph = validated.currentParagraph
                    self.message = validated.message
                    self.choosen_model = validated.choosen_model
                    self.choosen_template = validated.choosen_template
                    self.role = validated.role
                    self.unique_response_id = str(uuid.uuid4())
                    self.top_p = validated.top_p
                    self.max_tokens = validated.max_tokens
                    self.frequency_penalty = validated.frequency_penalty
                    self.presence_penalty = validated.presence_penalty
                    self.temperature = validated.temperature
                    self.agent_instruction += self.child_instruction
                    self.max_turns = validated.max_turn
                    self.use_summary = (
                        True if self.choosen_template == "Interview Agent" else False
                    )
                    if not self.use_summary:
                        self.force_stop = "You should directly give results based on history information."
                    else:
                        self.force_stop = "You should directly give results based on history information. You must summary the interview log for the question with no more than 100 words."
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
