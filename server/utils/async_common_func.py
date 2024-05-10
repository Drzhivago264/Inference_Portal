from server.utils import constant
from server.models import InferenceServer, LLM, PromptResponse, MemoryTree
from django.db.models.query import QuerySet
from asgiref.sync import sync_to_async
from decouple import config
import json
import httpx
from vectordb import vectordb
from django.utils import timezone
from .constant import REGION
import random
import tiktoken
from transformers import AutoTokenizer
from openai import AsyncOpenAI
import openai
from vectordb import vectordb
from .common_func import inference_mode, action_parse_json
from server.celery_tasks import command_EC2
import regex as re


async def get_model(model: str) -> QuerySet[LLM] | bool:
    try:
        return await LLM.objects.aget(name=model)
    except LLM.DoesNotExist:
        return False


async def send_chat_request_openai_async(self, processed_prompt) -> str:
    clean_response = ""
    try:
        client = AsyncOpenAI(api_key=config("GPT_KEY"))
        raw_response = await client.chat.completions.create(model=self.choosen_models,
                                                            messages=processed_prompt,
                                                            stream=True,
                                                            max_tokens=self.max_tokens,
                                                            temperature=self.temperature,
                                                            top_p=self.top_p,
                                                            frequency_penalty=self.frequency_penalty,
                                                            presence_penalty=self.presence_penalty
                                                            )
        async for chunk in raw_response:
            if chunk:
                data = chunk.choices[0].delta.content
                if data != None:
                    clean_response += data
                    await self.send(text_data=json.dumps({"message": data, "role":self.choosen_models, "stream_id":  self.unique_response_id, "credit": self.key_object.credit}))
        return clean_response
    except openai.APIConnectionError as e:
        await self.send(text_data=json.dumps({"message": f"Failed to connect to OpenAI API: {e}", "role": self.choosen_models, "stream_id":  self.unique_response_id, "credit": self.key_object.credit}))
        return e
    except openai.RateLimitError as e:
        await self.send(text_data=json.dumps({"message": f"OpenAI API request exceeded rate limit: {e}", "role": self.choosen_models, "stream_id":  self.unique_response_id, "credit": self.key_object.credit}))
        return e
    except openai.APIError as e:
        await self.send(text_data=json.dumps({"message": f"OpenAI API returned an API Error: {e}", "role":self.choosen_models, "stream_id":  self.unique_response_id, "credit": self.key_object.credit}))
        return e


async def get_model_url_async(model: str) -> list | bool:
    model_list = []
    try:
        async for m in InferenceServer.objects.filter(
                hosted_model__name=model, availability="Available"):
            model_list.append(m)
        return model_list
    except:
        return False


async def update_server_status_in_db_async(instance_id: str, update_type: str) -> None:
    ser_obj = await InferenceServer.objects.aget(name=instance_id)
    if update_type == "status":
        ser_obj.status = "pending"
        await ser_obj.asave()
    elif update_type == "time":
        ser_obj.last_message_time = timezone.now()
        await ser_obj.asave()
    return


