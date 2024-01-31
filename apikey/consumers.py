import json
from datetime import datetime
import requests
from asgiref.sync import async_to_sync
import random
from channels.generic.websocket import WebsocketConsumer
from .models import Price, Product, Key, LLM, InferenceServer
from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
import aiohttp
import asyncio
from .celery_tasks import boot_EC2, sleep_EC2, send_email_, chat_inference
class ChatConsumer(AsyncWebsocketConsumer):
    @database_sync_to_async
    def check_key(self):
        try:
            key = Key.objects.get(key=self.key, owner =self.name)
            return key
        except:
            return False
                
    async def connect(self):
        self.key = self.scope["url_route"]["kwargs"]["key"]
        self.time = datetime.today().strftime('%Y-%m-%d %H:%M:%S')
       
        self.room_group_name = "chat_%s" %  self.key

        # Join room group
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        
        await self.accept()
        await self.send(text_data=json.dumps({"message": "Input your Key name in the box.", "role": "Server", "time":self.time}))
        

            
    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

        
    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)

        self.name = text_data_json["name"]
        
        key_object = await self.check_key()
        if  key_object == False:
            await self.send(text_data=json.dumps({"message": "Your key or key name is wrong, disconnected!", "role": "Server", "time":self.time}))
            await self.disconnect(self) 
        else:
            await self.send(text_data=json.dumps({"message": f"Your credit is {key_object.credit}","role": "Server", "time":self.time}))
            await self.send(text_data=json.dumps({"message": "Default to Llama Chat 7B or choose model on the left","role": "Server", "time":self.time}))
            
        
            message = text_data_json["message"]
            
            top_p= text_data_json["top_p"]
            best_of = text_data_json["best_of"]
            top_k = text_data_json["top_k"]
            max_tokens = text_data_json["max_tokens"]
            frequency_penalty = text_data_json["frequency_penalty"]
            presense_penalty = text_data_json["presense_penalty"]
            temperature = text_data_json["temperature"]
            beam = text_data_json["beam"]
            early_stopping = text_data_json["early_stopping"]
            length_penalty = text_data_json["length_penalty"]
            choosen_models = text_data_json["choosen_models"]
            role = text_data_json["role"]
            chat_inference.delay(room_group_name = self.room_group_name, model = choosen_models, top_k=top_k, top_p =top_p, best_of =best_of, temperature =temperature, max_tokens = max_tokens, presense_penalty =presense_penalty, frequency_penalty = frequency_penalty, length_penalty = length_penalty, early_stopping = early_stopping,beam = beam, prompt=message)
            # Send message to room group
            await self.channel_layer.group_send(
                    self.room_group_name, {"type": "chat_message", 
                        "role":role  ,
                        "message": message, 
                    }
                ) 

    # Receive message from room group
    async def chat_message(self, event):
        message = event["message"]
        role = event["role"]
        self.time = datetime.today().strftime('%Y-%m-%d %H:%M:%S')
        # Send message to WebSocket
        await self.send(text_data=json.dumps({"message": message, "role":role,  "time":self.time}))
        #response = await self.inference(model=model, top_k=top_k, top_p = top_p,best_of = best_of, temperature=temperature, max_tokens=max_tokens, frequency_penalty=frequency_penalty, presense_penalty=presense_penalty, beam=beam, length_penalty=length_penalty, early_stopping=early_stopping,prompt=message)
        #await self.send(text_data=json.dumps({"message": response, "role": model,  "time":self.time}))