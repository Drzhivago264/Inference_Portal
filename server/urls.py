from django.urls import path
from django.views.generic import TemplateView
from server.views.response_log import LogListJson
from server.views.contact import  contact_api
from server.views.information import (
                                      article_api,
                                      model_api
                                      )
from server.views.key_purchase import (StripeWebhookView,
                                       SuccessView,
                                       CancelView,
                                       CreateStripeCheckoutSessionView,
                                       generate_key_api,
                                       confirm_xmr_payment_api,
                                       retrive_xmr_wallet_api,
                                       check_credit_api ,
                                       stripe_redirect,
                                       product_list_api,
                                       ) 

from server.views.room_view import ( hub_redirect_api, instruction_tree_api)

app_name = "server"

urlpatterns = [
    path('', TemplateView.as_view(template_name='frontend_index.html')),
    path('frontend/manual', TemplateView.as_view(template_name='frontend_index.html')),
    path('frontend/manual/key', TemplateView.as_view(template_name='frontend_index.html')),
    path('frontend/manual/inference', TemplateView.as_view(template_name='frontend_index.html')),
    path('frontend/manual/authentication', TemplateView.as_view(template_name='frontend_index.html')), 
    path('frontend/manual/behavior', TemplateView.as_view(template_name='frontend_index.html')),
    path('frontend/manual/errorlimit', TemplateView.as_view(template_name='frontend_index.html')),
    path('frontend/model', TemplateView.as_view(template_name='frontend_index.html')),
    path('frontend/hub', TemplateView.as_view(template_name='frontend_index.html')),
    path('frontend/key-management', TemplateView.as_view(template_name='frontend_index.html')),
    path('frontend/contact', TemplateView.as_view(template_name='frontend_index.html')),
    path('frontend/chat/<str:key>/', TemplateView.as_view(template_name='frontend_index.html')),
    path('frontend/engineer/<str:key>/', TemplateView.as_view(template_name='frontend_index.html')),
    path('frontend/toolbox/<str:key>/', TemplateView.as_view(template_name='frontend_index.html')),
    path('frontend/hotpot/<str:key>/', TemplateView.as_view(template_name='frontend_index.html')),
    path('frontend/log/<str:key>/', TemplateView.as_view(template_name='frontend_index.html')),
    path('frontend/dataanalysis/<str:key>/', TemplateView.as_view(template_name='frontend_index.html')),
    path('frontend/api/docs/', TemplateView.as_view(template_name='frontend_index.html')),
    
    path('frontend-api/article/<str:name>/<str:a_type>',  article_api , name='information'),
    path('frontend-api/model/',  model_api , name='model'),
    path('frontend-api/hub-redirect',  hub_redirect_api , name='hub-redirect'),
    path('frontend-api/instruction-tree',  instruction_tree_api , name='instruction-tree'),
    path('frontend-api/generate-key',  generate_key_api , name='generate-key'),
    path('frontend-api/check-credit',  check_credit_api , name='check-key'),
    path('frontend-api/get-xmr-wallet', retrive_xmr_wallet_api, name='get-xmr-wallet'),
    path('frontend-api/confirm-xmr-payment', confirm_xmr_payment_api, name='confirm-xmr-payment'),
    path('frontend-api/stripe-redirect', stripe_redirect, name='stripe-payment'),
    path('frontend-api/products', product_list_api, name='product-list'),
    path('frontend-api/send-mail', contact_api, name='product-list'),


    path("webhooks/stripe/", StripeWebhookView.as_view(), name="stripe-webhook"),
 
    path(
        "create-checkout-session/<int:pk>/<str:name>/<str:key>",
        CreateStripeCheckoutSessionView.as_view(),
        name="create-checkout-session",
    ),
    path("success/", SuccessView.as_view(), name="success"),
    path("cancel/", CancelView.as_view(), name="cancel"),


    path("log/<str:key>/", LogListJson.as_view()),

]