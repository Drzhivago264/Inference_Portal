from server.utils import constant
from server.models import LLM
from asgiref.sync import sync_to_async
import json
import random
from server.utils.sync_.common_func import inference_mode,  log_prompt_response
from transformers import AutoTokenizer
from .async_common_func import (
    get_model_url_async,
    update_server_status_in_db_async,
    send_stream_request_async,
    manage_ec2_on_inference,
    send_chat_request_openai_async)


async def async_data_synthesis_inference(self) -> None:
    credit = self.key_object.credit
    llm = await LLM.objects.aget(name=self.choosen_models)
    url_list = await get_model_url_async(llm)
    processed_prompt_list = []
    
    processed_prompt = await sync_to_async(inference_mode, thread_sensitive=True)(
        model=self.choosen_models, key_object=self.key_object, mode="chat", prompt=self.message, include_memory=False, agent_availability=llm.agent_availability)

    if llm.is_self_host:
        tokeniser = AutoTokenizer.from_pretrained(
            constant.TOKENIZER_TABLE[self.choosen_models])
        url_list = await get_model_url_async(llm)
        session_list_to_string = tokeniser.apply_chat_template(
            processed_prompt, tokenize=False)
        context = {
            "prompt": session_list_to_string,
            "n": 1,
            'presence_penalty': float(self.presence_penalty),
            "temperature": float(self.temperature) if not self.beam else 0,
            "max_tokens": self.max_tokens,
            "stream": False,
            "top_p": float(self.top_p),
            "frequency_penalty": float(self.frequency_penalty),
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
                    await sync_to_async(log_prompt_response, thread_sensitive=True)(is_session_start_node=None, key_object=self.key_object, llm=llm, prompt=self.message, response=response_stream, type_="data_synthesis")
            else:
                await manage_ec2_on_inference(self, server_status, instance_id)
        else:
            response = "Model is currently offline"
            await self.send(text_data=json.dumps({"message": response, "stream_id":  self.unique_response_id, "credit": credit}))

    else:
        clean_response = await send_chat_request_openai_async(self, processed_prompt)
        await sync_to_async(log_prompt_response, thread_sensitive=True)(is_session_start_node=None, key_object=self.key_object, llm=llm, prompt=self.message, response=clean_response, type_="data_synthesis")
