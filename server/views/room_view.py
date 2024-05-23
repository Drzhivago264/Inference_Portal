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
import uuid
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from rest_framework.decorators import api_view, throttle_classes
from server.serializer import (RedirectSerializer,
                               InstructionTreeSerializer,
                               MemoryTreeSerializer,
                               NestedUserInstructionCreateSerializer,
                               UserInstructionCreateSerializer,
                               UserInstructionDeleteCreateSerializer,
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
    current_user = request.user
    if current_user.id == None:
        return Response({'detail': "anon user"}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        root_nodes = InstructionTree.objects.filter(level=0)
        user_root_nodes = UserInstructionTree.objects.filter(level=1, user=current_user)
        serializer = InstructionTreeSerializer(root_nodes, many=True)
        user_serializer = InstructionTreeSerializer(user_root_nodes, many=True)
        for root in root_nodes:
            if root.name == "Assignment Agent":
                default_child_template = root.get_children()
                serializer_children = InstructionTreeSerializer(
                    default_child_template, many=True)
                
        if user_root_nodes.count() > 0:
            user_serializer_children = InstructionTreeSerializer(user_root_nodes[0].get_children(), many=True)
            return Response({'root_nodes': serializer.data,'user_root_nodes': user_serializer.data ,'default_children': serializer_children.data, 'default_user_children': user_serializer_children.data}, status=status.HTTP_200_OK)
        else:
            return Response({'root_nodes': serializer.data,'user_root_nodes': user_serializer.data ,'default_children': serializer_children.data, 'default_user_children': []}, status=status.HTTP_200_OK)

@api_view(['GET'])
@throttle_classes([AnonRateThrottle])
def user_instruction_tree_api(request):
    current_user = request.user
    if current_user.id == None:
        return Response({'detail': "anon user"}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        try:
            root_nodes = UserInstructionTree.objects.filter(
                user=current_user, level=1)
            serializer = UserInstructionGetSerializer(root_nodes, many=True)
            return Response({'root_nodes': serializer.data,
                              'max_child_num': constant.MAX_CHILD_TEMPLATE_PER_USER,
                              'max_parent_num': constant.MAX_PARENT_TEMPLATE_PER_USER
                              }, status=status.HTTP_200_OK)
        except IndexError:
            return Response({'detail': "no instruction",
                              'max_child_num': constant.MAX_CHILD_TEMPLATE_PER_USER,
                              'max_parent_num': constant.MAX_PARENT_TEMPLATE_PER_USER
                              },
                            status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
@throttle_classes([AnonRateThrottle])
def post_user_instruction_tree_api(request):
    current_user = request.user
    if current_user.id == None:
        return Response({'detail': "anon user"}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        if request.method == 'POST':
            serializer = NestedUserInstructionCreateSerializer(
                data=request.data)
            if serializer.is_valid():
                parent_instruction = serializer.data['parent_instruction']
                childrens = serializer.data['childrens']
                parent_instruction = UserInstructionCreateSerializer(
                    parent_instruction)
                childrens = UserInstructionCreateSerializer(
                    childrens, many=True)
                if UserInstructionTree.objects.filter(user=current_user).count() <= constant.MAX_PARENT_TEMPLATE_PER_USER*constant.MAX_CHILD_TEMPLATE_PER_USER:
                    if parent_instruction.data['id'] is not None:
                        node = UserInstructionTree.objects.get(
                            id=parent_instruction.data['id'], user=current_user)
                        node.instruct = parent_instruction.data['instruct']
                        node.displayed_name = parent_instruction.data['displayed_name']
                        node.save()
                        for index, c in enumerate(childrens.data):
                            if index < 4:
                                if c['id'] is not None:
                                    child_node = UserInstructionTree.objects.get(
                                        id=c['id'], user=current_user)
                                    child_node.instruct = c['instruct']
                                    child_node.displayed_name = c['displayed_name']
                                    child_node.code = index
                                    child_node.save()
                                else:
                                    UserInstructionTree.objects.create(
                                        instruct=c['instruct'],
                                        displayed_name=c['displayed_name'],
                                        name=current_user.apikey.hashed_key +
                                        str(uuid.uuid4()),
                                        parent=node,
                                        user=current_user,
                                        code=index)
                            else:
                                return Response({'detail': "Saved parent and 3 closed childs"}, status=status.HTTP_200_OK)
                    else:
                        try:
                            grandparent_node = UserInstructionTree.objects.get(
                                user=current_user, level=0)
                        except UserInstructionTree.DoesNotExist:
                            grandparent_node = UserInstructionTree.objects.create(
                                user=current_user, name=current_user.apikey.hashed_key)

                        parent_node = UserInstructionTree.objects.create(user=current_user, parent=grandparent_node,
                                                                        name=current_user.apikey.hashed_key +
                                                                        str(uuid.uuid4()),
                                                                        displayed_name=parent_instruction.data['displayed_name'],
                                                                        instruct=parent_instruction.data['instruct']
                                                                        )
                        for index, c in enumerate(childrens.data):
                            if index < 4:
                                node = UserInstructionTree.objects.create(
                                    user=current_user,
                                    parent=parent_node,
                                    name=current_user.apikey.hashed_key +
                                    str(uuid.uuid4()),
                                    displayed_name=c['displayed_name'],
                                    instruct=c['instruct'],
                                    code=index
                                )
                            else:
                                return Response({'detail': "Saved parent and 3 closed childs"}, status=status.HTTP_200_OK)
                    
                    return Response({'detail': "Saved"}, status=status.HTTP_200_OK)
                else:
                    return Response({'detail': "Save Failed!, ensure that fields do not contain empty string"}, status=status.HTTP_404_NOT_FOUND)
            else:
                return Response({'detail': "Save Failed!, you have react maximun number of templates"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['DELETE'])
@throttle_classes([AnonRateThrottle])
def delete_user_instruction_tree_api(request):
    current_user = request.user
    if current_user.id == None:
        return Response({'detail': "anon user"}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        serializer = UserInstructionDeleteCreateSerializer(
        data=request.data)
        if serializer.is_valid():
            id = serializer.data['id']
            try:
                node = UserInstructionTree.objects.get(
                    id=id, user=current_user)
                node.delete()
                return Response({'detail': "Deleted"}, status=status.HTTP_200_OK)
            except UserInstructionTree.DoesNotExist:
                return Response({'detail': "Instruction does not exist"}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({'detail': "Wrong Post Data, Failed!"}, status=status.HTTP_404_NOT_FOUND)


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
