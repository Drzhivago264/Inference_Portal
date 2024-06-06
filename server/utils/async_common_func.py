from server.utils import constant
from server.models import InferenceServer, LLM, PromptResponse
from django.db.models.query import QuerySet
from asgiref.sync import sync_to_async
from decouple import config
import json
import httpx
from django.utils import timezone
from .constant import REGION
import random
from openai import AsyncOpenAI
import openai
from .common_func import inference_mode, action_parse_json, log_prompt_response
from server.celery_tasks import command_EC2
import regex as re
from transformers import AutoTokenizer

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

    except openai.APIConnectionError as e:
        await self.send(text_data=json.dumps({"message": f"Failed to connect to OpenAI API: {e}", "role": self.choosen_models, "stream_id":  self.unique_response_id, "credit": self.key_object.credit}))
        raise e
    except openai.RateLimitError as e:
        await self.send(text_data=json.dumps({"message": f"OpenAI API request exceeded rate limit: {e}", "role": self.choosen_models, "stream_id":  self.unique_response_id, "credit": self.key_object.credit}))
        raise e
    except openai.APIError as e:
        if e.code == 'context_length_exceeded':
            try:
                raw_response = await client.chat.completions.create(model=self.choosen_models,
                                                                    messages=processed_prompt,
                                                                    stream=True,
                                                                    max_tokens=None,
                                                                    temperature=self.temperature,
                                                                    top_p=self.top_p,
                                                                    frequency_penalty=self.frequency_penalty,
                                                                    presence_penalty=self.presence_penalty
                                                                    )
            except Exception as e:
                await self.send(text_data=json.dumps({"message": f"OpenAI API returned an API Error: {e}", "role": self.choosen_models, "stream_id":  self.unique_response_id, "credit": self.key_object.credit}))
                raise e
        else:
            await self.send(text_data=json.dumps({"message": f"OpenAI API returned an API Error: {e}", "role": self.choosen_models, "stream_id":  self.unique_response_id, "credit": self.key_object.credit}))
            raise e
    if raw_response:
        async for chunk in raw_response:
            if chunk:
                data = chunk.choices[0].delta.content
                if data != None:
                    clean_response += data
                    await self.send(text_data=json.dumps({"message": data, "role": self.choosen_models, "stream_id":  self.unique_response_id, "credit": self.key_object.credit}))
        return clean_response


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


async def send_request_async(url, context):
    async with httpx.AsyncClient(transport=httpx.AsyncHTTPTransport(retries=2)) as client:
        response = await client.post(url, json=context,  timeout=60)
        response = response.json(
        )['text'][0] if response.status_code == 200 else None
        return response


async def send_stream_request_async(self: object, url: str, context: object, processed_prompt: str):
    client = httpx.AsyncClient(timeout=10)

    try:
        print(context)
        async with client.stream('POST', url, json=context) as response:
            response.raise_for_status()
            full_response = ""
            async for chunk in response.aiter_text():
                chunk = chunk[:-1]
                c = json.loads(chunk)
                output = c['text'][0].replace(processed_prompt, "")
                await self.send(text_data=json.dumps({"message": output.replace(full_response, ""), "stream_id":  self.unique_response_id, "credit": self.key_object.credit}))
                full_response = output
            return full_response
    except httpx.TimeoutException:
        await self.send(text_data=json.dumps({"message": "Wait! Server is setting up.", "stream_id":  self.unique_response_id, "credit":  self.key_object.credit}))
    except httpx.ConnectError:
        await self.send(text_data=json.dumps({"message": "Server is starting up! wait.", "stream_id":  self.unique_response_id, "credit":  self.key_object.credit}))
    except httpx.HTTPError as e:
        print(e)
        await self.send(text_data=json.dumps({"message": "You messed up the parameter! Return to default", "stream_id":  self.unique_response_id, "credit": self.key_object.credit}))


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
    except openai.APIConnectionError as e:
        await self.send(text_data=json.dumps({"message": f"Failed to connect to OpenAI API: {e}", "role": self.model_type, "stream_id": self.unique_response_id, "credit": self.key_object.credit}))
        raise e
    except openai.RateLimitError as e:
        await self.send(text_data=json.dumps({"message": f"OpenAI API request exceeded rate limit: {e}", "role": self.model_type, "stream_id":  self.unique_response_id, "credit": self.key_object.credit}))
        raise e
    except openai.APIError as e:
        if e.code == 'context_length_exceeded':
            try:
                raw_response = await client.chat.completions.create(model=self.model_type,
                                                                    messages=self.session_history,
                                                                    stream=True,
                                                                    max_tokens=None,
                                                                    temperature=self.temperature,
                                                                    top_p=self.top_p,
                                                                    frequency_penalty=self.frequency_penalty,
                                                                    presence_penalty=self.presence_penalty
                                                                    )
            except Exception as e:
                await self.send(text_data=json.dumps({"message": f"OpenAI API returned an API Error: {e}", "role": self.model_type, "stream_id":  self.unique_response_id, "credit": self.key_object.credit}))
                raise e
        else:
            await self.send(text_data=json.dumps({"message": f"OpenAI API returned an API Error: {e}", "role": self.model_type, "stream_id":  self.unique_response_id, "credit": self.key_object.credit}))
            raise e
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
        return clean_response


