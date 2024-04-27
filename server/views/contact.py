from django.shortcuts import render
from django.http import HttpResponse
from django.conf import settings
import bleach
from server.models import APIKEY
from django.contrib import messages
from server.celery_tasks import send_email_
from server.forms import CaptchaForm
from django.http import (HttpRequest, 
                         HttpResponse, 
                         HttpResponseRedirect
                         )
from rest_framework.decorators import api_view, throttle_classes
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from server.api_throttling_rates import KeyCreateRateThrottle
from server.serializer import SendMailSerializer
from rest_framework import status

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

    
def contact(request: HttpRequest) -> HttpResponse | HttpResponseRedirect:
    form = CaptchaForm(request.POST)
    if request.method == 'POST':
        if form.is_valid():
            name = bleach.clean(str(request.POST.get('name')))
            sender_email = bleach.clean(str(request.POST.get('sender_email')))
            subject = name + " from Inference said: "
            message = bleach.clean(
                str(request.POST.get('message'))) + " " + sender_email
            email_from = settings.EMAIL_HOST_USER
            recipient_list = [settings.EMAIL_HOST_USER,]
            try:
                send_email_.delay(subject, message, email_from, recipient_list)
                messages.error(request, "Sent!",  extra_tags='email')
                return HttpResponseRedirect("/contact")
            except:
                messages.error(
                    request, "Failed due to unknown reasons!",  extra_tags='email')
                return HttpResponseRedirect("/contact")
        else:
            messages.error(request, "Captcha Failed.",  extra_tags='email')
            return HttpResponseRedirect("/contact")
    elif request.method == 'GET':
        return render(request, "html/contact.html", {'form': form, "title": "Contact"})