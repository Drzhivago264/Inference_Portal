import json
import uuid
from datetime import datetime
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from django.core.cache import cache
from .models import Price, Product,  LLM, InferenceServer, CustomTemplate, APIKEY
from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from .celery_tasks import send_email_, Inference, Agent_Inference
from decouple import config
from .util import constant
import requests
import re

class ChatConsumer(AsyncWebsocketConsumer):
    @database_sync_to_async
    def check_key(self):
        try:
            key = APIKEY.objects.get_from_key(self.key) 
            return key
        except:
            return False
    async def connect(self):
        self.url = self.scope["url_route"]["kwargs"]["key"]
        self.time = datetime.today().strftime('%Y-%m-%d %H:%M:%S')
        self.room_group_name = "chat_%s" %  self.url
        # Join room group
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()
        await self.send(text_data=json.dumps({"message": "Default to Mistral Chat 13B or choose model on the left","role": "Server", "time":self.time}))          
    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)
    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        self.key = text_data_json["key"]
        key_object = cache.get(f"{self.key}")
        if key_object == None:
            key_object = await self.check_key()
        
        if  key_object == False:
            await self.send(text_data=json.dumps({"message": "Your key or key name is wrong, disconnected! Refresh the page to try again", "role": "Server", "time":self.time}))
            await self.disconnect(self) 
        else:
            cache.set(f"{self.key}", key_object, constant.CACHE_AUTHENTICATION)
            mode = text_data_json["mode"]
            message = text_data_json["message"]            
            top_p= text_data_json["top_p"]
            best_of = text_data_json["best_of"]
            top_k = text_data_json["top_k"]
            max_tokens = text_data_json["max_tokens"]
            frequency_penalty = text_data_json["frequency_penalty"]
            presence_penalty = text_data_json["presence_penalty"]
            temperature = text_data_json["temperature"]
            beam = text_data_json["beam"]
            early_stopping = text_data_json["early_stopping"]
            length_penalty = text_data_json["length_penalty"]
            choosen_models = text_data_json["choosen_models"]
            role = text_data_json["role"]
            unique_response_id = str(uuid.uuid4())
            # Send message to room group
            await self.channel_layer.group_send(
                    self.room_group_name, {"type": "chat_message", 
                        "role":role  ,
                        "message": message, 
                        "credit": key_object.credit,
                        "unique": unique_response_id,
                        "choosen_model": choosen_models          
                    }
                ) 
            Inference.delay(unique=unique_response_id,
                            mode = mode, 
                            type_ = "chatroom", 
                            stream = True, 
                            key=self.key,
                            key_name = key_object.name, 
                            credit = key_object.credit, 
                            room_group_name = self.room_group_name, 
                            model = choosen_models, 
                            top_k=top_k, 
                            top_p =top_p, 
                            best_of =best_of, 
                            temperature =temperature, 
                            max_tokens = max_tokens, 
                            presence_penalty =presence_penalty, 
                            frequency_penalty = frequency_penalty, 
                            length_penalty = length_penalty, 
                            early_stopping = early_stopping,
                            beam = beam,
                            prompt=message)
    # Receive message from room group
    async def chat_message(self, event):
        message = event["message"]
        role = event["role"]
        credit = event["credit"]
        self.time = datetime.today().strftime('%Y-%m-%d %H:%M:%S')
        # Send message to WebSocket
        if role == "Human" or role =="Server":
            await self.send(text_data=json.dumps({"message": message, "role":role,  "time":self.time}))
            if role == "Human": 
                unique_response_id = event['unique']
                await self.send(text_data=json.dumps({"holder": "place_holder", "holderid":  unique_response_id,"role":event['choosen_model'], "time":self.time, "credit":credit }))
            else:
                pass
        else:
            unique_response_id = event['unique']
           
            await self.send(text_data=json.dumps({"message": message, "stream_id":  unique_response_id, "credit":credit}))

