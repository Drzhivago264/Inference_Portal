import stripe
from django.conf import settings
from django.db import transaction
from django.db.models import F
from django.http import HttpRequest, HttpResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt

from server.models.api_key import APIKEY
from server.models.product import PaymentHistory

stripe.api_key = settings.STRIPE_SECRET_KEY


@method_decorator(csrf_exempt, name="dispatch")
class StripeWebhookView(View):
    """
    Stripe webhook view to handle checkout session completed event.
    """

    def post(self, request: HttpRequest, format: None = None) -> HttpResponse:
        payload = request.body
        endpoint_secret = settings.STRIPE_WEBHOOK_SECRET
        sig_header = request.META["HTTP_STRIPE_SIGNATURE"]
        event = None
        try:
            event = stripe.Webhook.construct_event(payload, sig_header, endpoint_secret)
        except ValueError:
            # Invalid payload
            return HttpResponse(status=400)
        except stripe.error.SignatureVerificationError as e:
            # Invalid signature
            return HttpResponse(status=400)

        if event["type"] == "checkout.session.completed":
            session = event["data"]["object"]
            key_id = session["metadata"]["key_id"]
            c = float(session["metadata"]["price"]) * float(
                session["metadata"]["quantity"]
            )
            with transaction.atomic():
                locked_key = APIKEY.objects.select_for_update().get(id=key_id)
                locked_key.credit = F("credit") + c
                locked_key.save()
                PaymentHistory.objects.create(
                    key=locked_key,
                    type=PaymentHistory.PaymentType.STRIPE,
                    stripe_payment_id=session["id"],
                    currency=session["currency"],
                    payment_intent=session["payment_intent"],
                    payment_method_type=session["payment_method_types"][0],
                    payment_status=session["payment_status"],
                    billing_city=session["customer_details"]["address"]["city"],
                    billing_postcode=session["customer_details"]["address"][
                        "postal_code"
                    ],
                    billing_address_1=session["customer_details"]["address"]["line1"],
                    billing_address_2=session["customer_details"]["address"]["line2"],
                    billing_state=session["customer_details"]["address"]["state"],
                    billing_country_code=session["customer_details"]["address"][
                        "country"
                    ],
                    email=session["customer_details"]["email"],
                    user_name=session["customer_details"]["name"],
                    amount=session["amount_total"] / 100,
                    amount_subtotal=session["amount_subtotal"] / 100,
                    extra_data=session,
                    status=PaymentHistory.PaymentStatus.PROCESSED,
                )
        # Can handle other events here.
        return HttpResponse(status=200)
