
from asgiref.sync import sync_to_async
import json
import random
from transformers import AutoTokenizer

from server.utils import constant
from server.models import LLM
from server.utils.sync_.inference import inference_mode
from server.utils.sync_.log_database import log_prompt_response
from server.utils.async_.async_inference import (
    send_stream_request_async,
    send_chat_request_openai_async
)
from server.utils.async_.async_query_database import get_model_url_async
from server.utils.async_.async_manage_ec2 import (
    manage_ec2_on_inference,
    update_server_status_in_db_async
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
    llm = await LLM.objects.aget(name=self.choosen_models)
    url_list = await get_model_url_async(llm)

    if not self.include_current_memory:
        processed_prompt = await sync_to_async(inference_mode, thread_sensitive=True)(
            model=self.choosen_models, key_object=self.key_object, mode=self.mode, prompt=self.message, include_memory=self.include_memory, agent_availability=llm.agent_availability)
    else:
        processed_prompt = self.session_history

    if llm.is_self_host:
        tokeniser = AutoTokenizer.from_pretrained(
            constant.TOKENIZER_TABLE[self.choosen_models])
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
        ''' Query a list of inference servers for a given model, pick a random one '''
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
                    self.session_history.append(
                        {"role": "assistant", "content": f"{response_stream}"})
                    await sync_to_async(log_prompt_response, thread_sensitive=True)(is_session_start_node=self.is_session_start_node, key_object=self.key_object, llm=llm, prompt=self.message, response=response_stream, type_="chatroom")
            else:
                await manage_ec2_on_inference(self, server_status, instance_id)
        else:
            response = "Model is currently offline"
            await self.send(text_data=json.dumps({"message": response, "stream_id":  self.unique_response_id, "credit": credit}))

    else:
        clean_response = await send_chat_request_openai_async(self, processed_prompt)
        self.session_history.append(
            {"role": "assistant", "content": f"{clean_response}"})
        await sync_to_async(log_prompt_response, thread_sensitive=True)(is_session_start_node=self.is_session_start_node, key_object=self.key_object, llm=llm, prompt=self.message,
                                                                        response=clean_response, type_="open_ai")
