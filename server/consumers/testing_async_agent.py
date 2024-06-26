import json
import uuid
from datetime import datetime
from django.core.cache import cache
from server.models import (
                           InstructionTree,
                           UserInstructionTree)
from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async
from server.utils import constant
from server.consumers.pydantic_validator import (
    AgentSchemaInstruct,
    AgentSchemaMessage,
    AgentSchemaParagraph,
    AgentSchemaTemplate,
)
import regex as re
from pydantic import ValidationError
from server.utils.async_.async_agent_inference import async_agent_inference
from server.utils.async_.async_agent_inference_with_summary import async_agent_inference_with_summary
import pytz
from django.utils import timezone


class Consumer(AsyncWebsocketConsumer):

    async def get_template(self, name, template_type):
        try:
            if template_type == 'system':
                template = await InstructionTree.objects.aget(name=name)
            elif template_type == 'user_template':
                template = await UserInstructionTree.objects.aget(displayed_name=name, user=self.user)
            return template
        except InstructionTree.DoesNotExist or UserInstructionTree.DoesNotExist:
            return False

    @database_sync_to_async
    def get_child_template_list(self, template, template_type="system"):
        try:
            if template_type == 'system':
                child_template = InstructionTree.objects.get(
                    name=template).get_leafnodes()
                return {"name_list": [c.name for c in child_template], "default_child": child_template[0].name, "default_instruct": child_template[0].instruct}
            elif template_type == 'user_template':
                child_template = UserInstructionTree.objects.get(
                    displayed_name=template.displayed_name).get_leafnodes()
                if len(child_template) > 0:
                    return {"name_list": [c.displayed_name for c in child_template], "default_child": child_template[0].displayed_name, "default_instruct": child_template[0].instruct}
                else:
                    return {"name_list": [], "default_child": "", "default_instruct": ""}
        except Exception as e:
            return e

    async def connect(self):
        self.url = self.scope["url_route"]["kwargs"]["key"]
        self.timezone = self.scope["url_route"]["kwargs"]["tz"]
        self.time = timezone.localtime(timezone.now(), pytz.timezone(
            self.timezone)).strftime('%Y-%m-%d %H:%M:%S')
        self.current_turn = 0
        self.session_history = []
        self.working_paragraph = ""
        self.is_session_start_node = True
        self.user = self.scope['user']
        self.key_object = await sync_to_async(lambda: self.user.apikey)()
        self.model_type = ""
        self.room_group_name = "agent_%s" % self.url
        self.use_summary = False
        self.agent_instruction = ""
        self.child_instruction = ""
        # Join room group
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()
        await self.send(text_data=json.dumps({"message": "You are currently using async backend. Default to GPT4 or choose model on the right.", "role": "Server", "time": self.time}))
        await self.send(text_data=json.dumps({"message": "Instruction to the user:\n1. Click on the paragraph that you want to work on, then give the agent instructions to write \n2. If you face any bug, refresh and retry.\n3. Shift-Enter to drop line in chatbox.\n4. You can export all paragraphs by clicking on [Export] on the left.",
                                              "role": "Server", "time": self.time}))

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)
    # Receive message from WebSocket

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        if 'paragraph' in text_data_json:
            try:
                paragraph = AgentSchemaParagraph.model_validate_json(
                    text_data).paragraph
                if self.working_paragraph != paragraph:
                    self.working_paragraph = paragraph
                    if not self.use_summary:
                        self.current_turn = 0
                        self.session_history = []
                        await self.send(text_data=json.dumps({"message": f"Working on block {paragraph}, what do you want me to write?", "role": "Server", "time": self.time}))
                    else:
                        await self.send(text_data=json.dumps({"message": f"Working on block {paragraph}", "role": "Server", "time": self.time}))
                    await self.send(text_data=json.dumps({"paragraph": paragraph}))

            except ValidationError as e:
                await self.send(text_data=json.dumps({"message": f"Error: {e.errors()}", "role": "Server", "time": self.time}))
        elif 'swap_template' in text_data_json:
            try:
                data = AgentSchemaTemplate.model_validate_json(
                    text_data)
                swap = data.swap_template
                template_type = data.template_type
                swap_template = await self.get_template(swap, template_type)
                child_template = await self.get_child_template_list(swap_template, template_type)
                swap_instruction = swap_template.instruct
                swap_template_ = swap_template.default_editor_template
                self.current_turn = 0
                self.session_history = []

                await self.send(text_data=json.dumps({"message": f"Swap to {text_data_json['swap_template']}, what do you want me to write?", "role": "Server", "time": self.time}))
                await self.send(text_data=json.dumps({"swap_instruction": swap_instruction,
                                                      "swap_template": swap_template_,
                                                      "child_template_name_list": child_template['name_list'],
                                                      "default_child": child_template['default_child'],
                                                      "default_child_instruct": child_template['default_instruct']}))
            except ValidationError as e:
                await self.send(text_data=json.dumps({"message": f"Error: {e.errors()}", "role": "Server", "time": self.time}))
        elif 'swap_child_instruct' in text_data_json:         
            try:
                data = AgentSchemaInstruct.model_validate_json(text_data)
                swap_child_instruct = data.swap_child_instruct
                template_type = data.template_type
                child_instruct = await self.get_template(swap_child_instruct, template_type)
                child_instruct = child_instruct.instruct
                self.current_turn = 0
                self.session_history = []
                await self.send(text_data=json.dumps({"child_instruct": child_instruct}))
            except ValidationError as e:
                await self.send(text_data=json.dumps({"message": f"Error: {e.errors()}", "role": "Server", "time": self.time}))
        elif 'message' in text_data_json:
            try:
                validated = AgentSchemaMessage.model_validate_json(text_data)
                if not self.key_object:
                    await self.send(text_data=json.dumps({"message": "Cannot find your key, disconnected! Refresh the page to try again", "role": "Server", "time": self.time}))
                    await self.disconnect(self)
                elif not text_data_json["message"].strip():
                    await self.send(text_data=json.dumps({"message": "Empty string recieved", "role": "Server", "time": self.time}))
                elif self.key_object and text_data_json["message"].strip():
                    #Reset the working memory if the instruction(s) change
                    if validated.instruct_change and self.current_turn > 0:
                        self.current_turn = 0
                        self.session_history = []
                    self.agent_instruction = validated.agent_instruction
                    self.child_instruction = validated.child_instruction
                    self.working_paragraph = validated.currentParagraph
                    self.message = validated.message
                    self.model_type = validated.choosen_models
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
                    self.use_summary = True if self.choosen_template == "Interview Agent" else False
                    await self.channel_layer.group_send(
                        self.room_group_name, {"type": "chat_message",
                                               "role": self.role,
                                               "message": self.message,
                                               }
                    )
                    await self.channel_layer.group_send(
                        self.room_group_name, {"type": "chat_message",
                                               'message': self.message,
                                               'role': self.model_type,
                                               }
                    )
            except ValidationError as e:
                await self.send(text_data=json.dumps({"message": f"Error: {e.errors()}", "role": "Server", "time": self.time}))

    async def chat_message(self, event):
        message = event["message"]
        role = event["role"]
        self.time = timezone.localtime(timezone.now(), pytz.timezone(
            self.timezone)).strftime('%Y-%m-%d %H:%M:%S')
        # Send message to WebSocket
        if role == "Human" or role == "Server":
            credit = self.key_object.credit
            await self.send(text_data=json.dumps({"message": "\n" + message, "role": role,  "time": self.time}))
            if role == "Human":
                unique_response_id = self.unique_response_id
                await self.send(text_data=json.dumps({"holder": "place_holder",  "holderid":  unique_response_id, "role": self.choosen_template, "time": self.time, "credit": credit}))
        else:
            if not self.use_summary:
                await async_agent_inference(self)
            else:
                await async_agent_inference_with_summary(self)
            self.is_session_start_node = False
