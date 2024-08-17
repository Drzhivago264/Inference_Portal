from typing import Optional

import tiktoken
from django.db import IntegrityError, transaction
from django.db.utils import DataError
from django.utils import timezone
from transformers import AutoTokenizer
from vectordb import vectordb

from server.models.api_key import APIKEY
from server.models.llm_server import LLM
from server.models.log import MemoryTreeMP, PromptResponse


def log_prompt_response(
    is_session_start_node: Optional[bool],
    key_object: APIKEY,
    llm: LLM,
    prompt: str,
    response: str,
    type_: int,
) -> None:
    """This function logs a prompt and its response into a database and then builds a memory tree of the chat history.

    Args:
        is_session_start_node (bool | None): A boolean or None indicating if this is the start of a session.
        key_object (object): An API key object.
        llm (LLM): An instance of the LLM (Language Learning Model).
        prompt (str): The prompt string given to the LLM.
        response (str): The response string from the LLM.
        type_ (int): An integer representing the type of log.
    """
    if not llm.is_self_host:
        try:
            tokeniser = tiktoken.encoding_for_model(llm.name)
        except KeyError:
            tokeniser = tiktoken.encoding_for_model("gpt-4")
        number_input_token = len(tokeniser.encode(prompt))
        number_output_token = len(tokeniser.encode(response))
        input_cost = number_input_token * llm.input_price
        output_cost = number_output_token * llm.output_price
    else:
        number_input_token = len(
            AutoTokenizer.from_pretrained(llm.base)(prompt)["input_ids"]
        )
        number_output_token = len(
            AutoTokenizer.from_pretrained(llm.base)(response)["input_ids"]
        )
        input_cost = number_input_token * llm.input_price
        output_cost = number_output_token * llm.output_price

    try:
        with transaction.atomic():
            pair_save = PromptResponse(
                prompt=prompt,
                response=response,
                key=key_object,
                model=llm,
                type=type_,
                number_input_tokens=number_input_token,
                number_output_tokens=number_output_token,
                input_cost=input_cost,
                output_cost=output_cost,
            )
            pair_save.save()
            build_memory_tree(
                key_object=key_object,
                prompt=prompt,
                response=response,
                llm=llm,
                type_=type_,
                is_session_start_node=is_session_start_node,
            )
    except (IntegrityError, IndexError, DataError):
        pass


def build_memory_tree(
    key_object: APIKEY,
    prompt: str,
    response: str,
    llm: LLM,
    type_: int,
    is_session_start_node: Optional[bool],
) -> None:
    if is_session_start_node is not None and type_ == PromptResponse.PromptType.CHATBOT:
        memory_tree_node_number = MemoryTreeMP.objects.filter(key=key_object).count()
        if memory_tree_node_number == 0:
            MemoryTreeMP.add_root(
                name=key_object.hashed_key,
                key=key_object,
                prompt=prompt,
                response=response,
                model=llm,
                type=type_,
                is_session_start_node=True,
            )

        elif memory_tree_node_number > 0 and is_session_start_node:
            most_similar_vector = vectordb.filter(
                metadata__key=key_object.hashed_key, metadata__type=type_
            ).search(prompt + response, k=2)
            if len(most_similar_vector) > 1:
                most_similar_prompt = most_similar_vector[1].content_object.prompt
                most_similar_response = most_similar_vector[1].content_object.response
                most_similar_node = (
                    MemoryTreeMP.objects.select_for_update()
                    .filter(
                        key=key_object,
                        prompt=most_similar_prompt,
                        response=most_similar_response,
                    )
                    .order_by("-created_at")[0]
                )
            else:
                most_similar_node = (
                    MemoryTreeMP.objects.select_for_update()
                    .filter(key=key_object)
                    .order_by("-created_at")[0]
                )
            if most_similar_node.depth < 43_998:
                most_similar_node.add_child(
                    name=f"{key_object.hashed_key} -- session_start_at {timezone.now()}",
                    key=key_object,
                    prompt=prompt,
                    response=response,
                    model=llm,
                    type=type_,
                    is_session_start_node=True,
                )
            else:
                most_similar_node.add_sibling(
                    name=f"{key_object.hashed_key} -- session_start_at {timezone.now()}",
                    key=key_object,
                    prompt=prompt,
                    response=response,
                    model=llm,
                    type=type_,
                    is_session_start_node=True,
                )

        elif memory_tree_node_number > 0 and not is_session_start_node:
            parent_node = (
                MemoryTreeMP.objects.select_for_update()
                .filter(key=key_object, is_session_start_node=True)
                .latest("created_at")
            )
            parent_node.add_child(
                name=f"{key_object.hashed_key} -- child_node_added_at {timezone.now()}",
                key=key_object,
                prompt=prompt,
                response=response,
                model=llm,
                type=type_,
                is_session_start_node=False,
            )
