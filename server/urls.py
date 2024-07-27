from django.urls import path, re_path
from django.views.generic import TemplateView

from server.views.chatroom_view import (
    hub_redirect_api,
    instruction_tree_api,
    memory_tree_api,
)
from server.views.contact import contact_api
from server.views.information import check_login, log_in, log_out, model_api
from server.views.key_management import (
    CancelView,
    CreateStripeCheckoutSessionView,
    StripeWebhookView,
    SuccessView,
    check_credit_api,
    confirm_xmr_payment_api,
    generate_key_api,
    product_list_api,
    retrive_xmr_wallet_api,
    stripe_redirect,
)
from server.views.prompt_writing import (
    create_user_dataset_api,
    create_user_record_api,
    delete_user_dataset_api,
    delete_user_record_api,
    get_default_user_dataset_api,
    get_user_records_api,
    update_user_dataset_api,
    update_user_record_api,
)
from server.views.response_log import LogListJson, cost_api
from server.views.template_writing import (
    create_user_instruction_tree_api,
    delete_user_instruction_tree_api,
    update_user_instruction_tree_api,
    user_instruction_tree_api,
)
from server.views.token_management import (
    add_permission,
    generate_token_api,
    get_token_api,
    invalidate_token,
    remove_permission,
)

app_name = "server"

urlpatterns = [
    path("", TemplateView.as_view(template_name="frontend_index.html")),
    re_path(r"frontend/.*$", TemplateView.as_view(template_name="frontend_index.html")),
    path("frontend-api/model/", model_api, name="model"),
    path("frontend-api/hub-redirect", hub_redirect_api, name="hub-redirect"),
    # ENDPOINTS FOR PROMPT WRITING
    path("frontend-api/get-dataset", get_default_user_dataset_api, name="get-dataset"),
    path(
        "frontend-api/get-dataset-record/<int:id>",
        get_user_records_api,
        name="get-record",
    ),
    path("frontend-api/create-dataset", create_user_dataset_api, name="create-dataset"),
    path("frontend-api/delete-dataset", delete_user_dataset_api, name="delete-dataset"),
    path("frontend-api/update-dataset", update_user_dataset_api, name="update-dataset"),
    path("frontend-api/create-record", create_user_record_api, name="create-record"),
    path("frontend-api/delete-record", delete_user_record_api, name="delete-record"),
    path("frontend-api/update-record", update_user_record_api, name="update-record"),
    # ENDPOINTS FOR KEYS AND TOKENS MANAGEMENT
    path("frontend-api/generate-key", generate_key_api, name="generate-key"),
    path("frontend-api/generate-token", generate_token_api, name="generate-token"),
    path("frontend-api/get-token", get_token_api, name="generate-get"),
    path("frontend-api/remove-permission", remove_permission, name="remove_permission"),
    path("frontend-api/add-permission", add_permission, name="add_permission"),
    path("frontend-api/invalidate-token", invalidate_token, name="invalidate-token"),
    # ENDPOINTS FOR PAYMENTS AND WALLETS
    path("frontend-api/check-credit", check_credit_api, name="check-key"),
    path("frontend-api/get-xmr-wallet", retrive_xmr_wallet_api, name="get-xmr-wallet"),
    path(
        "frontend-api/confirm-xmr-payment",
        confirm_xmr_payment_api,
        name="confirm-xmr-payment",
    ),
    path("frontend-api/stripe-redirect", stripe_redirect, name="stripe-payment"),
    path("webhooks/stripe/", StripeWebhookView.as_view(), name="stripe-webhook"),
    path(
        "create-checkout-session/<int:pk>/<str:name>/<str:key>",
        CreateStripeCheckoutSessionView.as_view(),
        name="create-checkout-session",
    ),
    path("success/", SuccessView.as_view(), name="success"),
    path("cancel/", CancelView.as_view(), name="cancel"),
    path("frontend-api/products", product_list_api, name="product-list"),
    # ENDPOINT FOR SENDING MAIL
    path("frontend-api/send-mail", contact_api, name="contact"),
    #  ENDPOINTS FOR USER AUTHENTICATION
    path("frontend-api/check-login", check_login, name="check-login"),
    path("frontend-api/logout", log_out, name="logout"),
    path("frontend-api/login", log_in, name="login"),
    # ENDPOINTS FOR USER INSTRUCTION MANGEMENT
    path(
        "frontend-api/get-user-instruction",
        user_instruction_tree_api,
        name="user-instruction",
    ),
    path(
        "frontend-api/post-user-instruction",
        create_user_instruction_tree_api,
        name="post-user-instruction",
    ),
    path(
        "frontend-api/update-user-instruction",
        update_user_instruction_tree_api,
        name="update-user-instruction",
    ),
    path(
        "frontend-api/delete-user-instruction",
        delete_user_instruction_tree_api,
        name="delete-user-instruction",
    ),
    path(
        "frontend-api/instruction-tree", instruction_tree_api, name="instruction-tree"
    ),
    path("frontend-api/memory-tree", memory_tree_api, name="memory-tree"),
    # ENDPOINT FOR LOG AND TOKEN USAGE
    path("log/", LogListJson.as_view()),
    path("frontend-api/cost/<str:startdate>/<str:enddate>/", cost_api, name="cost"),
]
