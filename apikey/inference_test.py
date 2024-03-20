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

"""Test monero"""

def manage_monero(command, payment_id=None):
    rpc_input = {
        "method": command
    }
    if payment_id is not None:
        rpc_input.update({
            "params":{"payment_id":payment_id}
        })
    rpc_input.update({"jsonrpc": "2.0", "id": "0"})        
    response = requests.post("http://127.0.0.1:18082/json_rpc", json=rpc_input, headers={"content-type": "application/json"}) 

    return response
wallet = json.loads(manage_monero("make_integrated_address", "e302f3ca09ec0279").text)
print(wallet['result']['integrated_address'])
print(wallet['result']['payment_id'])
#manage_monero("get_balance")
manage_monero("make_integrated_address", "e302f3ca09ec0279")
#manage_monero("get_payments","4279257e0a20608e25dba8744949c9e1caff4fcdafc7d5362ecf14225f3d9030")

promtp= "hehe"
context = {
    "prompt": "What is my cat's name?",
    "stream": False,
}
model = "Mistral Chat 13B"
template = constant.MODEL_TEMPLATE_TABLE[model]
ami = "ami-0810c2d824776b340"

import json
from openai import OpenAI

# Modify OpenAI's API key and API base to use vLLM's API server.
aws = config("aws_access_key_id")
aws_secret = config("aws_secret_access_key")
ec2_resource = boto3.resource(
    'ec2', region_name="us-east-1", aws_access_key_id=aws, aws_secret_access_key=aws_secret)

#response = requests.post("http://127.0.0.1:8000/api/responselog", headers = {"Authorization": "Bearer TverG56n.RzT4tNDcrU6aClfTNkvdoXff9YH8rWtj"}, json=context, stream=False ) 
   
#print(response.content)
""" for chunk in response.iter_lines():
    if chunk:
        print(chunk) """

""" with mp.Pool(1) as pool:
  for result in pool.map(send_req, range(10000)):
      print(f'Got result: {result}', flush=True) """

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

