from django.urls import re_path, path

from . import consumers

websocket_urlpatterns = [
    path("ws/chat/<str:key>/",consumers.ChatConsumer.as_asgi()),
    path("ws/engineer/<str:key>/",consumers.AgentConsumer.as_asgi()),
]
