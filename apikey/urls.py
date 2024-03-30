from django.urls import path

from . import views
from .views import CreateStripeCheckoutSessionView, SuccessView, CancelView, ProductDetailView, ProductListView, StripeWebhookView
app_name = "apikey"

urlpatterns = [
    path("", views.index, name="index"),
    path("model_infor", views.model_infor, name="model_infor"),    
    path("manual", views.manual, name="manual"),
    path("webhooks/stripe/", StripeWebhookView.as_view(), name="stripe-webhook"),
    path("contact", views.contact, name="contact"), 
    path("chat", views.chat, name="chat"),
    path("prompt", views.prompt, name="prompt"), 
    path(
        "create-checkout-session/<int:pk>/<str:name>/<str:key>",
        CreateStripeCheckoutSessionView.as_view(),
        name="create-checkout-session",
    ),
    path("success/", SuccessView.as_view(), name="success"),
    path("cancel/", CancelView.as_view(), name="cancel"),
    path("buy/", ProductListView.as_view(), name="product-list"),
    path("buy/<str:key>/", views.generate_key_success, name="key_success"),
    path("<int:pk>/<str:key>/<str:name>/", ProductDetailView.as_view(), name="product-detail"),
    path("prompt/<str:key>/", views.room_prompt, name="room_prompt"),
    path("chat/<str:key>/", views.room, name="room"),
    path("engineer/<str:key>/", views.agentroom, name="room"),
    path('promptresponse', views.response_prompt_redirect, name='promptresponse'),
    path('generatekey', views.generate_key, name='generatekey'),
    path('getxmraddress', views.get_xmr_address, name='getxmraddress'),
    path('checkxmrpayment', views.check_xmr_payment, name='checkxmrpayment'),
    path('checkcredit', views.check_credit, name='checkcredit'),
    path('topup', views.topup, name='topup'),
]