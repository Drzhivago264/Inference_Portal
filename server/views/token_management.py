
import datetime

from django.contrib.auth.models import Permission
from django.contrib.auth.models import User
from django.http import HttpRequest

from rest_framework import status
from rest_framework.decorators import api_view, throttle_classes
from rest_framework.response import Response

from server.views.serializer import CreateTokenSerializer, ModifyTokenSerializer
from server.api_throttling_rates import KeyCreateRateThrottle, UserRateThrottle
from server.models import FineGrainAPIKEY
from server.utils import constant

@api_view(['POST'])
@throttle_classes([KeyCreateRateThrottle])
def generate_token_api(request: HttpRequest) -> Response:
    serializer = CreateTokenSerializer(data=request.data)
    current_user = request.user
    master_key_object = current_user.apikey
    if serializer.is_valid():
        token_name = serializer.data['token_name']
        permission_dict = serializer.data['permission']
        ttl_raw = serializer.data['ttl']
        time_unit = serializer.data['time_unit']
        use_ttl = serializer.data['use_ttl']
        number_of_current_key = FineGrainAPIKEY.objects.filter(master_key = master_key_object).count()
        if number_of_current_key >= constant.MAX_TOKEN_PER_USER:
             return Response({"detail": f"Exceeding max number of token ({constant.MAX_TOKEN_PER_USER}), cannot create more token!"}, status=status.HTTP_400_BAD_REQUEST)
        time_dispatcher = {
            'day': datetime.timedelta(days=ttl_raw),
            'hour': datetime.timedelta(hours=ttl_raw),
            'minute': datetime.timedelta(minutes=ttl_raw),
            'second': datetime.timedelta(seconds=ttl_raw)
        }
        permission_list = list()
        for perm, value in permission_dict.items():
            if value and perm != "allow_create_token": #Only Master User is allowed to create token
                permission_list.append(perm)
        try:
            ttl = time_dispatcher[time_unit] if use_ttl else None
        except KeyError:
            return Response("Time Unit is Incorrect!", status=status.HTTP_400_BAD_REQUEST)

        name, token = FineGrainAPIKEY.objects.create_key(
            name=token_name, master_key=master_key_object, ttl=ttl)

        created_key = FineGrainAPIKEY.objects.get_from_key(token)
        first_three_char = token[:3]
        last_three_char = token[-3:]
        created_key.first_three_char = first_three_char
        created_key.last_three_char = last_three_char
        created_key.save()
        hashed_token = created_key.hashed_key
        user = User.objects.create_user(hashed_token, '', hashed_token)

        permissions = Permission.objects.filter(codename__in=permission_list)
        user.user_permissions.add(*permissions)

        created_key.user = user
        created_key.save()
        return Response({"token_name": str(name),
                         'token': str(token),
                         'ttl': created_key.ttl,
                         'created_at': created_key.created_at,
                         'permission': permission_list
                         }, status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@throttle_classes([UserRateThrottle])
def get_token_api(request: HttpRequest) -> Response:
    current_user = request.user
    master_key_object = current_user.apikey
    response = list()
    for token in FineGrainAPIKEY.objects.filter(master_key=master_key_object):
        response.append({
            "prefix": token.prefix,
            "value": token.first_three_char + "..." + token.last_three_char,
            "name": token.name,
            "created_at": token.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            "ttl": token.ttl,
            "permissions": token.user.user_permissions.all().values_list('codename', flat=True)
        })
    return Response({"token_list": response}, status=status.HTTP_200_OK)


@api_view(['POST'])
@throttle_classes([UserRateThrottle])
def remove_permission(request: HttpRequest) -> Response:
    serializer = ModifyTokenSerializer(data=request.data)
    current_user = request.user
    master_key_object = current_user.apikey
    if serializer.is_valid():
        token_name = serializer.data['token_name']
        permission = serializer.data['permission']
        try:
            permission_object = Permission.objects.get(codename=permission)
        except Permission.DoesNotExist:
            return Response('Error: permission does not exist', status=status.HTTP_400_BAD_REQUEST)
        first_and_last_char = serializer.data['first_and_last_char']
        prefix = serializer.data['prefix']
        try:
            token = FineGrainAPIKEY.objects.get(
                master_key=master_key_object,
                name=token_name,
                prefix=prefix,
                first_three_char=first_and_last_char[:3],
                last_three_char=first_and_last_char[-3:]
            )
        except FineGrainAPIKEY.DoesNotExist:
            return Response({'detail':'Error: token does not exist'}, status=status.HTTP_400_BAD_REQUEST)
        token.user.user_permissions.remove(permission_object)

        return Response({
            "reponse": f"{permission_object.codename} is deleted",
            "value": first_and_last_char
        }, status=status.HTTP_200_OK)


@api_view(['POST'])
@throttle_classes([UserRateThrottle])
def invalidate_token(request: HttpRequest) -> Response:
    serializer = ModifyTokenSerializer(data=request.data)
    current_user = request.user
    master_key_object = current_user.apikey
    if serializer.is_valid():
        first_and_last_char = serializer.data['first_and_last_char']
        token_name = serializer.data['token_name']
        prefix = serializer.data['prefix']
        try:
            token = FineGrainAPIKEY.objects.get(
                name=token_name,
                master_key=master_key_object,
                prefix=prefix,
                first_three_char=first_and_last_char[:3],
                last_three_char=first_and_last_char[-3:]
            )
            dummy_user = token.user
            dummy_user.delete()
        except FineGrainAPIKEY.DoesNotExist:
            return Response({'detail': 'Error: token does not exist'}, status=status.HTTP_400_BAD_REQUEST)
    return Response({"response": f"Successfully delete {first_and_last_char}"}, status=status.HTTP_200_OK)
