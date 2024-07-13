from pydantic import (
    BaseModel,
    ValidationInfo,
    field_validator,
    model_validator
)

from typing_extensions import Self
from server.utils import constant


class AgentSchemaMessage(BaseModel):
    message: str
    choosen_model: str
    instruct_change: bool 
    max_turn: int
    choosen_template: str
    top_p: float  = constant.DEFAULT_TOP_P
    frequency_penalty: float  = constant.DEFAULT_FREQUENCY_PENALTY
    presence_penalty: float = constant.DEFAULT_PRESENCE_PENALTY
    temperature:float = constant.DEFAULT_TEMPERATURE
    max_tokens: int | None = None
    role: str
    agent_instruction: str
    child_instruction: str
    currentParagraph: int
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
        
    @field_validator('max_turn')
    @classmethod
    def check_max_turn(cls, v: float, info: ValidationInfo):
        if not (0 < v <= 10): raise ValueError(f'{v} is not a valid {info.field_name}.')
        return v
    
    @model_validator(mode='after')
    def validate_context_length(self) -> Self:
        message = self.message
        if len(message) > constant.DEFAULT_MAX_INPUT_LENGTH:
            raise ValueError('Your message exceeds the maximum context')
        return self
    
class AgentSchemaParagraph(BaseModel):
    paragraph: int

class AgentSchemaInstruct(BaseModel):
    swap_child_instruct: str
    template_type: str

class AgentSchemaTemplate(BaseModel):
    swap_template: str
    template_type: str

class ChatSchema(BaseModel):
    message: str
    choosen_model: str
    mode: str
    best_of: int = constant.DEFAULT_BEST_OF
    beam: bool = constant.DEFAULT_BEAM
    early_stopping: bool = constant.DEFAULT_EARLY_STOPPING
    top_k: int = constant.DEFAULT_TOP_K
    top_p: float = constant.DEFAULT_TOP_P
    frequency_penalty: float = constant.DEFAULT_FREQUENCY_PENALTY
    presence_penalty: float = constant.DEFAULT_PRESENCE_PENALTY
    length_penalty: float = constant.DEFAULT_LENGTH_PENALTY
    temperature:float = constant.DEFAULT_TEMPERATURE
    max_tokens: int | None
    include_memory: bool = False
    include_current_memory: bool = True
    role: str

    @model_validator(mode='after')
    def only_one_memory_type(self) -> Self:
        include_memory = self.include_memory
        include_current_memory = self.include_current_memory
        if include_current_memory and include_memory:
            raise ValueError('Only use one type of memory at a time, set include_memory or include_current_memory or both False')
        return self
    
    @model_validator(mode='after')
    def validate_context_length(self) -> Self:
        message = self.message
        if len(message) > constant.DEFAULT_MAX_INPUT_LENGTH:
            raise ValueError('Your message exceeds the maximum context')
        return self
    
    @field_validator('frequency_penalty','length_penalty','presence_penalty')
    @classmethod
    def check_range_fre_pre_len(cls, v: float, info: ValidationInfo):
        if not (-2 <= v <= 2): raise ValueError(f'{v} is not a valid {info.field_name}.')
        return v

    @field_validator('top_k')
    @classmethod
    def check_range_top_k(cls, v: int, info: ValidationInfo):
        if not (-1 <= v <= 100): raise ValueError(f'{v} is not a valid {info.field_name}.')
        return v
    
    @field_validator('top_p', 'temperature')
    @classmethod
    def check_range_top_p_tem(cls, v: float, info: ValidationInfo):
        if not (0 <= v <= 1): raise ValueError(f'{v} is not a valid {info.field_name}.')
        return v


class ToolSchema(BaseModel):
    message: str
    choosen_model: str
    tool: str
    emotion_list: str | None = None
    topic_list: str | None = None
    top_p: float = constant.DEFAULT_TOP_P
    frequency_penalty: float = constant.DEFAULT_FREQUENCY_PENALTY
    presence_penalty: float = constant.DEFAULT_PRESENCE_PENALTY
    temperature:float = constant.DEFAULT_TEMPERATURE
    max_tokens: int | None = constant.DEFAULT_MAX_TOKENS
    role: str
    number_of_word: int | None = 50
    style_list: str | None = None
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

    @model_validator(mode='after')
    def validate_context_length(self) -> Self:
        message = self.message
        if len(message) > constant.DEFAULT_MAX_INPUT_LENGTH:
            raise ValueError('Your message exceeds the maximum context')
        return self

class DataSynthesisSchema(BaseModel):
    row_no: int
    child_instruction_list: list
    seed_prompt: str
    parent_instruction: str
    optional_instruction: str = ""
    choosen_model: str
    top_p: float = constant.DEFAULT_TOP_P
    frequency_penalty: float = constant.DEFAULT_FREQUENCY_PENALTY
    presence_penalty: float = constant.DEFAULT_PRESENCE_PENALTY
    temperature:float = constant.DEFAULT_TEMPERATURE
    max_tokens: int | None

    @field_validator('frequency_penalty','presence_penalty')
    @classmethod
    def check_range_fre_pre_len(cls, v: float, info: ValidationInfo):
        if not (-2 <= v <= 2): raise ValueError(f'{v} is not a valid {info.field_name}.')
        return v

    @field_validator('top_p', 'temperature')
    @classmethod
    def check_range_top_p_tem(cls, v: float, info: ValidationInfo):
        if not (0 <= v <= 1): raise ValueError(f'{v} is not a valid {info.field_name}.')
        return v
