import json
from datetime import datetime
import requests
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from .models import Price, Product, Key, LLM
from channels.db import database_sync_to_async
class ChatConsumer(WebsocketConsumer):
    def check_key(self):
        try:
            key = Key.objects.get(key=self.key, owner =self.name)
            return key
        except:
            return False

    def inference(self, model, prompt):
        context = {
            "prompt": prompt,
            "n": 1,
            'presence_penalty': 1.1,
            "use_beam_search": False,
            "temperature": 0.72,
            "max_tokens": 128,
            "stream": False,
            "top_k": -1,
            "top_p": 0.73
        }
        response = requests.post("http://127.0.0.1:8080/generate",   json=context ) 
        return response.json()['text']
        
    def connect(self):
        self.name = self.scope["url_route"]["kwargs"]["name"]
        self.key = self.scope["url_route"]["kwargs"]["key"]
        self.time = datetime.today().strftime('%Y-%m-%d %H:%M:%S')
        key_object = self.check_key()
        self.room_group_name = "chat_%s" % self.name + self.key

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name, self.channel_name
        )
        self.accept()
        
        if  key_object == False:
            self.send(text_data=json.dumps({"message": "Your key or key name is wrong, disconnected!", "role": "Server", "time":self.time}))
            self.disconnect(self) 
        else:
            self.send(text_data=json.dumps({"message": f"Your credit is {key_object.credit}","role": "Server", "time":self.time}))
            
    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name, self.channel_name
        )

    # Receive message from WebSocket
    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]
        choosen_models = text_data_json["choosen_models"]
        
        role = text_data_json["role"]
        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name, {"type": "chat_message", "role":role  ,"message": message, "model":choosen_models}
        )

    # Receive message from room group
    def chat_message(self, event):
        message = event["message"]
        role = event["role"]
        model = event['model']
        self.time = datetime.today().strftime('%Y-%m-%d %H:%M:%S')
        # Send message to WebSocket
        self.send(text_data=json.dumps({"message": message, "role":role,  "time":self.time}))
        response = self.inference(model, message)
        self.send(text_data=json.dumps({"message": response, "role": model,  "time":self.time}))