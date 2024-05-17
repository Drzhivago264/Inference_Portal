from server.models import (
    InstructionTree,
    UserInstructionTree,
    APIKEY,
    MemoryTree
)
from django.http import HttpResponse
from django.conf import settings
from server.utils.common_func import get_key
from django.core.cache import cache
from server.utils import constant

from hashlib import sha256
from django.http import HttpRequest

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from rest_framework.decorators import api_view, throttle_classes
from server.serializer import (RedirectSerializer,
                               InstructionTreeSerializer,
                               MemoryTreeSerializer,
                               UserInstructionCRUDSerializer,
                               UserInstructionGetSerializer

                               )
from django.contrib.auth import authenticate, login
from rest_framework.pagination import PageNumberPagination


@api_view(['POST'])
@throttle_classes([AnonRateThrottle])
def hub_redirect_api(request: HttpRequest) -> Response:
    serializer = RedirectSerializer(data=request.data)
    if serializer.is_valid():
        key = serializer.data['key']
        destination = serializer.data['destination']
        check_login = serializer.data['check_login']
        if not check_login:
            try:
                api_key = APIKEY.objects.get_from_key(key)
                user = authenticate(
                    request, username=api_key.hashed_key, password=api_key.hashed_key)
                if user is not None:
                    login(request, user)
                    key_hash = sha256(key.encode('utf-8')).hexdigest()
                    return Response({"redirect_link": f"/frontend/{destination}/{key_hash}"}, status=status.HTTP_200_OK)
                else:
                    return Response({'detail': 'Unknown Key error!, Generate a new one'}, status=status.HTTP_401_UNAUTHORIZED)

            except APIKEY.DoesNotExist:
                return Response({'detail': 'Your Key is incorrect'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            if request.user.id is not None:
                key_hash = sha256(key.encode('utf-8')).hexdigest()
                return Response({"redirect_link": f"/frontend/{destination}/{key_hash}"}, status=status.HTTP_200_OK)
            else:
                return Response({'detail': 'Unknown Key error!, Login again'}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@throttle_classes([AnonRateThrottle])
def instruction_tree_api(request):
    root_nodes = InstructionTree.objects.filter(level=0)
    serializer = InstructionTreeSerializer(root_nodes, many=True)
    for root in root_nodes:
        if root.name == "Assignment Agent":
            default_child_template = root.get_children()
            serializer_childrend = InstructionTreeSerializer(
                default_child_template, many=True)
    return Response({'root_nodes': serializer.data, 'default_children': serializer_childrend.data}, status=status.HTTP_200_OK)


@api_view(['GET'])
@throttle_classes([AnonRateThrottle])
def user_instruction_tree_api(request):
    current_user = request.user
    if current_user.id == None:
        return Response({'detail': "anon user"}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        try:
            root_nodes = UserInstructionTree.objects.filter(user=current_user)
            serializer = UserInstructionGetSerializer(root_nodes, many=True)
            return Response({'root_nodes': serializer.data}, status=status.HTTP_200_OK)
        except IndexError:
            return Response({'detail': "no instruction"}, status=status.HTTP_204_NO_CONTENT)


@api_view(['POST', 'PUT', "DELETE"])
@throttle_classes([AnonRateThrottle])
def crud_user_instruction_tree_api(request):
    current_user = request.user
    if current_user.id == None:
        return Response({'detail': "anon user"}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        try:
            serializer = UserInstructionCRUDSerializer(data=request.data)
            if serializer.is_valid():
                displayed_name = serializer.data['displayed_name']
                instruct = serializer.data['instruct']
                code = serializer.data['code']
                parent = serializer.data['parent']
                default_child = serializer.data['default_child']
                default_editor_template = serializer.data['default_editor_template']
                id = serializer.data['id']
                if request.method == 'POST':
                    number_root_nodes = UserInstructionTree.objects.filter(
                        level=0, user=current_user).count()
                    if number_root_nodes == 0:
                        root_node = UserInstructionTree.objects.create(name=current_user.apikey.hashed_key,
                                                                       displayed_name=f"Template of {current_user.apikey.name}",
                                                                       user=current_user,
                                                                       default_child=False,
                                                                       code=""
                                                                       )
                        UserInstructionTree.objects.create(name=current_user.apikey.hashed_key+displayed_name,
                                                           displayed_name=displayed_name,
                                                           user=current_user,
                                                           default_child=False,
                                                           code="",
                                                           instruct=instruct,
                                                           default_editor_template=default_editor_template,
                                                           parent=root_node
                                                           )
                    else:
                        if parent != 'null':
                            parent_node = UserInstructionTree.get(
                                user=current_user, displayed_name=parent)
                            UserInstructionTree.objects.create(name=current_user.apikey.hashed_key+displayed_name,
                                                               displayed_name=displayed_name,
                                                               user=current_user,
                                                               default_child=default_child,
                                                               code=code,
                                                               instruct=instruct,
                                                               default_editor_template=default_editor_template,
                                                               parent=parent_node
                                                               )
                        else:
                            root_node = UserInstructionTree.objects.get(name=current_user.apikey.hashed_key,
                                                                        user=current_user,
                                                                        )
                            UserInstructionTree.objects.create(name=current_user.apikey.hashed_key+displayed_name,
                                                               displayed_name=displayed_name,
                                                               user=current_user,
                                                               default_child=default_child,
                                                               code=code,
                                                               instruct=instruct,
                                                               default_editor_template=default_editor_template,
                                                               parent=root_node
                                                               )
                elif request.method == 'PUT':
                    node = UserInstructionTree.objects.get(
                        id=id, user=current_user)
                    node.instruct = instruct
                    node.code = code
                    node.parent = parent
                    node.default_child = default_child
                    node.default_editor_template = default_editor_template
                    node.save()
                elif request.method == 'DELETE':
                    try:
                        node = UserInstructionTree.objects.get(
                            id=id, user=current_user)
                        node.delete()
                        return Response({'detail': "deleted"}, status=status.HTTP_200_OK)
                    except UserInstructionTree.DoesNotExist:
                        return Response({'detail': "instruction does not exist"}, status=status.HTTP_204_NO_CONTENT)
        except IndexError:
            return Response({'detail': "no instruction"}, status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
@throttle_classes([AnonRateThrottle])
def memory_tree_api(request):
    current_user = request.user
    if current_user.id == None:
        return Response({'detail': "anon user"}, status=status.HTTP_401_UNAUTHORIZED)
    else:

        paginator = PageNumberPagination()
        paginator.page_size = 1
        memory_object = MemoryTree.objects.filter(
            key=current_user.apikey).order_by('-id')
        result_page = paginator.paginate_queryset(memory_object, request)
        try:
            result_page = result_page[0].get_ancestors(include_self=True)
            serializer = MemoryTreeSerializer(result_page, many=True)
            return paginator.get_paginated_response(serializer.data)
        except IndexError:
            return Response({'detail': "no memory"}, status=status.HTTP_204_NO_CONTENT)
