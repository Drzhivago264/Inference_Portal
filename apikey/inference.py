from vllm import LLM, SamplingParams
import json
import requests
from util import constant
ami = "ami-0810c2d824776b340"

promtp= "hehe"
context = {
 "prompt": "hola",
  "name": "1",
  "key": "tQ6MXKAFj3bw7OoJ20Gh92ldaNmA3aYAma6cAWohe2sYpbBnTyAc3R_kP2DRcUUsZjzB1MjB8FSZLH8L9pYZkw",
  "model" :  "Mixtral 7B"
}
model = "Mistral Chat 13B"
template = constant.MODEL_TEMPLATE_TABLE[model]
print(template.format(promtp))
""" for i in range(10000):
    response = requests.post("http://127.0.0.1:8000/api/",   json=context ) 
    print(response.json())
 """ 
""" for i in range(10000):
    response = requests.post("http://52.203.121.84:80/metrics" ) 
    print(response.json()) """

response = requests.post("http://127.0.0.1:8080/generate",   json={ "prompt": str(template.format(promtp)), "max_tokens": 512,  "temperature": 0, "stream": True} ) 
previous_output = str()
for chunk in response.iter_lines(chunk_size=8192,
                                    decode_unicode=False,
                                    delimiter=b"\0"):
    if chunk:
        data = json.loads(chunk.decode("utf-8"))
        output = data["text"][0]
        print(output.replace(previous_output, ""))
        previous_output = output