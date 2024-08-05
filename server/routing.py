from django.urls import path

import server.consumers.async_agent as async_agent
import server.consumers.async_chatbot as async_bot
import server.consumers.celery_agent as celery_agent
import server.consumers.celery_chatbot as celery_chatbot
import server.consumers.data_synthesis as data_synthesis
import server.consumers.toolbox as toolbox

websocket_urlpatterns = [
    path("ws/chat-async/<str:key>/<path:tz>/", async_bot.Consumer.as_asgi()),
    path("ws/engineer-async/<str:key>/<path:tz>/", async_agent.Consumer.as_asgi()),
    path("ws/chat/<str:key>/<path:tz>/", celery_chatbot.Consumer.as_asgi()),
    path("ws/engineer/<str:key>/<path:tz>/", celery_agent.Consumer.as_asgi()),
    path("ws/toolbox/<str:key>/<path:tz>/", toolbox.Consumer.as_asgi()),
    path("ws/data-synthesis/<str:key>/<path:tz>/", data_synthesis.Consumer.as_asgi()),
]
