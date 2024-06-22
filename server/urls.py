from django.urls import path
from django.views.generic import TemplateView
from server.views.response_log import LogListJson, cost_api
from server.views.contact import contact_api
from server.views.information import (
    model_api,
    check_login,
    log_out,
    log_in
)
from server.views.key_management import (StripeWebhookView,
                                       SuccessView,
                                       CancelView,
                                       CreateStripeCheckoutSessionView,
                                       generate_key_api,
                                       confirm_xmr_payment_api,
                                       retrive_xmr_wallet_api,
                                       check_credit_api,
                                       stripe_redirect,
                                       product_list_api,
                                       )

from server.views.room_view import (hub_redirect_api,
                                    instruction_tree_api,
                                    memory_tree_api,
                                    user_instruction_tree_api,
                                    post_user_instruction_tree_api,
                                    delete_user_instruction_tree_api
                                    )

app_name = "server"

urlpatterns = [
    path('', TemplateView.as_view(template_name='frontend_index.html')),
    path('frontend/manual', TemplateView.as_view(template_name='frontend_index.html')),
    path('frontend/user-instruction/<str:key>/', TemplateView.as_view(template_name='frontend_index.html')),
    path('frontend/data-synthesis/<str:key>/', TemplateView.as_view(template_name='frontend_index.html')),
    path('frontend/manual/key',
         TemplateView.as_view(template_name='frontend_index.html')),
    path('frontend/manual/inference',
         TemplateView.as_view(template_name='frontend_index.html')),
    path('frontend/manual/authentication',
         TemplateView.as_view(template_name='frontend_index.html')),
    path('frontend/manual/behavior',
         TemplateView.as_view(template_name='frontend_index.html')),
    path('frontend/manual/errorlimit',
         TemplateView.as_view(template_name='frontend_index.html')),
    path('frontend/model', TemplateView.as_view(template_name='frontend_index.html')),
    path('frontend/hub', TemplateView.as_view(template_name='frontend_index.html')),
    path('frontend/key-management',
         TemplateView.as_view(template_name='frontend_index.html')),
    path('frontend/contact', TemplateView.as_view(template_name='frontend_index.html')),
    path('frontend/chat/<str:key>/',
         TemplateView.as_view(template_name='frontend_index.html')),
    path('frontend/engineer/<str:key>/',
         TemplateView.as_view(template_name='frontend_index.html')),
    path('frontend/toolbox/<str:key>/',
         TemplateView.as_view(template_name='frontend_index.html')),
    path('frontend/hotpot/<str:key>/',
         TemplateView.as_view(template_name='frontend_index.html')),
    path('frontend/log/<str:key>/',
         TemplateView.as_view(template_name='frontend_index.html')),
    path('frontend/dataanalysis/<str:key>/',
         TemplateView.as_view(template_name='frontend_index.html')),
    path('frontend/api/docs/',
         TemplateView.as_view(template_name='frontend_index.html')),
    path('frontend/payment-success/',
         TemplateView.as_view(template_name='frontend_index.html')),
    path('frontend/login/',
         TemplateView.as_view(template_name='frontend_index.html')),
    path('frontend/cost-monitoring/',
         TemplateView.as_view(template_name='frontend_index.html')),

    path('frontend-api/cost/<str:startdate>/<str:enddate>/', cost_api, name='cost'),
    path('frontend-api/model/',  model_api, name='model'),
    path('frontend-api/hub-redirect',  hub_redirect_api, name='hub-redirect'),
    path('frontend-api/instruction-tree',
         instruction_tree_api, name='instruction-tree'),
    path('frontend-api/generate-key',  generate_key_api, name='generate-key'),
    path('frontend-api/check-credit',  check_credit_api, name='check-key'),
    path('frontend-api/get-xmr-wallet',
         retrive_xmr_wallet_api, name='get-xmr-wallet'),
    path('frontend-api/confirm-xmr-payment',
         confirm_xmr_payment_api, name='confirm-xmr-payment'),
    path('frontend-api/stripe-redirect', stripe_redirect, name='stripe-payment'),
    path('frontend-api/products', product_list_api, name='product-list'),
    path('frontend-api/send-mail', contact_api, name='contact'),
    path('frontend-api/check-login', check_login, name='check-login'),
    path('frontend-api/logout', log_out, name='logout'),
    path('frontend-api/login', log_in, name='login'),
    path('frontend-api/memory-tree', memory_tree_api, name='memory-tree'),


    path('frontend-api/get-user-instruction',
         user_instruction_tree_api, name='user-instruction'),
    path('frontend-api/post-user-instruction',
         post_user_instruction_tree_api, name='post-user-instruction'),
    path('frontend-api/delete-user-instruction',
         delete_user_instruction_tree_api, name='delete-user-instruction'),
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
