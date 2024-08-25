import json

import requests
from decouple import config
from django.db import transaction
from django.db.models import F
from django.http import HttpRequest
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response

from server.models.api_key import APIKEY
from server.models.product import Crypto, PaymentHistory
from server.utils.sync_.manage_monero import manage_monero
from server.views.custom_exception import ServiceUnavailable
from server.views.serializer import MoneroWebhookSerializer


@api_view(["POST"])
@csrf_exempt
def xmr_payment_webhook(request: HttpRequest) -> Response:
    serializer = MoneroWebhookSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        tx_id = serializer.validated_data["tx_id"]
        monero_webhook_secret = serializer.validated_data["monero_webhook_secret"]
        if monero_webhook_secret != config("MONERO_WEBHOOK_SECRET"):
            raise AuthenticationFailed(detail="MONERO WEBHOOK SECRET is incorrect")
        try:
            payment_check = manage_monero("get_transfer_by_txid", {"txid": tx_id})
            try:
                parsed_response = json.loads(payment_check.text)["result"]["transfer"]
            except KeyError:
                return Response(
                    {"detail": "No transaction detected, check txid."},
                    status=status.HTTP_404_NOT_FOUND,
                )
            if not parsed_response:
                return Response(
                    {"detail": "No transaction detected"},
                    status=status.HTTP_404_NOT_FOUND,
                )
            else:
                payment_id_response = parsed_response["payment_id"]
                address_response = parsed_response["address"]
                try:
                    key = APIKEY.objects.get(payment_id=payment_id_response)
                except APIKEY.DoesNotExist:
                    return Response(
                        {"detail": "Cannot find API Key of this transaction"},
                        status=status.HTTP_404_NOT_FOUND,
                    )

                if payment_id_response != key.payment_id:
                    return Response(
                        {"detail": "Payment ID from the transaction does not match"},
                        status=status.HTTP_404_NOT_FOUND,
                    )
                amount = parsed_response["amount"]
                block_height = parsed_response["height"]
                locked = parsed_response["locked"]
                tx_hash = parsed_response["txid"]
                unlock_time = parsed_response["unlock_time"]
                crypto = Crypto.objects.get(coin="xmr")
                if int(unlock_time) == 0 and not locked:
                    try:
                        with transaction.atomic():
                            payment = PaymentHistory.objects.get(
                                key=key,
                                type=PaymentHistory.PaymentType.XMR,
                                crypto=crypto,
                                amount=amount / 1e12,
                                integrated_address=address_response,
                                xmr_payment_id=payment_id_response,
                                transaction_hash=tx_hash,
                            )
                            if payment.status == PaymentHistory.PaymentStatus.PENDING:
                                locked_key = APIKEY.objects.select_for_update().get(
                                    hashed_key=key.hashed_key
                                )
                                locked_key.monero_credit = (
                                    F("monero_credit") + amount / 1e12
                                )
                                locked_key.save()
                                payment.status = PaymentHistory.PaymentStatus.PROCESSED
                                payment.locked = locked
                                payment.unlock_time = unlock_time
                                payment.block_height = block_height
                                payment.extra_data = parsed_response
                                payment.save()
                                return Response(
                                    {
                                        "detail": f"Transaction is success, add {amount/1e+12} XMR to key {key.name}"
                                    },
                                    status=status.HTTP_200_OK,
                                )
                            elif (
                                payment.status == PaymentHistory.PaymentStatus.PROCESSED
                            ):
                                return Response(
                                    {
                                        "detail": f"The submited tx_hash: {tx_hash} was already recorded, no change to xmr credit of key: {key.name}"
                                    },
                                    status=status.HTTP_200_OK,
                                )
                    except PaymentHistory.DoesNotExist:
                        PaymentHistory.objects.create(
                            key=key,
                            type=PaymentHistory.PaymentType.XMR,
                            crypto=crypto,
                            amount=amount / 1e12,
                            integrated_address=address_response,
                            xmr_payment_id=payment_id_response,
                            transaction_hash=tx_hash,
                            status=PaymentHistory.PaymentStatus.PROCESSED,
                            locked=locked,
                            unlock_time=unlock_time,
                            extra_data=parsed_response,
                        )
                        with transaction.atomic():
                            locked_key = APIKEY.objects.select_for_update().get(
                                hashed_key=key.hashed_key
                            )
                            locked_key.monero_credit = (
                                F("monero_credit") + amount / 1e12
                            )
                            locked_key.save()
                        return Response(
                            {
                                "detail": f"Transaction is success, add {amount/1e+12} XMR to key {key.name}"
                            },
                            status=status.HTTP_200_OK,
                        )
                else:
                    PaymentHistory.objects.get_or_create(
                        key=key,
                        type=PaymentHistory.PaymentType.XMR,
                        crypto=crypto,
                        amount=amount / 1e12,
                        integrated_address=address_response,
                        xmr_payment_id=payment_id_response,
                        transaction_hash=tx_hash,
                        status=PaymentHistory.PaymentStatus.PENDING,
                    )
                    return Response(
                        {
                            "detail": f"{tx_hash} is detected, but locked={locked}, unlock_time={unlock_time}"
                        },
                        status=status.HTTP_200_OK,
                    )
        except requests.exceptions.ConnectionError:
            raise ServiceUnavailable
