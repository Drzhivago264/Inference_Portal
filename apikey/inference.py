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
 "prompt": "hola, how are you?",
  "name": "hoho",
  "stream" : True
  
}
model = "Mistral Chat 13B"
template = constant.MODEL_TEMPLATE_TABLE[model]
ami = "ami-0810c2d824776b340"




print(template.format(promtp))
for i in range(100):
    response = requests.post("http://127.0.0.1:8000/api/", headers = {"Authorization": "Api-Key 9YWkiJKU.0K56KlangKyH5gViJEsxXmjdrezjk9oT"}, json=context ) 
    print(response.json())

p = """Below is an instruction that describes a task. Write a response that appropriately completes the request.



"""
""" response = requests.post("http://3.93.75.76/generate", headers = {"User-Agent": "Test Client"},  json={ "prompt": p,   "temperature": 0, "stream" : True}
                         , stream = True ) 
previous_output = str()
for chunk in response.iter_lines(chunk_size= 1024,
                                    decode_unicode=False,
                                    delimiter=b"\0"):
    if chunk:
        print(chunk)
        data = json.loads(chunk.decode("utf-8"))
        output = data["text"][0]
        print(output.replace(previous_output, ""))
        previous_output = output
 """

{
  "time": 1709747648943,
  "blocks": [
    {
      "id": "5tr9WMGEFX",
      "type": "header",
      "data": {
        "text": "Introduction",
        "level": 2
      }
    },
    {
      "id": "-bewRB0oLL",
      "type": "header",
      "data": {
        "text": "Paragraph 1",
        "level": 2
      }
    },
    {
      "id": "IYOvmQEe62",
      "type": "header",
      "data": {
        "text": "Paragraph 2",
        "level": 2
      }
    },
    {
      "id": "7zz5KgWj3S",
      "type": "header",
      "data": {
        "text": "Paragraph 3",
        "level": 2
      }
    },
    {
      "id": "rr5dm52_Eg",
      "type": "header",
      "data": {
        "text": "Paragraph 4",
        "level": 2
      }
    },
    {
      "id": "V01TkEncx6",
      "type": "header",
      "data": {
        "text": "Conclusion",
        "level": 2
      }
    }
  ],
  "version": "2.29.1"
}