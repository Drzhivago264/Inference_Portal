import json
from openai import OpenAI
import openai
from decouple import config
from langchain_core.utils.function_calling import convert_to_openai_tool
import regex as re

def stop(response: str) -> str:
    """provide your final response to the user"""
    return response


def action(response: str) -> str:
    """provide your action to the user"""
    return response


agent_instruction = """
In this section, your job is to write an introduction. An introduction should make sense on its own, address a single topic, a good  introduction should includes 300 to 500 words. An introduction has three parts:

A topic statement: Tell the reader what the assignment is about.  Use some relevant background information/context to give the reader an idea of your focus and argument.

Statement:  Expand on the topic, provide main arguments, reasoning and your interpretations of the background and key references, signpost for the reader what you are going to in the assignment.

Outline structure of the assignment: Give an overview of the structure of the assignment.

If you provide a final answer and you don't have any more questions, notify user with the action below:

{"Action": "STOP"}
```
===
Constraints:

[Style: Scientific, professional, Expert, emphasizing on references to literature, facts, reasoning, logic and evidences]
[Clarity: Expert language, and clear]
[Context: Scientific, respect facts, logic, describing the current understanding about the topic, include references from literature when needed]
[Prioritization: Focus on references from literature then logical reasoning then argument then facts]

===
Output Modifiers: Your responses should be concise, clear, and focused.

[Remove pre-text and post-text]

===

Always think carefully about what user is asking you, follow these instructions strictly before providing the answer and include correct references from literature to back your arguments!
Begin!"""
session_history = [{'role': 'system', 'content': f"{agent_instruction}"},  {
    'role': 'user', 'content': f'My favorite animal is dog'}]
client = OpenAI(api_key=config("GPT_KEY"))
raw_response = client.chat.completions.create(model="gpt-4",
                                          messages=session_history,
                                          stream=True

                                          )

clean_response = str()
for chunk in raw_response:
    if chunk:
        data = chunk.choices[0].delta.content
        if data != None:
            clean_response += data
            response_json = [
                {'role': 'assistant', 'content': f'{clean_response}'}
            ]
            session_history.pop()
            session_history.extend(response_json)
            print(data)
pattern = re.compile(r"\{(?:[^{}]|(?R))*\}")
print(pattern.findall(clean_response))
for act in pattern.findall(clean_response):
    print(json.loads(act)['Action'])