from django.urls import path

from . import views
from .views import CreateStripeCheckoutSessionView, SuccessView, CancelView, ProductDetailView, ProductListView, StripeWebhookView
app_name = "apikey"

urlpatterns = [
    path("", views.index, name="index"),
    path("model_infor.html", views.model_infor, name="model_infor"),    
     path("webhooks/stripe/", StripeWebhookView.as_view(), name="stripe-webhook"),
    path("contact.html", views.contact, name="contact"), 
    path("prompt.html", views.prompt, name="prompt"), 
    path(
        "create-checkout-session/<int:pk>/<str:name>/<str:key>",
        CreateStripeCheckoutSessionView.as_view(),
        name="create-checkout-session",
    ),
    path("success/", SuccessView.as_view(), name="success"),
    path("cancel/", CancelView.as_view(), name="cancel"),
    path("buy.html", ProductListView.as_view(), name="product-list"),
    path("<int:pk>/<str:key>/<str:name>/", ProductDetailView.as_view(), name="product-detail"),

]