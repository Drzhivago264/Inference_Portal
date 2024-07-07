from hashlib import sha256

from django.contrib.auth import logout
from django.contrib.auth import authenticate, login
from django.views.decorators.cache import cache_page
from django.shortcuts import render
from django.http import (
    HttpRequest,
    HttpResponse,
)

from rest_framework.decorators import api_view, throttle_classes
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from rest_framework import status

from server.views.serializer import (
    ModelSerializer,
    ServerSerializer,
    LoginSerializer
)
from server.models import (
    LLM,
    InferenceServer,
    APIKEY
)

@api_view(['GET'])
@throttle_classes([AnonRateThrottle])
def check_login(request: HttpRequest) -> Response:
    current_user = request.user
    if current_user.id == None:
        return Response({'detail': "anon user"}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        return Response({'websocket_hash': sha256(current_user.apikey.hashed_key.encode('utf-8')).hexdigest() ,'key_name': current_user.apikey.name}, status=status.HTTP_200_OK)


@api_view(['GET'])
@throttle_classes([AnonRateThrottle])
def log_out(request: HttpRequest) -> Response:
    logout(request)
    return Response({'detail': 'logout'}, status=status.HTTP_200_OK)


@api_view(['POST'])
@throttle_classes([AnonRateThrottle])
def log_in(request: HttpRequest) -> Response:
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        key = serializer.data['key']
        try:
            api_key = APIKEY.objects.get_from_key(key)
            user = authenticate(
                request, username=api_key.hashed_key, password=api_key.hashed_key)
            if user is not None:
                login(request, user)
                return Response({"detail": f"Login Success!"}, status=status.HTTP_200_OK)
            else:
                return Response({'detail': 'Unknown Key error!, Generate a new one'}, status=status.HTTP_401_UNAUTHORIZED)
        except APIKEY.DoesNotExist:
            return Response({'detail': 'Your Key is incorrect'}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@throttle_classes([AnonRateThrottle])
@cache_page(60 * 15)
def model_api(request: HttpRequest) -> Response:
    servers = InferenceServer.objects.all().defer('name').order_by("hosted_model")
    model_info = LLM.objects.filter(is_self_host=True)
    models_bot = LLM.objects.filter(agent_availability=False)
    models_agent = LLM.objects.filter(agent_availability=True)
    serializer_server = ServerSerializer(servers, many=True)
    serializer_model_bot = ModelSerializer(models_bot, many=True)
    serializer_model_agent = ModelSerializer(models_agent, many=True)
    serializer_model_info = ModelSerializer(model_info, many=True)
    return Response({"servers": serializer_server.data,
                     "models_bot": serializer_model_bot.data,
                     'models_agent': serializer_model_agent.data,
                     'models_info': serializer_model_info.data
                     }, status=status.HTTP_200_OK)


def handler_403(request: HttpRequest, exception: None = None) -> HttpResponse:
    return render(request, 'error_html/403.html', status=403)


def handler_404(request: HttpRequest, exception: None) -> HttpResponse:
    return render(request, 'error_html/404.html', status=404)


def handler_500(request: HttpRequest,  *args, **argv) -> HttpResponse:
    return render(request, 'error_html/500.html', status=500)


def handler_429(request: HttpRequest, exception: None) -> HttpResponse:
    return render(request, 'error_html/429.html', status=429)
