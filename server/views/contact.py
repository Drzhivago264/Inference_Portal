from django.conf import settings
from django.http import HttpRequest
from rest_framework import status
from rest_framework.decorators import api_view, throttle_classes
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response

from server.api_throttling_rates import KeyCreateRateThrottle
from server.models.api_key import APIKEY
from server.queue.send_mail import send_email_
from server.views.serializer import SendMailSerializer


@api_view(["POST"])
@throttle_classes([KeyCreateRateThrottle])
def contact_api(request: HttpRequest) -> Response:
    serializer = SendMailSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        key_ = serializer.validated_data["key"]
        key_name = serializer.validated_data["key_name"]
        try:
            key = APIKEY.objects.get_from_key(key_)
            if key.name != key_name:
                raise AuthenticationFailed(
                    detail="Your Key Name and/or Key is/are incorrect"
                )
            name = serializer.validated_data["username"]
            sender_email = serializer.validated_data["mail"]
            subject = name + " from Inference said: "
            message = serializer.validated_data["message"] + " " + sender_email
            email_from = settings.EMAIL_HOST_USER
            recipient_list = [
                settings.EMAIL_HOST_USER,
            ]
            try:
                send_email_.delay(subject, message, email_from, recipient_list)
                return Response({"detail": "Sent"}, status=status.HTTP_200_OK)
            except:
                return Response(
                    {"detail": "Mail Server Error"},
                    status=status.HTTP_503_SERVICE_UNAVAILABLE,
                )
        except APIKEY.DoesNotExist:
            raise AuthenticationFailed(
                detail="Your Key Name and/or Key is/are incorrect"
            )