async def async_inference(self) -> None:
    if not self.beam:
        self.length_penalty = 1
        self.early_stopping = False
        self.best_of = 1
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
    tokeniser = AutoTokenizer.from_pretrained(constant.TOKENIZER_TABLE[self.choosen_models])
    url_list = await get_model_url_async(llm)
    session_list_to_string = tokeniser.apply_chat_template( processed_prompt, tokenize=False)
    if llm.is_self_host:
        context = {
            "prompt": session_list_to_string,
            "n": 1,
            'best_of': self.best_of,
            'presence_penalty': float(self.presence_penalty),
            "use_beam_search": self.beam,
            "temperature": float(self.temperature),
            "max_tokens": self.max_tokens,
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
                                                                  processed_prompt=session_list_to_string)
                if isinstance(response_stream, str):
                    await sync_to_async(log_prompt_response, thread_sensitive=True)(is_session_start_node=self.is_session_start_node, key_object=self.key_object, model=self.choosen_models, prompt=self.message, response=response_stream, type_="chatroom")
            else:
                await manage_ec2_on_inference(self, server_status, instance_id)
        else:
            response = "Model is currently offline"
            await self.send(text_data=json.dumps({"message": response, "stream_id":  self.unique_response_id, "credit": credit}))

    else:
        clean_response = await send_chat_request_openai_async(self, processed_prompt)
        await sync_to_async(log_prompt_response, thread_sensitive=True)(is_session_start_node=self.is_session_start_node, key_object=self.key_object, model=self.choosen_models, prompt=self.message,
                                                                        response=clean_response, type_="open_ai")

async def manage_ec2_on_inference(self, server_status, instance_id):
    if server_status == "stopped" or "stopping":
        command_EC2.delay(instance_id, region=REGION, action="on")
        response = "Server is starting up, try again in 400 seconds"
        await update_server_status_in_db_async(
            instance_id=instance_id, update_type="status")
        await self.send(text_data=json.dumps({"message": response, "stream_id":  self.unique_response_id, "credit": self.key_object.credit}))
    elif server_status == "pending":
        response = "Server is setting up, try again in 30 seconds"
        await self.send(text_data=json.dumps({"message": response, "stream_id":  self.unique_response_id, "credit": self.key_object.credit}))
    else:
        response = "Unknown Server state, wait 5 seconds"
        await self.send(text_data=json.dumps({"message": response, "stream_id":  self.unique_response_id, "credit": self.key_object.credit}))


async def async_agent_inference(self) -> None:
    if self.current_turn >= 0 and self.current_turn <= (self.max_turns-1):
        if self.current_turn == 0:
            prompt = [
                {'role': 'system', 'content': f"{self.agent_instruction}"}, {
                    'role': 'user', 'content': f'{self.message}'}
            ]
        elif self.current_turn > 0 and self.current_turn < (self.max_turns-1):
            prompt = [
                {'role': 'user', 'content': f'Response: {self.message}\n'}
            ]

        elif self.current_turn == (self.max_turns-1):
            force_stop = "You should directly give results based on history information."
            prompt = [
                {'role': 'system', 'content': f'Response: {force_stop}\n'}
            ]
        self.session_history.extend(prompt)
        llm = await LLM.objects.aget(name=self.model_type)
        if not llm.is_self_host:
            clean_response = await send_agent_request_openai_async(self)
            await sync_to_async(log_prompt_response, thread_sensitive=True)(is_session_start_node=self.is_session_start_node, key_object=self.key_object, model=self.model_type, prompt=self.message, response=clean_response, type_="open_ai")
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
                        await sync_to_async(log_prompt_response, thread_sensitive=True)(is_session_start_node=self.is_session_start_node, key_object=self.key_object, model=self.model_type, prompt=self.message, response=response_stream, type_="self_host_agent")
                else:
                    await manage_ec2_on_inference(self, server_status, instance_id)
            else:
                response = "Model is currently offline"
                await self.send(text_data=json.dumps({"message": response, "stream_id":  self.unique_response_id, "credit": self.key_object.credit}))

    else:
        self.session_history = []
        self.current_turn = 0
        await self.send(text_data=json.dumps({"message": "Max Turns reached",  "stream_id":  self.unique_response_id, "credit": self.key_object.credit}))
        await self.send(text_data=json.dumps({"message": f"Reseting working memory", "role": "Server", "time": self.time}))


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
                {'role': 'system', 'content': f'Response: {force_stop}\n'}
            ]

        self.session_history.extend(prompt)
        llm = await LLM.objects.aget(name=self.model_type)
        if not llm.is_self_host:
            clean_response = await send_agent_request_openai_async(self)
            await sync_to_async(log_prompt_response, thread_sensitive=True)(is_session_start_node=self.is_session_start_node, key_object=self.key_object, model=self.model_type, prompt=self.message, response=clean_response, type_="open_ai")
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
                        await sync_to_async(log_prompt_response, thread_sensitive=True)(is_session_start_node=self.is_session_start_node, key_object=self.key_object, model=self.model_type, prompt=self.message, response=response_stream, type_="self_host_agent")
                else:
                    await manage_ec2_on_inference(self, server_status, instance_id)
            else:
                response = "Model is currently offline"
                await self.send(text_data=json.dumps({"message": response, "stream_id":  self.unique_response_id, "credit": self.key_object.credit}))
    else:
        await self.send(text_data=json.dumps({"message": f"Max Turns reached, click on the paragraphs on the left to write again", "role": "Server", "time": self.time}))
