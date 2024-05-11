from django.shortcuts import render
import typing
from django.db.models import QuerySet
from datetime import datetime
from server.models import (
    LLM,
    InstructionTree,
    Article,
    APIKEY,
    MemoryTree
)
from django.http import HttpResponse
from django.conf import settings
from django.contrib import messages
from server.celery_tasks import Inference
from server.utils.common_func import get_key
from django.core.cache import cache
from server.utils import constant

from hashlib import sha256
from django.http import (
    HttpRequest,
    HttpResponse,
    HttpResponseRedirect
)
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from rest_framework.decorators import api_view, throttle_classes
from server.serializer import RedirectSerializer, InstructionTreeSerializer, MemoryTreeSerializer
from django.contrib.auth import authenticate, login


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
                user = authenticate(request, username=api_key.hashed_key, password=api_key.hashed_key) 
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
                print(request.user)
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
            serializer_childrend = InstructionTreeSerializer(default_child_template, many=True)
    return Response({'root_nodes': serializer.data, 'default_children': serializer_childrend.data})


@api_view(['GET'])
@throttle_classes([AnonRateThrottle])
def memory_tree_api(request):
    current_user = request.user
    if current_user.id == None:
        return Response({'detail': "anon user"}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        root_node = MemoryTree.objects.filter(level=0, key=current_user.apikey)
        childrens = root_node.get_descendants(include_self=True)
        serializer = MemoryTreeSerializer(childrens, many=True)
        return Response({'root_nodes': serializer.data}, status=status.HTTP_200_OK)


