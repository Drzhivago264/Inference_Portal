import json

import httpx
import openai
import regex as re
from decouple import config

import server.constant as constant
from server.models.llm_server import LLM
from server.queue.log_prompt_response import celery_log_prompt_response
from server.utils.async_.async_manage_ec2 import (
    ManageEC2Mixin,
    update_server_status_in_db_async,
)
from server.utils.async_.async_query_database import QueryDBMixin
from server.utils.sync_.inference import action_parse_json


class AsyncInferenceVllmMixin(ManageEC2Mixin, QueryDBMixin):

    async def handle_response(self, response, context):
        full_response = str()
        async for chunk in response.aiter_text():
            if chunk:
                chunk = chunk[:-1]
                try:
                    c = json.loads(chunk)
                    output = c["text"][0].replace(context["prompt"], "")
                    await self.send(
                        text_data=json.dumps(
                            {
                                "message": output.replace(full_response, ""),
                                "stream_id": self.unique_response_id,
                                "credit": self.key_object.credit,
                            }
                        )
                    )
                except json.decoder.JSONDecodeError:
                    pass
                return output

    async def send_vllm_request_async(self, llm: LLM, context: dict) -> None:
        client = httpx.AsyncClient(timeout=10)
        url, instance_id, server_status = await self.get_model_url_async()
        if url:
            await update_server_status_in_db_async(
                instance_id=instance_id, update_type="time"
            )
            if server_status == "running":
                try:
                    async with client.stream("POST", url, json=context) as response:
                        response.raise_for_status()
                        full_response = await self.handle_response(response, context)

                    if full_response and isinstance(full_response, str):
                        celery_log_prompt_response.delay(
                            is_session_start_node=self.is_session_start_node,
                            key_object_id=self.key_object.id,
                            llm_id=llm.id,
                            prompt=self.message,
                            response=full_response,
                            type_=self.type,
                        )
                except httpx.TimeoutException:
                    await self.send(
                        text_data=json.dumps(
                            {
                                "message": "Wait! Server is setting up.",
                                "stream_id": self.unique_response_id,
                                "credit": self.key_object.credit,
                            }
                        )
                    )
                except httpx.ConnectError:
                    await self.send(
                        text_data=json.dumps(
                            {
                                "message": "Wait! Server is setting up.",
                                "stream_id": self.unique_response_id,
                                "credit": self.key_object.credit,
                            }
                        )
                    )
                except httpx.HTTPError:
                    await self.send(
                        text_data=json.dumps(
                            {
                                "message": "You messed up the parameter! Return to default",
                                "stream_id": self.unique_response_id,
                                "credit": self.key_object.credit,
                            }
                        )
                    )
            else:
                await self.manage_ec2_on_inference(server_status, instance_id)
        else:
            await self.send(
                text_data=json.dumps(
                    {
                        "message": "Model is currently offline",
                        "stream_id": self.unique_response_id,
                        "credit": self.key_object.credit,
                    }
                )
            )


