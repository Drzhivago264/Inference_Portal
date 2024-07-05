import json
from transformers import AutoTokenizer

from server.utils import constant
from server.models import LLM
from server.utils.async_.async_inference import (
    send_agent_request_openai_async,
    send_vllm_request_async
)


async def async_agent_inference(self) -> None:
    if self.current_turn >= 0 and self.current_turn <= (self.max_turns-1):
        if self.current_turn == 0:
            prompt = [
                {'role': 'system', 'content': f"{self.agent_instruction}"}, {
                    'role': 'user', 'content': f'{self.message}'}
            ]
        elif self.current_turn > 0 and self.current_turn < (self.max_turns-1):
            prompt = [
                {'role': 'user', 'content': f'Response: {self.message}'}
            ]

        elif self.current_turn == (self.max_turns-1):
            prompt = [
                {'role': 'user', 'content': f'Response: {self.message}'},
                {'role': 'system', 'content': f'Response: {self.force_stop}'}
            ]
        self.session_history.extend(prompt)
        llm = await LLM.objects.aget(name=self.choosen_model)
        if not llm.is_self_host:
            await send_agent_request_openai_async(self, llm=llm)
        else:
            tokeniser = AutoTokenizer.from_pretrained(
                constant.TOKENIZER_TABLE[self.choosen_model])
            session_list_to_string = tokeniser.apply_chat_template(
                self.session_history, tokenize=False)
            context = {
                "prompt": session_list_to_string,
                "n": 1,
                'presence_penalty': float(self.presence_penalty),
                "temperature": float(self.temperature),
                "max_tokens": self.max_tokens,
                "stream": True,
                "top_p": float(self.top_p),
                "frequency_penalty": float(self.frequency_penalty),
            }
            await send_vllm_request_async(self, llm=llm, context=context)
    else:
        self.session_history = []
        self.current_turn = 0
        await self.send(text_data=json.dumps({"message": "Max Turns reached",  "stream_id":  self.unique_response_id, "credit": self.key_object.credit}))
        await self.send(text_data=json.dumps({"message": f"Reseting working memory", "role": "Server", "time": self.time}))
