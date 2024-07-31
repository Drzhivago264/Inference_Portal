from celery import shared_task
from django.utils.timezone import datetime, timedelta

from server.models import APIKEY
from server.utils import constant


@shared_task()
def periodically_delete_unused_key():
    APIKEY.objects.filter(
        created_at__lte=datetime.now() - timedelta(days=constant.KEY_TTL),
        credit=0.0,
        monero_credit=0.0,
    ).delete()
