import json

import requests
from celery import shared_task
from celery.utils.log import get_task_logger
from decouple import config
from django.db import transaction
from django.db.models import F

from server.models.product import APIKEY, Crypto, PaymentHistory
from server.utils.sync_.manage_monero import manage_monero

logger = get_task_logger(__name__)


@shared_task()
def validate_xmr_payment():
    pending_payment = PaymentHistory.objects.filter(
        type=PaymentHistory.PaymentType.XMR,
        status=PaymentHistory.PaymentStatus.PENDING,
        failed_validate_attempt__lt=10,
    )

    for payment in pending_payment.iterator(chunk_size=10):
        logger.info(f"Validate transaction: {payment.id}")
        tx_hash = payment.transaction_hash
        payment_check = manage_monero("get_transfer_by_txid", {"txid": tx_hash})
        try:
            parsed_response = json.loads(payment_check.text)["result"]["transfer"]
        except KeyError:
            continue
        payment_id_response = parsed_response["payment_id"]
        amount = parsed_response["amount"]
        block_height = parsed_response["height"]
        locked = parsed_response["locked"]
        unlock_time = parsed_response["unlock_time"]
        if int(unlock_time) == 0 and not locked:
            with transaction.atomic():
                locked_key = APIKEY.objects.select_for_update().get(
                    payment_id=payment_id_response
                )
                locked_key.monero_credit = F("monero_credit") + amount / 1e12
                locked_key.save()
                payment.status = PaymentHistory.PaymentStatus.PROCESSED
                payment.locked = locked
                payment.unlock_time = unlock_time
                payment.block_height = block_height
                payment.extra_data = parsed_response
                payment.save()
        else:
            payment.failed_validate_attempt = F("failed_validate_attempt") + 1
            payment.save()


@shared_task()
def update_crypto_rate(coin: str):
    """
    Update the USD rate for a specific cryptocurrency.

    Parameters:
    - coin (str): The abbreviation of the cryptocurrency to update.

    Raises:
    - KeyError: If the required data for updating the rate is not found in the API responses.

    Notes:
    - This task fetches the current USD rate for the specified cryptocurrency from external APIs and updates the rate in the database.
    """
    if coin == "xmr":
        try:
            url = "https://api.coingecko.com/api/v3/simple/price?ids=monero&vs_currencies=usd"
            response = requests.get(url)
            price = float(json.loads(response.text)["monero"]["usd"])
            crypto = Crypto.objects.get(coin=coin)
            crypto.coin_usd_rate = price
            crypto.save()
        except KeyError:
            try:
                url = (
                    "https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest"
                )
                headers = {
                    "Accepts": "application/json",
                    "X-CMC_PRO_API_KEY": config("CMC_API"),
                }
                params = {
                    "id": "328",
                    "convert": "USD",
                }
                response = requests.get(url, headers=headers, params=params)
                price = json.loads(response.text)["data"]["328"]["quote"]["USD"][
                    "price"
                ]
                crypto = Crypto.objects.get(coin=coin)
                crypto.coin_usd_rate = price
                crypto.save()
            except KeyError:
                pass
