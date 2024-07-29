from celery import shared_task
from django.core.mail import send_mail

@shared_task()
def send_email_(
    subject: str, message: str, email_from: str, recipient_list: list
) -> None:
    send_mail(subject, message, email_from, recipient_list)

