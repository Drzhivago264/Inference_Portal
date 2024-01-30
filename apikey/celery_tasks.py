
from celery import shared_task
from django.core.mail import send_mail

import requests

@shared_task
def boot_EC2():
    return

@shared_task
def sleep_EC2():
    return

@shared_task
def send_email_( subject, message, email_from, recipient_list):
    send_mail(subject, message, email_from, recipient_list)
    return