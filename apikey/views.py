from django.shortcuts import render
from django.core.mail import send_mail
import stripe
import secrets
from .models import Price, Product, Key, LLM
from .forms import CaptchaForm
from django.views.generic import DetailView, ListView
from django.http import HttpResponse
from django.shortcuts import redirect
from django.conf import settings
import bleach
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views import View
from django.template import loader
from django.urls import reverse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.views.generic import TemplateView
stripe.api_key = settings.STRIPE_SECRET_KEY

def index(request):
    return render(request, "html/index.html")

def chat(request):
    return render(request, "html/chat.html")

def model_infor(request):
    llm = LLM.objects.all()
    context = {'llms':llm}
    return render(request, "html/model_infor.html", context)

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
                c_error = "Stop right there Mr. Robot!!!"
                return render(request, 'html/buy.html', {'products': products, 'form': form, 'c_error':c_error})
            
        ###Deal with check credit requests###    
        elif bleach.clean(request.POST.get("form_type")) == 'checkform':
            form = CaptchaForm(request.POST)
            k = bleach.clean(request.POST.get('key'))
            if form.is_valid():
                try:
                    key = Key.objects.get(owner=name, key = str(k))
                    credit = str(key.credit)
                except Key.DoesNotExist:
                    credit = "not found"
                context = {'products': products, 'credit': credit, 'form': form}    
                return render(request, "html/buy.html", context)
            else:
                form = CaptchaForm()
                c_error = "Stop right there Mr. Robot!!!"
                return render(request, 'html/buy.html', {'products': products, 'form': form, 'c_error_2':c_error})
        
        ###Deal with check topup requests###   
        elif bleach.clean(request.POST.get("form_type")) == 'topupform':
            
            k = bleach.clean(request.POST.get('key'))
            product_id = bleach.clean(request.POST.get('product_id'))
            try:
                key = Key.objects.get(owner=name, key = k)
                return redirect(reverse('apikey:product-detail', kwargs={'pk':product_id, 'key':key.key, 'name':key.owner}))
            except:
                context = {"key_error": "error",'products': products,'form': form}
                return render(request, "html/buy.html", context)
        
    

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
    if form.is_valid():
        name = bleach.clean(str(request.POST.get('name')))
        sender_email = bleach.clean(str(request.POST.get('sender_email')))
        subject = name + " from Inference said: " 
        message =  bleach.clean(str(request.POST.get('message'))) +" "+ sender_email
        email_from = settings.EMAIL_HOST_USER
        recipient_list = [settings.EMAIL_HOST_USER,]
        send_mail( subject, message, email_from, recipient_list )
        
    return render(request, "html/contact.html", {'form': form})

def prompt(request):
    llm = LLM.objects.all()
    context = {'llms':llm,}
    return render(request, "html/prompt.html", context)

def room(request, name, key):
    llm = LLM.objects.all()
    context = {'llms':llm, "name": name, "key": key}
    return render(request, "html/chatroom.html", context)

class SuccessView(TemplateView):
    template_name = "html/success.html"

class CancelView(TemplateView):
    template_name = "html/cancel.html"
    
class CreateStripeCheckoutSessionView(View):
    """
    Create a checkout session and redirect the user to Stripe's checkout page
    """

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
    # add permission to check if user is authenticated

    def get_object(self, name, key):
        '''
        Helper method to get the object with given todo_id, and user_id
        '''
        try:
            return Key.objects.get(owner=name, key = key)
        except Key.DoesNotExist:
            return None
    def get_object_model(self, model):
        '''
        Helper method to get the object with given todo_id, and user_id
        '''
        try:
            return LLM.objects.get(name=model)
        except LLM.DoesNotExist:
            return None

    def get(self, request, *args, **kwargs):
        return Response({'Intro':"API"}, status=status.HTTP_200_OK)
    
    def post(self, request, *args, **kwargs):
        '''
        Retrieves the Todo with given todo_id
        '''
        instance = self.get_object(request.data['name'], request.data['key'])
        model_instance = self.get_object_model(request.data['model'])
        prompt = request.data['prompt']
        if not instance:
            return Response(
                {"Error": "Key does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )
        if not model_instance:
            return Response(
                {"Error": "Model does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )
        return Response({"key": instance.key, "key_name":instance.owner, "credit": instance.credit, "model": request.data['model'], "prompt": prompt, "model_response": "test"}, status=status.HTTP_200_OK)


  
{
 "prompt": "hola",
  "name": "11111",
  "key": "tQ6MXKAFj3bw7OoJ20Gh92ldaNmA3aYAma6cAWohe2sYpbBnTyAc3R_kP2DRcUUsZjzB1MjB8FSZLH8L9pYZkw",
  "model" :  "Mixtral 7B"

}
