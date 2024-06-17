from server.utils import constant
from server.models import LLM
from asgiref.sync import sync_to_async
import json
import random
from server.utils.sync_.common_func import  log_prompt_response
from transformers import AutoTokenizer
from .async_common_func import (send_agent_request_openai_async, 
                                get_model_url_async, 
                                update_server_status_in_db_async, 
                                send_stream_request_async, 
                                manage_ec2_on_inference)

async def async_agent_inference_with_summary(self) -> None:
    if self.current_turn >= 0 and self.current_turn <= self.max_turns:
        if self.current_turn == 0:
            prompt = [
                {'role': 'system', 'content': f"{self.agent_instruction}"}, {
                    'role': 'user', 'content': f'{self.message}'},
            ]
        elif self.current_turn > 0 and self.current_turn < (self.max_turns-1):
            prompt = [
                {'role': 'user', 'content': f'Response: {self.message}\n'},
            ]

        elif self.current_turn == (self.max_turns-1):
            force_stop = "You should directly give results based on history information. You must summary the interview log for the question with no more than 100 words."
            prompt = [
                {'role': 'user', 'content': f'Response: {self.message}\n'},
                {'role': 'system', 'content': f'Response: {force_stop}\n'}
            ]

        self.session_history.extend(prompt)
        llm = await LLM.objects.aget(name=self.model_type)
        if not llm.is_self_host:
            clean_response = await send_agent_request_openai_async(self)
            await sync_to_async(log_prompt_response, thread_sensitive=True)(is_session_start_node=self.is_session_start_node, key_object=self.key_object, llm=llm, prompt=self.message, response=clean_response, type_="open_ai")
        else:
            tokeniser = AutoTokenizer.from_pretrained(constant.TOKENIZER_TABLE[self.model_type])
            url_list = await get_model_url_async(llm)
            session_list_to_string = tokeniser.apply_chat_template( self.session_history, tokenize=False)
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
            if url_list:
                random_url = random.choice(url_list)
                url = random_url.url
                instance_id = random_url.name
                server_status = random_url.status
                await update_server_status_in_db_async(
                    instance_id=instance_id, update_type="time")
                if server_status == "running":

                    response_stream = await send_stream_request_async(self, url=url, context=context,
                                                                    processed_prompt=session_list_to_string)
                    if isinstance(response_stream, str):
                        await sync_to_async(log_prompt_response, thread_sensitive=True)(is_session_start_node=self.is_session_start_node, key_object=self.key_object, llm=llm, prompt=self.message, response=response_stream, type_="self_host_agent")
                else:
                    await manage_ec2_on_inference(self, server_status, instance_id)
            else:
                response = "Model is currently offline"
                await self.send(text_data=json.dumps({"message": response, "stream_id":  self.unique_response_id, "credit": self.key_object.credit}))
    else:
        await self.send(text_data=json.dumps({"message": f"Max Turns reached, click on the paragraphs on the left to write again", "role": "Server", "time": self.time}))
