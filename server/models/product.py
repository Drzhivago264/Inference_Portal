from django.contrib.postgres.fields import ArrayField
from django.db import models
from django.utils.translation import gettext_lazy as _

from server.models.api_key import APIKEY
from server.models.general_mixin import GeneralMixin


class Product(GeneralMixin):
    name = models.CharField(max_length=255)
    desc = models.TextField(_("Description"), blank=True)
    quantity = models.IntegerField(default=1)

    class Meta:
        ordering = ("-created_at",)

    def __str__(self):
        return self.name


class Price(GeneralMixin):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    price = models.DecimalField(decimal_places=2, max_digits=10)

    def __str__(self) -> str:
        return f"{self.product.name} {self.price}"


class Crypto(GeneralMixin):
    coin = models.TextField()
    address = models.TextField()
    balance = models.FloatField(default=0.0)
    coin_usd_rate = models.FloatField(default=0.0)

    def __str__(self) -> str:
        return self.coin


class PaymentHistory(GeneralMixin):
    class PaymentType(models.IntegerChoices):
        STRIPE = 1, "Stripe"
        XMR = 2, "XMR"

    type = models.PositiveSmallIntegerField(choices=PaymentType.choices)

    class PaymentStatus(models.IntegerChoices):
        PROCESSED = 1, "Processed"
        PENDING = 2, "Pending"

    status = models.PositiveSmallIntegerField(choices=PaymentStatus.choices)

    key = models.ForeignKey(APIKEY, on_delete=models.CASCADE)
    amount = models.FloatField(default=0.0)

    # These fields are only applicable for XMR payments
    crypto = models.ForeignKey(Crypto, on_delete=models.CASCADE, blank=True, null=True)
    integrated_address = models.CharField(max_length=106, blank=True, null=True)
    transaction_hash = models.CharField(max_length=64, blank=True, null=True)
    locked = models.BooleanField(blank=True, null=True)
    unlock_time = models.IntegerField(blank=True, null=True)
    block_height = models.IntegerField(default=0)
    xmr_payment_id = models.CharField(max_length=32, blank=True, null=True)
    failed_validate_attempt = models.SmallIntegerField(default=0)

    # These fields are only applicable for Stripe payments
    stripe_payment_id = models.CharField(max_length=255, blank=True, null=True)
    currency = models.CharField(max_length=10, blank=True, null=True)
    payment_intent = models.CharField(max_length=255, blank=True, null=True)
    payment_method_type = models.CharField(max_length=10, blank=True, null=True)
    payment_status = models.CharField(max_length=25, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    user_name = models.CharField(max_length=255, blank=True, null=True)
    amount_subtotal = models.FloatField(blank=True, null=True)

    billing_city = models.CharField(max_length=256, blank=True, null=True)
    billing_country_code = models.CharField(max_length=2, blank=True, null=True)
    billing_postcode = models.CharField(max_length=256, blank=True, null=True)
    billing_address_1 = models.CharField(max_length=256, blank=True, null=True)
    billing_address_2 = models.CharField(max_length=256, blank=True, null=True)
    billing_state = models.CharField(max_length=256, blank=True, null=True)

    extra_data = models.JSONField(blank=True, null=True)

    def __str__(self) -> str:
        return str(self.amount)
