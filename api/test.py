import json

import requests


def api_test(type, stream):
    if type == "agent":
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
                "stream": stream,
                "working_memory": [],
                "parent_template_name": "Assignment Agent",
                "child_template_name": "Conclusion",
                "use_my_template": False,
            },
            headers={
                "Authorization": "Bearer mkCwvwhK.sDpiJAghjD6GWLqyQivUJjInz7uDXW5x"
            },
            stream=stream,
        )
    elif type == "chat":
        res = requests.post(
            "http://127.0.0.1:8000/api/chat",
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
                "stream": stream,
            },
            headers={
                "Authorization": "Bearer mkCwvwhK.sDpiJAghjD6GWLqyQivUJjInz7uDXW5x"
            },
            stream=stream,
        )
    if stream:
        for line in res.iter_lines():
            # filter out keep-alive new lines
            if line:
                decoded_line = line.decode("utf-8")
                print(decoded_line)
    else:
        print(res.json())


api_test("agent", False)
