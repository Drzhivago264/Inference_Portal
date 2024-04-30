from django.urls import path
from django.views.generic import TemplateView
from server.views.response_log import LogListJson, response_log, log_redirect
from server.views.contact import contact, contact_api
from server.views.information import (index, 
                                      model_infor,
                                      manual,
                                      frankenstein,
                                      article_api,
                                      model_api
                                      )
from server.views.key_purchase import (StripeWebhookView,
                                       generate_key,
                                       generate_key_success,
                                       get_xmr_address,
                                       topup,
                                       check_credit,
                                       check_xmr_payment,
                                       SuccessView,
                                       CancelView,
                                       ProductListView,
                                       ProductDetailView,
                                       CreateStripeCheckoutSessionView,

                                       generate_key_api,
                                       confirm_xmr_payment_api,
                                       retrive_xmr_wallet_api,
                                       check_credit_api ,
                                       stripe_redirect,
                                       product_list_api,

                                       ) 
from server.views.room_view import (Room, agent_select, prompt, hub_redirect_api, instruction_tree_api)

app_name = "server"

urlpatterns = [
    path('', TemplateView.as_view(template_name='frontend_index.html')),
    path('frontend/manual', TemplateView.as_view(template_name='frontend_index.html')),
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

    #path("", index, name="index"),
    path("model_infor/", model_infor, name="model_infor"),    
    path("manual/", manual, name="manual"),
    path("webhooks/stripe/", StripeWebhookView.as_view(), name="stripe-webhook"),
    path("contact/", contact, name="contact"), 
    path("chat/", agent_select, name="chat"),
    path("prompt/", prompt, name="prompt"), 
    path(
        "create-checkout-session/<int:pk>/<str:name>/<str:key>",
        CreateStripeCheckoutSessionView.as_view(),
        name="create-checkout-session",
    ),
    path("success/", SuccessView.as_view(), name="success"),
    path("cancel/", CancelView.as_view(), name="cancel"),
    path("buy/", ProductListView.as_view(), name="product-list"),
    path("buy/<str:key>/", generate_key_success, name="key_success"),
    path("<int:pk>/<str:key>/<str:name>/", ProductDetailView.as_view(), name="product-detail"),
    path("prompt/<str:key>/", response_log, name="response_log"),
    path("log/<str:key>/", LogListJson.as_view()),

    path("chat/<str:key>/", Room.as_view(template_name='html/chatroom.html'), name="chatroom"),
    path("engineer/<str:key>/", Room.as_view(template_name='html/lagent.html'), name="agent_room"),
    path('promptresponse/', log_redirect, name='log_redirect'),
    path('generatekey', generate_key, name='generatekey'),
    path('getxmraddress', get_xmr_address, name='getxmraddress'),
    path('checkxmrpayment', check_xmr_payment, name='checkxmrpayment'),
    path('checkcredit', check_credit, name='checkcredit'),
    path('topup', topup, name='topup'),
    path('frankenstein/', frankenstein, name='frankenstein'),
    path("hotpot/<str:key>/", Room.as_view(template_name='html/hotpot.html'), name="hotpot_room"),
    path("toolbox/<str:key>/", Room.as_view(template_name='html/functional_agent.html'), name="toolbox"),
    path("dataanalysis/<str:key>/", Room.as_view(template_name='html/csv_wizard.html'), name="dataanalysis"),
]