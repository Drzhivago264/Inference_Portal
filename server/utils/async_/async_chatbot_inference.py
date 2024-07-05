
from asgiref.sync import sync_to_async
import json
import random
from transformers import AutoTokenizer

from server.utils import constant
from server.models import LLM
from server.utils.sync_.inference import inference_mode

from server.utils.async_.async_inference import (
    send_vllm_request_async,
    send_chat_request_openai_async
)


async def async_inference(self) -> None:
    if not self.beam:
        self.best_of = 1
    else:
        self.best_of = int(self.best_of)
        if self.best_of == 1:
            self.best_of += 1
        self.top_p = 1

    credit = self.key_object.credit
    llm = await LLM.objects.aget(name=self.choosen_model)

    if not self.include_current_memory:
        processed_prompt = await sync_to_async(inference_mode, thread_sensitive=True)(
            model=self.choosen_model, key_object=self.key_object, mode=self.mode, prompt=self.message, include_memory=self.include_memory, agent_availability=llm.agent_availability)
    else:
        processed_prompt = self.session_history

    if llm.is_self_host:
        tokeniser = AutoTokenizer.from_pretrained(
            constant.TOKENIZER_TABLE[self.choosen_model])
        session_list_to_string = tokeniser.apply_chat_template(
            processed_prompt, tokenize=False)

        context = {
            "prompt": session_list_to_string,
            "n": 1,
            'best_of': self.best_of,
            'presence_penalty': float(self.presence_penalty),
            "use_beam_search": self.beam,
            "temperature": float(self.temperature) if not self.beam else 0,
            "max_tokens": self.max_tokens,
            "stream": True,
            "top_k": int(self.top_k),
            "top_p": float(self.top_p),
            "length_penalty": float(self.length_penalty) if self.beam else 1,
            "frequency_penalty": float(self.frequency_penalty),
            "early_stopping": self.early_stopping if self.beam else False,
        }

        await send_vllm_request_async(self, llm=llm, context=context)
    else:
        await send_chat_request_openai_async(self, processed_prompt, llm)

