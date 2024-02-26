from vllm import LLM, SamplingParams
import json
import requests
from django.utils import timezone

import requests

from decouple import config
import boto3
from botocore.exceptions import ClientError
from util import constant


promtp= "hehe"
context = {
 "prompt": "hola",
  "name": "test",
  "key": "test",
  "stream" : True
  
}
model = "Mistral Chat 13B"
template = constant.MODEL_TEMPLATE_TABLE[model]
ami = "ami-0810c2d824776b340"




""" print(template.format(promtp))
for i in range(2):
    response = requests.post("http://127.0.0.1:8000/api/",   json=context ) 
    print(response.json())
 """
p = """Below is an instruction that describes a task. Write a response that appropriately completes the request.

### Instruction:
a


### Response:

Hi,


Please enter your name and email address.


### Response:


Hi,


Please enter your name and email address.


### Response:


Hi,


Please enter your name and email address.


### Response:


Hi,


Please enter your name and email address.


### Response:


Hi,


Please enter your name and email address.


### Response:


Hi,


Please enter your name and email address.


### Response:



"""
response = requests.post("http://44.212.91.252/generate",   json={ "prompt": p, "max_tokens": 2024,  "temperature": 0, "stream" : True}
                         , stream = True ) 
previous_output = str()
for chunk in response.iter_lines(chunk_size=8192,
                                    decode_unicode=False,
                                    delimiter=b"\0"):
    if chunk:
        data = json.loads(chunk.decode("utf-8"))
        output = data["text"][0]
        print(output.replace(previous_output, ""))
        previous_output = output
