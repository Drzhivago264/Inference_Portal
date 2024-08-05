import json
import string 
from django.core.serializers.json import DjangoJSONEncoder
from django.db import models

from treebeard.mp_tree import MP_Node, get_result_class
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
        choices=PromptType.choices, default=PromptType.CHATBOT
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


class MemoryTreeMP(MP_Node, AbstractPromptResponse):
    name = models.CharField(max_length=255, unique=True)
    steplen = 5
    is_session_start_node = models.BooleanField(default=False)
    path = models.TextField(max_length= 9999999, unique=True)
    alphabet = string.digits + string.ascii_uppercase + string.ascii_lowercase
    def __str__(self):
            return 'Memory Node: {}'.format(self.name)
    

    def get_ancestors(self, include_self: bool):
        """
        :returns: Override A queryset containing the current node object's ancestors,
            starting by the root node and descending to the parent to include itself.
        """
        if self.is_root():
            return get_result_class(self.__class__).objects.none()
        

        if include_self:
            paths = [
                self.path[0:pos]
                for pos in range(0, len(self.path) + self.steplen, self.steplen)[1:]
            ]
        else:
            paths = [
                self.path[0:pos]
                for pos in range(0, len(self.path), self.steplen)[1:]
            ]    
        return get_result_class(self.__class__).objects.filter(
            path__in=paths ).order_by('depth')

