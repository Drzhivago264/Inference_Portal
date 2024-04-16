from ninja import Schema
import datetime
from apikey.util import constant
from pydantic import (
    ValidationInfo,
    field_validator,
)

class PromptSchema(Schema):
    prompt: str = ""
    model: str = constant.DEFAULT_MODEL
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
    def check_range_tokens(cls, v: int | None, info: ValidationInfo):
        if not (-1 <= v <= 100): 
            raise ValueError(f'{v} is not a valid {info.field_name}.')
        return v

class ChatSchema(PromptSchema):
    stream: bool = False
    include_memory: bool = constant.DEFAULT_MEMORY


class ResponseLogRequest(Schema):
    quantity: int = 10
    lastest: bool = True
    filter_by: list = ["chatroom", "prompt", "open_ai"]


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


class SentimentandSummarySchema(Schema):
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

class ClassificationSchema(SentimentandSummarySchema):
    classification_list: str | None = None

class SentimentandSummaryResponseSchema(Schema):
    response: str
    context: SentimentandSummarySchema

class ClassificationResponseSchema(Schema):
    response: str
    context: ClassificationSchema