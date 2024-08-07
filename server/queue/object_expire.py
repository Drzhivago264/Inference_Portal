from celery import shared_task
from django.utils.timezone import timedelta
from django.utils import timezone
from server.models.api_key import APIKEY, FineGrainAPIKEY
from server.utils import constant


@shared_task()
def periodically_delete_unused_key():
    APIKEY.objects.filter(
        created_at__lte=timezone.now() - timedelta(days=constant.KEY_TTL),
        credit=0.0,
        monero_credit=0.0,
    ).delete()

    for token in FineGrainAPIKEY.objects.all().iterator(chunk_size=100):
        if token.ttl + token.created_at <= timezone.now():
            print(token.user)
            token.delete()