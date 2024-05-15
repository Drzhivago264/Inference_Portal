Inference Modes
=======================

---

## 1. API Endpoints

- Visit [API Doc](https://professorparakeet.com/frontend/api/docs) to view specific request and response schemas of each endpoint.

- Python example for chat mode:

```python
r = requests.post("https://professorparakeet.com/api/chat", headers={"Authorization": "Bearer str"}, 
json={"prompt": str,
      "model" : str,
      'top_k': int,
      'top_p': float,
      'best_of': int, 
      'max_tokens': int,
      'frequency_penalty': float,
      'presence_penalty': float,
      'temperature': float,
      'beam': bool,
      'early_stopping': bool,
      'length_penalty': float,
      'include_memory': bool
}) 
print(r.json())
```

- cURL example for text completion:

```bash
curl "https://professorparakeet.com/api/completion" --request POST -H "Authorization: Bearer str" -H 'Content-Type: application/json' \
--data-binary '{"prompt": str, 
                "model" : str,
                "top_k": int,
                "top_p": float,
                "best_of": int,
                "max_tokens": int,
                "frequency_penalty": float,
                "presence_penalty": float,
                "temperature": float,
                "beam": bool,
                "early_stopping": bool,
                "length_penalty": float
              }'
```
- Streamming chat response.


```python
r = requests.post("https://professorparakeet.com/api/chat", headers={"Authorization": "Bearer str"},  json={"prompt": "What is 1 + 1?", "model" : str, 'stream': True },  stream=True) 
for chunk in response.iter_lines():
    if chunk:
        print(chunk)
```

- Sample Stream Output:


```python
b"{'response': {'text': ['Below is an instruction that describes a task. Write a response that appropriately completes the request.\\n\\n\\n### Instruction:\\nwhat is 1 + 1?\\n\\n### Response:\\n\\n1']}, 'delta': '1'}"
b"{'response': {'text': ['Below is an instruction that describes a task. Write a response that appropriately completes the request.\\n\\n\\n### Instruction:\\nwhat is 1 + 1?\\n\\n### Response:\\n\\n1 +']}, 'delta': '1 +'}"
b"{'response': {'text': ['Below is an instruction that describes a task. Write a response that appropriately completes the request.\\n\\n\\n### Instruction:\\nwhat is 1 + 1?\\n\\n### Response:\\n\\n1 + 1']}, 'delta': '1 + 1'}"
b"{'response': {'text': ['Below is an instruction that describes a task. Write a response that appropriately completes the request.\\n\\n\\n### Instruction:\\nwhat is 1 + 1?\\n\\n### Response:\\n\\n1 + 1 is']}, 'delta': '1 + 1 is'}"
b"{'response': {'text': ['Below is an instruction that describes a task. Write a response that appropriately completes the request.\\n\\n\\n### Instruction:\\nwhat is 1 + 1?\\n\\n### Response:\\n\\n1 + 1 is equal']}, 'delta': '1 + 1 is equal'}"
b"{'response': {'text': ['Below is an instruction that describes a task. Write a response that appropriately completes the request.\\n\\n\\n### Instruction:\\nwhat is 1 + 1?\\n\\n### Response:\\n\\n1 + 1 is equal to']}, 'delta': '1 + 1 is equal to'}"
b"{'response': {'text': ['Below is an instruction that describes a task. Write a response that appropriately completes the request.\\n\\n\\n### Instruction:\\nwhat is 1 + 1?\\n\\n### Response:\\n\\n1 + 1 is equal to ']}, 'delta': '1 + 1 is equal to '}"
b"{'response': {'text': ['Below is an instruction that describes a task. Write a response that appropriately completes the request.\\n\\n\\n### Instruction:\\nwhat is 1 + 1?\\n\\n### Response:\\n\\n1 + 1 is equal to 2']}, 'delta': '1 + 1 is equal to 2'}"
b"{'response': {'text': ['Below is an instruction that describes a task. Write a response that appropriately completes the request.\\n\\n\\n### Instruction:\\nwhat is 1 + 1?\\n\\n### Response:\\n\\n1 + 1 is equal to 2.']}, 'delta': '1 + 1 is equal to 2.'}"
```

> - Streamming is only available in chat mode.
> - If the server is currently offline, you should send a warm up request to boot it up, otherwise you will get a lot a status reponses for your prompts.

---

## 2. Chat Bot Mode
- We offer standard chatbot mode with custom chat template. We use a vectorised database and query 3 previous model's responses what are the most relevant to answer your questions.
- The maximum context length is 4096 tokens, please do not input a 10000-page book into the chatroom, the model will give you nothing.
- Visit [Chat & Log](https://professorparakeet.com/frontend/hub) and choose `Chat Bots` to talk to our bots.
- Users can configure multiple interence parameters in `Chatbots`, including:
  - Top_p
  - Top_k
  - Temperature
  - Max_tokens
  - Presence Penalty
  - Frequency Penalty
  - Beam 
  - Length Penalty
  - Best of
  - Early Stopping
  - Length Penalty

## 3. Hard Core Prompt Engineering Mode

> To test both Chatbots and Agents user can choose `Hotpot Mode` in [Chat & Log](https://professorparakeet.com/frontend/hub)

- We convert large language models into agents which are able to initiate predefined actions and have a working memory of multiple reasoning steps.
- Visit [Chat & Log](https://professorparakeet.com/frontend/hub) and choose `Agents` to talk to our agents.
- Users can choose among different agents and different engines for the agents
- Users can create their own template for their specific project.
- Users can configure multiple interence parameters in `Chatbots`, including:
  - Top_p
  - Top_k
  - Temperature
  - Max_tokens
  - Presence Penalty
  - Frequency Penalty
  

## 4. Backend LLM Functions

We offer multiple language functions, including:
- Emotion prediction: predict the emotion of the users' prompts among the configurable list of emotions.
- Sentiment prediction: predict the sentiment of the users' prompts.
- Restyle: restyle the user prompts with a configurable variable (e.g., convert to scientific, novel, creative, emotional writting)
- Summary: summary the users' prompts with a configurable number of word.
- Topic Classification: classify the topic of the users' prompts among the configurable list of topics.
- Paraphase: paraphse users' prompts.

Users can configure multiple interence parameters in `Chatbots`, including:
  - Top_p
  - Top_k
  - Temperature
  - Max_tokens
  - Presence Penalty
  - Frequency Penalty