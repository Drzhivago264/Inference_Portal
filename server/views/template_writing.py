import uuid
from hashlib import sha512

from django.contrib.auth.decorators import permission_required
from django.db import IntegrityError, transaction
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, throttle_classes
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle

from server import constant
from server.models.instruction import UserInstructionTreeMP
from server.utils.sync_.sync_cache import delete_cache, get_user_or_set_cache
from server.views.serializer import (
    NestedUserInstructionCreateSerializer,
    UserInstructionCreateSerializer,
    UserInstructionDeleteCreateSerializer,
    UserInstructionGetSerializer,
)


@api_view(["GET"])
@throttle_classes([AnonRateThrottle])
@permission_classes([IsAuthenticated])
@permission_required("server.view_userinstructiontree", raise_exception=True)
def user_instruction_tree_api(request) -> Response:
    current_user = request.user
    try:
        _, master_user = get_user_or_set_cache(
            prefix="user_tuple",
            key=current_user.password,
            timeout=60,
            current_user=current_user,
        )
        if not master_user:
            raise PermissionDenied(detail="Your token is expired")
        root_nodes = UserInstructionTreeMP.objects.filter(user=master_user, depth=2)
        serializer = UserInstructionGetSerializer(root_nodes, many=True)
        return Response(
            {
                "root_nodes": serializer.data,
                "max_child_num": constant.MAX_CHILD_TEMPLATE_PER_USER,
                "max_parent_num": constant.MAX_PARENT_TEMPLATE_PER_USER,
            },
            status=status.HTTP_200_OK,
        )
    except IndexError:
        return Response(
            {
                "detail": "no instruction",
                "max_child_num": constant.MAX_CHILD_TEMPLATE_PER_USER,
                "max_parent_num": constant.MAX_PARENT_TEMPLATE_PER_USER,
            },
            status=status.HTTP_204_NO_CONTENT,
        )


