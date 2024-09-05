from django.test import TestCase
from django.contrib.auth.models import AnonymousUser, User
from server.models.api_key import APIKEY
from server.models.product import PaymentHistory, Crypto
from django.test import TestCase 
from rest_framework.test import APIClient
class CreditBalanceApiTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.name, self.key = APIKEY.objects.create_key(
                    name="test",
                    integrated_address="test",
                    payment_id="test",
                )
        self.key_object = APIKEY.objects.get_from_key(self.key)
        self.key_object.monero_credit = 10/1e12
        self.key_object.save()
        self.user = User.objects.create_user(self.key_object.hashed_key, "", self.key_object.hashed_key)
        self.crypto, _ = Crypto.objects.get_or_create(coin="xmr")
        self.payment_history = PaymentHistory.objects.create(
                                key=self.key_object,
                                type=PaymentHistory.PaymentType.XMR,
                                crypto=self.crypto,
                                amount=10 / 1e12,
                                integrated_address="test",
                                xmr_payment_id="test",
                                transaction_hash="test",
                                status=PaymentHistory.PaymentStatus.PROCESSED,
                                locked=False,
                                unlock_time=0,
                                block_height=11111,
                                extra_data={},
                            )

    def test_credit_balance_api(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post('/frontend-api/check-credit', data={"key": self.key, "key_name": self.name})
   
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {
            'key_name': self.key_object.name,
            'key': self.key,
            'fiat_balance': str(self.key_object.credit),
            'monero_balance': str(self.key_object.monero_credit),
        })

    def test_credit_balance_api_wrong_credential(self):
        self.client.force_authenticate(user=AnonymousUser())
        response = self.client.post('/frontend-api/check-credit', data={"key": "test_failed", "key_name": "test_failed"})
        self.assertEqual(response.status_code, 403)
        self.assertEqual(response.json(), {'detail': 'Your Key Name and/or Key is/are incorrect'})
