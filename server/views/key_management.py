import json
from decouple import config

import requests
import stripe
from constance import config as constant
from django.conf import settings
from django.contrib.auth import login
from django.contrib.auth.models import Group, Permission, User
from django.db import IntegrityError, transaction
from django.db.models import F
from django.http import HttpRequest, HttpResponse, HttpResponseRedirect
from django.shortcuts import redirect
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.cache import cache_page
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import TemplateView
from rest_framework import status
from rest_framework.decorators import api_view, throttle_classes
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle

from server.api_throttling_rates import (
    CreditCheckRateThrottle,
    KeyCreateRateThrottle,
    XMRConfirmationRateThrottle,
)
from server.models.api_key import APIKEY
from server.models.product import Crypto, PaymentHistory, Price, Product
from server.utils.sync_.manage_monero import manage_monero
from server.views.custom_exception import ServiceUnavailable
from server.views.serializer import (
    MoneroWebhookSerializer,
    CheckKeySerializer,
    CreateKeySerializer,
    MoneroTransactionSerializer,
    ProductSerializer,
    StripePaymentSerializer,
)

stripe.api_key = settings.STRIPE_SECRET_KEY


@api_view(["GET"])
@throttle_classes([AnonRateThrottle])
@cache_page(60 * 60)
def product_list_api(request: HttpRequest) -> Response:
    page_content = Product.objects.all()
    serializer = ProductSerializer(page_content, many=True)
    return Response({"products": serializer.data})


@api_view(["POST"])
@throttle_classes([CreditCheckRateThrottle])
def check_credit_api(request: HttpRequest) -> Response:
    serializer = CheckKeySerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        key_name = serializer.validated_data["key_name"]
        key_ = serializer.validated_data["key"]
        try:
            key = APIKEY.objects.get_from_key(key_)
            if key.name != key_name:
                raise AuthenticationFailed(
                    detail="Your Key Name and/or Key is/are incorrect"
                )
            credit = str(key.credit)
            monero_credit = str(key.monero_credit)
            return Response(
                {
                    "key_name": key_name,
                    "key": key_,
                    "fiat_balance": credit,
                    "monero_balance": monero_credit,
                },
                status=status.HTTP_200_OK,
            )
        except APIKEY.DoesNotExist:
            raise AuthenticationFailed(
                detail="Your Key Name and/or Key is/are incorrect"
            )


