from django.contrib.auth import authenticate, login
from django.http import HttpRequest
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, throttle_classes
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle

from server.models.api_key import APIKEY, FineGrainAPIKEY
from server.models.instruction import InstructionTree, UserInstructionTree
from server.models.log import MemoryTree
from server.utils.sync_.manage_permissions import get_master_key_and_master_user
from server.views.serializer import (
    InstructionTreeSerializer,
    MemoryTreeSerializer,
    RedirectSerializer,
    UserInstructionTreeSerializer,
)


@api_view(["POST"])
@throttle_classes([AnonRateThrottle])
def hub_redirect_api(request: HttpRequest) -> Response:
    serializer = RedirectSerializer(data=request.data)
    if serializer.is_valid():
        key = serializer.data["key"]
        destination = serializer.data["destination"]
        check_login = serializer.data["check_login"]
        if not check_login:
            model_dispatcher = {"41": APIKEY, "73": FineGrainAPIKEY}
            try:
                key_object = model_dispatcher[str(len(key))].objects.get_from_key(key)
                user = authenticate(
                    request,
                    username=key_object.hashed_key,
                    password=key_object.hashed_key,
                )
                if user is not None:
                    login(request, user)
                    return Response(
                        {"redirect_link": f"/frontend/{destination}"},
                        status=status.HTTP_200_OK,
                    )
                else:
                    return Response(
                        {"detail": "Unknown Key error!, Generate a new one"},
                        status=status.HTTP_401_UNAUTHORIZED,
                    )
            except (APIKEY.DoesNotExist, FineGrainAPIKEY.DoesNotExist, KeyError):
                return Response(
                    {"detail": "Your Key is incorrect"},
                    status=status.HTTP_401_UNAUTHORIZED,
                )
        else:
            if request.user.id is not None:
                return Response(
                    {"redirect_link": f"/frontend/{destination}"},
                    status=status.HTTP_200_OK,
                )
            else:
                return Response(
                    {"detail": "Unknown Key error!, Login again"},
                    status=status.HTTP_401_UNAUTHORIZED,
                )
    else:
        message = str()
        for error in serializer.errors:
            message += serializer.errors[error][0] + "\n"
        return Response({"detail": message}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@throttle_classes([AnonRateThrottle])
@permission_classes([IsAuthenticated])
def instruction_tree_api(request):
    current_user = request.user
    master_key, master_user = get_master_key_and_master_user(current_user=current_user)
    root_nodes = InstructionTree.objects.filter(level=0)
    user_root_nodes = UserInstructionTree.objects.filter(level=1, user=master_user)
    serializer = InstructionTreeSerializer(root_nodes, many=True)
    user_serializer = UserInstructionTreeSerializer(user_root_nodes, many=True)
    for root in root_nodes:
        if root.name == "Assignment Agent":
            default_child_template = root.get_children()
            serializer_children = InstructionTreeSerializer(
                default_child_template, many=True
            )
    if user_root_nodes.count() > 0:
        user_serializer_children = UserInstructionTreeSerializer(
            user_root_nodes[0].get_children(), many=True
        )
        return Response(
            {
                "root_nodes": serializer.data,
                "user_root_nodes": user_serializer.data,
                "default_children": serializer_children.data,
                "default_user_children": user_serializer_children.data,
            },
            status=status.HTTP_200_OK,
        )
    else:
        return Response(
            {
                "root_nodes": serializer.data,
                "user_root_nodes": user_serializer.data,
                "default_children": serializer_children.data,
                "default_user_children": [],
            },
            status=status.HTTP_200_OK,
        )


@api_view(["GET"])
@throttle_classes([AnonRateThrottle])
@permission_classes([IsAuthenticated])
def memory_tree_api(request):
    current_user = request.user
    if not current_user.has_perm("server.allow_chat"):
        return Response(
            {"detail": "Not authorised to use chatbot"},
            status=status.HTTP_401_UNAUTHORIZED,
        )
    else:
        paginator = PageNumberPagination()
        paginator.page_size = 1
        master_key, master_user = get_master_key_and_master_user(
            current_user=current_user
        )
        memory_object = MemoryTree.objects.filter(key=master_key).order_by("-id")
        result_page = paginator.paginate_queryset(memory_object, request)
        try:
            result_page = result_page[0].get_ancestors(include_self=True)
            serializer = MemoryTreeSerializer(result_page, many=True)
            return paginator.get_paginated_response(serializer.data)
        except IndexError:
            return Response({"detail": "no memory"}, status=status.HTTP_204_NO_CONTENT)
