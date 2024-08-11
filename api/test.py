import requests

res = requests.post(
    "http://127.0.0.1:8000/api/agent",
    json={
        "prompt": "string",
        "model": "Llama 3 Instruct AWQ",
        "top_p": 0.73,
        "top_k": -1,
        "temperature": 0.73,
        "beam": False,
        "best_of": 1,
        "max_tokens": 128,
        "presence_penalty": 0,
        "frequency_penalty": 0,
        "length_penalty": 0,
        "early_stopping": False,
        "n": 1,
        "stream": True,
        "working_memory": [],
        "parent_template_name": "Assignment Agent",
        "child_template_name": "Conclusion",
        "use_my_template": True,
    },
    headers={"Authorization": "Bearer ..."},
    stream=True,
)

for line in res.iter_lines():
    if line:
        decoded_line = line.decode("utf-8")
        print(decoded_line)
