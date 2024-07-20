import uuid
from hashlib import sha512

from django.contrib.auth import authenticate, login
from django.views.decorators.cache import cache_page
from django.http import HttpRequest
from django.db.utils import IntegrityError

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from rest_framework.decorators import api_view, throttle_classes, permission_classes
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated

from server.views.serializer import (
    RedirectSerializer,
    InstructionTreeSerializer,
    UserInstructionTreeSerializer,
    MemoryTreeSerializer,
    NestedUserInstructionCreateSerializer,
    UserInstructionCreateSerializer,
    UserInstructionDeleteCreateSerializer,
    UserInstructionGetSerializer

)
from server.models import (
    InstructionTree,
    UserInstructionTree,
    APIKEY,
    FineGrainAPIKEY,
    MemoryTree
)
from server.utils.sync_.manage_permissions import get_master_key_and_master_user
from server.utils import constant


@api_view(['POST'])
@throttle_classes([AnonRateThrottle])
def hub_redirect_api(request: HttpRequest) -> Response:
    serializer = RedirectSerializer(data=request.data)
    if serializer.is_valid():
        key = serializer.data['key']
        destination = serializer.data['destination']
        check_login = serializer.data['check_login']
        if not check_login:
            model_dispatcher = {
                '41': APIKEY,
                '73': FineGrainAPIKEY
            }
            try:
                key_object = model_dispatcher[str(
                    len(key))].objects.get_from_key(key)
                user = authenticate(
                    request, username=key_object.hashed_key, password=key_object.hashed_key)
                if user is not None:
                    login(request, user)
                    return Response({"redirect_link": f"/frontend/{destination}"}, status=status.HTTP_200_OK)
                else:
                    return Response({'detail': 'Unknown Key error!, Generate a new one'}, status=status.HTTP_401_UNAUTHORIZED)
            except (APIKEY.DoesNotExist, FineGrainAPIKEY.DoesNotExist, KeyError):
                return Response({'detail': 'Your Key is incorrect'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            if request.user.id is not None:
                return Response({"redirect_link": f"/frontend/{destination}"}, status=status.HTTP_200_OK)
            else:
                return Response({'detail': 'Unknown Key error!, Login again'}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        message = str()
        for error in serializer.errors:
            message += serializer.errors[error][0] + "\n" 
        return Response({'detail': message}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@throttle_classes([AnonRateThrottle])
@permission_classes([IsAuthenticated])
def instruction_tree_api(request):
    current_user = request.user
    master_key, master_user = get_master_key_and_master_user(
        current_user=current_user)
    root_nodes = InstructionTree.objects.filter(level=0)
    user_root_nodes = UserInstructionTree.objects.filter(
        level=1, user=master_user)
    serializer = InstructionTreeSerializer(root_nodes, many=True)
    user_serializer = UserInstructionTreeSerializer(
        user_root_nodes, many=True)
    for root in root_nodes:
        if root.name == "Assignment Agent":
            default_child_template = root.get_children()
            serializer_children = InstructionTreeSerializer(
                default_child_template, many=True)
    if user_root_nodes.count() > 0:
        user_serializer_children = UserInstructionTreeSerializer(
            user_root_nodes[0].get_children(), many=True)
        return Response({'root_nodes': serializer.data, 'user_root_nodes': user_serializer.data, 'default_children': serializer_children.data, 'default_user_children': user_serializer_children.data}, status=status.HTTP_200_OK)
    else:
        return Response({'root_nodes': serializer.data, 'user_root_nodes': user_serializer.data, 'default_children': serializer_children.data, 'default_user_children': []}, status=status.HTTP_200_OK)


@api_view(['GET'])
@throttle_classes([AnonRateThrottle])
@permission_classes([IsAuthenticated])
def user_instruction_tree_api(request):
    current_user = request.user
    if not current_user.has_perm('server.allow_create_template'):
        return Response({'detail': "Not authorised to create template"}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        try:
            master_key, master_user = get_master_key_and_master_user(
                current_user=current_user)
            root_nodes = UserInstructionTree.objects.filter(
                user=master_user, level=1)
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


@api_view(['PUT'])
@throttle_classes([AnonRateThrottle])
@permission_classes([IsAuthenticated])
def update_user_instruction_tree_api(request):
    current_user = request.user
    if not current_user.has_perm('server.allow_create_template'):
        return Response({'detail': "Not authorised to create template"}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        serializer = NestedUserInstructionCreateSerializer(
            data=request.data)
        if serializer.is_valid():
            parent_instruction = serializer.data['parent_instruction']
            childrens = serializer.data['childrens']
            parent_instruction = UserInstructionCreateSerializer(
                parent_instruction)
            childrens = UserInstructionCreateSerializer(
                childrens, many=True)

            master_key, master_user = get_master_key_and_master_user(
                current_user=current_user)
            hash_key = master_key.hashed_key

            if len(childrens.data) > constant.MAX_CHILD_TEMPLATE_PER_USER:
                return Response({'detail': f"Save Failed!, you have react maximun number of childens ({constant.MAX_CHILD_TEMPLATE_PER_USER})"}, status=status.HTTP_404_NOT_FOUND)

            if UserInstructionTree.objects.filter(user=master_user).count() <= constant.MAX_PARENT_TEMPLATE_PER_USER*constant.MAX_CHILD_TEMPLATE_PER_USER:
                node = UserInstructionTree.objects.get(
                    id=parent_instruction.data['id'], user=master_user)
                node.instruct = parent_instruction.data['instruct']
                node.displayed_name = parent_instruction.data['displayed_name']
                node.save()
                for index, c in enumerate(childrens.data):
                    if c['id'] is not None:
                        child_node = UserInstructionTree.objects.get(
                            id=c['id'], user=master_user)
                        child_node.instruct = c['instruct']
                        child_node.displayed_name = c['displayed_name']
                        child_node.code = index
                        child_node.save()
                    else:
                        UserInstructionTree.objects.create(
                            instruct=c['instruct'],
                            displayed_name=c['displayed_name'],
                            name=sha512(hash_key.encode('utf-8')).hexdigest() +
                            str(uuid.uuid4()),
                            parent=node,
                            user=master_user,
                            code=index)
                return Response({'detail': "Saved"}, status=status.HTTP_200_OK)
            else:
                return Response({'detail': "Save Failed!, you have react maximun number of templates"}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'detail': "Save Failed!, ensure that fields do not contain empty string"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
@throttle_classes([AnonRateThrottle])
@permission_classes([IsAuthenticated])
def create_user_instruction_tree_api(request):
    current_user = request.user
    if not current_user.has_perm('server.allow_create_template'):
        return Response({'detail': "Not authorised to create template"}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        serializer = NestedUserInstructionCreateSerializer(
            data=request.data)
        if serializer.is_valid():
            parent_instruction = serializer.data['parent_instruction']
            childrens = serializer.data['childrens']
            parent_instruction = UserInstructionCreateSerializer(
                parent_instruction)
            childrens = UserInstructionCreateSerializer(
                childrens, many=True)

            master_key, master_user = get_master_key_and_master_user(
                current_user=current_user)
            hash_key = master_key.hashed_key

            if len(childrens.data) > constant.MAX_CHILD_TEMPLATE_PER_USER:
                return Response({'detail': f"Save Failed!, you have react maximun number of childens ({constant.MAX_CHILD_TEMPLATE_PER_USER})"}, status=status.HTTP_404_NOT_FOUND)

            if UserInstructionTree.objects.filter(user=master_user).count() <= constant.MAX_PARENT_TEMPLATE_PER_USER*constant.MAX_CHILD_TEMPLATE_PER_USER:
                try:
                    grandparent_node = UserInstructionTree.objects.get(
                        user=master_user, level=0)
                except UserInstructionTree.DoesNotExist:
                    grandparent_node = UserInstructionTree.objects.create(
                        user=master_user, name=hash_key)

                parent_node = UserInstructionTree.objects.create(user=master_user, parent=grandparent_node,
                                                                 name=sha512(hash_key.encode('utf-8')).hexdigest() +
                                                                 str(uuid.uuid4(
                                                                 )),
                                                                 displayed_name=parent_instruction.data[
                                                                     'displayed_name'],
                                                                 instruct=parent_instruction.data['instruct']
                                                                 )
                for index, c in enumerate(childrens.data):
                    UserInstructionTree.objects.create(
                        user=master_user,
                        parent=parent_node,
                        name=sha512(hash_key.encode('utf-8')).hexdigest() +
                        str(uuid.uuid4()),
                        displayed_name=c['displayed_name'],
                        instruct=c['instruct'],
                        code=index
                    )

                return Response({'detail': "Saved"}, status=status.HTTP_200_OK)
            else:
                return Response({'detail': "Save Failed!, you have react maximun number of templates"}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'detail': "Save Failed!, ensure that fields do not contain empty string"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['DELETE'])
@throttle_classes([AnonRateThrottle])
@permission_classes([IsAuthenticated])
def delete_user_instruction_tree_api(request):
    current_user = request.user
    if not current_user.has_perm('server.allow_create_template'):
        return Response({'detail': "Not authorised to create template"}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        serializer = UserInstructionDeleteCreateSerializer(
            data=request.data)
        if serializer.is_valid():
            id = serializer.data['id']
            master_key, master_user = get_master_key_and_master_user(
                current_user=current_user)
            try:
                node = UserInstructionTree.objects.get(
                    id=id, user=master_user)
                node.delete()
                return Response({'detail': "Deleted"}, status=status.HTTP_200_OK)
            except UserInstructionTree.DoesNotExist:
                return Response({'detail': "Instruction does not exist"}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({'detail': "Wrong Post Data, Failed!"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@throttle_classes([AnonRateThrottle])
@permission_classes([IsAuthenticated])
def memory_tree_api(request):
    current_user = request.user
    if not current_user.has_perm('server.allow_chat'):
        return Response({'detail': "Not authorised to use chatbot"}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        paginator = PageNumberPagination()
        paginator.page_size = 1
        master_key, master_user = get_master_key_and_master_user(
            current_user=current_user)
        memory_object = MemoryTree.objects.filter(
            key=master_key).order_by('-id')
        result_page = paginator.paginate_queryset(memory_object, request)
        try:
            result_page = result_page[0].get_ancestors(include_self=True)
            serializer = MemoryTreeSerializer(result_page, many=True)
            return paginator.get_paginated_response(serializer.data)
        except IndexError:
            return Response({'detail': "no memory"}, status=status.HTTP_204_NO_CONTENT)