@api_view(["PUT"])
@throttle_classes([AnonRateThrottle])
@permission_classes([IsAuthenticated])
@permission_required("server.change_userinstructiontree", raise_exception=True)
def update_user_instruction_tree_api(request):
    current_user = request.user
    serializer = NestedUserInstructionCreateSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        parent_instruction = serializer.data["parent_instruction"]
        childrens = serializer.data["childrens"]
        parent_instruction = UserInstructionCreateSerializer(parent_instruction)
        childrens = UserInstructionCreateSerializer(childrens, many=True)
        master_key, master_user = get_user_or_set_cache(
            prefix="user_tuple",
            key=current_user.password,
            timeout=60,
            current_user=current_user,
        )
        if not master_user:
            raise PermissionDenied(detail="Your token is expired")
        hash_key = master_key.hashed_key

        if len(childrens.data) > constant.MAX_CHILD_TEMPLATE_PER_USER:
            return Response(
                {
                    "detail": f"Save Failed!, you have react maximun number of childens ({constant.MAX_CHILD_TEMPLATE_PER_USER})"
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        if (
            UserInstructionTreeMP.objects.filter(user=master_user).count()
            <= constant.MAX_PARENT_TEMPLATE_PER_USER
            * constant.MAX_CHILD_TEMPLATE_PER_USER
        ):
            try:
                with transaction.atomic():
                    node = UserInstructionTreeMP.objects.select_for_update().get(
                        id=parent_instruction.data["id"], user=master_user
                    )

                    node.instruct = parent_instruction.data["instruct"]
                    node.displayed_name = parent_instruction.data["displayed_name"]
                    node.save()
                    for index, c in enumerate(childrens.data):
                        if c["id"] is not None:
                            child_node = (
                                UserInstructionTreeMP.objects.select_for_update().get(
                                    id=c["id"], user=master_user
                                )
                            )
                            child_node.instruct = c["instruct"]
                            child_node.displayed_name = c["displayed_name"]
                            child_node.code = index
                            child_node.save()
                            delete_cache(
                                prefix="user_template",
                                key=[child_node.name, master_user],
                            )
                        else:
                            node.add_child(
                                instruct=c["instruct"],
                                displayed_name=c["displayed_name"],
                                name=sha512(
                                    (hash_key + uuid.uuid4().hex).encode("utf-8")
                                ).hexdigest(),
                                user=master_user,
                                code=index,
                            )
            except IntegrityError:
                return Response(
                    {
                        "detail": "Database Intergrity Error, this should not happen, try again"
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            return Response({"detail": "Saved"}, status=status.HTTP_200_OK)
        else:
            return Response(
                {"detail": "Save Failed!, you have react maximun number of templates"},
                status=status.HTTP_404_NOT_FOUND,
            )


@api_view(["POST"])
@throttle_classes([AnonRateThrottle])
@permission_classes([IsAuthenticated])
@permission_required("server.add_userinstructiontree", raise_exception=True)
def create_user_instruction_tree_api(request) -> Response:
    current_user = request.user
    serializer = NestedUserInstructionCreateSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        parent_instruction = serializer.data["parent_instruction"]
        childrens = serializer.data["childrens"]
        parent_instruction = UserInstructionCreateSerializer(parent_instruction)
        childrens = UserInstructionCreateSerializer(childrens, many=True)
        master_key, master_user = get_user_or_set_cache(
            prefix="user_tuple",
            key=current_user.password,
            timeout=60,
            current_user=current_user,
        )
        if not master_user:
            raise PermissionDenied(detail="Your token is expired")
        hash_key = master_key.hashed_key
        if len(childrens.data) > constant.MAX_CHILD_TEMPLATE_PER_USER:
            return Response(
                {
                    "detail": f"Save Failed!, you have react maximun number of childens ({constant.MAX_CHILD_TEMPLATE_PER_USER})"
                },
                status=status.HTTP_404_NOT_FOUND,
            )
        if (
            UserInstructionTreeMP.objects.filter(user=master_user).count()
            <= constant.MAX_PARENT_TEMPLATE_PER_USER
            * constant.MAX_CHILD_TEMPLATE_PER_USER
        ):
            try:
                grandparent_node = UserInstructionTreeMP.objects.get(
                    user=master_user, depth=1
                )
            except UserInstructionTreeMP.DoesNotExist:
                grandparent_node = UserInstructionTreeMP.add_root(
                    user=master_user, name=hash_key
                )
            try:
                with transaction.atomic():
                    parent_node = grandparent_node.add_child(
                        user=master_user,
                        name=sha512(
                            (hash_key + uuid.uuid4().hex).encode("utf-8")
                        ).hexdigest(),
                        displayed_name=parent_instruction.data["displayed_name"],
                        instruct=parent_instruction.data["instruct"],
                    )

                    for index, c in enumerate(childrens.data):
                        parent_node.add_child(
                            user=master_user,
                            name=sha512(
                                (hash_key + uuid.uuid4().hex).encode("utf-8")
                            ).hexdigest(),
                            displayed_name=c["displayed_name"],
                            instruct=c["instruct"],
                            code=index,
                        )
            except IntegrityError:
                return Response(
                    {
                        "detail": "Database Intergrity Error, this should not happen, try again"
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            return Response({"detail": "Saved"}, status=status.HTTP_200_OK)
        else:
            return Response(
                {"detail": "Save Failed!, you have react maximun number of templates"},
                status=status.HTTP_404_NOT_FOUND,
            )


@api_view(["DELETE"])
@throttle_classes([AnonRateThrottle])
@permission_classes([IsAuthenticated])
@permission_required("server.delete_userinstructiontree", raise_exception=True)
def delete_user_instruction_tree_api(request) -> Response:
    current_user = request.user
    serializer = UserInstructionDeleteCreateSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        id = serializer.data["id"]
        _, master_user = get_user_or_set_cache(
            prefix="user_tuple",
            key=current_user.password,
            timeout=60,
            current_user=current_user,
        )
        if not master_user:
            raise PermissionDenied(detail="Your token is expired")
        try:
            with transaction.atomic():
                node = UserInstructionTreeMP.objects.select_for_update().get(
                    id=id, user=master_user
                )
                delete_cache(prefix="user_template", key=[node.name, master_user])
                node.delete()
            return Response({"detail": "Deleted"}, status=status.HTTP_200_OK)
        except UserInstructionTreeMP.DoesNotExist:
            raise NotFound(detail="Instruction does not exist")
