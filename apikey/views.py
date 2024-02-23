from django.shortcuts import render, HttpResponseRedirect
import random
import stripe
from django.core.paginator import Paginator
from datetime import datetime
import secrets
from .models import Price, Product, Key, LLM, InferenceServer, PromptResponse
from .forms import CaptchaForm
from django.views.generic import DetailView, ListView
from django.http import HttpResponse
from django_ratelimit.decorators import ratelimit
from django.views.decorators.cache import cache_page
from django.shortcuts import redirect
from django.conf import settings
import bleach
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.contrib import messages
from django.views import View
from django.template import loader
from django.urls import reverse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.views.generic import TemplateView
from .celery_tasks import send_email_, Inference
from .util.commond_func import get_model_url, get_key, get_model, static_view_inference, log_prompt_response, get_chat_context
from django_ratelimit.exceptions import Ratelimited
from django.core.cache import cache
from apikey.util import constant
stripe.api_key = settings.STRIPE_SECRET_KEY

#@cache_page(60*15)  
def index(request):
    return render(request, "html/index.html")

@cache_page(60*15)
def manual(request):
    return render(request, "html/manual.html")

#@cache_page(60*15)
def chat(request):
    return render(request, "html/chat.html")


@cache_page(60)
def model_infor(request):
    llm = LLM.objects.all()
    servers = InferenceServer.objects.all().defer('name').order_by("hosted_model")
    context = {'llms':llm, 'servers':servers}
    return render(request, "html/model_infor.html", context)

def response_prompt_redirect(request):
    if request.method == 'POST':
        key = bleach.clean(request.POST.get('key'))
        name = bleach.clean(request.POST.get('name'))
        check = get_key(key=key,name=name)
        if check:
            return HttpResponseRedirect(f"/prompt/{key}") 
        else:
            messages.error(request,"Error: Key or/and Key Name is/are incorrent.",  extra_tags='credit')
            return HttpResponseRedirect("/promptresponse")
    elif request.method == 'GET':
        return render(request, "html/prompt_log_redirect.html")
        


class ProductListView(ListView):
    model = Product
    context_object_name = "products"
    template_name = "html/buy.html"
    def get_context_data(self, **kwargs):
        context = super(ProductListView, self).get_context_data(**kwargs)
        context['form'] = CaptchaForm()
        return context
    def post(self,request):
        form = CaptchaForm()
        products = Product.objects.all()
        name = bleach.clean(str(request.POST.get('name')))
        
        ###Deal with create key requests###
        if bleach.clean(request.POST.get("form_type")) == 'createform':
            form = CaptchaForm(request.POST)
            if form.is_valid():
                k = secrets.token_urlsafe(64)
                Key.objects.create(owner=name, key=str(k))
                context = {'products': products,'name':str(name) ,'key': str(k), 'form': form }
                return render(request, "html/buy.html", context)
            else:
                form = CaptchaForm()
                messages.error(request,"Error: Captcha Failed.",  extra_tags='key')
                return HttpResponseRedirect("/buy") 
            
        ###Deal with check credit requests###    
        elif bleach.clean(request.POST.get("form_type")) == 'checkform':
            form = CaptchaForm(request.POST)
            k = bleach.clean(request.POST.get('key'))
            if form.is_valid():
                try:
                    key = Key.objects.get(owner=name, key = str(k))
                    credit = str(key.credit)
                    messages.error(request,f"Your credit is {credit} AUD.",  extra_tags='credit')
                    return HttpResponseRedirect("/buy")
                except Key.DoesNotExist:
                    messages.error(request,"Error: Key or/and Key Name is/are incorrent.",  extra_tags='credit')
                    return HttpResponseRedirect("/buy")
                
            else:
                form = CaptchaForm()
                messages.error(request,"Error: Captcha Failed.",  extra_tags='credit')
                return HttpResponseRedirect("/buy") 
        
        ###Deal with check topup requests###   
        elif bleach.clean(request.POST.get("form_type")) == 'topupform':
            
            k = bleach.clean(request.POST.get('key'))
            product_id = bleach.clean(request.POST.get('product_id'))
            try:
                key = Key.objects.get(owner=name, key = k)
                return redirect(reverse('apikey:product-detail', kwargs={'pk':product_id, 'key':key.key, 'name':key.owner}))
            except:
                messages.error(request,"Key or Key Name is incorrect",  extra_tags='credit')
                return HttpResponseRedirect("/buy") 
        
    

class ProductDetailView(DetailView):
    model = Product
    context_object_name = "product"
    template_name = "html/api_detail.html"


    def get_context_data(self, **kwargs):
        context = super(ProductDetailView, self).get_context_data()
        context["prices"] = Price.objects.filter(product=self.get_object())
        context["name"] = bleach.clean(self.kwargs["name"])
        context["key"] = bleach.clean(self.kwargs["key"])
        return context


