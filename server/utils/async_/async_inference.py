
from decouple import config
import json
import httpx
import openai
from server.utils.sync_.inference import action_parse_json
import regex as re
import server.utils.constant as constant

async def send_chat_request_openai_async(self, processed_prompt) -> str:
    clean_response = ""
    try:
        client = openai.AsyncOpenAI(api_key=config("GPT_KEY"), timeout=constant.TIMEOUT, max_retries=constant.RETRY)
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


async def send_request_async(url, context):
    async with httpx.AsyncClient(transport=httpx.AsyncHTTPTransport(retries=constant.RETRY)) as client:
        response = await client.post(url, json=context,  timeout=constant.TIMEOUT)
        response = response.json(
        )['text'][0] if response.status_code == 200 else None
        return response


async def send_stream_request_async(self: object, url: str, context: object, processed_prompt: str):
    client = httpx.AsyncClient(timeout=10)

    try:
        async with client.stream('POST', url, json=context) as response:
            response.raise_for_status()
            full_response = ""
            async for chunk in response.aiter_text():
                if (chunk):
                    chunk = chunk[:-1]
                    try:
                        c = json.loads(chunk)
                        output = c['text'][0].replace(processed_prompt, "")
                        await self.send(text_data=json.dumps({"message": output.replace(full_response, ""), "stream_id":  self.unique_response_id, "credit": self.key_object.credit}))
                    except json.decoder.JSONDecodeError:
                        pass
                    full_response = output
            return full_response
    except httpx.TimeoutException:
        await self.send(text_data=json.dumps({"message": "Wait! Server is setting up.", "stream_id":  self.unique_response_id, "credit":  self.key_object.credit}))
    except httpx.ConnectError:
        await self.send(text_data=json.dumps({"message": "Server is starting up! wait.", "stream_id":  self.unique_response_id, "credit":  self.key_object.credit}))
    except httpx.HTTPError as e:
        print(e)
        await self.send(text_data=json.dumps({"message": "You messed up the parameter! Return to default", "stream_id":  self.unique_response_id, "credit": self.key_object.credit}))


async def send_agent_request_openai_async(self) -> str:
    clean_response = ""
    try:
        client = openai.AsyncOpenAI(api_key=config("GPT_KEY"), timeout=constant.TIMEOUT, max_retries=constant.RETRY)
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




