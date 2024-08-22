import os

from django.test import TestCase
from ninja.testing import TestClient

from api.api import api

os.environ["NINJA_SKIP_REGISTRY"] = "yes"


class NinjaTest(TestCase):
    def test_chat(self):
        client = TestClient(api)
        response = client.post(
            "/api/chat",
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
                "Authorization": "Bearer mkCwvwhK.sDpiJAghjD6GWLqyQivUJjInz7uDXW5x"
            },
            stream=False,
        )
        self.assertEqual(response.status_code, 200)

        response = client.post(
            "http://127.0.0.1:8000/api/agent",
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
                "Authorization": "Bearer mkCwvwhK.sDpiJAghjD6GWLqyQivUJjInz7uDXW5x"
            },
            stream=False,
        )
        self.assertEqual(response.status_code, 200)
