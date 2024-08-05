from django.contrib.auth.models import User
from django.db import models
from treebeard.mp_tree import MP_Node
import string

class AbstractInstructionTreeMP(MP_Node):
    node_order_by = ['code']
    name = models.CharField(max_length=255, unique=True)
    code = models.TextField()
    
    instruct = models.TextField(default="", max_length=128000)
    default_child = models.BooleanField(default=False)
    default_editor_template = models.TextField(default="")
    steplen = 4
    path = models.CharField(max_length= 255, unique=True)
    alphabet = string.digits + string.ascii_uppercase + string.ascii_lowercase
    def __str__(self) -> str:
        return f"{self.name}"
    class Meta:
        abstract = True


class InstructionTreeMP(AbstractInstructionTreeMP):
    pass


class UserInstructionTreeMP(AbstractInstructionTreeMP):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    displayed_name = models.TextField(default="")


