import datetime

from constance import config as constant
from django.contrib.auth.decorators import permission_required
from django.contrib.auth.models import Group, Permission, User
from django.db import IntegrityError, transaction
from django.http import HttpRequest
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, throttle_classes
from rest_framework.exceptions import NotFound, ParseError, PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.throttling import UserRateThrottle

from server.api_throttling_rates import KeyCreateRateThrottle
from server.models.api_key import FineGrainAPIKEY
from server.views.serializer import CreateTokenSerializer, ModifyTokenSerializer


@api_view(["POST"])
@throttle_classes([KeyCreateRateThrottle])
@permission_classes([IsAuthenticated])
@permission_required("server.allow_create_token", raise_exception=True)
def generate_token_api(request: HttpRequest) -> Response:
    serializer = CreateTokenSerializer(data=request.data)
    current_user = request.user
    master_key_object = current_user.apikey
    if serializer.is_valid(raise_exception=True):
        token_name = serializer.validated_data["token_name"]
        permission_dict = serializer.validated_data["permission"]
        ttl_raw = serializer.validated_data["ttl"]
        time_unit = serializer.validated_data["time_unit"]
        ratelimit = serializer.validated_data["ratelimit"]
        ratelimit_time_unit = serializer.validated_data["ratelimit_time_unit"]
        use_ttl = serializer.validated_data["use_ttl"]
        slave_group, _ = Group.objects.get_or_create(name="slave_user")
        number_of_current_key = FineGrainAPIKEY.objects.filter(
            master_key=master_key_object
        ).count()
        if number_of_current_key >= constant.MAX_TOKEN_PER_USER:
            raise PermissionDenied(
                detail=f"Exceeding max number of token ({constant.MAX_TOKEN_PER_USER}), cannot create more token!"
            )
        time_dispatcher = {
            "day": datetime.timedelta(days=ttl_raw),
            "hour": datetime.timedelta(hours=ttl_raw),
            "minute": datetime.timedelta(minutes=ttl_raw),
            "second": datetime.timedelta(seconds=ttl_raw),
        }
        permission_list = list()
        for perm, value in permission_dict.items():
            if (
                value and perm != "allow_create_token"
            ):  # Only Master User is allowed to create token
                permission_list.append(perm)
        if not permission_list:
            raise PermissionDenied(
                detail="Cannot create a new token without a permission"
            )
        try:
            ttl = time_dispatcher[time_unit] if use_ttl else None
            time_dispatcher[ratelimit_time_unit]
        except KeyError:
            raise ParseError(detail="Time Unit is Incorrect")

        name, token = FineGrainAPIKEY.objects.create_key(
            name=token_name,
            master_key=master_key_object,
            ttl=ttl,
            ratelimit=f"{ratelimit}/{ratelimit_time_unit}",
        )
        try:
            with transaction.atomic():
                created_key = FineGrainAPIKEY.objects.get_from_key(token)
                first_three_char = token[:3]
                last_three_char = token[-3:]
                created_key.first_three_char = first_three_char
                created_key.last_three_char = last_three_char
                created_key.save()
                hashed_token = created_key.hashed_key
                user = User.objects.create_user(hashed_token, "", hashed_token)
                slave_group.user_set.add(user)
                permissions = Permission.objects.filter(codename__in=permission_list)
                user.user_permissions.add(*permissions)
                created_key.user = user
                created_key.save()
        except IntegrityError:
            return Response(
                {
                    "detail": "Database Intergrity Error, this should not happen, try again"
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        return Response(
            {
                "token_name": str(name),
                "token": str(token),
                "ttl": created_key.ttl,
                "created_at": created_key.created_at.strftime("%Y-%m-%d %H:%M:%S"),
                "permission": permission_list,
                "ratelimit": f"{ratelimit}/{ratelimit_time_unit}",
            },
            status=status.HTTP_200_OK,
        )


@api_view(["GET"])
@throttle_classes([UserRateThrottle])
@permission_classes([IsAuthenticated])
def get_token_api(request: HttpRequest) -> Response:
    current_user = request.user
    if current_user.groups.filter(name="master_user").exists():
        master_key_object = current_user.apikey
        response = list()
        for token in FineGrainAPIKEY.objects.filter(master_key=master_key_object):
            response.append(
                {
                    "prefix": token.prefix,
                    "value": f"{token.first_three_char}...{token.last_three_char}",
                    "name": token.name,
                    "created_at": token.created_at.strftime("%Y-%m-%d %H:%M:%S"),
                    "ttl": token.ttl,
                    "ratelimit": token.ratelimit,
                    "permissions": token.user.user_permissions.all().values_list(
                        "codename", flat=True
                    ),
                }
            )
        return Response({"token_list": response}, status=status.HTTP_200_OK)
    else:
        raise PermissionDenied(
            detail="Only master key is allowed to create Access Token"
        )


@api_view(["DELETE"])
@throttle_classes([UserRateThrottle])
@permission_classes([IsAuthenticated])
def remove_permission(request: HttpRequest) -> Response:
    serializer = ModifyTokenSerializer(data=request.data)
    current_user = request.user
    master_key_object = current_user.apikey
    if serializer.is_valid(raise_exception=True):
        token_name = serializer.validated_data["token_name"]
        permission = serializer.validated_data["permission"]
        try:
            permission_object = Permission.objects.get(codename=permission)
        except Permission.DoesNotExist:
            raise ParseError(detail="Permission does not exist")
        first_and_last_char = serializer.validated_data["first_and_last_char"]
        prefix = serializer.validated_data["prefix"]
        try:

            token = FineGrainAPIKEY.objects.get(
                master_key=master_key_object,
                name=token_name,
                prefix=prefix,
                first_three_char=first_and_last_char[:3],
                last_three_char=first_and_last_char[-3:],
            )
        except FineGrainAPIKEY.DoesNotExist:
            raise NotFound(detail="Token Does Not Exist")
        token.user.user_permissions.remove(permission_object)

        return Response(
            {
                "reponse": f"{permission_object.codename} is deleted",
                "value": first_and_last_char,
            },
            status=status.HTTP_200_OK,
        )


@api_view(["PUT"])
@throttle_classes([UserRateThrottle])
@permission_classes([IsAuthenticated])
def add_permission(request: HttpRequest) -> Response:
    serializer = ModifyTokenSerializer(data=request.data)
    current_user = request.user
    master_key_object = current_user.apikey
    if serializer.is_valid(raise_exception=True):
        token_name = serializer.validated_data["token_name"]
        permission = serializer.validated_data["permission"]
        try:
            permission_object = Permission.objects.get(codename=permission)
        except Permission.DoesNotExist:
            raise ParseError(detail="Permission does not exist")
        first_and_last_char = serializer.validated_data["first_and_last_char"]
        prefix = serializer.validated_data["prefix"]
        try:
            token = FineGrainAPIKEY.objects.get(
                master_key=master_key_object,
                name=token_name,
                prefix=prefix,
                first_three_char=first_and_last_char[:3],
                last_three_char=first_and_last_char[-3:],
            )
        except FineGrainAPIKEY.DoesNotExist:
            raise NotFound(detail="Token Does Not Exist")
        token.user.user_permissions.add(permission_object)
        return Response(
            {
                "reponse": f"{permission_object.codename} is added",
                "value": first_and_last_char,
            },
            status=status.HTTP_200_OK,
        )


@api_view(["PUT"])
@throttle_classes([UserRateThrottle])
@permission_classes([IsAuthenticated])
def update_ratelimit(request: HttpRequest) -> Response:
    serializer = ModifyTokenSerializer(data=request.data)
    current_user = request.user
    master_key_object = current_user.apikey
    if serializer.is_valid(raise_exception=True):
        token_name = serializer.validated_data["token_name"]
        ratelimit = serializer.validated_data["ratelimit"]
        ratelimit_time_unit = serializer.validated_data["ratelimit_time_unit"]
        first_and_last_char = serializer.validated_data["first_and_last_char"]
        prefix = serializer.validated_data["prefix"]
        try:
            token = FineGrainAPIKEY.objects.get(
                master_key=master_key_object,
                name=token_name,
                prefix=prefix,
                first_three_char=first_and_last_char[:3],
                last_three_char=first_and_last_char[-3:],
            )
        except FineGrainAPIKEY.DoesNotExist:
            raise NotFound(detail="Token Does Not Exist")
        token.ratelimit = f"{ratelimit}/{ratelimit_time_unit}"
        token.save()

        return Response(
            {
                "reponse": f"Ratelimit is update to {ratelimit}/{ratelimit_time_unit}",
                "value": first_and_last_char,
            },
            status=status.HTTP_200_OK,
        )


@api_view(["DELETE"])
@throttle_classes([UserRateThrottle])
@permission_classes([IsAuthenticated])
def invalidate_token(request: HttpRequest) -> Response:
    serializer = ModifyTokenSerializer(data=request.data)
    current_user = request.user
    master_key_object = current_user.apikey
    if serializer.is_valid(raise_exception=True):
        first_and_last_char = serializer.validated_data["first_and_last_char"]
        token_name = serializer.validated_data["token_name"]
        prefix = serializer.validated_data["prefix"]
        try:
            token = FineGrainAPIKEY.objects.get(
                name=token_name,
                master_key=master_key_object,
                prefix=prefix,
                first_three_char=first_and_last_char[:3],
                last_three_char=first_and_last_char[-3:],
            )
            dummy_user = token.user
            dummy_user.delete()
        except FineGrainAPIKEY.DoesNotExist:
            raise NotFound(detail="Token Does Not Exist")
    return Response(
        {"response": f"Successfully delete {first_and_last_char}"},
        status=status.HTTP_200_OK,
    )
