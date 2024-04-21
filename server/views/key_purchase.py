from django.shortcuts import render
import typing
import stripe
import requests
from server.models import (Price,
                     Product,
                     APIKEY,
                     Crypto,
                     PaymentHistory,

                     )
from django.views.generic import DetailView, ListView
from django.http import HttpResponse
from django.views.decorators.cache import cache_page
from django.shortcuts import redirect
from django.conf import settings
import bleach
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.contrib import messages
from django.views import View
from django.urls import reverse
from django.views.generic import TemplateView
from server.util.commond_func import manage_monero
from django.core.cache import cache
from server.forms import  CaptchaForm              
from django.core.signing import Signer
import json
from django.http import (HttpRequest, 
                         HttpResponse, 
                         HttpResponseRedirect
                         )

stripe.api_key = settings.STRIPE_SECRET_KEY

def generate_key_success(request: HttpRequest, key: str) -> HttpResponse:
    signer = Signer()
    key_ = APIKEY.objects.get_from_key(signer.unsign(key))
    form = CaptchaForm()
    products = Product.objects.all()
    context = {"form": form, "products": products, 'name': key_.name, 'key': signer.unsign(key), 'form': form,
               'integrated_address': key_.integrated_address,
               'payment_id': key_.payment_id,
               'title': "Manage API Key"}
    return render(request, "html/create_key_success.html", context)


def generate_key(request: HttpRequest) -> HttpResponseRedirect:
    if request.method == 'POST':
        signer = Signer()
        form = CaptchaForm(request.POST)
        name = bleach.clean(str(request.POST.get('name')))
        if form.is_valid() and bleach.clean(request.POST.get("form_type")) == 'createform':
            try:
                wallet = manage_monero("make_integrated_address")
                integrated_address = json.loads(
                    wallet.text)['result']['integrated_address']
                payment_id = json.loads(wallet.text)['result']['payment_id']
            except requests.exceptions.ConnectionError:
                integrated_address = ""
                payment_id = ""
            name, key = APIKEY.objects.create_key(
                name=name, integrated_address=integrated_address, payment_id=payment_id)
            return HttpResponseRedirect(f"/buy/{signer.sign(key)}")
        else:
            form = CaptchaForm()
            messages.error(request, "Error: Captcha Failed.",
                           extra_tags='key')
            return HttpResponseRedirect("/buy")


def get_xmr_address(request: HttpRequest) -> HttpResponseRedirect:
    if request.method == 'POST' and bleach.clean(request.POST.get("form_type")) == 'get_xmr_address':
        k = bleach.clean(request.POST.get('key'))
        signer = Signer()
        form = CaptchaForm(request.POST)
        if form.is_valid():
            try:
                key = APIKEY.objects.get_from_key(k)
                if len(key.payment_id) > 1:
                    payment_id = key.payment_id
                
                    wallet = manage_monero("make_integrated_address", {
                                        "payment_id": payment_id})
                    integrated_address = json.loads(
                        wallet.text)['result']['integrated_address']
                    return HttpResponseRedirect(f"/buy/{signer.sign(k)}")

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
                        return HttpResponseRedirect(f"/buy/{signer.sign(k)}")
                    except requests.exceptions.ConnectionError:
                        integrated_address = ""
                        payment_id = ""
                        messages.error(request, "Your Key does not have a Monero wallet, create a new Key",
                                    extra_tags='monero_address')
                    return HttpResponseRedirect("/buy")
            except APIKEY.DoesNotExist:
                messages.error(request, "Key is incorrect",
                            extra_tags='monero_address')
                return HttpResponseRedirect("/buy")
            except requests.exceptions.ConnectionError:
                messages.error(request, "Cannot connect to RPC",
                    extra_tags='monero_address')
                return HttpResponseRedirect("/buy")
        else:
            messages.error(request, "Error: Captcha is incorrect.",
                extra_tags='monero_address')
            return HttpResponseRedirect("/buy")


