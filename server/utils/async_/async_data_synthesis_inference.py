import pytz
import json
import random
from transformers import AutoTokenizer
import httpx
import asyncio
from decouple import config

from server.utils.async_.async_query_database import get_model_url_async
from server.utils import constant
from server.models import LLM
from django.utils import timezone

async def async_data_synthesis_inference(self) -> None:
    credit = self.key_object.credit
    llm = await LLM.objects.aget(name=self.choosen_model)
    url_list = await get_model_url_async(llm)
    processed_instruction_list = []

    for child_instruction in self.child_instruction_list:

        prompt_ = [
            {"role": "system",
                "content": self.parent_instruction + "\n" + 
                child_instruction['default'] + "\n" + 
                self.seed_prompt + "\n" +
                self.optional_instruction},
        ]

        if llm.is_self_host:
            headers = {'Content-Type': 'application/json'}
            server_url = random.choice(url_list).url
            tokeniser = AutoTokenizer.from_pretrained(
                constant.TOKENIZER_TABLE[self.choosen_model])
            processed_prompt = tokeniser.apply_chat_template(
                prompt_, tokenize=False)
            processed_instruction_list.append(processed_prompt)
            context_list = [
                {
                    "prompt": processed_instruction,
                    "stream": False,
                    "top_p": self.top_p,
                    "temperature": self.temperature,
                    "max_tokens": self.max_tokens,
                    "presence_penalty": self.presence_penalty,
                    "frequency_penalty": self.frequency_penalty
                }
                for processed_instruction in processed_instruction_list
            ]
            async with httpx.AsyncClient(timeout=120) as client:
                tasks = [client.post(server_url, json=context, headers=headers)
                            for context in context_list]
                result = await asyncio.gather(*tasks)
                self.time = timezone.localtime(timezone.now(), pytz.timezone(
                    self.timezone)).strftime('%Y-%m-%d %H:%M:%S')
          
                await self.send(text_data=json.dumps({"response_list": [r.json()['text'][0].replace(processed_instruction_list[index], "")
                        for index, r in enumerate(result)], "role": self.choosen_model,"time": self.time, "row_no": self.row_no}))
        else:
            headers = {'Content-Type': 'application/json',
                        "Authorization": f'Bearer {config("GPT_KEY")}'}
            server_url = "https://api.openai.com/v1/chat/completions"
            processed_instruction_list.append(prompt_)
            context_list = [
                {
                    "model": self.choosen_model,
                    "messages": processed_instruction,
                    "stream": False,
                    "top_p": self.top_p,
                    "temperature": self.temperature,
                    "max_tokens": self.max_tokens,
                    "presence_penalty": self.presence_penalty,
                    "frequency_penalty": self.frequency_penalty
                }
                for processed_instruction in processed_instruction_list
            ]

            async with httpx.AsyncClient(timeout=120) as client:
                tasks = [client.post(server_url, json=context, headers=headers)
                            for context in context_list]
                result = await asyncio.gather(*tasks)
                self.time = timezone.localtime(timezone.now(), pytz.timezone(
                    self.timezone)).strftime('%Y-%m-%d %H:%M:%S')
                await self.send(text_data=json.dumps({"response_list": [i.json()['choices'][0]['message']['content']
                        for i in result], "role": self.choosen_model,"time": self.time, "row_no": self.row_no}))