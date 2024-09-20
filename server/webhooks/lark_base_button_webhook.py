import json

from django.http import HttpRequest
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.decorators import api_view, throttle_classes
from rest_framework.response import Response
from django.core.cache import cache
from rest_framework.throttling import AnonRateThrottle
from server.webhooks.lark_webhook import get_tenant_access_token
import requests
import openai
from decouple import config
from constance import config as constant


def get_root_folder(access_token):
    root_folder = "https://open.larksuite.com/open-apis/drive/explorer/v2/root_folder/meta"
    headers = {
        'Authorization': f'Bearer {access_token}'
    }
    root_folder_response = requests.request(
        "GET", root_folder, headers=headers)
    return root_folder_response


def create_folder(access_token, root_folder_token):
    url = "https://open.larksuite.com/open-apis/drive/v1/files/create_folder"
    data = {
        "name": "SEO Output",
        "folder_token": root_folder_token
    }
    headers = {
        'Authorization': f'Bearer {access_token}'
    }
    create_folder_response = requests.request(
        "POST", url, headers=headers, data=json.dumps(data))
    print(create_folder_response.json())


def get_doc_sharing_setting(access_token, doc_token):
    url = "https://open.larksuite.com/open-apis/drive/permission/v2/public/"
    data = {
        "token": doc_token,
        "type": "doc"
    }
    headers = {
        'Authorization': f'Bearer {access_token}'
    }
    settings = requests.request(
        "POST", url, headers=headers, data=json.dumps(data))
    print(settings.json())


def get_app_access_token():
    url = "https://open.larksuite.com/open-apis/auth/v3/app_access_token/internal"
    data = {"app_id": config("LARK_APP_ID"),
            "app_secret": config("LARK_APP_SECRET")}
    headers = {"Content-Type": "application/json; charset=utf-8"}
    response = requests.request(
        "POST", url, headers=headers, data=json.dumps(data))
    access_token = response.json()["app_access_token"]
    cache.set(key="larksuite_app_access_token",
              value=access_token, timeout=7000)


def get_user_access_token(app_access_token):
    url = "https://open.larksuite.com/open-apis/authen/v1/oidc/access_token"
    headers = {
        'Authorization': f'Bearer {app_access_token}',
        'Content-Type':  'application/json; charset=utf-8'
    }
    code = get_oauth_code()
    data = {
        "grant_type": "authorization_code",
        "code": code
    }
    response = requests.request(
        "POST", url, headers=headers, data=json.dumps(data))
    print(response.json())
    return response.json()["code"]


def get_oauth_code():
    url = f'https://open.larksuite.com/open-apis/authen/v1/authorize?app_id={config("LARK_APP_ID")}&redirect_uri=https://lamb-diverse-ram.ngrok-free.app/webhooks/lark-base-button/'
    response = requests.request("GET", url)
    print(response.content)
    return


def update_doc_sharing_setting(access_token, doc_token):
    url = f"https://open.larksuite.com/open-apis/drive/v1/permissions/{doc_token}/public"
    data = {
        "external_access": True,
        "security_entity": "anyone_can_edit",
        "comment_entity": "anyone_can_edit",
        "share_entity": "anyone",
        "link_share_entity": "anyone_editable",
        "invite_external": True
    }
    params = {'type': 'doc'}
    headers = {
        'Authorization': f'Bearer {access_token}'
    }
    response = requests.request(
        "PATCH", url, headers=headers, params=params, data=json.dumps(data))
    print(response.json())


def move_doc_to_shared_folder(folder_token, file_token, tenant_access_token):
    url = f"https://open.larksuite.com/open-apis/drive/v1/files/{file_token}/move"
    headers = {
        'Authorization': f'Bearer {tenant_access_token}'
    }
    data = {
        "type": "doc",
        "folder_token": folder_token
    }
    response = requests.request(
        "POST", url, headers=headers, data=json.dumps(data))
    print(response.json())


