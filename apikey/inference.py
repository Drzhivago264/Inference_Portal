from vllm import LLM, SamplingParams
import requests
ami = "ami-0810c2d824776b340"
prompt = "In 50 words, explain a beautiful woman"
context = {
 "prompt": "hola",
  "name": "1",
  "key": "tQ6MXKAFj3bw7OoJ20Gh92ldaNmA3aYAma6cAWohe2sYpbBnTyAc3R_kP2DRcUUsZjzB1MjB8FSZLH8L9pYZkw",
  "model" :  "Mixtral 7B"
}

for i in range(10000):
    response = requests.post("http://127.0.0.1:8000/api/",   json=context ) 
    print(response.json())

""" for i in range(10000):
    response = requests.post("http://52.203.121.84:80/generate",   json={ "prompt": f"A chat between a curious user and an artificial intelligence assistant. The assistant gives helpful, detailed, and polite answers to the users questions. USER: {prompt} ASSISTANT:", "max_tokens": 512,  "temperature": 0} ) 
    print(response.json())
 """