class AgentConsumer(AsyncWebsocketConsumer):
    @database_sync_to_async
    def check_key(self):
            try:
                key = APIKEY.objects.get_from_key(self.key) 

                return key

            except:
                return False
        
    @database_sync_to_async
    def get_tempalte(self, name):
        try:
            template = CustomTemplate.objects.get(template_name=name)
            return template
        except:
            return False
        
    async def connect(self):
        self.url = self.scope["url_route"]["kwargs"]["key"]
        self.time = datetime.today().strftime('%Y-%m-%d %H:%M:%S')
        self.max_turns = 4
        self.current_turn = 0
        self.session_history = []
        self.working_paragraph = str()
        self.model_type = ""
        self.room_group_name = "agent_%s" %  self.url
        # Join room group
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()
        await self.send(text_data=json.dumps({"message": "Default to GPT4 or choose model on the left","role": "Server", "time":self.time}))    
        await self.send(text_data=json.dumps({"message": "Instruction to the user: \n 1. Click on the paragraph that you want to work on, then give the agent instructions to write \n 2. If you face any bug, refresh and retry. \n 3. You can export all paragraphs by clicking on [Export Document] button on the right.","role": "Server", "time":self.time}))         
    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)        
    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        if 'paragraph' in text_data_json:
            paragraph = text_data_json['paragraph']
            self.working_paragraph = paragraph
            self.current_turn = 0
            await self.channel_layer.group_send(
                self.room_group_name, {
                    "type": "chat_message", 
                    "paragraph":paragraph,
                    "current_turn": self.current_turn  
                }
        ) 
        elif 'swap_template' in text_data_json:
            swap_template = await self.get_tempalte(text_data_json['swap_template'])
            swap_instruction = swap_template.bot_instruct
            swap_template_ = swap_template.template
            await self.channel_layer.group_send(
            self.room_group_name, {
                "type": "chat_message", 
                "swap_name": text_data_json['swap_template'],
                "swap_instruction":swap_instruction,
                "swap_template": swap_template_  
            }
        )
        elif 'message' in text_data_json:
            self.key = text_data_json["key"]
            key_object = cache.get(f"{self.key}")
            if key_object == None:
                key_object = await self.check_key()
            
            if  key_object == False:
                await self.send(text_data=json.dumps({"message": "Your key or key name is wrong, disconnected! Refresh the page to try again", "role": "Server", "time":self.time}))
                await self.disconnect(self) 
            else:
                cache.set(f"{self.key}", key_object, constant.CACHE_AUTHENTICATION)
                agent_instruction = text_data_json['agent_instruction']
                current_turn_inner = self.current_turn
                currentParagraph = text_data_json['currentParagraph']
                self.working_paragraph = currentParagraph
                message = text_data_json["message"]                  
                self.model_type = text_data_json["choosen_models"]
                choosen_template = text_data_json["choosen_template"]
                role = text_data_json["role"]
                unique_response_id = str(uuid.uuid4())

                top_p= float(text_data_json["top_p"])
                max_tokens = int(text_data_json["max_tokens"]) if len(text_data_json["max_tokens"]) > 0 else None
                frequency_penalty = float(text_data_json["frequency_penalty"])
                presence_penalty = float(text_data_json["presence_penalty"])
                temperature = float(text_data_json["temperature"])

                Agent_Inference.delay(unique=unique_response_id, 
                                      stream = True,
                                      message= message,
                                      credit = key_object.credit, 
                                      room_group_name = self.room_group_name,
                                      model = choosen_template,
                                      max_turns = self.max_turns,
                                      current_turn_inner = current_turn_inner,
                                      agent_instruction=agent_instruction,
                                      session_history = self.session_history,
                                      model_type = self.model_type,
                                      
                                      frequency_penalty = frequency_penalty,
                                      top_p=top_p,
                                      max_tokens=max_tokens,
                                      temperature=temperature,
                                      presence_penalty = presence_penalty,

                                      )
         
                await self.channel_layer.group_send(
                        self.room_group_name, {"type": "chat_message", 
                            "role":role  ,
                            "message": message, 
                            "credit": key_object.credit,
                            "unique": unique_response_id,
                            "choosen_model":  choosen_template,
                            "current_turn": current_turn_inner            
                        }
                    )         
    # Receive message from room group      
    async def chat_message(self, event):
        if "max_turn_reached" in event:
            await self.send(text_data=json.dumps({"message": f"Max Turns reached, click on the paragraphs on the left to write again","role": "Server", "time":self.time})) 
        if "session_history" in event:
            self.session_history = event['session_history']
            self.current_turn = event['current_turn']

        if "message" in event:
            message = event["message"]
            role = event["role"]
            credit = event["credit"]
            self.time = datetime.today().strftime('%Y-%m-%d %H:%M:%S')
            # Send message to WebSocket
            if role == "Human" or role =="Server":
                await self.send(text_data=json.dumps({"message": message, "role":role,  "time":self.time}))
                if role == "Human": 
                    unique_response_id = event['unique']
                    await self.send(text_data=json.dumps({"holder": "place_holder",  "holderid":  unique_response_id,"role":event['choosen_model'], "time":self.time, "credit":credit }))
                else:
                    pass
            else:
                unique_response_id = event['unique']        
                await self.send(text_data=json.dumps({"message": message,  "stream_id":  unique_response_id, "credit":credit}))

        elif "paragraph" in event:
            paragraph = event['paragraph']
            self.current_turn = event['current_turn']
            self.session_history = []
            displayed_paragraph = paragraph.replace("_choosen","")
            await self.send(text_data=json.dumps({"message": f"Working on {displayed_paragraph}, what do you want me to write?","role": "Server", "time":self.time}))  
            await self.send(text_data=json.dumps({"paragraph":paragraph}))

        if "agent_action" in event:
            agent_action = event['agent_action']

            if agent_action == "STOP":
                full_result = self.session_history[-1]['content']
                full_result = full_result.replace("/ACTION: STOP/", "")
                full_result = full_result.replace("Final Answer:", "")
                thought_match = re.findall("Thought: (.*)\n", full_result)
                full_result = full_result.replace(thought_match[0],"")
                full_result = full_result.replace("Thought:","")
                await self.send(text_data=json.dumps({"message": f"Your request is finished, the result is moved to the textbox on the left","role": "Server", "time":self.time})) 
                await self.send(text_data=json.dumps({"agent_action": agent_action, "result_id": self.working_paragraph + "_text"  ,"full_result": full_result}))
                self.session_history = []
                self.current_turn = 0

        if "swap_template" in event:
            swap_template_name = event['swap_name']
            swap_instruction = event['swap_instruction']
            swap_template = event['swap_template']
            await self.send(text_data=json.dumps({"message": f"Swap to {swap_template_name}, what do you want me to write?","role": "Server", "time":self.time}))  
            await self.send(text_data=json.dumps({"swap_instruction":swap_instruction,
                                                  "swap_template": swap_template}))