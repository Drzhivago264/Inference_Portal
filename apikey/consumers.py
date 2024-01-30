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
class ChatConsumer(AsyncWebsocketConsumer):
    @database_sync_to_async
    def check_key(self):
        try:
            key = Key.objects.get(key=self.key, owner =self.name)
            return key
        except:
            return False
        
    @database_sync_to_async
    def get_model_url(self, model):
        avaiable_model_list = []

        try:
            model_list = list(InferenceServer.objects.filter(hosted_model__name=model))
            for m in model_list:
                if m.status == "on":
                    avaiable_model_list.append(m)
            return avaiable_model_list
        except:
            return False

    async def inference(self, model, top_k, top_p, best_of, temperature, max_tokens, presense_penalty, frequency_penalty, length_penalty, early_stopping,beam,prompt):
        if beam == "false":
            beam = False
            length_penalty = 1
            early_stopping = False
            best_of = int(1)
        else:
            beam = True
            best_of = int(best_of)
            length_penalty = float(length_penalty)
            if early_stopping == "true":
                early_stopping = True
            else:
                early_stopping = True       
            
        context = {
            "prompt": prompt,
            "n": 1,
            'best_of': best_of,
            'presence_penalty': float(presense_penalty),
            "use_beam_search": beam,
            "temperature": float(temperature),
            "max_tokens": int(max_tokens),
            "stream": False,
            "top_k": float(top_k),
            "top_p": float(top_p),
            "length_penalty": float(length_penalty),
            "frequency_penalty": float(frequency_penalty),
            "early_stopping": early_stopping,
            
        }
        ''' Query a list of inference servers for a given model, pick a random one '''

        url_list = await self.get_model_url(model) 
        if url_list:
            random_url = random.choice(url_list)
            url = random_url.url
            #test url for local dev
            #url = "http://127.0.0.1:8080/generate"
            try:
                async with aiohttp.ClientSession() as session:
                    timeout = aiohttp.ClientTimeout(total=15)
                    r = await session.post(url=url, timeout = timeout,
                                                json=context,
                                                headers={"Content-Type": "application/json"})
                    try:
                        response = (await r.json())['text'][0]
                        return response
                    except:
                        return "You messed up the parameters. Return them to default."
        
            except aiohttp.ClientConnectorError:
                return "Connection Error. Cannot communicate with the model."
            except asyncio.TimeoutError: 
                return "Request Time Out. Cannot communicate with the model."
        else:
            return "Model is currentl offline"
        
        
    async def connect(self):
        self.name = self.scope["url_route"]["kwargs"]["name"]
        self.key = self.scope["url_route"]["kwargs"]["key"]
        self.time = datetime.today().strftime('%Y-%m-%d %H:%M:%S')
        key_object = await self.check_key()
        self.room_group_name = "chat_%s" % self.name + self.key

        # Join room group
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        
        await self.accept()
        
        if  key_object == False:
            await self.send(text_data=json.dumps({"message": "Your key or key name is wrong, disconnected!", "role": "Server", "time":self.time}))
            await self.disconnect(self) 
        else:
            await self.send(text_data=json.dumps({"message": f"Your credit is {key_object.credit}","role": "Server", "time":self.time}))
            await self.send(text_data=json.dumps({"message": "Default to Llama Chat 7B or choose model on the left","role": "Server", "time":self.time}))
            
    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

        
    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
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
        print(choosen_models)
        role = text_data_json["role"]
        # Send message to room group
        await self.channel_layer.group_send(
                self.room_group_name, {"type": "chat_message", 
                    "role":role  ,
                    "message": message, 
                    "model":choosen_models, 
                    'top_k': top_k,
                    'top_p': top_p,
                    'best_of': best_of,
                    'max_tokens': max_tokens,
                    'frequency_penalty': frequency_penalty,
                    'presense_penalty': presense_penalty,
                    'temperature': temperature,
                    'beam': beam,
                    'early_stopping': early_stopping,
                    'length_penalty': length_penalty }
            )

    # Receive message from room group
    async def chat_message(self, event):
        message = event["message"]
        role = event["role"]
        model = event['model']
        top_p= event["top_p"]
        best_of = event["best_of"]
        top_k = event["top_k"]
        max_tokens = event["max_tokens"]
        frequency_penalty = event["frequency_penalty"]
        presense_penalty = event["presense_penalty"]
        temperature = event["temperature"]
        beam = event["beam"]
        early_stopping = event["early_stopping"]
        length_penalty = event["length_penalty"]
        self.time = datetime.today().strftime('%Y-%m-%d %H:%M:%S')
        # Send message to WebSocket
        await self.send(text_data=json.dumps({"message": message, "role":role,  "time":self.time}))
        response = await self.inference(model=model, top_k=top_k, top_p = top_p,best_of = best_of, temperature=temperature, max_tokens=max_tokens, frequency_penalty=frequency_penalty, presense_penalty=presense_penalty, beam=beam, length_penalty=length_penalty, early_stopping=early_stopping,prompt=message)
        await self.send(text_data=json.dumps({"message": response, "role": model,  "time":self.time}))