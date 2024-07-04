from django.conf import settings
from django.http import HttpRequest

from rest_framework import status
from rest_framework.decorators import api_view, throttle_classes
from rest_framework.response import Response

from server.api_throttling_rates import KeyCreateRateThrottle
from server.views.serializer import SendMailSerializer
from server.models import APIKEY
from server.celery_tasks import send_email_


@api_view(['POST'])
@throttle_classes([KeyCreateRateThrottle])
def contact_api(request: HttpRequest) -> Response:
    serializer = SendMailSerializer(data=request.data)
    if serializer.is_valid():
        key_ = serializer.data['key']
        key_name = serializer.data['key_name']
        try:
            key = APIKEY.objects.get_from_key(key_)
            if key.name == key_name:
                name = serializer.data['username']
                sender_email = serializer.data['mail']
                subject = name + " from Inference said: "
                message = serializer.data['message'] + " " + sender_email
                email_from = settings.EMAIL_HOST_USER
                recipient_list = [settings.EMAIL_HOST_USER,]
                try:
                    send_email_.delay(subject, message, email_from, recipient_list)
                    return Response({"detail": "Sent!"}, status=status.HTTP_200_OK)
                except:
                    return Response({'detail': 'Mail Server Error'}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
            else:
                return Response({'detail': 'Your Key Name is incorrect'}, status=status.HTTP_401_UNAUTHORIZED)
        except APIKEY.DoesNotExist:
            return Response({'detail': 'Your Key is incorrect'}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

