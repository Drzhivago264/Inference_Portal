from django.db import models
from django.utils.translation import gettext_lazy as _

from server.models.api_key import APIKEY


class Product(models.Model):
    name = models.CharField(max_length=255)
    desc = models.TextField(_("Description"), blank=True)
    quantity = models.IntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("-created_at",)

    def __str__(self):
        return self.name


class Price(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    price = models.DecimalField(decimal_places=2, max_digits=10)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f"{self.product.name} {self.price}"


class Crypto(models.Model):
    coin = models.TextField()
    address = models.TextField()
    balance = models.FloatField(default=0.0)
    coin_usd_rate = models.FloatField(default=0.0)

    def __str__(self) -> str:
        return self.coin


class PaymentHistory(models.Model):
    key = models.ForeignKey(APIKEY, on_delete=models.CASCADE)
    crypto = models.ForeignKey(Crypto, on_delete=models.CASCADE)
    amount = models.FloatField(default=0.0)
    integrated_address = models.CharField(max_length=400)
    payment_id = models.CharField(max_length=400)
    transaction_hash = models.CharField(max_length=400)
    locked = models.BooleanField()
    block_height = models.IntegerField(default=0)

    def __str__(self) -> str:
        return str(self.amount)
