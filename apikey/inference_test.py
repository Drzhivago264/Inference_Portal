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

def manage_monero(command, params=None):
    rpc_input = {
        "method": command
    }
    if params is not None:
        rpc_input.update({'params': params})
    rpc_input.update({"jsonrpc": "2.0", "id": "0"})        
    response = requests.post("http://127.0.0.1:18082/json_rpc", json=rpc_input, headers={"content-type": "application/json"}) 

    return response
#print(json.loads(manage_monero("get_balance", {"account_index":0}).text))

#print(manage_monero("get_transfers", {"in":True}).text)
#print(json.loads(manage_monero("make_integrated_address", {"payment_id":"399f9bf8ce13f73a"}).text))
#print(json.loads(manage_monero("get_payments",{"payment_id":"8c83d1a8499ce3a2"}).text))
##print(json.loads(manage_monero("transfer", {"destinations":[{"amount":3000000000,"address":"4LHcvZ1EWX1ZxZ4BYVJmPL7MABVBu7bQxKZwtUDZA12jC2WZ2XrA5EmDmd6Q94S5QejbgEbQmgeMXFWCTfd7PW7U8u9GXS5qpzJ7aV1Khj"}]}).text))
promtp= "hehe"
context = {
    "prompt": "what is my name",
    "stream": False,
}
model = "Mistral Chat 13B"
template = constant.MODEL_TEMPLATE_TABLE[model]
ami = "ami-0810c2d824776b340"

import json
from openai import OpenAI

import requests


from openai import OpenAI
client = OpenAI(api_key=config("GPT_KEY"))

completion = client.chat.completions.create(
  model="gpt-3.5-turbo",
  messages=[
    {"role": "user", "content": "hi"}
  ]
)

print(completion.choices[0].message)
#response = requests.post("http://127.0.0.1:8000/api/completion", headers = {"Authorization": "Bearer atnBnvVo.RCJnC24H5blnp4wocG9cw40yRaTqGjpO"}, json=context, stream=False ) 
   
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

