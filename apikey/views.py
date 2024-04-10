from django.shortcuts import render
import typing
import stripe
from django.core.paginator import Paginator
from django.db.models import QuerySet
import requests
from datetime import datetime
from .models import (Price,
                     Product,
                     LLM,
                     InferenceServer,
                     PromptResponse,
                     APIKEY,
                     Crypto,
                     PaymentHistory,
                     InstructionTree,
                     Article,
                     MemoryTree
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
from .celery_tasks import send_email_, Inference
from .util.commond_func import get_key, manage_monero
from django.core.cache import cache
from apikey.util import constant
from django.core.exceptions import ObjectDoesNotExist
from .forms import (RoomRedirectForm,
                    PromptForm,
                    LogForm,
                    CaptchaForm
                    )
from django.core.signing import Signer
from hashlib import sha256
import json
from django.http import (HttpRequest, 
                         HttpResponse, 
                         JsonResponse, 
                         HttpResponseRedirect
                         )
from django_datatables_view.base_datatable_view import BaseDatatableView
from django.utils.html import escape
from django.db.models import Q
stripe.api_key = settings.STRIPE_SECRET_KEY


#@cache_page(60*15)
def index(request: HttpRequest) -> HttpResponse:
    page_content = Article.objects.filter(name="index")
    memory_tree_node_number = MemoryTree.objects.filter(key=APIKEY.objects.get_from_key("ltjYwNkz.I19C8zz0jgpfpMUb9W8R8WGrMdo1yPXP"))
    #print(memory_tree_node_number[0].get_children())
    #print(memory_tree_node_number)
    context =  {"title": "Inference", 
                "content_list": page_content,}
    return render(request, "html/index.html", context=context)


#@cache_page(60*15)
def manual(request: HttpRequest) -> HttpResponse:
    page_content = Article.objects.filter(name='manual')
    context = {
        "content_list": page_content,
        "title": "Manual"
    }
    return render(request, "html/manual.html", context=context)


#@cache_page(60*15)
def chat(request: HttpRequest) -> HttpResponse | HttpResponseRedirect:
    if request.method == "POST":
        form = RoomRedirectForm(request.POST)
        if form.is_valid():
            destination = form.cleaned_data['room']
            key = form.cleaned_data['key']
            key_hash = sha256(key.encode('utf-8')).hexdigest()
            return HttpResponseRedirect(f"/{destination}/{key_hash}")
    else:
        form = RoomRedirectForm()
    context = {"form": form, "title": "Inference Mode"}
    return render(request, "html/chat.html", context=context)


#@cache_page(60)
def model_infor(request: HttpRequest) -> HttpResponse:
    llm = LLM.objects.filter(agent_availability=False)
    servers = InferenceServer.objects.all().defer('name').order_by("hosted_model")
    context = {'llms': llm, 'servers': servers, 'title': 'Model Detail'}
    return render(request, "html/model_infor.html", context)


def frankenstein(request: HttpRequest) -> HttpResponse:
    return render(request, "html/frankenstein.html", {"title": "Frankenstein"})


def response_prompt_redirect(request: HttpRequest) -> HttpResponse | HttpResponseRedirect:
    if request.method == 'POST':
        form = LogForm(request.POST)
        signer = Signer()
        if form.is_valid():
            key = form.cleaned_data['key_']
            name = form.cleaned_data['key_name']
            check = get_key(key=key, name=name)
            if check:
                return HttpResponseRedirect(f"/prompt/{signer.sign(key)}")
            else:
                messages.error(
                    request, "Error: Key or/and Key Name is/are incorrent.",  extra_tags='credit')
                return HttpResponseRedirect("/promptresponse")
        else:
            messages.error(
                    request, "Error: Captcha Failed.",  extra_tags='credit')
            return HttpResponseRedirect("/promptresponse")
    elif request.method == 'GET':
        return render(request, "html/prompt_log_redirect.html", context={'form': LogForm(), 'title': 'Get Log'})


def room_prompt(request: HttpRequest,  key: str) -> HttpResponse:
    context = {"key": key, 'title': "Log"}
    return render(request, "html/prompt_log.html", context)

class LogListJson(BaseDatatableView):
    columns = ['id', 'prompt', 'response', 'model.name', 'created_at', 'p_type', 'cost']
    order_columns = ['id', 'prompt', 'response','model.name','created_at', 'p_type', 'cost']
    max_display_length = 500
    def get_initial_queryset(self):
        signer = Signer()
        filter_key = self.kwargs['key']
        key_ = APIKEY.objects.get_from_key(signer.unsign(filter_key))
        return PromptResponse.objects.filter(key=key_).order_by('-id')
    def filter_queryset(self, qs):
        search = self.request.GET.get('search[value]', None)
        if search:
            qs = qs.filter(Q(prompt__icontains=search) | Q(response__icontains=search))
        return qs


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
        product_id = bleach.clean(request.POST.get('product_id'))
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


def contact(request: HttpRequest) -> HttpResponse | HttpResponseRedirect:
    form = CaptchaForm(request.POST)
    if request.method == 'POST':
        if form.is_valid():
            name = bleach.clean(str(request.POST.get('name')))
            sender_email = bleach.clean(str(request.POST.get('sender_email')))
            subject = name + " from Inference said: "
            message = bleach.clean(
                str(request.POST.get('message'))) + " " + sender_email
            email_from = settings.EMAIL_HOST_USER
            recipient_list = [settings.EMAIL_HOST_USER,]
            try:
                send_email_.delay(subject, message, email_from, recipient_list)
                messages.error(request, "Sent!",  extra_tags='email')
                return HttpResponseRedirect("/contact")
            except:
                messages.error(
                    request, "Failed due to unknown reasons!",  extra_tags='email')
                return HttpResponseRedirect("/contact")
        else:
            messages.error(request, "Captcha Failed.",  extra_tags='email')
            return HttpResponseRedirect("/contact")
    elif request.method == 'GET':
        return render(request, "html/contact.html", {'form': form, "title": "Contact"})


def prompt(request: HttpRequest) -> HttpResponse | HttpResponseRedirect:
    llm = LLM.objects.filter(agent_availability=False)
    if request.method == "POST":
        signer = Signer()
        form = PromptForm(request.POST)
        logform = LogForm(request.POST)
        if form.is_valid():
            top_p = form.cleaned_data['top_p']
            best_of = form.cleaned_data['best_of']
            top_k = form.cleaned_data['top_k']
            if top_k <= 0:
                top_k = -1
            max_tokens = form.cleaned_data['max_tokens']

            frequency_penalty = form.cleaned_data['frequency_penalty']
            presence_penalty = form.cleaned_data['presence_penalty']
            temperature = form.cleaned_data['temperature']
            beam = form.cleaned_data['beam'] if form.cleaned_data['beam'] else False
            early_stopping = form.cleaned_data['early_stopping'] if form.cleaned_data['early_stopping'] else False
            length_penalty = form.cleaned_data['length_penalty']
            m = form.cleaned_data['model']
            mode = form.cleaned_data['mode']

            if mode == "chat":
                type_ = "prompt_room"
            elif mode == "generate":
                type_ = "prompt"

            prompt = form.cleaned_data['prompt']
            k = form.cleaned_data['key']
            n = form.cleaned_data['key_name']
            include_memory = form.cleaned_data['include_memory']
            instance = cache.get(f"{k}:{n}")
            if instance is None:
                instance = get_key(n, k)
            if not instance:
                response = "Error: key or key name is not correct"
            elif instance:
                cache.set(f"{k}:{n}", instance, constant.CACHE_AUTHENTICATION)
                Inference.delay(unique=None,
                                is_session_start_node=None,
                                mode=mode,
                                stream=False,
                                type_=type_,
                                key=str(request.POST.get('key')),
                                credit=instance.credit,
                                room_group_name=None,
                                model=m,
                                top_k=top_k,
                                top_p=top_p,
                                best_of=best_of,
                                temperature=temperature,
                                max_tokens=max_tokens,
                                presence_penalty=presence_penalty,
                                frequency_penalty=frequency_penalty,
                                length_penalty=length_penalty,
                                early_stopping=early_stopping,
                                beam=beam,
                                prompt=prompt,
                                include_memory=include_memory)
                response = "Your prompt is queued, refer to Prompt-Response Log for detail"
            messages.info(
                request, f"{response} ({m} {datetime.today().strftime('%Y-%m-%d %H:%M:%S')})")
            return HttpResponseRedirect("/prompt")
        elif logform.is_valid():
            key = logform.cleaned_data['key_']
            name = logform.cleaned_data['key_name']
            check = get_key(key=key, name=name)
            if check:
                return HttpResponseRedirect(f"/prompt/{signer.sign(key)}")
            else:
                messages.error(
                    request, "Error: Key or/and Key Name is/are incorrent.",  extra_tags='credit')
                return HttpResponseRedirect("/promptresponse")
        else:
            messages.info(
                request, "Error: Invalid Captcha.")
            return HttpResponseRedirect("/prompt")
    else:
        response = f"Default to Mistral Chat 13B"
        messages.info(
            request, f"{response} (Server {datetime.today().strftime('%Y-%m-%d %H:%M:%S')})")
        context = {
            "llms": llm,
            "form": PromptForm(),
            "log_form": LogForm(),
            "title": "Prompt & API"
        }
        return render(request, "html/prompt.html", context=context)

class Room(ListView):
    template_name = ""
    def get_queryset(self) -> QuerySet[LLM]:

        if self.template_name == "html/chatroom.html" or self.template_name == "html/hotpot.html":
            return LLM.objects.all()
        elif self.template_name == "html/lagent.html": 
            return LLM.objects.filter(agent_availability=True)             

    def get_context_data(self, **kwargs: typing.Any) -> object:
     
        context = super(Room, self).get_context_data(**kwargs)
        if self.template_name == "html/chatroom.html":
            context['title'] = "Chat Bot"
            context['destination'] = "chat"
        elif self.template_name == "html/lagent.html" or self.template_name == "html/hotpot.html":
            root_nodes = InstructionTree.objects.filter(level=0)
            for root in root_nodes:
                if root.name == "Assignment Agent":
                    default_template = root
                    default_child_template = root.get_children()
            context['templates'] = root_nodes
            context['template'] = default_template
            context['child_template'] = default_child_template.order_by('code')
            if self.template_name == "html/lagent.html":
                context['destination'] = "engineer"
                context['title'] = "Prompt Engineer"
            elif self.template_name == "html/hotpot.html":
                context['destination'] = "hotpot"
                context['title'] = "Hotpot Mode"
        context['key'] = self.kwargs['key']
        context['llms'] = self.get_queryset()
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


def handler_403(request: HttpRequest, exception: None = None) -> HttpResponse:
    return render(request, 'error_html/403.html', status=403)


def handler_404(request: HttpRequest, exception: None) -> HttpResponse:
    return render(request, 'error_html/404.html', status=404)


def handler_500(request: HttpRequest,  *args, **argv) -> HttpResponse:
    return render(request, 'error_html/500.html', status=500)


def handler_429(request: HttpRequest, exception: None) -> HttpResponse:
    return render(request, 'error_html/429.html', status=429)
