import json
import random
from typing import Tuple

from asgiref.sync import sync_to_async
from channels.db import database_sync_to_async
from django.contrib.auth.models import User
from django.db.models.query import QuerySet

from server.models import LLM, InferenceServer, InstructionTree, UserInstructionTree


class QueryDBMixin:

    async def get_master_key_and_master_user(self):
        if await sync_to_async(self.user.groups.filter(name="master_user").exists)():
            key_object = await sync_to_async(lambda: self.user.apikey)()
            return key_object, self.user, None
        elif await sync_to_async(self.user.groups.filter(name="slave_user").exists)():
            token = await sync_to_async(lambda: self.user.finegrainapikey)()
            key_object = await sync_to_async(lambda: token.master_key)()
            master_user = await sync_to_async(lambda: key_object.user)()
            return key_object, master_user, token

    async def check_permission(self, permission_code, destination):
        if await sync_to_async(self.user.has_perm)(permission_code):
            return True
        else:
            await self.send(
                text_data=json.dumps(
                    {
                        "message": f"Your key is not authorised to use {destination}. Disconnected",
                        "role": "Server",
                        "time": self.time,
                    }
                )
            )
            await self.disconnect(close_code={"code": 3000})

    async def get_template(
        self, name: str, template_type: str
    ) -> InstructionTree | UserInstructionTree:
        try:
            if template_type == "system":
                template = await InstructionTree.objects.aget(name=name)
                return template
            elif template_type == "user_template":
                template = await UserInstructionTree.objects.aget(
                    name=name, user=self.master_user
                )
                return template
        except (InstructionTree.DoesNotExist, UserInstructionTree.DoesNotExist):
            return False

    @database_sync_to_async
    def get_child_template_list(
        self, template: str, template_type: str = "system"
    ) -> dict:
        try:
            if template_type == "system":
                child_template = InstructionTree.objects.get(
                    name=template
                ).get_leafnodes()
                return {
                    "name_list": [c.name for c in child_template],
                    "default_child": child_template[0].name,
                    "default_instruct": child_template[0].instruct,
                }
            elif template_type == "user_template":
                child_template = UserInstructionTree.objects.get(
                    name=template.name, user=self.master_user
                ).get_leafnodes()
                if child_template:
                    return {
                        "displayed_name_list": [
                            c.displayed_name for c in child_template
                        ],
                        "name_list": [c.name for c in child_template],
                        "instruct_list": [c.instruct for c in child_template],
                        "default_child": child_template[0].displayed_name,
                        "default_instruct": child_template[0].instruct,
                    }
                else:
                    return {
                        "name_list": [],
                        "displayed_name_list": [],
                        "instruct_list": [],
                        "default_child": "",
                        "default_instruct": "",
                    }
        except (InstructionTree.DoesNotExist, UserInstructionTree.DoesNotExist):
            return False

    async def get_model(self, name=None) -> QuerySet[LLM] | bool:
        try:
            return await LLM.objects.aget(
                name=self.choosen_model if name is None else name
            )
        except LLM.DoesNotExist:
            return False

    async def get_model_url_async(
        self,
    ) -> Tuple[str, str, str] | Tuple[bool, bool, bool]:
        model_list = []
        try:
            async for m in InferenceServer.objects.filter(
                hosted_model__name=self.choosen_model, availability="Available"
            ):
                model_list.append(m)
            if model_list:
                random_url = random.choice(model_list)
                url = random_url.url
                instance_id = random_url.name
                server_status = random_url.status
                return url, instance_id, server_status
            else:
                return False, False, False
        except IndexError:
            return False, False, False