def create_doc(key_word: str, product_name: str):
    # 
    tenant_access_token = cache.get(key="larksuite_tenant_access_token")
    #app_access_token = cache.get(key="larksuite_app_access_token")
    #user_access_token = cache.get(key="lark_suite_user_access_token")
    #if app_access_token is None:
    #    app_access_token = get_app_access_token()
    #if user_access_token is None:
    #    user_access_token = get_user_access_token(app_access_token=app_access_token)
    if tenant_access_token is None:
        tenant_access_token = get_tenant_access_token()

    client = openai.OpenAI(
        api_key=config("GPT_KEY"),
        timeout=constant.TIMEOUT,
        max_retries=constant.RETRY,
    )
    try:
        raw_response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": 'You are a helpful SEO expert who need to write document base on the keywords provided by user \
                You need to put each paragraph of the document into a json with this format [{{"h1": "The title of the document", "desc": "Page Meta Description for SEO that contain key words in {} to promote product: {} "}}, {{"h2": "The title of the first paragraph", "paragraph": "The content of the fisrt paragraph" }}, {{"h2": "The title of the second paragraph", "paragraph": "The content of the second paragraph"}}]'.format(key_word, product_name)},
                {"role": "user", "content": f"Write SEO document for the following key words: {key_word}"},
            ],
            stream=False
        )
        response = json.loads(raw_response.choices[0].message.content)

    except openai.APIConnectionError as e:
        response = f"Failed to connect to inference server: {e}"
        return "", response, response
    except openai.RateLimitError as e:
        response = f"Exceededing rate limit: {e}"
        return "", response, response
    except openai.APIError as e:
        response = f"Inference server returned an API Error: {e}"
        return "", response, response
    except ValueError:
        response = "Failed to parse the response from openai, try again."
        return "", response, response

    url = "https://open.larksuite.com/open-apis/doc/v2/create"
    test_doc = {"FolderToken": "", "Content": ""}
    doc_content = {
        "title": {
            "elements": [
                {
                    "type": "textRun",
                    "textRun": {
                        "text": "",
                        "style": {}
                    }
                }
            ]
        },
        "body": {
            "blocks": []
        }
    }
    for component in response:
        if "h1" in component:
            doc_title = component["h1"]
            doc_desc = component["desc"]
            doc_content["title"]["elements"][0]["textRun"]["text"] = doc_title
        elif "h2" in component:
            paragraph_content = [
                {
                    "type": "paragraph",
                    "paragraph": {
                        "elements": [
                            {
                                "type": "textRun",
                                "textRun": {
                                    "text": component["h2"]
                                }
                            }
                        ],
                        "style": {"headingLevel": 2}
                    }
                },
                {
                    "type": "paragraph",
                    "paragraph": {
                        "elements": [
                            {
                                "type": "textRun",
                                "textRun": {
                                    "text": component["paragraph"],
                                    "style": {}
                                }
                            }
                        ]
                    }
                }
            ]
            doc_content["body"]["blocks"] += paragraph_content
    doc_content_to_string = json.dumps(doc_content)
    test_doc["Content"] = doc_content_to_string
    payload = json.dumps(test_doc)
    headers = {
        'Authorization': f'Bearer {tenant_access_token}',
        'Content-Type':  'application/json; charset=utf-8'
    }
    doc_response = requests.request("POST", url, headers=headers, data=payload)
    doc_response = doc_response.json()
    update_doc_sharing_setting(
       access_token=tenant_access_token, doc_token=doc_response["data"]["objToken"])

    return doc_response['data']['url'], doc_title, doc_desc


@api_view(["POST"])
@csrf_exempt
@throttle_classes([AnonRateThrottle])
def lark_base_button_webhook(request: HttpRequest) -> Response:
    post_data = json.loads(request.body.decode())
    key_word = post_data["key_word"]
    product_name = post_data["product_name"]
    doc_url, title, desc = create_doc(key_word, product_name)
    seo_desc = desc
    seo_title = title
    return Response({"seo_description_response": seo_desc, "seo_title": seo_title, "doc_url": doc_url}, status=status.HTTP_200_OK)
