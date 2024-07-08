import random
from server.models import (
    InferenceServer,
    LLM,
    InstructionTree,
    UserInstructionTree
)
from django.db.models.query import QuerySet
from typing import Tuple
from channels.db import database_sync_to_async

class QueryDBMixin:
    async def get_template(self, name, template_type):
        try:
            if template_type == 'system':
                template = await InstructionTree.objects.aget(name=name)
            elif template_type == 'user_template':
                template = await UserInstructionTree.objects.aget(displayed_name=name, user=self.user)
            return template
        except InstructionTree.DoesNotExist or UserInstructionTree.DoesNotExist:
            return False

    @database_sync_to_async
    def get_child_template_list(self, template, template_type="system"):
        try:
            if template_type == 'system':
                child_template = InstructionTree.objects.get(
                    name=template).get_leafnodes()
                return {"name_list": [c.name for c in child_template], "default_child": child_template[0].name, "default_instruct": child_template[0].instruct}
            elif template_type == 'user_template':
                child_template = UserInstructionTree.objects.get(
                    displayed_name=template.displayed_name).get_leafnodes()
                if child_template:
                    return {"name_list": [c.displayed_name for c in child_template], "default_child": child_template[0].displayed_name, "default_instruct": child_template[0].instruct}
                else:
                    return {"name_list": [], "default_child": "", "default_instruct": ""}
        except InstructionTree.DoesNotExist or UserInstructionTree.DoesNotExist:
            return False
        
    async def get_model(self) -> QuerySet[LLM] | bool:
        try:
            return await LLM.objects.aget(name=self.choosen_model)
        except LLM.DoesNotExist:
            return False
        
    async def get_model_url_async(self) -> Tuple[str, str, str] | Tuple[bool, bool, bool]:
        model_list = []
        try:
            async for m in InferenceServer.objects.filter(
                    hosted_model__name=self.choosen_model, availability="Available"):
                model_list.append(m)
            random_url = random.choice(model_list)
            url = random_url.url
            instance_id = random_url.name
            server_status = random_url.status
            return url, instance_id, server_status
        except Exception as e:
            return False, False, False



