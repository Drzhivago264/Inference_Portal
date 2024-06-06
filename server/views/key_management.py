import typing
import stripe
import requests
from server.models import (Price,
                           Product,
                           APIKEY,
                           Crypto,
                           PaymentHistory,
                           )
from django.http import HttpResponse
from django.shortcuts import redirect
from django.conf import settings
import bleach
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views import View
from django.views.generic import TemplateView
from server.utils.sync_.common_func import manage_monero
from django.contrib.auth import login
import json
from django.http import (HttpRequest,
                         HttpResponse,
                         HttpResponseRedirect
                         )
from rest_framework import status
from rest_framework.decorators import api_view, throttle_classes
from rest_framework.response import Response

from rest_framework.throttling import AnonRateThrottle

from server.views.serializer import (CreateKeySerializer, 
                               CheckKeySerializer, 
                               ProductSerializer, 
                               StripePaymentSerializer
                               )
from server.api_throttling_rates import (KeyCreateRateThrottle, 
                                         CreditCheckRateThrottle, 
                                         XMRConfirmationRateThrottle
                                        )
from django.contrib.auth.models import User
stripe.api_key = settings.STRIPE_SECRET_KEY

@api_view(['GET'])
@throttle_classes([AnonRateThrottle])
def product_list_api(request: HttpRequest) -> Response:
    page_content = Product.objects.all()
    serializer = ProductSerializer(page_content, many=True)
    return Response({'products': serializer.data})

