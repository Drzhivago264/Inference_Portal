from vllm import LLM, SamplingParams
import json
import requests
from django.utils import timezone

import requests
import multiprocessing as mp

from decouple import config
import boto3
from botocore.exceptions import ClientError
from util import constant


promtp= "hehe"
context = {
 "prompt": "Hello",
    "stream": True,
    'top_k': 0
  
}
model = "Mistral Chat 13B"
template = constant.MODEL_TEMPLATE_TABLE[model]
ami = "ami-0810c2d824776b340"

import json



response = requests.post("http://3.235.21.42:80/generate", headers = {"Authorization": "Bearer TverG56n.RzT4tNDcrU6aClfTNkvdoXff9YH8rWtj"}, json=context ) 
   
print(response)
if not isinstance(response, str):
    previous_output = str()
    full_response = str()
    for chunk in response.iter_lines():
        if chunk:
            print(chunk)

""" with mp.Pool(1) as pool:
  for result in pool.map(send_req, range(10000)):
      print(f'Got result: {result}', flush=True) """
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