def contact(request):
    form = CaptchaForm(request.POST)
    if request.method == 'POST':
        if form.is_valid():
            name = bleach.clean(str(request.POST.get('name')))
            sender_email = bleach.clean(str(request.POST.get('sender_email')))
            subject = name + " from Inference said: " 
            message =  bleach.clean(str(request.POST.get('message'))) +" "+ sender_email
            email_from = settings.EMAIL_HOST_USER
            recipient_list = [settings.EMAIL_HOST_USER,]
            try:
                send_email_.delay( subject, message, email_from, recipient_list )
                messages.error(request,"Sent!",  extra_tags='email')
                return HttpResponseRedirect("/contact")
            except:
                messages.error(request,"Failed due to unknown reasons!",  extra_tags='email')
                return HttpResponseRedirect("/contact")
        else:
            messages.error(request,"Captcha Failed.",  extra_tags='email')
            return HttpResponseRedirect("/contact")
    elif request.method == 'GET':
        return render(request, "html/contact.html", {'form': form})
    
def prompt(request):
    llm = LLM.objects.all()
    if request.method == "POST" and bleach.clean(request.POST.get("form_type")) == 'prompt':  
        top_p= float(request.POST.get("top_p")) if "top_p" in request.POST else constant.DEFAULT_TOP_P
        best_of = float(request.POST.get("best_of")) if "best_of" in request.POST else constant.DEFAULT_BEST_OF
        top_k = float(request.POST.get("top_k")) if "top_k" in request.POST else constant.DEFAULT_TOP_K
        max_tokens = int(request.POST.get("max_tokens")) if "max_tokens" in request.POST else constant.DEFAULT_MAX_TOKENS
        frequency_penalty = float(request.POST.get("frequency_penalty")) if "frequency_penalty" in request.POST else constant.DEFAULT_FREQUENCY_PENALTY
        presense_penalty = float(request.POST.get("presense_penalty")) if "presense_penalty" in request.POST else constant.DEFAULT_PRESENCE_PENALTY
        temperature = float(request.POST.get("temperature")) if "temperature" in request.POST else constant.DEFAULT_TEMPERATURE
        beam = request.POST.get("beam") if "beam" in request.POST  else constant.DEFAULT_BEAM
        early_stopping = request.POST.get("early_stopping") if "early_stopping" in request.POST else constant.DEFAULT_EARLY_STOPPING
        length_penalty = float(request.POST.get("length_penalty")) if "length_penalty" in request.POST  else constant.DEFAULT_LENGTH_PENALTY
        beam = True if beam =="True" else False
        early_stopping = True if early_stopping == "True" else False 
        m = request.POST.get('model') if  "model" in request.POST else constant.DEFAULT_MODEL
        mode = request.POST.get('mode') if  "mode" in request.POST else constant.DEFAULT_MODE
        prompt = bleach.clean((request.POST.get('prompt'))) if len(request.POST.get('prompt')) > 1 else " "
        k = request.POST.get('key')
        n = request.POST.get('name')
        instance = cache.get(f"{k}:{n}")
        if instance == None:
            instance = get_key(n, k)
        
        if instance == False:
            response = "Error: key or key name is not correct"
        else:
            cache.set(f"{k}:{n}", instance, constant.CACHE_AUTHENTICATION)
            Inference.delay(unique=None, mode = mode, stream = False ,type_ = "prompt", key=str(request.POST.get('key')), key_name = str(request.POST.get('name')), credit = instance.credit, room_group_name = None, model = m, top_k=top_k, top_p =top_p, best_of =best_of, temperature =temperature, max_tokens = max_tokens, presense_penalty =presense_penalty, frequency_penalty = frequency_penalty, length_penalty = length_penalty, early_stopping = early_stopping,beam = beam, prompt=prompt)
            response = "Your prompt is queued, refer to Prompt-Response Log for detail"
        messages.info(request,f"{response} ({m} {datetime.today().strftime('%Y-%m-%d %H:%M:%S')})")
        return HttpResponseRedirect("/prompt") 
    elif  request.method == "POST" and bleach.clean(request.POST.get("form_type")) == 'checklog':  
        
        key =  str(request.POST.get('key'))
        name = str(request.POST.get('name'))
        check = get_key(key=key, name=name)
        if check:
            return HttpResponseRedirect(f"/prompt/{key}") 
        else:
            messages.error(request,"Error: Key or/and Key Name is/are incorrent.",  extra_tags='credit')
            return HttpResponseRedirect("/prompt-response") 
    else:
        response = f"Default to Mistral Chat 13B"
        messages.info(request,f"{response} (Server {datetime.today().strftime('%Y-%m-%d %H:%M:%S')})")
    return render(request, "html/prompt.html", context = {"llms":llm})

def room(request,  key):
    llm = LLM.objects.all()
    context = {'llms':llm,  "key": key}
    return render(request, "html/chatroom.html", context)

def agentroom(request,  key):
    llm = LLM.objects.all()
    context = {'llms':llm,  "key": key}
    return render(request, "html/lagent.html", context)

def room_prompt(request,  key):
    response_log = PromptResponse.objects.filter(key__key=key).order_by('-id')
    paginator = Paginator(response_log, 30)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    context = {'response_log':page_obj,  "key": key}
    return render(request, "html/prompt_log.html", context)

class SuccessView(TemplateView):
    template_name = "html/success.html"

