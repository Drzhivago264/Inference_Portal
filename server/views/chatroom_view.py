from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import permission_required
from django.http import HttpRequest
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, throttle_classes
from rest_framework.exceptions import AuthenticationFailed, NotFound, PermissionDenied
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle

from server.models.api_key import APIKEY, FineGrainAPIKEY
from server.models.instruction import InstructionTreeMP, UserInstructionTreeMP
from server.models.log import MemoryTreeMP
from server.utils.sync_.sync_cache import (
    filter_or_set_cache,
    get_descendants_or_cache,
    get_user_or_set_cache,
)
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
    if serializer.is_valid(raise_exception=True):
        key = serializer.validated_data["key"]
        destination = serializer.validated_data["destination"]
        check_login = serializer.validated_data["check_login"]
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
                    raise AuthenticationFailed(detail="Unknown Key error!, Login again")
            except (APIKEY.DoesNotExist, FineGrainAPIKEY.DoesNotExist, KeyError):
                raise AuthenticationFailed(
                    detail="Your Key Name and/or Key is/are incorrect"
                )
        else:
            if request.user.id is not None:
                return Response(
                    {"redirect_link": f"/frontend/{destination}"},
                    status=status.HTTP_200_OK,
                )
            else:
                raise AuthenticationFailed(detail="Unknown Key error!, Login again")


@api_view(["GET"])
@throttle_classes([AnonRateThrottle])
@permission_classes([IsAuthenticated])
def instruction_tree_api(request):
    current_user = request.user
    _, master_user = get_user_or_set_cache(
        prefix="user_tuple",
        key=current_user.password,
        timeout=60,
        current_user=current_user,
    )
    if not master_user:
        raise PermissionDenied(detail="Your token is expired")
    root_nodes = filter_or_set_cache(
        prefix="system_instruction_root_node",
        key=1,
        field_to_get="depth",
        Model=InstructionTreeMP,
        timeout=84600,
    )
    user_root_nodes = UserInstructionTreeMP.objects.filter(depth=2, user=master_user)
    serializer = InstructionTreeSerializer(root_nodes, many=True)
    user_serializer = UserInstructionTreeSerializer(user_root_nodes, many=True)
    for root in root_nodes:
        if root.name == "Assignment Agent":
            default_child_template = get_descendants_or_cache(
                prefix="system_template_descendant",
                key=root.name,
                parent_instance=root,
                timeout=84600,
            )
            serializer_children = InstructionTreeSerializer(
                default_child_template, many=True
            )
    if user_root_nodes.count() > 0:
        user_serializer_children = UserInstructionTreeSerializer(
            user_root_nodes[0].get_descendants(), many=True
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
@permission_required("server.allow_chat", raise_exception=True)
def memory_tree_api(request):
    current_user = request.user
    paginator = PageNumberPagination()
    paginator.page_size = 1
    master_key, _ = get_user_or_set_cache(
        prefix="user_tuple",
        key=current_user.password,
        timeout=60,
        current_user=current_user,
    )
    if not master_key:
        raise PermissionDenied(detail="Your token is expired")
    memory_object = MemoryTreeMP.objects.filter(key=master_key).order_by("-id")
    result_page = paginator.paginate_queryset(memory_object, request)
    try:
        result_page = list(
            set(
                [result_page[0]]
                + list(result_page[0].get_siblings_is_not_session_starter())
            )
        )
        serializer = MemoryTreeSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)
    except IndexError:
        raise NotFound(detail="No Memory")
