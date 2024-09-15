import json

from django.http import HttpRequest
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.decorators import api_view, throttle_classes
from rest_framework.response import Response
from django.core.cache import cache
from rest_framework.throttling import AnonRateThrottle

@api_view(["POST", "GET"])
@csrf_exempt
@throttle_classes([AnonRateThrottle])
def lark_base_button_webhook(request: HttpRequest) -> Response:
    post_data = json.loads(request.body.decode())
    print(post_data)
    ### Implement Agent Here
    seo_desc = "Something agent say"
    seo_title = "Agent title output"
    return Response({"seo_description_response": seo_desc, "seo_title":seo_title}, status=status.HTTP_200_OK)