class CancelView(TemplateView):
    template_name = "html/cancel.html"
    
class CreateStripeCheckoutSessionView(View):

    def post(self, request, *args, **kwargs):
        price = Price.objects.get(id=self.kwargs["pk"])
        k = Key.objects.get(owner= bleach.clean(self.kwargs["name"]), key= bleach.clean(self.kwargs["key"]))
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=[
                {
                    "price_data": {
                        "currency": "aud",
                        "unit_amount": int(price.price) * 100,
                        "product_data": {
                            "name": price.product.name,
                            "description": price.product.desc,
                        },
                    },
                    "quantity": price.product.quantity,
                }
            ],
            metadata={"product_id": price.product.id, "name": k.owner, "key":k.key, "price":price.price, "quantity":price.product.quantity},
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
    def post(self, request, format=None):
        payload = request.body
        endpoint_secret = settings.STRIPE_WEBHOOK_SECRET
        sig_header = request.META["HTTP_STRIPE_SIGNATURE"]
        event = None

        try:
            event = stripe.Webhook.construct_event(payload, sig_header, endpoint_secret)
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
            c = float(session["metadata"]["price"])*float(session["metadata"]["quantity"])
            k = Key.objects.get(owner=name, key=key)
            k.credit += c 
            k.save() 
        # Can handle other events here.
        return HttpResponse(status=200)
     
class ApiView(APIView):
    def get(self, request, *args, **kwargs):
        return Response({'Intro':"API"}, status=status.HTTP_200_OK)
    
    def post(self, request, *args, **kwargs):
        n = request.data['name']
        k = request.data['key']
        m = request.POST.get('model') if  "model" in request.data else constant.DEFAULT_MODEL
        model = get_model(m) 
        mode = request.data.get('mode') if  "mode" in request.data else constant.DEFAULT_MODE
        prompt = request.data['prompt'] if len(request.data['prompt']) > 1 else " "
        top_p= float(request.data["top_p"]) if "top_p" in request.POST else constant.DEFAULT_TOP_P
        best_of = float(request.data["best_of"]) if "best_of" in request.POST else constant.DEFAULT_BEST_OF
        top_k = float(request.data["top_k"]) if "top_k" in request.POST else constant.DEFAULT_TOP_K
        max_tokens = int(request.data["max_tokens"]) if "max_tokens" in request.POST else constant.DEFAULT_MAX_TOKENS
        frequency_penalty = float(request.data["frequency_penalty"]) if "frequency_penalty" in request.POST else constant.DEFAULT_FREQUENCY_PENALTY
        presense_penalty = float(request.data["presense_penalty"]) if "presense_penalty" in request.POST else constant.DEFAULT_PRESENCE_PENALTY
        temperature = float(request.data["temperature"]) if "temperature" in request.POST else constant.DEFAULT_TEMPERATURE
        beam = request.data["beam"] if "beam" in request.POST  else constant.DEFAULT_BEAM
        early_stopping = True if "early_stopping" in request.POST else constant.DEFAULT_EARLY_STOPPING
        length_penalty = float(request.data["length_penalty"]) if "length_penalty" in request.POST  else constant.DEFAULT_LENGTH_PENALTY
        beam = True if beam =="True" else False
        early_stopping = True if early_stopping == "True" else False  

        instance = cache.get(f"{k}:{n}")
        if instance == None:
            instance = get_key(n, k)
 
            
        if instance == False:
            return Response(
                {"Error": "Key does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )
        elif not model:
            return Response(
                {"Error": "Model does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )
        elif model:
            cache.set(f"{k}:{n}", instance, constant.CACHE_AUTHENTICATION)
            available_server_list = get_model_url(model.name)
            if not available_server_list:
                return Response(
                    {"Error": "Server is currently offline"},
                    status=status.HTTP_400_BAD_REQUEST
                )
            else:
                inference = random.choice(available_server_list)
                try:
                    response = static_view_inference(model=model.name, key= instance.key, mode= mode, server_status= inference.status, instance_id= inference.name, inference_url=inference.url, top_k=top_k, top_p = top_p,best_of = best_of, temperature=temperature, max_tokens=max_tokens, frequency_penalty=frequency_penalty, presense_penalty=presense_penalty, beam=beam, length_penalty=length_penalty, early_stopping=early_stopping,prompt=prompt)
                    log_prompt_response(key = instance.key, key_name = instance.owner, model = m, prompt = prompt, response = response, type_="prompt")
                    return Response({"key": instance.key, "credit": instance.credit, "model": m, "prompt": prompt, "model_response": response}, status=status.HTTP_200_OK)
                except Exception as e:
                    print(e)
                    return Response(
                    {"Error": "You messed up parameters"},
                    status=status.HTTP_400_BAD_REQUEST
                    )
                    
def handler_403(request, exception=None):
    return render(request, 'error_html/403.html', status=403)

def handler_404(request, exception):
    return render(request, 'error_html/404.html', status=404)

def handler_500(request,  *args, **argv):
    return render(request, 'error_html/500.html', status=500)

def handler_429(request, exception):
    return render(request, 'error_html/429.html', status=429)

