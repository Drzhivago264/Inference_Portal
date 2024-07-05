
from decouple import config
from asgiref.sync import sync_to_async
import random
import json
import httpx
import openai
import random

from server.utils.sync_.inference import action_parse_json
from server.utils.sync_.log_database import log_prompt_response
from server.utils.async_.async_query_database import get_model_url_async
from server.utils.async_.async_manage_ec2 import (
    manage_ec2_on_inference, 
    update_server_status_in_db_async
)
import regex as re
import server.utils.constant as constant


async def openai_client_async(self, processed_prompt, max_token_error):
    try:
        client = openai.AsyncOpenAI(api_key=config("GPT_KEY"), timeout=constant.TIMEOUT, max_retries=constant.RETRY)
        raw_response = await client.chat.completions.create(model=self.choosen_model,
                                                            messages=processed_prompt,
                                                            stream=True,
                                                            max_tokens=self.max_tokens if not max_token_error else None,
                                                            temperature=self.temperature,
                                                            top_p=self.top_p,
                                                            frequency_penalty=self.frequency_penalty,
                                                            presence_penalty=self.presence_penalty
                                                            )
        return raw_response

    except openai.APIConnectionError as e:
        await self.send(text_data=json.dumps({"message": f"Failed to connect to OpenAI API: {e}", "role": self.choosen_model, "stream_id":  self.unique_response_id, "credit": self.key_object.credit}))
 
    except openai.RateLimitError as e:
        await self.send(text_data=json.dumps({"message": f"OpenAI API request exceeded rate limit: {e}", "role": self.choosen_model, "stream_id":  self.unique_response_id, "credit": self.key_object.credit}))
 
    except openai.APIError as e:
        if e.code == 'context_length_exceeded':
            raw_response = openai_client_async(self, processed_prompt=processed_prompt, max_token_error=True)
            return raw_response
        else:
            await self.send(text_data=json.dumps({"message": f"OpenAI API returned an API Error: {e}", "role": self.choosen_model, "stream_id":  self.unique_response_id, "credit": self.key_object.credit}))

async def send_chat_request_openai_async(self, processed_prompt: list, llm: str) -> str:
    clean_response = ""
    raw_response = await openai_client_async(self, processed_prompt=processed_prompt, max_token_error=False)
    if raw_response:
        async for chunk in raw_response:
            if chunk:
                data = chunk.choices[0].delta.content
                if data != None:
                    clean_response += data
                    await self.send(text_data=json.dumps({"message": data, "role": self.choosen_model, "stream_id":  self.unique_response_id, "credit": self.key_object.credit}))
        self.session_history.append(
            {"role": "assistant", "content": f"{clean_response}"})
        if clean_response:
            await sync_to_async(log_prompt_response, thread_sensitive=True)(is_session_start_node=self.is_session_start_node, key_object=self.key_object, llm=llm, prompt=self.message,
                                                                            response=clean_response, type_="open_ai")

async def send_vllm_request_async(self: object, llm: object, context: dict):
    client = httpx.AsyncClient(timeout=10)
    url_list = await get_model_url_async(llm)
    if url_list:
        random_url = random.choice(url_list)
        url = random_url.url
        instance_id = random_url.name
        server_status = random_url.status
        await update_server_status_in_db_async(
            instance_id=instance_id, update_type="time")
        if server_status == "running":
            try:
                async with client.stream('POST', url, json=context) as response:
                    response.raise_for_status()
                    full_response = ""
                    async for chunk in response.aiter_text():
                        if (chunk):
                            chunk = chunk[:-1]
                            try:
                                c = json.loads(chunk)
                                output = c['text'][0].replace(context['prompt'], "")
                                await self.send(text_data=json.dumps({"message": output.replace(full_response, ""), "stream_id":  self.unique_response_id, "credit": self.key_object.credit}))
                         
                            except json.decoder.JSONDecodeError:
                                pass
                            full_response = output
             
            except httpx.TimeoutException:
                await self.send(text_data=json.dumps({"message": "Wait! Server is setting up.", "stream_id":  self.unique_response_id, "credit":  self.key_object.credit}))
            except httpx.ConnectError:
                await self.send(text_data=json.dumps({"message": "Server is starting up! wait.", "stream_id":  self.unique_response_id, "credit":  self.key_object.credit}))
            except httpx.HTTPError as e:
                await self.send(text_data=json.dumps({"message": "You messed up the parameter! Return to default", "stream_id":  self.unique_response_id, "credit": self.key_object.credit}))

            if isinstance(output, str):
                await sync_to_async(log_prompt_response, thread_sensitive=True)(is_session_start_node=self.is_session_start_node, key_object=self.key_object, llm=llm, prompt=self.message, response=output, type_="self_host_agent")
        else:
            await manage_ec2_on_inference(self, server_status, instance_id)
    else:
        await self.send(text_data=json.dumps({"message": "Model is currently offline", "stream_id":  self.unique_response_id, "credit": self.key_object.credit}))
  

async def send_agent_request_openai_async(self, llm: str) -> str:
    clean_response = ""
    raw_response = await openai_client_async(self, processed_prompt=self.session_history, max_token_error=False)       
    if raw_response:
        self.current_turn += 1
        async for chunk in raw_response:
            if chunk:
                data = chunk.choices[0].delta.content
                if data != None:
                    clean_response += data
                    response_json = [
                        {'role': 'assistant', 'content': f'{clean_response}'}
                    ]
                    self.session_history.pop()
                    self.session_history.extend(response_json)
                    self.current_turn = self.current_turn
                    await self.send(text_data=json.dumps({"message": data,  "stream_id":  self.unique_response_id, "credit": self.key_object.credit}))

        action_list = action_parse_json(self.session_history[-1]['content'])
        if action_list:
            for act in action_list:
                action = json.loads(act)['Action']
                if "STOP" == action:
                    full_result = self.session_history[-1]['content']
                    full_result = full_result.replace('{"Action": "STOP"}', "")
                    full_result = full_result.replace("Final Answer:", "")
                    thought_match = re.findall("Thought: (.*)\n", full_result)
                    full_result = full_result.replace(thought_match[0], "")
                    full_result = full_result.replace("Thought:", "")
                    full_result = full_result.replace("\n\n\n", "")
                    await self.send(text_data=json.dumps({"message": f"Your request is finished, the result is moved to the textbox on the left", "role": "Server", "time": self.time}))
                    await self.send(text_data=json.dumps({"agent_action": action, "result_id": self.working_paragraph, "full_result": full_result}))
                    self.session_history = []
                    self.current_turn = 0
                elif "NEXT" == action:
                    full_result = str()
                    for log in self.session_history:
                        if log['role'] == "user" or log['role'] == "assistant":
                            full_result += f"{log['role']}:\n{log['content']}\n\n"
                    full_result = full_result.replace('{"Action": "NEXT"}', "")
                    self.session_history = []
                    self.current_turn = 0
                    self.agent_instruction += clean_response
                    prompt = [
                        {'role': 'system', 'content': f"{self.agent_instruction}"}
                    ]
                    self.session_history.extend(prompt)
                    await self.send(text_data=json.dumps({"agent_action": action, "result_id": self.working_paragraph, "full_result": full_result}))
        if clean_response:
            await sync_to_async(log_prompt_response, thread_sensitive=True)(is_session_start_node=self.is_session_start_node, key_object=self.key_object, llm=llm, prompt=self.message, response=clean_response, type_="open_ai")