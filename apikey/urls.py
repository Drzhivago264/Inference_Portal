from django.urls import path

from apikey.views.response_log import LogListJson, response_log, log_redirect
from apikey.views.contact import contact
from apikey.views.information import (index, 
                                      model_infor,
                                      manual,
                                      frankenstein
                                      )
from apikey.views.key_purchase import (StripeWebhookView,
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
                                       CreateStripeCheckoutSessionView
                                       ) 
from apikey.views.room_view import (Room, agent_select, prompt)

app_name = "apikey"

urlpatterns = [
    path("", index, name="index"),
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