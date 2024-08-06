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
    """
        Steplen = 4 have the number of potential root node (64^4 nodes)
        Max_length of path = 255, the tree will have max depth = 255/4 (63)
        The reason why User Instruction Tree can get away with max_length = 255 is because the maximun depth of a not is no larger than 2 ( parent_instruction_node -> children_instruction_node)
        Also, there is unlikely that admin can add more than 64^4 unique instruction anytime soon.
    """
    pass


class UserInstructionTreeMP(AbstractInstructionTreeMP):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    """
        Steplen = 10 will increase the number of potential root node (64^10 nodes)
        Max_length of path = 255, the tree will have max depth = 255/10 (25)
        The reason why User Instruction Tree can get away with max_length = 255 is because the maximun depth of a not is no larger than 3 (user_root_node -> parent_instruction_node -> children_instruction_node)
    """
    steplen = 10
    displayed_name = models.TextField(default="")


