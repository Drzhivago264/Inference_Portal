from vllm import LLM, SamplingParams
import requests
json_  = {
 "prompt": "hola",
  "name": "11111",
  "key": "tQ6MXKAFj3bw7OoJ20Gh92ldaNmA3aYAma6cAWohe2sYpbBnTyAc3R_kP2DRcUUsZjzB1MjB8FSZLH8L9pYZkw",
  "model" :  "Mixtral 7B"
}

response = requests.post("[HOST_NAME]/api/",  {"prompt": "hola",
                                               "name": "[put your key name]", 
                                               "key": "[put your key]", 
                                               "model" :  "[A list of models]"}) 
print(response.json())
""" prompts = [
    "Hello, my name is",
    "The president of the United States is",
    "The capital of France is",
    "The future of AI is",
]
sampling_params = SamplingParams(temperature=0.8, top_p=0.95)
llm = LLM(model="gpt2", trust_remote_code=True,     tensor_parallel_size=2)
outputs = llm.generate(prompts, sampling_params)

# Print the outputs.
for output in outputs:
    prompt = output.prompt
    generated_text = output.outputs[0].text
    print(f"Prompt: {prompt!r}, Generated text: {generated_text!r}") """