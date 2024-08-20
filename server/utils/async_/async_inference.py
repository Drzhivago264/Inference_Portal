import json

import openai
import regex as re
from constance import config as constant
from decouple import config

from server.models.llm_server import LLM
from server.models.log import PromptResponse
from server.queue.log_prompt_response import celery_log_prompt_response
from server.utils.async_.async_manage_ec2 import (
    ManageEC2Mixin,
    update_server_status_in_db_async,
)
from server.utils.async_.async_query_database import QueryDBMixin
from server.utils.sync_.inference import action_parse_json


class AsyncInferenceMixin(ManageEC2Mixin, QueryDBMixin):
    async def openai_client_async(
        self,
        processed_prompt: list,
        vllm_server_url: str | None = None,
        llm: LLM | None = None,
    ) -> None:
  
        client = openai.AsyncOpenAI(
            api_key=(
                config("GPT_KEY") if vllm_server_url is None else config("VLLM_KEY")
            ),
            base_url=f"{vllm_server_url}/v1" if vllm_server_url else None,
            timeout=constant.TIMEOUT,
            max_retries=constant.RETRY,
        )

        try:
            raw_response = await client.chat.completions.create(
                model=self.choosen_model if vllm_server_url is None else llm.base,
                messages=processed_prompt,
                stream=True,
                max_tokens=self.max_tokens,
                temperature=self.temperature,
                top_p=self.top_p,
                frequency_penalty=self.frequency_penalty,
                presence_penalty=self.presence_penalty,
                extra_body=(
                    {
                        "best_of": self.best_of,
                        "use_beam_search": self.beam,
                        "top_k": self.top_k,
                        "length_penalty": self.length_penalty if self.beam else 1,
                        "early_stopping": self.early_stopping if self.beam else False,
                    }
                    if vllm_server_url and self.type == PromptResponse.PromptType.CHATBOT
                    else None
                ),
            )
            return raw_response

        except openai.APIConnectionError as e:
            await self.send(
                text_data=json.dumps(
                    {
                        "message": f"Failed to connect to {'vLLM' if vllm_server_url else 'OpenAI'} API: {e}",
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
                        "message": f"{'vLLM' if vllm_server_url else 'OpenAI'} API request exceeded rate limit: {e}",
                        "role": self.choosen_model,
                        "stream_id": self.unique_response_id,
                        "credit": self.key_object.credit,
                    }
                )
            )

        except openai.APIError as e:
            await self.send(
                text_data=json.dumps(
                    {
                        "message": f"{'vLLM' if vllm_server_url else 'OpenAI'} API returned an API Error: {e}",
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
                if data is not None:
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

        raw_response = await self.openai_client_async(processed_prompt=processed_prompt)
        if raw_response:
            full_response = await self.handle_response(raw_response)
            self.session_history.append(
                {"role": "assistant", "content": f"{full_response}"}
            )
            if full_response and isinstance(full_response, str):
                celery_log_prompt_response.delay(
                    is_session_start_node=self.is_session_start_node,
                    key_object_hashed_key=self.key_object.hashed_key,
                    llm_name=llm.name,
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
            processed_prompt=self.session_history
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
                    key_object_hashed_key=self.key_object.hashed_key,
                    llm_name=llm.name,
                    prompt=self.message,
                    response=full_response,
                    type_=self.type,
                )

    async def send_chat_request_vllm_async(
        self, processed_prompt: list, llm: LLM
    ) -> None:
        url, instance_id, server_status = await self.get_model_url_async()
        if url:
            await update_server_status_in_db_async(
                instance_id=instance_id, update_type="time"
            )
            if server_status == "running":
                raw_response = await self.openai_client_async(
                    processed_prompt=processed_prompt, vllm_server_url=url, llm=llm
                )
                if raw_response:
                    full_response = await self.handle_response(raw_response)
                    self.session_history.append(
                        {"role": "assistant", "content": f"{full_response}"}
                    )
                    if full_response and isinstance(full_response, str):
                        celery_log_prompt_response.delay(
                            is_session_start_node=self.is_session_start_node,
                            key_object_hashed_key=self.key_object.hashed_key,
                            llm_name=llm.name,
                            prompt=self.message,
                            response=full_response,
                            type_=self.type,
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

    async def send_agent_request_vllm_async(self, llm: LLM) -> str:
        url, instance_id, server_status = await self.get_model_url_async()
        if url:
            await update_server_status_in_db_async(
                instance_id=instance_id, update_type="time"
            )
            if server_status == "running":
                raw_response = await self.openai_client_async(
                    processed_prompt=self.session_history, vllm_server_url=url, llm=llm
                )
                if raw_response:
                    self.current_turn += 1
                    full_response = await self.handle_response(raw_response)
                    response_json = [
                        {"role": "assistant", "content": f"{full_response}"}
                    ]
                    self.session_history.extend(response_json)
                    action_list = action_parse_json(self.session_history[-1]["content"])
                    if action_list:
                        await self.execute_action(action_list, full_response)
                    if full_response and isinstance(full_response, str):
                        celery_log_prompt_response.delay(
                            is_session_start_node=self.is_session_start_node,
                            key_object_hashed_key=self.key_object.hashed_key,
                            llm_name=llm.name,
                            prompt=self.message,
                            response=full_response,
                            type_=self.type,
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