async def log_prompt_response_async(key_object: object, model: str, prompt: str, response: str, type_: str, is_session_start_node: bool) -> None:
    llm = await LLM.objects.aget(name=model)
    if llm.agent_availability:
        try:
            tokeniser = tiktoken.encoding_for_model(model)
        except KeyError:
            tokeniser = tiktoken.encoding_for_model("gpt-4")
        number_input_token = len(tokeniser.encode(prompt))
        number_output_token = len(tokeniser.encode(response))
        input_cost = number_input_token*llm.input_price
        output_cost = number_output_token*llm.output_price
    else:
        tokeniser = constant.TOKENIZER_TABLE[model]
        number_input_token = len(AutoTokenizer.from_pretrained(
            tokeniser)(prompt)['input_ids'])
        number_output_token = len(AutoTokenizer.from_pretrained(
            tokeniser)(response)['input_ids'])
        input_cost = number_input_token*llm.input_price
        output_cost = number_output_token*llm.output_price

    pair_save = PromptResponse(
        prompt=prompt,
        response=response,
        key=key_object,
        model=llm,
        p_type=type_,
        number_input_tokens=number_input_token,
        number_output_tokens=number_output_token,
        input_cost=input_cost,
        output_cost=output_cost
    )
    await pair_save.asave()
    try:
        if is_session_start_node is not None:
            memory_tree_node_number = await MemoryTree.objects.filter(key=key_object).acount()
            if memory_tree_node_number == 0:
                await MemoryTree.objects.acreate(name=key_object.hashed_key, key=key_object, prompt=prompt, response=response, model=llm, p_type=type_, is_session_start_node=True)
            elif memory_tree_node_number > 0 and is_session_start_node:
                most_similar_vector = vectordb.filter(
                    metadata__key=key_object.hashed_key, metadata__model=model).search(prompt, k=1)
                most_similar_prompt = most_similar_vector[0].content_object.prompt
                most_similar_response = most_similar_vector[0].content_object.response
                most_similar_node = MemoryTree.objects.filter(
                    key=key_object, prompt=most_similar_prompt, response=most_similar_response).earliest('created_at')
                await MemoryTree.objects.acreate(name=f"{prompt} -- session_start_at {timezone.now()}", parent=most_similar_node, key=key_object, prompt=prompt, response=response, model=llm, p_type=type_, is_session_start_node=True)
            elif memory_tree_node_number > 0 and not is_session_start_node:
                parent_node = await MemoryTree.objects.filter(key=key_object, is_session_start_node=True).alatest('created_at')
                await MemoryTree.objects.acreate(name=f"{prompt} -- child_node_added_at {timezone.now()}", parent=parent_node, key=key_object, prompt=prompt, response=response, model=llm, p_type=type_, is_session_start_node=False)
    except Exception as e:
        print(e)


async def send_request_async(url, context):
    async with httpx.AsyncClient(transport=httpx.AsyncHTTPTransport(retries=2)) as client:
        response = await client.post(url, json=context,  timeout=60)
        response = response.json(
        )['text'][0] if response.status_code == 200 else None
        return response


async def send_stream_request_async(self: object, url: str, context: object, processed_prompt: str):
    client = httpx.AsyncClient()
    full_response = ""
    try:
        async with client.stream('POST', url, json=context) as response:
            async for chunk in response.aiter_text():
                try:
                    chunk = chunk[:-1]
                    c = json.loads(chunk)
                    output = c['text'][0].replace(processed_prompt, "")
                    await self.send(text_data=json.dumps({"message": output.replace(full_response, ""), "stream_id":  self.unique_response_id, "credit": self.key_object.credit}))
                    full_response = output
                except:
                    pass
            return full_response
    except httpx.ReadTimeout:
        return httpx.ReadTimeout


async def query_response_log(key_object: str,  order: str, quantity: int, type_: list) -> object:
    response = list()
    log = PromptResponse.objects.filter(
        key=key_object, p_type__in=type_).order_by(order)[:quantity]
    async for l in log:
        response.append({
            "prompt": l.prompt,
            "response": l.response,
            "created_at": l.created_at,
            "type": l.p_type,
            "model": await sync_to_async(lambda: l.model.name)()
        })
    return response

async def send_agent_request_openai_async(self) -> str:
    clean_response = ""
    try:
        client = AsyncOpenAI(api_key=config("GPT_KEY"))
        raw_response = await client.chat.completions.create(model=self.model_type,
                                                            messages=self.session_history,
                                                            stream=True,
                                                            max_tokens=self.max_tokens,
                                                            temperature=self.temperature,
                                                            top_p=self.top_p,
                                                            frequency_penalty=self.frequency_penalty,
                                                            presence_penalty=self.presence_penalty
                                                            )
        self.current_turn_inner += 1
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
                    self.current_turn = self.current_turn_inner
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
        return clean_response
    except openai.APIConnectionError as e:
        await self.send(text_data=json.dumps({"message": f"Failed to connect to OpenAI API: {e}", "role": self.model_type, "stream_id": self.unique_response_id, "credit": self.key_object.credit}))
        return e
    except openai.RateLimitError as e:
        await self.send(text_data=json.dumps({"message": f"OpenAI API request exceeded rate limit: {e}", "role": self.model_type, "stream_id":  self.unique_response_id, "credit": self.key_object.credit}))
        return e
    except openai.APIError as e:
        await self.send(text_data=json.dumps({"message": f"OpenAI API returned an API Error: {e}", "role": self.model_type, "stream_id":  self.unique_response_id, "credit": self.key_object.credit}))
        return e


