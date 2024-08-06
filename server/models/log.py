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
    """
    Steplen = 5 will increase the number of potential root node (64^5 nodes), this can be a problem when the number of key/user get larger than 64^5 which is very unlikely.

    Max_length of path = 220_000, the tree will have max depth = 220_000/5 (44_000), in order to keep the tree from growing over this depth, node with depth = 44_000 cannot be a parent and similar node with be add as siblings.

    The reason why we can get away with unique field with 220_000 characters is because Posgres compress these chars into 2700 bytes which fit into it max size for index field. Number larger than 220_000 will break!!!.

    Nevertheless, SQL will probably break if it is asked deal with the tree with 44_000 depth, therefore, graph database is potential solution in the future.
    """

    name = models.CharField(max_length=255, unique=True)
    steplen = 5
    is_session_start_node = models.BooleanField(default=False)
    path = models.TextField(max_length=220_000, unique=True)
    alphabet = string.digits + string.ascii_uppercase + string.ascii_lowercase

    def __str__(self):
        return "Memory Node: {}".format(self.name)

    def get_ancestors(self, include_self: bool):
        """
        :returns: Override A queryset containing the current node object's ancestors,
            starting by the root node and descending to itself.
        """

        end_node_pos = len(self.path) + self.steplen if include_self else len(self.path)

        paths = [self.path[0:pos] for pos in range(0, end_node_pos, self.steplen)[1:]]

        return (
            get_result_class(self.__class__)
            .objects.filter(path__in=paths)
            .order_by("depth")
        )