class AsyncInferenceOpenaiMixin:
    async def openai_client_async(
        self, processed_prompt: list, max_token_error: bool
    ) -> None:
        try:
            client = openai.AsyncOpenAI(
                api_key=config("GPT_KEY"),
                timeout=constant.TIMEOUT,
                max_retries=constant.RETRY,
            )
            raw_response = await client.chat.completions.create(
                model=self.choosen_model,
                messages=processed_prompt,
                stream=True,
                max_tokens=self.max_tokens if not max_token_error else None,
                temperature=self.temperature,
                top_p=self.top_p,
                frequency_penalty=self.frequency_penalty,
                presence_penalty=self.presence_penalty,
            )
            return raw_response

        except openai.APIConnectionError as e:
            await self.send(
                text_data=json.dumps(
                    {
                        "message": f"Failed to connect to OpenAI API: {e}",
                        "role": self.choosen_model,
                        "stream_id": self.unique_response_id,
                        "credit": self.key_object.credit,
                    }
                )
            )

        except openai.RateLimitError as e:
            await self.send(
                text_data=json.dumps(
                    {
                        "message": f"OpenAI API request exceeded rate limit: {e}",
                        "role": self.choosen_model,
                        "stream_id": self.unique_response_id,
                        "credit": self.key_object.credit,
                    }
                )
            )

        except openai.APIError as e:
            if e.code == "context_length_exceeded":
                raw_response = self.openai_client_async(
                    processed_prompt=processed_prompt, max_token_error=True
                )
                return raw_response
            else:
                await self.send(
                    text_data=json.dumps(
                        {
                            "message": f"OpenAI API returned an API Error: {e}",
                            "role": self.choosen_model,
                            "stream_id": self.unique_response_id,
                            "credit": self.key_object.credit,
                        }
                    )
                )

    async def handle_response(self, raw_response):
        full_response = str()
        async for chunk in raw_response:
            if chunk:
                data = chunk.choices[0].delta.content
                if data != None:
                    full_response += data
                    await self.send(
                        text_data=json.dumps(
                            {
                                "message": data,
                                "role": self.choosen_model,
                                "stream_id": self.unique_response_id,
                                "credit": self.key_object.credit,
                            }
                        )
                    )
        return full_response

    async def send_chat_request_openai_async(
        self, processed_prompt: list, llm: LLM
    ) -> str:

        raw_response = await self.openai_client_async(
            processed_prompt=processed_prompt, max_token_error=False
        )
        if raw_response:
            full_response = await self.handle_response(raw_response)
            self.session_history.append(
                {"role": "assistant", "content": f"{full_response}"}
            )
            if full_response and isinstance(full_response, str):
                celery_log_prompt_response.delay(
                    is_session_start_node=self.is_session_start_node,
                    key_object_id=self.key_object.id,
                    llm_id=llm.id,
                    prompt=self.message,
                    response=full_response,
                    type_=self.type,
                )

    async def execute_action(self, action_list, full_response):
        for act in action_list:
            action = json.loads(act)["Action"]
            if action == "STOP":
                full_result = self.session_history[-1]["content"]
                full_result = full_result.replace('{"Action": "STOP"}', "").replace(
                    "Final Answer:", ""
                )
                thought_match = re.findall("Thought: (.*)\n", full_result)
                if thought_match:
                    full_result = (
                        full_result.replace(thought_match[0], "")
                        .replace("Thought:", "")
                        .replace("\n\n\n", "")
                    )
                await self.send(
                    text_data=json.dumps(
                        {
                            "message": "Your request is finished, the result is moved to the editor below",
                            "role": "Server",
                            "time": self.time,
                        }
                    )
                )
                await self.send(
                    text_data=json.dumps(
                        {
                            "agent_action": action,
                            "result_id": self.working_paragraph,
                            "full_result": full_result,
                        }
                    )
                )
                self.session_history.clear()
                self.current_turn = 0
            elif action == "NEXT":
                full_result = "\n".join(
                    f"{log['role']}:\n{log['content']}\n\n"
                    for log in self.session_history
                    if log["role"] in ["user", "assistant"]
                ).replace('{"Action": "NEXT"}', "")
                self.session_history.clear()
                self.current_turn = 0
                self.agent_instruction += full_response
                prompt = [{"role": "system", "content": self.agent_instruction}]
                self.session_history.extend(prompt)
                await self.send(
                    text_data=json.dumps(
                        {
                            "agent_action": action,
                            "result_id": self.working_paragraph,
                            "full_result": full_result,
                        }
                    )
                )

    async def send_agent_request_openai_async(self, llm: LLM) -> str:

        raw_response = await self.openai_client_async(
            processed_prompt=self.session_history, max_token_error=False
        )
        if raw_response:
            self.current_turn += 1
            full_response = await self.handle_response(raw_response)
            response_json = [{"role": "assistant", "content": f"{full_response}"}]
            self.session_history.extend(response_json)
            action_list = action_parse_json(self.session_history[-1]["content"])
            if action_list:
                await self.execute_action(action_list, full_response)
            if full_response and isinstance(full_response, str):
                celery_log_prompt_response.delay(
                    is_session_start_node=self.is_session_start_node,
                    key_object_id=self.key_object.id,
                    llm_id=llm.id,
                    prompt=self.message,
                    response=full_response,
                    type_=self.type,
                )