async def async_inference(self) -> None:
    if not self.beam:
        self.length_penalty = 1
        self.early_stopping = False
        self.best_of = int(1)
    else:
        self.best_of = int(self.best_of)
        if self.best_of == 1:
            self.best_of += 1
        self.length_penalty = float(self.length_penalty)
    credit = self.key_object.credit
    llm = await LLM.objects.aget(name=self.choosen_models)
    url_list = await get_model_url_async(llm)
    processed_prompt = await sync_to_async(inference_mode, thread_sensitive=True)(
        model=self.choosen_models, key_object=self.key_object, mode=self.mode, prompt=self.message, include_memory=self.include_memory, agent_availability=llm.agent_availability)

    if not llm.agent_availability:
        context = {
            "prompt": processed_prompt,
            "n": 1,
            'best_of': self.best_of,
            'presence_penalty': float(self.presence_penalty),
            "use_beam_search": self.beam,
            "temperature": float(self.temperature),
            "max_tokens": int(self.max_tokens),
            "stream": True,
            "top_k": int(self.top_k),
            "top_p": float(self.top_p),
            "length_penalty": float(self.length_penalty),
            "frequency_penalty": float(self.frequency_penalty),
            "early_stopping": self.early_stopping,
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
                                                           processed_prompt=processed_prompt)
                if response_stream == httpx.ReadTimeout:
                    await self.send(text_data=json.dumps({"message": "Model timeout! try again later.", "stream_id":  self.unique_response_id, "credit": credit}))
                else:    
                    await log_prompt_response_async(is_session_start_node=self.is_session_start_node, key_object=self.key_object, model=self.choosen_models, prompt=self.message,
                                                response=response_stream, type_="chatroom")
            elif server_status == "stopped" or "stopping":
                command_EC2.delay(instance_id, region=REGION, action="on")
                response = "Server is starting up, try again in 400 seconds"
                await update_server_status_in_db_async(
                    instance_id=instance_id, update_type="status")
                await self.send(text_data=json.dumps({"message": response, "stream_id":  self.unique_response_id, "credit": credit}))
            elif server_status == "pending":
                response = "Server is setting up, try again in 30 seconds"
                await self.send(text_data=json.dumps({"message": response, "stream_id":  self.unique_response_id, "credit": credit}))
            else:
                response = "Unknown Server state, wait 5 seconds"
                await self.send(text_data=json.dumps({"message": response, "stream_id":  self.unique_response_id, "credit": credit}))
        else:
            response = "Model is currently offline"
            await self.send(text_data=json.dumps({"message": response, "stream_id":  self.unique_response_id, "credit": credit}))
            
    else: 
        clean_response = await send_chat_request_openai_async(self, processed_prompt)
        await log_prompt_response_async(is_session_start_node=self.is_session_start_node, key_object=self.key_object, model=self.choosen_models, prompt=self.message,
                                        response=clean_response, type_="open_ai")

async def async_agent_inference(self) -> None:
    if self.current_turn_inner >= 0 and self.current_turn_inner <= (self.max_turns-1):
        if self.current_turn_inner == 0:
            prompt = [
                {'role': 'system', 'content': f"{self.agent_instruction}"}, {
                    'role': 'user', 'content': f'{self.message}'}
            ]
        elif self.current_turn_inner > 0 and self.current_turn_inner < (self.max_turns-1):
            prompt = [
                {'role': 'system', 'content': f'Response:{self.message}\n'}
            ]

        elif self.current_turn_inner == (self.max_turns-1):
            force_stop = "You should directly give results based on history information."
            prompt = [
                {'role': 'system', 'content': f'Response:{force_stop}\n'}
            ]
        self.session_history.extend(prompt)
        clean_response = await send_agent_request_openai_async(self)
        await log_prompt_response_async(is_session_start_node=self.is_session_start_node, key_object=self.key_object, model=self.model_type, prompt=self.message,
                                        response=clean_response, type_="open_ai")
    else:
        await self.send(text_data=json.dumps({"message": f"Max Turns reached, click on the paragraphs on the left to write again", "role": "Server", "time": self.time}))