@api_view(["POST"])
@throttle_classes([XMRConfirmationRateThrottle])
def confirm_xmr_payment_api(request: HttpRequest) -> Response:
    serializer = MoneroTransactionSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        key_name = serializer.validated_data["key_name"]
        key_ = serializer.validated_data["key"]
        tx_id = serializer.validated_data["tx_id"]
        try:
            key = APIKEY.objects.get_from_key(key_)
            if key.name != key_name:
                raise AuthenticationFailed(
                    detail="Your Key Name and/or Key is/are incorrect"
                )
            payment_check = (
                manage_monero("get_transfer_by_txid", {"txid": tx_id})
                if tx_id
                else manage_monero("get_payments", {"payment_id": key.payment_id})
            )
            try:
                parsed_response = (
                    json.loads(payment_check.text)["result"]["transfer"]
                    if tx_id
                    else json.loads(payment_check.text)["result"]["payments"][0]
                )
            except KeyError:
                return Response(
                    {
                        "detail": (
                            "No transaction detected, check txid."
                            if tx_id
                            else "No transaction detected"
                        )
                    },
                    status=status.HTTP_404_NOT_FOUND,
                )

            if not parsed_response:
                return Response(
                    {"detail": "No transaction detected"},
                    status=status.HTTP_404_NOT_FOUND,
                )
            else:
                payment_id_response = parsed_response["payment_id"]
                if payment_id_response != key.payment_id:
                    return Response(
                        {"detail": "Payment ID from the transaction does not match"},
                        status=status.HTTP_404_NOT_FOUND,
                    )
                address_response = parsed_response["address"]
                amount = parsed_response["amount"]
                block_height = (
                    parsed_response["height"]
                    if tx_id
                    else parsed_response["block_height"]
                )
                locked = parsed_response["locked"]
                tx_hash = (
                    parsed_response["txid"] if tx_id else parsed_response["tx_hash"]
                )
                unlock_time = parsed_response["unlock_time"]
                confirmation = parsed_response["confirmations"] if tx_id else json.loads(manage_monero("get_transfer_by_txid", {"txid": tx_hash}).text)["result"]["transfer"]["confirmations"]
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
                                        "detail": f"Transaction is success: confirmations = {confirmation}, add {amount/1e+12} XMR to key {key_}"
                                    },
                                    status=status.HTTP_200_OK,
                                )
                            elif (
                                payment.status == PaymentHistory.PaymentStatus.PROCESSED
                            ):
                                return Response(
                                    {
                                        "detail": f"The submited tx_hash: {tx_hash} was already recorded, no change to xmr credit of key: {key_}"
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
                            block_height=block_height,
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
                                "detail": f"Transaction is success, confirmations = {confirmation}, add {amount/1e+12} XMR to key {key_}"
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
                        locked=locked,
                        unlock_time=unlock_time,
                        block_height=block_height,
                        extra_data=parsed_response,
                    )
                    return Response(
                        {
                            "detail": f"{tx_hash} is detected, but locked = {locked}, unlock_time = {unlock_time}, confirmation = {confirmation}/10."
                        },
                        status=status.HTTP_200_OK,
                    )

        except APIKEY.DoesNotExist:
            raise AuthenticationFailed(
                detail="Your Key Name and/or Key is/are incorrect"
            )
        except requests.exceptions.ConnectionError:
            raise ServiceUnavailable


@api_view(["POST"])
@throttle_classes([KeyCreateRateThrottle])
def generate_key_api(request: HttpRequest) -> Response:
    serializer = CreateKeySerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        key_name = serializer.validated_data["key_name"]
        master_group, _ = Group.objects.get_or_create(name="master_user")
        try:
            wallet = manage_monero("make_integrated_address")
            integrated_address = json.loads(wallet.text)["result"]["integrated_address"]
            payment_id = json.loads(wallet.text)["result"]["payment_id"]
        except requests.exceptions.ConnectionError:
            integrated_address = ""
            payment_id = ""
        try:
            with transaction.atomic():
                name, key = APIKEY.objects.create_key(
                    name=key_name,
                    integrated_address=integrated_address,
                    payment_id=payment_id,
                )
                created_key = APIKEY.objects.get_from_key(key)
                hashed_key = created_key.hashed_key
                user = User.objects.create_user(hashed_key, "", hashed_key)
                master_group.user_set.add(user)

                # Adding all permission for master user
                permissions = Permission.objects.filter(
                    codename__in=constant.DEFAULT_PERMISSION_CODENAMES.split()
                )
                user.user_permissions.add(*permissions)
                created_key.user = user
                created_key.save()
        except IntegrityError:
            return Response(
                {
                    "detail": "Database Intergrity Error, this should not happen, try again"
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        login(request, user)
        return Response(
            {
                "key_name": str(name),
                "key": str(key),
                "payment_id": payment_id,
                "integrated_wallet": integrated_address,
            },
            status=status.HTTP_200_OK,
        )


@api_view(["POST"])
@throttle_classes([CreditCheckRateThrottle])
def retrive_xmr_wallet_api(request: HttpRequest) -> Response:
    serializer = CheckKeySerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        key_name = serializer.validated_data["key_name"]
        key_ = serializer.validated_data["key"]
        try:
            key = APIKEY.objects.get_from_key(key_)
            if key.name != key_name:
                raise AuthenticationFailed(
                    detail="Your Key Name and/or Key is/are incorrect"
                )

            if len(key.payment_id) > 1:
                payment_id = key.payment_id
                wallet = manage_monero(
                    "make_integrated_address", {"payment_id": payment_id}
                )
                integrated_address = json.loads(wallet.text)["result"][
                    "integrated_address"
                ]
                return Response(
                    {
                        "key_name": key_name,
                        "key": key_,
                        "payment_id": payment_id,
                        "integrated_wallet": integrated_address,
                    },
                    status=status.HTTP_200_OK,
                )
            else:
                try:
                    wallet = manage_monero("make_integrated_address")
                    integrated_address = json.loads(wallet.text)["result"][
                        "integrated_address"
                    ]
                    payment_id = json.loads(wallet.text)["result"]["payment_id"]
                    key.integrated_address = integrated_address
                    key.payment_id = payment_id
                    key.save()
                    return Response(
                        {
                            "key_name": key_name,
                            "key": key_,
                            "payment_id": payment_id,
                            "integrated_wallet": integrated_address,
                        },
                        status=status.HTTP_200_OK,
                    )
                except requests.exceptions.ConnectionError:
                    integrated_address = ""
                    payment_id = ""
                raise ServiceUnavailable
        except APIKEY.DoesNotExist:
            raise AuthenticationFailed(
                detail="Your Key Name and/or Key is/are incorrect"
            )
        except requests.exceptions.ConnectionError:
            raise ServiceUnavailable


@api_view(["POST"])
def stripe_redirect(request: HttpRequest) -> Response:
    serializer = StripePaymentSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        key_name = serializer.validated_data["key_name"]
        key_ = serializer.validated_data["key"]
        product_id = serializer.validated_data["product_id"]
        try:
            key = APIKEY.objects.get_from_key(key_)
            if key.name != key_name:
                raise AuthenticationFailed(
                    detail="Your Key Name and/or Key is/are incorrect"
                )
            price = Price.objects.get(id=product_id)
            checkout_session = stripe.checkout.Session.create(
                payment_method_types=["card"],
                line_items=[
                    {
                        "price_data": {
                            "currency": "usd",
                            "unit_amount": int(price.price) * 100,
                            "product_data": {
                                "name": price.product.name,
                                "description": price.product.desc,
                            },
                        },
                        "quantity": price.product.quantity,
                    }
                ],
                metadata={
                    "product_id": product_id,
                    "name": key_name,
                    "key_id": key.id,
                    "price": price.price,
                    "quantity": price.product.quantity,
                },
                mode="payment",
                success_url=constant.STRIPE_PAYMENT_SUCCESS_URL,
                cancel_url=constant.STRIPE_PAYMENT_FAILURE_URL,
            )
            return Response(
                {"stripe_checkout_url": checkout_session.url},
                status=status.HTTP_200_OK,
            )

        except APIKEY.DoesNotExist:
            raise AuthenticationFailed(
                detail="Your Key Name and/or Key is/are incorrect"
            )


@method_decorator(csrf_exempt, name="dispatch")
class StripeWebhookView(View):
    """
    Stripe webhook view to handle checkout session completed event.
    """

    def post(self, request: HttpRequest, format: None = None) -> HttpResponse:
        payload = request.body
        endpoint_secret = settings.STRIPE_WEBHOOK_SECRET
        sig_header = request.META["HTTP_STRIPE_SIGNATURE"]
        event = None
        try:
            event = stripe.Webhook.construct_event(payload, sig_header, endpoint_secret)
        except ValueError:
            # Invalid payload
            return HttpResponse(status=400)
        except stripe.error.SignatureVerificationError as e:
            # Invalid signature
            return HttpResponse(status=400)

        if event["type"] == "checkout.session.completed":
            session = event["data"]["object"]
            key_id = session["metadata"]["key_id"]
            c = float(session["metadata"]["price"]) * float(
                session["metadata"]["quantity"]
            )
            with transaction.atomic():
                locked_key = APIKEY.objects.select_for_update().get(id=key_id)
                locked_key.credit = F("credit") + c
                locked_key.save()
                PaymentHistory.objects.create(
                    key=locked_key,
                    type=PaymentHistory.PaymentType.STRIPE,
                    stripe_payment_id=session["id"],
                    currency=session["currency"],
                    payment_intent=session["payment_intent"],
                    payment_method_type=session["payment_method_types"][0],
                    payment_status=session["payment_status"],
                    billing_city=session["customer_details"]["address"]["city"],
                    billing_postcode=session["customer_details"]["address"][
                        "postal_code"
                    ],
                    billing_address_1=session["customer_details"]["address"]["line1"],
                    billing_address_2=session["customer_details"]["address"]["line2"],
                    billing_state=session["customer_details"]["address"]["state"],
                    billing_country_code=session["customer_details"]["address"][
                        "country"
                    ],
                    email=session["customer_details"]["email"],
                    user_name=session["customer_details"]["name"],
                    amount=session["amount_total"] / 100,
                    amount_subtotal=session["amount_subtotal"] / 100,
                    extra_data=session,
                    status=PaymentHistory.PaymentStatus.PROCESSED,
                )
        # Can handle other events here.
        return HttpResponse(status=200)

@api_view(["POST"])
@csrf_exempt
def xmr_payment_webhook(request: HttpRequest) -> Response:
    serializer = MoneroWebhookSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        tx_id = serializer.validated_data["tx_id"]
        monero_webhook_secret = serializer.validated_data["monero_webhook_secret"]
        if monero_webhook_secret != config("MONERO_WEBHOOK_SECRET"):
            raise AuthenticationFailed(
                detail="MONERO WEBHOOK SECRET is incorrect"
            )
        try:
            payment_check = manage_monero("get_transfer_by_txid", {"txid": tx_id})
            try:
                parsed_response = json.loads(payment_check.text)["result"]["transfer"]                
            except KeyError:
                return Response(
                    {
                        "detail": "No transaction detected, check txid."             
                    },
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
                confirmation = parsed_response["confirmations"]
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
                            block_height=block_height,
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
                        locked=locked,
                        unlock_time=unlock_time,
                        block_height=block_height,
                        extra_data=parsed_response,
                    )
                    return Response(
                        {
                            "detail": f"{tx_hash} is detected, but locked={locked}, unlock_time={unlock_time}, confirmation={confirmation}/10"
                        },
                        status=status.HTTP_200_OK,
                    )
        except requests.exceptions.ConnectionError:
            raise ServiceUnavailable