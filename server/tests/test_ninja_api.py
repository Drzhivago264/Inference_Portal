from django.test import TestCase 
from ninja.testing import TestAsyncClient
from api.chat_api import router as ChatRounter
from api.agent_api import router as AgentRounter
from server.models.api_key import APIKEY
from django.contrib.auth.models import Group, Permission, User
from constance import config as constant
from django.contrib.contenttypes.models import ContentType 
from server.models.custom_permission import CustomPermissionWithoutContentType
class NinjaTest(TestCase):
    def setUp(self):
        self.name, self.key = APIKEY.objects.create_key(
                    name="test",
                    integrated_address="test",
                    payment_id="test",
                )
        created_key = APIKEY.objects.get_from_key(self.key)
        master_group, _ = Group.objects.get_or_create(name="master_user")
        hashed_key = created_key.hashed_key
        user = User.objects.create_user(hashed_key, "", hashed_key)
        master_group.user_set.add(user)
        permissions = Permission.objects.all()
        user.user_permissions.add(*permissions)
        created_key.user = user
        created_key.save()
    async def test_chat(self):

        client = TestAsyncClient(ChatRounter)
        response = await client.post(
            "/chat",
            json={
                "prompt": "string",
                "model": "Llama 3 Instruct AWQ",
                "top_p": 0.73,
                "top_k": -1,
                "temperature": 0.73,
                "beam": False,
                "best_of": 1,
                "max_tokens": 128,
                "presence_penalty": 0,
                "frequency_penalty": 0,
                "length_penalty": 0,
                "early_stopping": False,
                "n": 1,
                "stream": False,
            },
            headers={
                "Authorization": f"Bearer {self.key}"
            },
            stream=False,
        )
        self.assertEqual(response.status_code, 200)
    async def test_agent(self):
        client = TestAsyncClient(AgentRounter)
        response = await client.post(
            "/agent",
            json={
                "prompt": "string",
                "model": "Llama 3 Instruct AWQ",
                "top_p": 0.73,
                "top_k": -1,
                "temperature": 0.73,
                "beam": False,
                "best_of": 1,
                "max_tokens": 128,
                "presence_penalty": 0,
                "frequency_penalty": 0,
                "length_penalty": 0,
                "early_stopping": False,
                "n": 1,
                "stream": False,
                "working_memory": [],
                "parent_template_name": "Assignment Agent",
                "child_template_name": "Conclusion",
                "use_my_template": False,
            },
            headers={
                "Authorization": f"Bearer {self.key}"
            },
            stream=False,
        )
        self.assertEqual(response.status_code, 200)