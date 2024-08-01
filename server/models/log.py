import json
from django.core.serializers.json import DjangoJSONEncoder
from django.db import models
from mptt.models import MPTTModel, TreeForeignKey
from server.models.api_key import APIKEY
from server.models.llm_server import LLM


class AbstractPromptResponse(models.Model):
    prompt = models.TextField()
    response = models.TextField()
    model = models.ForeignKey(LLM, on_delete=models.CASCADE)
    key = models.ForeignKey(APIKEY, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class PromptType(models.IntegerChoices):
        CHATBOT = 1, "chatbot"
        CHATBOT_API = 2, "chatbot_api"
        AGENT = 3, "agent"
        AGENT_API = 4, "agent_api"
        TOOLBOX = 5, "toolbox"
        TOOLBOX_API = 6, "toolbox_api"
        DATA_SYNTHESIS = 7, "data_synthesis"

    type = models.PositiveSmallIntegerField(
        choices = PromptType.choices,
        default = PromptType.CHATBOT
    )

    class Meta:
        abstract = True


class PromptResponse(AbstractPromptResponse):
    input_cost = models.FloatField(default=0.0)
    output_cost = models.FloatField(default=0.0)
    number_input_tokens = models.IntegerField(default=0)
    number_output_tokens = models.IntegerField(default=0)

    class Meta:
        ordering = ("-created_at",)

    def __str__(self) -> str:
        return self.prompt

    def get_vectordb_text(self):
        return f"{self.prompt} -- {self.response}"

    def get_vectordb_metadata(self):
        return {
            "key": self.key.hashed_key,
            "key_name": self.key.name,
            "type": self.type,
            "input_cost": self.input_cost,
            "output_cost": self.output_cost,
            "model": self.model.name,
            "created_at": json.dumps(self.created_at, cls=DjangoJSONEncoder),
        }


class MemoryTree(MPTTModel, AbstractPromptResponse):
    name = models.CharField(max_length=255, unique=True)
    parent = TreeForeignKey(
        "self", on_delete=models.CASCADE, null=True, blank=True, related_name="children"
    )
    is_session_start_node = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f"{self.name}"

    class MPTTMeta:
        order_insertion_by = ["created_at"]
