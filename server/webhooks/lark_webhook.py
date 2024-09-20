import json

import openai
import requests
from celery import shared_task
from constance import config as constant
from decouple import config
from django.core.cache import cache
from django.http import HttpRequest
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.decorators import api_view, throttle_classes
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle

@shared_task
def reply(message_id, access_token, content):
    client = openai.OpenAI(
        api_key=config("GPT_KEY"),
        timeout=constant.TIMEOUT,
        max_retries=constant.RETRY,
    )
    try:
        raw_response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": content},
            ],
            stream=False,
        )
        response = raw_response.choices[0].message.content
    except openai.APIConnectionError as e:
        response = f"Failed to connect to inference server: {e}"
    except openai.RateLimitError as e:
        response = f"Exceededing rate limit: {e}"
    except openai.APIError as e:
        response = f"Inference server returned an API Error: {e}"

    url = f"https://open.larksuite.com/open-apis/im/v1/messages/{message_id}/reply"

    msgContent = {
        "text": response,
    }
    req = {"msg_type": "text", "content": json.dumps(msgContent)}
    payload = json.dumps(req)
    headers = {
        "Authorization": f"Bearer {access_token}",  # your access token
        "Content-Type": "application/json",
    }
    response = requests.request("POST", url, headers=headers, data=payload)
    print(response.headers['X-Tt-Logid'])  # for debug or oncall
    print(response.content)  # Print Response


def get_tenant_access_token():
    url = "https://open.larksuite.com/open-apis/auth/v3/tenant_access_token/internal"
    headers = {"Content-Type": "application/json; charset=utf-8"}
    req = {"app_id": config("LARK_APP_ID"), "app_secret": config("LARK_APP_SECRET")}
    payload = json.dumps(req)
    response = requests.request("POST", url, headers=headers, data=payload)
    access_token = response.json()["tenant_access_token"]
    cache.set(key="larksuite_tenant_access_token", value=access_token, timeout=120)
    return access_token


@api_view(["POST"])
@csrf_exempt
@throttle_classes([AnonRateThrottle])
def lark_webhook(request: HttpRequest) -> Response:
    post_data = json.loads(request.body.decode())
    bot_is_mention = False
    access_token = cache.get(key="larksuite_tenant_access_token")
    if access_token is None:
        access_token = get_tenant_access_token()
    if "type" in post_data and post_data["type"] == "url_verification":
        return Response(
            {"challenge": post_data["challenge"]}, status=status.HTTP_200_OK
        )
    elif (
        "header" in post_data
        and post_data["header"]["event_type"] == "im.message.receive_v1"
    ):
        content = json.loads(post_data["event"]["message"]["content"])["text"]
        chat_type = post_data["event"]["message"]["chat_type"]
        if chat_type == "p2p" or chat_type == "group":
            if "mentions" in post_data["event"]["message"]:
                mentions = post_data["event"]["message"]["mentions"]
                for mention in mentions:
                    content = content.replace(mention["key"], "")
                    if mention["name"] == "Doc Bot":
                        bot_is_mention = True
            message_id = post_data["event"]["message"]["message_id"]
            if chat_type == "group" and bot_is_mention:
                reply.delay(
                    message_id=message_id, access_token=access_token, content=content
                )
            elif chat_type == "p2p":
                reply.delay(
                    message_id=message_id, access_token=access_token, content=content
                )
        return Response(status=status.HTTP_200_OK)
