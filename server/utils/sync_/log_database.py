import tiktoken
from vectordb import vectordb
from transformers import AutoTokenizer

from django.utils import timezone
from django.db.utils import DataError
from server.models import (
    PromptResponse,
    MemoryTree,
    LLM,
    APIKEY
)


def log_prompt_response(is_session_start_node: bool | None, key_object: APIKEY, llm: LLM, prompt: str, response: str, type_: str) -> None:
    """This function store log into a db then build a memory tree of chat history
    Args:
        is_session_start_node (bool | None): _description_
        key_object (object): _description_
        model (str): _description_
        prompt (str): _description_
        response (str): _description_
        type_ (str): _description_
    """
    if not llm.is_self_host:
        try:
            tokeniser = tiktoken.encoding_for_model(llm.name)
        except KeyError:
            tokeniser = tiktoken.encoding_for_model("gpt-4")
        number_input_token = len(tokeniser.encode(prompt))
        number_output_token = len(tokeniser.encode(response))
        input_cost = number_input_token*llm.input_price
        output_cost = number_output_token*llm.output_price
    else:
        number_input_token = len(AutoTokenizer.from_pretrained(
            llm.base)(prompt)['input_ids'])
        number_output_token = len(AutoTokenizer.from_pretrained(
            llm.base)(response)['input_ids'])
        input_cost = number_input_token*llm.input_price
        output_cost = number_output_token*llm.output_price
    try:
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
        pair_save.save()
        build_memory_tree(key_object=key_object, prompt=prompt, response=response, llm=llm, type_= type_, is_session_start_node=is_session_start_node)
    except (DataError, IndexError):
            pass

def build_memory_tree(key_object: APIKEY, prompt: str, response: str, llm: LLM, type_: str, is_session_start_node: bool) -> None:
    if is_session_start_node is not None and type_ == "chatbot":
        memory_tree_node_number = MemoryTree.objects.filter(
            key=key_object).count()
        if memory_tree_node_number == 0:
            MemoryTree.objects.create(name=key_object.hashed_key, key=key_object, prompt=prompt,
                                    response=response, model=llm, p_type=type_, is_session_start_node=True)

        elif memory_tree_node_number > 0 and is_session_start_node:
            most_similar_vector = vectordb.filter(
                metadata__key=key_object.hashed_key, metadata__p_type=type_).search(prompt+response, k=2)
            if len(most_similar_vector)>1:
                most_similar_prompt = most_similar_vector[1].content_object.prompt
                most_similar_response = most_similar_vector[1].content_object.response
                most_similar_node = MemoryTree.objects.filter(
                    key=key_object, prompt=most_similar_prompt, response=most_similar_response).order_by("-created_at")[0]
                MemoryTree.objects.create(name=f"{key_object.hashed_key} -- session_start_at {timezone.now()}", parent=most_similar_node,
                                        key=key_object, prompt=prompt, response=response, model=llm, p_type=type_, is_session_start_node=True)
            else:
                most_similar_node = MemoryTree.objects.filter(
                    key=key_object).order_by("-created_at")[0]
                MemoryTree.objects.create(name=f"{key_object.hashed_key} -- session_start_at {timezone.now()}", parent=most_similar_node,
                        key=key_object, prompt=prompt, response=response, model=llm, p_type=type_, is_session_start_node=True)

        elif memory_tree_node_number > 0 and not is_session_start_node:
            parent_node = MemoryTree.objects.filter(
                key=key_object, is_session_start_node=True).latest('created_at')
            MemoryTree.objects.create(name=f"{key_object.hashed_key} -- child_node_added_at {timezone.now()}", parent=parent_node,
                                    key=key_object, prompt=prompt, response=response, model=llm, p_type=type_, is_session_start_node=False)
