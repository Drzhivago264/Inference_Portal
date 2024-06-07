from vllm import LLM, SamplingParams
import json
import requests
from django.utils import timezone

import requests
import multiprocessing as mp

from decouple import config
import boto3
from botocore.exceptions import ClientError

promtp= "hehe"
context = {
  "prompt": "You are a communist who love hamberger, write an Mcdonald advertisement",
  "model": "Llama 3 Instruct AWQ",
  "top_p": 0.73,
  "top_k": -1,
  "temperature": 0.73,
  "beam": False,
  "best_of": 1,
  "max_tokens":7000,
  "presence_penalty": 0,
  "frequency_penalty": 0,
  "length_penalty": 0,
  "early_stopping": False,
  "n": 1,
  "stream": True,
  "include_memory": False
}

ami = "ami-0810c2d824776b340"

""" with mp.Pool(1) as pool:
  for result in pool.map(send_req, range(10000)):
      print(f'Got result: {result}', flush=True) """

response = requests.post("https://professorparakeet.com/api/chat", json=context, headers = {'Authorization': 'Bearer SFCOtWDw.OsDYax0ulbQI1r3fJYE60T5o6XRdeXI6'}
                         , stream = True ) 
previous_output = str()
for chunk in response.iter_lines():
    if chunk:
        print(chunk)



