import datetime

from ninja import Field, Schema
from pydantic import ValidationInfo, field_validator, model_validator
from typing_extensions import Self

from server import constant


class PromptSchema(Schema):
    prompt: str = ""
    model: str = Field(
        default=constant.DEFAULT_SELF_HOST, examples=[constant.DEFAULT_SELF_HOST]
    )
    top_p: float = Field(
        default=constant.DEFAULT_TOP_P, examples=[constant.DEFAULT_TOP_P]
    )
    top_k: int = Field(
        default=constant.DEFAULT_TOP_K, examples=[constant.DEFAULT_TOP_K]
    )
    temperature: float = Field(
        default=constant.DEFAULT_TEMPERATURE, examples=[constant.DEFAULT_TEMPERATURE]
    )
    beam: bool = Field(default=constant.DEFAULT_BEAM, examples=[constant.DEFAULT_BEAM])
    best_of: int = Field(
        default=constant.DEFAULT_BEST_OF, examples=[constant.DEFAULT_BEST_OF]
    )
    max_tokens: int = Field(
        default=constant.DEFAULT_MAX_TOKENS, examples=[constant.DEFAULT_MAX_TOKENS]
    )
    presence_penalty: float = Field(
        default=constant.DEFAULT_PRESENCE_PENALTY,
        examples=[constant.DEFAULT_PRESENCE_PENALTY],
    )
    frequency_penalty: float = Field(
        default=constant.DEFAULT_FREQUENCY_PENALTY,
        examples=[constant.DEFAULT_FREQUENCY_PENALTY],
    )
    length_penalty: float = Field(
        default=constant.DEFAULT_LENGTH_PENALTY,
        examples=[constant.DEFAULT_LENGTH_PENALTY],
    )
    early_stopping: bool = Field(
        default=constant.DEFAULT_EARLY_STOPPING,
        examples=[constant.DEFAULT_EARLY_STOPPING],
    )
    n: int = Field(default=constant.DEFAULT_N, examples=[constant.DEFAULT_N])

    @field_validator("frequency_penalty", "presence_penalty")
    @classmethod
    def check_range_fre_pre(cls, v: float, info: ValidationInfo):
        if not (-2 <= v <= 2):
            raise ValueError(f"{v} is not a valid {info.field_name}.")
        return v

    @field_validator("top_p", "temperature")
    @classmethod
    def check_range_top_p_tem(cls, v: float, info: ValidationInfo):
        if not (0 <= v <= 1):
            raise ValueError(f"{v} is not a valid {info.field_name}.")
        return v

    @field_validator("max_tokens")
    @classmethod
    def check_range_tokens(cls, v: int | None, info: ValidationInfo):
        if v is not None:
            if not (0 <= v <= 8192):
                raise ValueError(f"{v} is not a valid {info.field_name}.")
        return v

    @field_validator("top_k")
    @classmethod
    def check_range_top_k(cls, v: int | None, info: ValidationInfo):
        if not (-1 <= v <= 100):
            raise ValueError(f"{v} is not a valid {info.field_name}.")
        return v

    @model_validator(mode="after")
    def validate_context_length(self) -> Self:
        message = self.prompt
        if len(message) > constant.DEFAULT_MAX_INPUT_LENGTH:
            raise ValueError("Your message exceeds the maximum context")
        return self


class ChatSchema(PromptSchema):
    prompt: str | list = ""
    stream: bool = Field(default=False, examples=[False])
    include_memory: bool = Field(
        default=constant.DEFAULT_MEMORY, examples=[constant.DEFAULT_MEMORY]
    )
    include_current_memory: bool = Field(
        default=not constant.DEFAULT_MEMORY, examples=[not constant.DEFAULT_MEMORY]
    )

    @model_validator(mode="after")
    def validate_context_length(self) -> Self:
        message = self.prompt
        if len(message) > constant.DEFAULT_MAX_INPUT_LENGTH:
            raise ValueError("Your message exceeds the maximum context")
        return self

    @model_validator(mode="after")
    def only_one_memory_type(self) -> Self:
        include_memory = self.include_memory
        include_current_memory = self.include_current_memory
        if include_current_memory and include_memory:
            raise ValueError(
                "Only use one type of memory at a time, set include_memory or include_current_memory or both False"
            )
        return self


class AgentSchema(PromptSchema):
    stream: bool = Field(default=False, examples=[False])
    working_memory: list = Field(default=[], examples=[[]])
    parent_template_name: str = Field(
        default="Assignment Agent", examples=["Assignment Agent"]
    )
    child_template_name: str = Field(default="Introduction", examples=["Introduction"])
    use_my_template: bool = Field(default=False, examples=[False])


class ResponseLogRequest(Schema):
    quantity: int = Field(default=10, examples=[10])
    lastest: bool = Field(default=True, examples=[True])
    filter_by: list = Field(
        default=["chatroom", "prompt", "open_ai", "chat_api", "agent_api"],
        examples=[["chatroom", "prompt", "open_ai", "chat_api", "agent_api"]],
    )


class ResponseLogResponse(Schema):
    prompt: str
    response: str
    created_at: datetime.datetime
    type: str
    model: str


class Error(Schema):
    detail: str


class PromptResponseSchema(Schema):
    response: str
    context: PromptSchema


class ChatResponse(Schema):
    response: str
    context: ChatSchema


class AgentResponse(Schema):
    working_memory: list
    context: ChatSchema
    parent_template_name: str | None
    child_template_name: str | None
    use_my_template: bool


class BaseLLMSchema(Schema):
    prompt: str = ""
    model: str = Field(default="gpt-4", examples=["gpt-4"])
    top_p: float = Field(
        default=constant.DEFAULT_TOP_P, examples=[constant.DEFAULT_TOP_P]
    )
    temperature: float = Field(
        default=constant.DEFAULT_TEMPERATURE, examples=[constant.DEFAULT_TEMPERATURE]
    )
    max_tokens: int = Field(
        default=constant.DEFAULT_MAX_TOKENS, examples=[constant.DEFAULT_MAX_TOKENS]
    )
    presence_penalty: float = Field(
        default=constant.DEFAULT_PRESENCE_PENALTY,
        examples=[constant.DEFAULT_PRESENCE_PENALTY],
    )
    frequency_penalty: float = Field(
        default=constant.DEFAULT_FREQUENCY_PENALTY,
        examples=[constant.DEFAULT_FREQUENCY_PENALTY],
    )

    @field_validator("frequency_penalty", "presence_penalty")
    @classmethod
    def check_range_fre_pre(cls, v: float, info: ValidationInfo):
        if not (-2 <= v <= 2):
            raise ValueError(f"{v} is not a valid {info.field_name}.")
        return v

    @field_validator("top_p", "temperature")
    @classmethod
    def check_range_top_p_tem(cls, v: float, info: ValidationInfo):
        if not (0 <= v <= 1):
            raise ValueError(f"{v} is not a valid {info.field_name}.")
        return v

    @field_validator("max_tokens")
    @classmethod
    def check_range_tokens(cls, v: int | None, info: ValidationInfo):
        if v is not None:
            if not (0 <= v <= 8192):
                raise ValueError(f"{v} is not a valid {info.field_name}.")
        return v

    @field_validator("model")
    @classmethod
    def check_model(cls, v: str, info: ValidationInfo):
        if not v in constant.OPEN_AI_MODEL_LIST:
            raise ValueError(f"{v} is not a valid {info.field_name}.")
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
