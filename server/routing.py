from django.urls import path

import server.consumers.agent as agent
import server.consumers.chatbot as chatbot
import server.consumers.toolbox as toolbox
import server.consumers.data_analysis as data_analysis

websocket_urlpatterns = [
    path("ws/chat/<str:key>/", chatbot.Consumer.as_asgi()),
    path("ws/engineer/<str:key>/", agent.Consumer.as_asgi()),
    path("ws/toolbox/<str:key>/", toolbox.Consumer.as_asgi()),
    path("ws/dataanalysis/<str:key>/", data_analysis.Consumer.as_asgi()),
]
