from hashlib import sha256

from django.contrib.auth import authenticate, login, logout
from django.http import HttpRequest, HttpResponse
from django.shortcuts import render
from django.views.decorators.cache import cache_page
from rest_framework import status
from rest_framework.decorators import api_view, throttle_classes
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle

from server.models.api_key import APIKEY, FineGrainAPIKEY
from server.models.llm_server import LLM, InferenceServer
from server.views.serializer import LoginSerializer, ModelSerializer, ServerSerializer


@api_view(["GET"])
@throttle_classes([AnonRateThrottle])
def check_login(request: HttpRequest) -> Response:
    current_user = request.user
    if current_user.id == None:
        return Response({"detail": "anon user"}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        is_master = current_user.groups.filter(name="master_user").exists()
        is_slave = current_user.groups.filter(name="slave_user").exists()
        if is_master or is_slave:
            key_name = (
                f"{current_user.apikey.prefix}..."
                if is_master
                else f"{current_user.finegrainapikey.prefix}..."
            )
            key_id = (
                current_user.apikey.id if is_master else current_user.finegrainapikey.id
            )
            return Response(
                {
                    "websocket_hash": sha256(key_id.encode("utf-8")).hexdigest(),
                    "key_name": key_name,
                },
                status=status.HTTP_200_OK,
            )
        else:
            return Response(
                {"detail": "User does not have permission, generate new key"},
                status=status.HTTP_401_UNAUTHORIZED,
            )


@api_view(["GET"])
@throttle_classes([AnonRateThrottle])
def log_out(request: HttpRequest) -> Response:
    logout(request)
    return Response({"detail": "logout"}, status=status.HTTP_200_OK)


@api_view(["POST"])
@throttle_classes([AnonRateThrottle])
def log_in(request: HttpRequest) -> Response:
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        key = serializer.validated_data["key"]
        try:
            key_model = {
                "41": APIKEY,  # Master Key length
                "73": FineGrainAPIKEY,  # Token length
            }

            api_key = key_model[str(len(key))].objects.get_from_key(key)
            user = authenticate(
                request, username=api_key.hashed_key, password=api_key.hashed_key
            )
            if user is not None:
                login(request, user)
                return Response(
                    {"detail": f"Login Success!"}, status=status.HTTP_200_OK
                )
            else:
                raise AuthenticationFailed(
                    detail="Unknown Key error!, Generate a new one"
                )
        except (APIKEY.DoesNotExist, FineGrainAPIKEY.DoesNotExist, KeyError):
            raise AuthenticationFailed(detail="Your Key is incorrect")


@api_view(["GET"])
@throttle_classes([AnonRateThrottle])
@cache_page(60 * 60)
def model_api(request: HttpRequest) -> Response:
    servers = InferenceServer.objects.all().defer("name").order_by("hosted_model")
    model_info = LLM.objects.filter(is_self_host=True)
    models_bot = LLM.objects.filter(agent_availability=False)
    models_agent = LLM.objects.filter(agent_availability=True)
    serializer_server = ServerSerializer(servers, many=True)
    serializer_model_bot = ModelSerializer(models_bot, many=True)
    serializer_model_agent = ModelSerializer(models_agent, many=True)
    serializer_model_info = ModelSerializer(model_info, many=True)
    return Response(
        {
            "servers": serializer_server.data,
            "models_bot": serializer_model_bot.data,
            "models_agent": serializer_model_agent.data,
            "models_info": serializer_model_info.data,
        },
        status=status.HTTP_200_OK,
    )


def handler_404(request: HttpRequest, exception: None) -> HttpResponse:
    return render(request, "frontend_index.html", status=404)
