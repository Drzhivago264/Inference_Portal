from celery import shared_task
from constance import config as constant
from django.utils import timezone
from django.utils.timezone import timedelta

from server.models.api_key import APIKEY, FineGrainAPIKEY


@shared_task()
def periodically_delete_unused_key():
    # Delete APIKEY objects older than TTL with zero credit
    APIKEY.objects.filter(
        created_at__lte=timezone.now() - timedelta(days=constant.KEY_TTL),
        credit=0.0,
        monero_credit=0.0,
    ).delete()

    # Delete FineGrainAPIKEY objects if TTL has expired
    for token in FineGrainAPIKEY.objects.filter(ttl__isnull=False):
        if token.ttl + token.created_at <= timezone.now():
            token.delete()
