import json
import random
from typing import Literal, Tuple

from asgiref.sync import sync_to_async
from channels.db import database_sync_to_async
from django.utils import timezone

from server.models.instruction import InstructionTreeMP, UserInstructionTreeMP
from server.models.llm_server import LLM, InferenceServer
from server.utils.async_.async_cache import get_or_set_cache as async_get_or_set_cache
from server.utils.sync_.sync_cache import get_or_set_cache as sync_get_or_set_cache


class QueryDBMixin:

    async def get_master_key_and_master_user(self):
        if await sync_to_async(self.user.groups.filter(name="master_user").exists)():
            key_object = await sync_to_async(lambda: self.user.apikey)()
            return key_object, self.user, None
        elif await sync_to_async(self.user.groups.filter(name="slave_user").exists)():
            token = await sync_to_async(lambda: self.user.finegrainapikey)()
            if token.ttl + token.created_at > timezone.now() or token.ttl is None:
                key_object = await sync_to_async(lambda: token.master_key)()
                master_user = await sync_to_async(lambda: key_object.user)()
                return key_object, master_user, token
            else:
                return False, False, False
        else:
            return False, False, False

    async def check_permission(self, permission_code: str, destination: str):
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
    ) -> InstructionTreeMP | UserInstructionTreeMP:
        try:
            if template_type == "system":

                template = await async_get_or_set_cache(
                    prefix="system_template",
                    key=name,
                    field_to_get="name",
                    Model=InstructionTreeMP,
                    timeout=84000,
                )
                return template
            elif template_type == "user_template":
                template = await async_get_or_set_cache(
                    prefix="user_template",
                    key=[name, self.master_user],
                    field_to_get=["name", "user"],
                    Model=UserInstructionTreeMP,
                    timeout=84000,
                )

                return template
        except (InstructionTreeMP.DoesNotExist, UserInstructionTreeMP.DoesNotExist):
            return False

    @database_sync_to_async
    def get_child_template_list(
        self,
        template: str | UserInstructionTreeMP,
        template_type: Literal["system", "user_template"] = "system",
    ) -> dict:
        options = ["system", "user_template"]
        assert template_type in options, f"'{template_type}' is not in {options}"
        try:
            if template_type == "system":
                parent_template = sync_get_or_set_cache(
                    prefix="system_template",
                    key=template.name,
                    field_to_get="name",
                    Model=InstructionTreeMP,
                    timeout=84000,
                )
                child_template = parent_template.get_descendants()
                return {
                    "name_list": [c.name for c in child_template],
                    "default_child": child_template[0].name,
                    "default_instruct": child_template[0].instruct,
                }
            elif template_type == "user_template":
                parent_template = sync_get_or_set_cache(
                    prefix="user_template",
                    key=[template.name, self.master_user],
                    field_to_get=["name", "user"],
                    Model=UserInstructionTreeMP,
                    timeout=84000,
                )
                child_template = parent_template.get_descendants()

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
        except (InstructionTreeMP.DoesNotExist, UserInstructionTreeMP.DoesNotExist):
            return False

    async def get_model(self, name=None) -> LLM | bool:
        return await async_get_or_set_cache(
            prefix="system_model",
            key=self.choosen_model if name is None else name,
            field_to_get="name",
            Model=LLM,
            timeout=84000,
        )

    async def get_model_url_async(
        self,
    ) -> Tuple[str, str, str] | Tuple[bool, bool, bool]:

        try:
            model_list = [
                m
                async for m in InferenceServer.objects.filter(
                    hosted_model__name=self.choosen_model, availability="Available"
                )
            ]

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
