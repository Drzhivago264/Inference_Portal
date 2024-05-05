from django.shortcuts import render
from server.models import (
    LLM,
    InferenceServer,
    Article,
)
from rest_framework import viewsets
from server.serializer import (ArticleSerializer,
                               ModelSerializer,
                               ServerSerializer)

from django.http import HttpResponse
from django.http import (
    HttpRequest,
    HttpResponse,
)
from rest_framework.decorators import api_view, throttle_classes
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from rest_framework import status
from django.contrib.auth import logout

@api_view(['GET'])
@throttle_classes([AnonRateThrottle])
def check_login(request: HttpRequest) -> Response:
    current_user = request.user
    if current_user.id == None:
        return Response({'detail': "anon user"}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        return Response({'detail': current_user.apikey.hashed_key}, status=status.HTTP_200_OK)

@api_view(['GET'])
@throttle_classes([AnonRateThrottle])
def log_out(request: HttpRequest) -> Response:
    logout(request)
    return Response({'detail': 'logout'}, status=status.HTTP_200_OK)

@api_view(['GET'])
@throttle_classes([AnonRateThrottle])
def article_api(request: HttpRequest, name: str, a_type: str) -> Response:
    page_content = Article.objects.get(name=name, a_type=a_type)
    serializer = ArticleSerializer(page_content)
    return Response({'article': serializer.data}, status=status.HTTP_200_OK)


@api_view(['GET'])
@throttle_classes([AnonRateThrottle])
def model_api(request: HttpRequest) -> Response:
    servers = InferenceServer.objects.all().defer('name').order_by("hosted_model")
    models_charoom = LLM.objects.all()
    models_display = [i for i in models_charoom if not i.agent_availability]
    models_agent = [i for i in models_charoom if i.agent_availability]
    serializer_server = ServerSerializer(servers, many=True)
    serializer_model_display = ModelSerializer(models_display, many=True)
    serializer_model_agent = ModelSerializer(models_agent, many=True)
    return Response({"servers": serializer_server.data,
                     "models": serializer_model_display.data,
                     'models_agent': serializer_model_agent.data
                     }, status=status.HTTP_200_OK)


def handler_403(request: HttpRequest, exception: None = None) -> HttpResponse:
    return render(request, 'error_html/403.html', status=403)


def handler_404(request: HttpRequest, exception: None) -> HttpResponse:
    return render(request, 'error_html/404.html', status=404)


def handler_500(request: HttpRequest,  *args, **argv) -> HttpResponse:
    return render(request, 'error_html/500.html', status=500)


def handler_429(request: HttpRequest, exception: None) -> HttpResponse:
    return render(request, 'error_html/429.html', status=429)
