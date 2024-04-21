from django.shortcuts import render
from django.http import HttpResponse
from django.conf import settings
import bleach
from django.contrib import messages
from apikey.celery_tasks import send_email_
from apikey.forms import CaptchaForm
from django.http import (HttpRequest, 
                         HttpResponse, 
                         HttpResponseRedirect
                         )


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