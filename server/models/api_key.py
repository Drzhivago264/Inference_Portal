import datetime

from django.conf import settings
from django.contrib.auth.models import User
from django.db import models
from django.utils.translation import gettext_lazy as _
from rest_framework_api_key.crypto import KeyGenerator
from rest_framework_api_key.models import AbstractAPIKey, BaseAPIKeyManager

from server.models.general_mixin import GeneralMixin

User = settings.AUTH_USER_MODEL


class APIKEY(AbstractAPIKey, GeneralMixin):
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
    credit = models.FloatField(default=0.0)
    monero_credit = models.FloatField(default=0.0)
    integrated_address = models.TextField(max_length=106, null=True, blank=True)
    payment_id = models.TextField(max_length=32, null=True, blank=True)
    ratelimit = models.TextField(default="5000/minute")

    class Meta:
        verbose_name = "Master API Key"
        verbose_name_plural = "Master API Keys"


class FineGrainAPIKeyManager(BaseAPIKeyManager):
    key_generator = KeyGenerator(prefix_length=8, secret_key_length=64)


class FineGrainAPIKEY(AbstractAPIKey, GeneralMixin):
    objects = FineGrainAPIKeyManager()
    master_key = models.ForeignKey(APIKEY, null=True, on_delete=models.CASCADE)
    user = models.OneToOneField(
        User, null=True, on_delete=models.CASCADE
    )  # the dummy account for the FineGrainAPIKEY
    ttl = models.DurationField(default=datetime.timedelta(days=10), null=True)
    first_three_char = models.TextField(default="???")
    last_three_char = models.TextField(default="???")
    ratelimit = models.TextField(default="30/minute")

    class Meta:
        verbose_name = "FineGrain API Key"
        verbose_name_plural = "FineGrain API Keys"