def check_xmr_payment(request: HttpRequest) -> HttpResponseRedirect:
    if request.method == 'POST' and bleach.clean(request.POST.get("form_type")) == 'check_xmr_payment':
        k = bleach.clean(request.POST.get('key'))
        form = CaptchaForm(request.POST)
        if form.is_valid():
            try:
                key = APIKEY.objects.get_from_key(k)
                payment_check = manage_monero(
                    "get_payments", {"payment_id": key.payment_id})
                if "error" in json.loads(payment_check.text):
                    messages.error(request, "Payment ID is incorrect",
                                extra_tags='monero_payment')
                    return HttpResponseRedirect(f"/buy")
                elif len(json.loads(payment_check.text)["result"]) == 0:
                    messages.error(request, "No transaction detected",
                                extra_tags='monero_payment')
                    return HttpResponseRedirect(f"/buy")
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
                            messages.success(
                                request, f"The lastest tx_hash is {tx_hash}, no change to xmr credit of key: {k}", extra_tags='monero_payment')
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
                            messages.success(request, f"Transaction is success, add {amount/1e+12} XMR to key {k}",
                                            extra_tags='monero_payment')
                    else:
                        messages.error(request, f"Transaction is detected, but locked = {locked} and unlock_time = {unlock_time}. Try again with at least 10 confirmations",
                                    extra_tags='monero_payment')
            except APIKEY.DoesNotExist:
                messages.error(request, f"Key is incorrect",
                            extra_tags='monero_payment')
                return HttpResponseRedirect("/buy")
            except requests.exceptions.ConnectionError:
                messages.error(request, "Cannot connect to RPC",
                    extra_tags='monero_payment')
                return HttpResponseRedirect("/buy")
        else:
            messages.error(request, "Error: Captcha is incorrect.",
                extra_tags='monero_payment')
            return HttpResponseRedirect("/buy")



def check_credit(request: HttpRequest) -> HttpResponseRedirect:
    if request.method == 'POST':
        form = CaptchaForm()
        name = bleach.clean(str(request.POST.get('name')))
        ### Deal with check credit requests###
        if bleach.clean(request.POST.get("form_type")) == 'checkform':
            form = CaptchaForm(request.POST)
            k = bleach.clean(request.POST.get('key'))
            if form.is_valid():
                try:
                    key = APIKEY.objects.get_from_key(k)
                    credit = str(key.credit)
                    monero_credit = str(key.monero_credit)
                    if key.name == name:
                        messages.error(
                            request, f"Your credit is {credit} USD, {monero_credit} XMR.",  extra_tags='credit')
                    else:
                        messages.error(
                            request, "Error: Key Name is incorrent.",  extra_tags='credit')
                    return HttpResponseRedirect("/buy")
                except APIKEY.DoesNotExist:
                    messages.error(
                        request, "Error: Key is incorrent.",  extra_tags='credit')
                    return HttpResponseRedirect("/buy")
            else:
                form = CaptchaForm()
                messages.error(request, "Error: Captcha Failed.",
                               extra_tags='credit')
                return HttpResponseRedirect("/buy")


def topup(request: HttpRequest) -> HttpResponseRedirect:
    ### Deal with check topup requests###
    signer = Signer()
    if request.method == 'POST' and bleach.clean(request.POST.get("form_type")) == 'topupform':
        name = bleach.clean(str(request.POST.get('name')))
        k = bleach.clean(request.POST.get('key'))
        product_id = bleach.clean(request.POST.get('product'))
        try:
            key = APIKEY.objects.get_from_key(k)
            if key.name == name:
                return redirect(reverse('apikey:product-detail', kwargs={'pk': product_id, 'key': signer.sign(k), 'name': name}))
            else:
                messages.error(
                    request, "Key Name is incorrect",  extra_tags='credit')
                return HttpResponseRedirect("/buy")
        except APIKEY.DoesNotExist:
            messages.error(request, "Key is incorrect",
                           extra_tags='credit')
            return HttpResponseRedirect("/buy")


class ProductListView(ListView):
    model = Product
    context_object_name = "products"
    template_name = "html/buy.html"

    def get_context_data(self, **kwargs: typing.Any) -> object:
        context = super(ProductListView, self).get_context_data(**kwargs)
        context['form'] = CaptchaForm()
        context['title'] = "Manage API Key"
        return context


class ProductDetailView(DetailView):
    model = Product
    context_object_name = "product"
    template_name = "html/api_detail.html"

    def get_context_data(self, **kwargs: typing.Any) -> object:
        signer = Signer()
        context = super(ProductDetailView, self).get_context_data()
        context["prices"] = Price.objects.filter(product=self.get_object())
        context["name"] = bleach.clean(self.kwargs["name"])
        context["key"] = signer.unsign(bleach.clean(self.kwargs["key"]))
        context["title"] = "Topup"
        return context
    
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

    def post(self, request: HttpRequest, format: None=None) -> HttpResponse:
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
