
from celery import shared_task
from django.core.mail import send_mail
import random
import requests
from .models import  InferenceServer

from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
@shared_task
def boot_EC2():
    return

@shared_task
def sleep_EC2():
    return

@shared_task
def send_email_( subject, message, email_from, recipient_list):
    send_mail(subject, message, email_from, recipient_list)
    return

def get_model_url(model):
    avaiable_model_list = []

    try:
        model_list = list(InferenceServer.objects.filter(hosted_model__name=model))
        for m in model_list:
            if m.status == "on":
                avaiable_model_list.append(m)
        return avaiable_model_list
    except:
        return False
    
@shared_task
def chat_inference( credit, room_group_name, model, top_k, top_p, best_of, temperature, max_tokens, presense_penalty, frequency_penalty, length_penalty, early_stopping,beam,prompt):

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

        url_list = get_model_url(model) 
        if url_list:
            random_url = random.choice(url_list)
            url = random_url.url
            #test url for local dev
            #url = "http://127.0.0.1:8080/generate"
            try:
                response = requests.post(url,   json=context,  timeout=10 ) 
                response = response.json()['text']

        
            except requests.exceptions.Timeout:
                response = "Request Timeout, Cannot connect to the model"
            except:
                response = "You messed up the parameters. Return them to default."
        else:
            response = "Model is currentl offline"
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            room_group_name,
            {
                    "type": "chat_message", 
                    "role": model,
                    "message": response, 
                    'credit': credit
            }
        )
  