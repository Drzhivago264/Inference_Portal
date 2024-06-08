from ninja import Schema
import datetime
from server.utils import constant
from pydantic import (
    ValidationInfo,
    field_validator,
)

class PromptSchema(Schema):
    prompt: str = ""
    model: str = constant.DEFAULT_SELF_HOST
    top_p: float = constant.DEFAULT_TOP_P
    top_k: int = constant.DEFAULT_TOP_K
    temperature: float = constant.DEFAULT_TEMPERATURE
    beam: bool = constant.DEFAULT_BEAM
    best_of: int = constant.DEFAULT_BEST_OF
    max_tokens: int = constant.DEFAULT_MAX_TOKENS
    presence_penalty: float = constant.DEFAULT_PRESENCE_PENALTY
    frequency_penalty: float = constant.DEFAULT_FREQUENCY_PENALTY
    length_penalty: float = constant.DEFAULT_LENGTH_PENALTY
    early_stopping: bool = constant.DEFAULT_EARLY_STOPPING
    n: int = constant.DEFAULT_N
    @field_validator('frequency_penalty', 'presence_penalty')
    @classmethod
    def check_range_fre_pre(cls, v: float, info: ValidationInfo):
        if not (-2 <= v <= 2): raise ValueError(f'{v} is not a valid {info.field_name}.')
        return v

    @field_validator('top_p', 'temperature')
    @classmethod
    def check_range_top_p_tem(cls, v: float, info: ValidationInfo):
        if not (0 <= v <= 1): raise ValueError(f'{v} is not a valid {info.field_name}.')
        return v
    
    @field_validator('max_tokens')
    @classmethod
    def check_range_tokens(cls, v: int | None, info: ValidationInfo):
        if v is not None:
            if not (0 <= v <= 8192): raise ValueError(f'{v} is not a valid {info.field_name}.')
        return v
    
    @field_validator('top_k')
    @classmethod
    def check_range_top_k(cls, v: int | None, info: ValidationInfo):
        if not (-1 <= v <= 100): 
            raise ValueError(f'{v} is not a valid {info.field_name}.')
        return v

class ChatSchema(PromptSchema):
    stream: bool = False
    include_memory: bool = constant.DEFAULT_MEMORY

class AgentSchema(PromptSchema):
    stream: bool = False
    working_memory: list = []
    parent_template_name: str |None = "Assignment Agent"
    child_template_name: str | None = "Introduction"
    use_my_template: bool = False

class ResponseLogRequest(Schema):
    quantity: int = 10
    lastest: bool = True
    filter_by: list = ["chatroom", "prompt", "open_ai", "chat_api", "agent_api"]


class ResponseLogResponse(Schema):
    prompt: str
    response: str
    created_at: datetime.datetime
    type: str
    model: str


class Error(Schema):
    detail: str


class PromptResponse(Schema):
    response: str
    context: PromptSchema


class ChatResponse(Schema):
    response: str
    context: ChatSchema


class AgentResponse(Schema):
    working_memory: list
    context: ChatSchema
    parent_template_name: str |None 
    child_template_name: str | None
    use_my_template: bool 

class BaseLLMSchema(Schema):
    prompt: str = ""
    model: str = "gpt-4"
    top_p: float = constant.DEFAULT_TOP_P
    temperature: float = constant.DEFAULT_TEMPERATURE
    max_tokens: int = constant.DEFAULT_MAX_TOKENS
    presence_penalty: float = constant.DEFAULT_PRESENCE_PENALTY
    frequency_penalty: float = constant.DEFAULT_FREQUENCY_PENALTY
    @field_validator('frequency_penalty', 'presence_penalty')
    @classmethod
    def check_range_fre_pre(cls, v: float, info: ValidationInfo):
        if not (-2 <= v <= 2): raise ValueError(f'{v} is not a valid {info.field_name}.')
        return v

    @field_validator('top_p', 'temperature')
    @classmethod
    def check_range_top_p_tem(cls, v: float, info: ValidationInfo):
        if not (0 <= v <= 1): raise ValueError(f'{v} is not a valid {info.field_name}.')
        return v
    
    @field_validator('max_tokens')
    @classmethod
    def check_range_tokens(cls, v: int | None, info: ValidationInfo):
        if v is not None:
            if not (0 <= v <= 8192): raise ValueError(f'{v} is not a valid {info.field_name}.')
        return v

    @field_validator('model')
    @classmethod
    def check_model(cls, v: str, info: ValidationInfo):
        if not v in constant.OPEN_AI_MODEL_LIST: raise ValueError(f'{v} is not a valid {info.field_name}.')
        return v

class ClassificationSchema(BaseLLMSchema):
    classification_list: str | None = None

class SummarizeSchema(BaseLLMSchema):
    number_of_word: int | None = 50

class RestyleSchema(BaseLLMSchema):
    style_list: str | None = None

class SummarizeResponseSchema(Schema):
    response: str
    context: SummarizeSchema

class BaseLLMResponseSchema(Schema):
    response: str
    context: BaseLLMSchema

class RestyleResponseSchema(Schema):
    response: str
    context: RestyleSchema

class ClassificationResponseSchema(Schema):
    response: str
    context: ClassificationSchema