@api_view(['POST'])
@throttle_classes([CreditCheckRateThrottle])
def check_credit_api(request: HttpRequest) -> Response:
    serializer = CheckKeySerializer(data=request.data)
    if serializer.is_valid():
        key_name = serializer.data['key_name']
        key_ = serializer.data['key']
        try:
            key = APIKEY.objects.get_from_key(key_)
            if key.name == key_name:
                credit = str(key.credit)
                monero_credit = str(key.monero_credit)
                return Response({"key_name": key_name, "key": key_ ,"fiat_balance": credit, "monero_balance": monero_credit}, status=status.HTTP_200_OK)
            else:
                return Response({"detail": "Your Key Name is incorrect"}, status=status.HTTP_401_UNAUTHORIZED)
        except APIKEY.DoesNotExist:
            return Response({"detail": "Your Key is incorrect"}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@throttle_classes([XMRConfirmationRateThrottle])
def confirm_xmr_payment_api(request: HttpRequest) -> Response:
    serializer = CheckKeySerializer(data=request.data)
    if serializer.is_valid():
        key_name = serializer.data['key_name']
        key_ = serializer.data['key']
        try:
            key = APIKEY.objects.get_from_key(key_)
            if key.name == key_name:
                payment_check = manage_monero(
                    "get_payments", {"payment_id": key.payment_id})
                if "error" in json.loads(payment_check.text):
                    return Response({'detail': "Payment id is incorrect"}, status=status.HTTP_404_NOT_FOUND)
                elif len(json.loads(payment_check.text)["result"]) == 0:
                    return Response({'detail': "No transaction detected"}, status=status.HTTP_404_NOT_FOUND)
                else:
                    payment_id_response = json.loads(payment_check.text)[
                        "result"]['payments'][0]['payment_id']
                    address_response = json.loads(payment_check.text)[
                        "result"]['payments'][0]['address']
                    amount = json.loads(payment_check.text)[
                        "result"]['payments'][0]['amount']
                    block_height = json.loads(payment_check.text)[
                        "result"]['payments'][0]['block_height']
                    locked = json.loads(payment_check.text)[
                        "result"]['payments'][0]['locked']
                    tx_hash = json.loads(payment_check.text)[
                        "result"]['payments'][0]['tx_hash']
                    unlock_time = json.loads(payment_check.text)[
                        "result"]['payments'][0]['unlock_time']
                    crypto = Crypto.objects.get(coin="xmr")
                    if int(unlock_time) == 0 and not locked:
                        try:
                            PaymentHistory.objects.get(
                                key=key,
                                crypto=crypto,
                                amount=amount/1e+12,
                                integrated_address=address_response,
                                payment_id=payment_id_response,
                                locked=locked,
                                transaction_hash=tx_hash,
                                block_height=block_height,
                            )
                            return Response({"detail": f"The lastest tx_hash is {tx_hash}, no change to xmr credit of key: {key_}"}, status=status.HTTP_200_OK)

                        except PaymentHistory.DoesNotExist:
                            PaymentHistory.objects.create(
                                key=key,
                                crypto=crypto,
                                amount=amount/1e+12,
                                integrated_address=address_response,
                                payment_id=payment_id_response,
                                locked=locked,
                                transaction_hash=tx_hash,
                                block_height=block_height,
                            )
                            key.monero_credit += amount/1e+12
                            key.save()
                            return Response({"detail": f"Transaction is success, add {amount/1e+12} XMR to key {key_}"}, status=status.HTTP_200_OK)
                        except Exception as e:
                            return Response({"detail": f"{e}"}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
                    else:
                        return Response({"detail": f"Transaction is detected, but locked = {locked} and unlock_time = {unlock_time}. Try again with at least 10 confirmations"}, status=status.HTTP_200_OK)
            else:
               return Response({'detail': 'Your Key Name is incorrect'}, status=status.HTTP_401_UNAUTHORIZED)
        except APIKEY.DoesNotExist:
            return Response({'detail': 'Your Key is incorrect'}, status=status.HTTP_401_UNAUTHORIZED)
        except requests.exceptions.ConnectionError:
            return Response({'detail': 'The Monero node is down, try again latter'}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@throttle_classes([KeyCreateRateThrottle])
def generate_key_api(request: HttpRequest) -> Response:
    serializer = CreateKeySerializer(data=request.data)
    if serializer.is_valid():
        key_name = serializer.data['key_name']
        try:
            wallet = manage_monero("make_integrated_address")
            integrated_address = json.loads(
                wallet.text)['result']['integrated_address']
            payment_id = json.loads(wallet.text)['result']['payment_id']
        except requests.exceptions.ConnectionError:
            integrated_address = ""
            payment_id = ""
        name, key = APIKEY.objects.create_key(
            name=key_name, integrated_address=integrated_address, payment_id=payment_id)
        created_key = APIKEY.objects.get_from_key(key)
        hashed_key = created_key.hashed_key
        user = User.objects.create_user(hashed_key, '', hashed_key)
        created_key.user = user
        created_key.save()
        login(request, user)
        return Response({"key_name": str(name),
                         'key': str(key),
                         'payment_id': payment_id,
                         'integrated_wallet': integrated_address
                         }, status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@throttle_classes([CreditCheckRateThrottle])
def retrive_xmr_wallet_api(request: HttpRequest) -> Response:
    serializer = CheckKeySerializer(data=request.data)
    if serializer.is_valid():
        key_name = serializer.data['key_name']
        key_ = serializer.data['key']
        try:
            key = APIKEY.objects.get_from_key(key_)
            if key.name == key_name:
                if len(key.payment_id) > 1:
                    payment_id = key.payment_id
                    wallet = manage_monero("make_integrated_address", {
                        "payment_id": payment_id})
                    integrated_address = json.loads(
                        wallet.text)['result']['integrated_address']
                    return Response({"key_name": key_name,
                                    'key': key_,
                                    'payment_id': payment_id,
                                    'integrated_wallet': integrated_address
                                    }, status=status.HTTP_200_OK)
                else:
                    try:
                        wallet = manage_monero("make_integrated_address")
                        integrated_address = json.loads(
                            wallet.text)['result']['integrated_address']
                        payment_id = json.loads(wallet.text)[
                            'result']['payment_id']
                        key.integrated_address = integrated_address
                        key.payment_id = payment_id
                        key.save()
                        return Response({"key_name": key_name,
                                        'key': key_,
                                        'payment_id': payment_id,
                                        'integrated_wallet': integrated_address
                                        }, status=status.HTTP_200_OK)
                    except requests.exceptions.ConnectionError:
                        integrated_address = ""
                        payment_id = ""
                    return Response({'detail': 'The Monero node is down, try again latter'}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
            else:
                return Response({'detail': 'Your Key Name is incorrect'}, status=status.HTTP_401_UNAUTHORIZED)
        except APIKEY.DoesNotExist:
            return Response({'detail': 'Your Key is incorrect'}, status=status.HTTP_401_UNAUTHORIZED)
        except requests.exceptions.ConnectionError:
            return Response({'detail': 'The Monero node is down, try again latter'}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def stripe_redirect(request: HttpRequest) -> Response:
    serializer = StripePaymentSerializer(data=request.data)
    if serializer.is_valid():
        key_name = serializer.data['key_name']
        key_ = serializer.data['key']
        product_id = serializer.data['product_id']
        try:
            key = APIKEY.objects.get_from_key(key_)
            if key.name == key_name:
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
                    metadata={"product_id": product_id, "name": key_name, "key": key_, "price": price.price, "quantity": price.product.quantity},
                    mode="payment",
                    success_url=settings.PAYMENT_SUCCESS_URL,
                    cancel_url=settings.PAYMENT_CANCEL_URL,
                )
                return Response({"stripe_checkout_url": checkout_session.url}, status=status.HTTP_200_OK)
            else:
                return Response({'detail': 'Your Key Name is incorrect'}, status=status.HTTP_401_UNAUTHORIZED)
        except APIKEY.DoesNotExist:
            return Response({'detail': 'Your Key is incorrect'}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class SuccessView(TemplateView):
    template_name = "html/success.html"

    def get_context_data(self, **kwargs: typing.Any) -> object:
        context = super(SuccessView, self).get_context_data(**kwargs)
        context['title'] = "Payment Success"
        return context


class CancelView(TemplateView):
    template_name = "html/index.html"

    def get_context_data(self, **kwargs: typing.Any) -> object:
        context = super(CancelView, self).get_context_data(**kwargs)
        return context


class CreateStripeCheckoutSessionView(View):

    def post(self, request: HttpRequest, *args: typing.Any, **kwargs: typing.Any) -> HttpResponseRedirect:
        price = Price.objects.get(id=self.kwargs["pk"])
        k = APIKEY.objects.get_from_key(bleach.clean(self.kwargs["key"]))
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
            metadata={"product_id": price.product.id, "name": k.name, "key": bleach.clean(
                self.kwargs["key"]), "price": price.price, "quantity": price.product.quantity},
            mode="payment",
            success_url=settings.PAYMENT_SUCCESS_URL,
            cancel_url=settings.PAYMENT_CANCEL_URL,
        )
        return redirect(checkout_session.url)


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
            event = stripe.Webhook.construct_event(
                payload, sig_header, endpoint_secret)
        except ValueError as e:
            # Invalid payload
            return HttpResponse(status=400)
        except stripe.error.SignatureVerificationError as e:
            # Invalid signature
            return HttpResponse(status=400)

        if event["type"] == "checkout.session.completed":
            print("Payment successful")
            session = event["data"]["object"]
            customer_email = session["customer_details"]["email"]
            product_id = session["metadata"]["product_id"]
            name = session["metadata"]["name"]
            key = session["metadata"]["key"]
            print(session["metadata"]["price"], session["metadata"]["price"])
            c = float(session["metadata"]["price"]) * \
                float(session["metadata"]["quantity"])
            k = APIKEY.objects.get_from_key(key)
            k.credit += c
            k.save()
        # Can handle other events here.
        return HttpResponse(status=200)
