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
from pydantic import BaseModel



class ParagraphSchema(BaseModel):
    type: str
    content: str
    paragraph: str | None

class DocumentSchema(BaseModel):
    document_structure: list[ParagraphSchema]
    document_description: str
def get_folder_list(access_token: str, root: bool, folder_token: str | None = None):
    url = "https://open.larksuite.com/open-apis/drive/explorer/v2/root_folder/meta" if root else f"https://open.larksuite.com/open-apis/drive/explorer/v2/folder/{folder_token}/children"
    headers = {
        'Authorization': f'Bearer {access_token}'
    }
    root_folder_response = requests.request(
        "GET", url, params={"types":"folder"} if not root else {}, headers=headers)
    print(root_folder_response.json())
    return root_folder_response.json()


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

def get_group_id(group_name: str, access_token: str):
    url = "https://open.larksuite.com/open-apis/im/v1/chats"
    headers = {
        'Authorization': f'Bearer {access_token}'
    }
    response = requests.request("GET", url, headers=headers)
    response =response.json()
    has_group = False
    for group in response["data"]["items"]: 
        if group["name"] == group_name:
            has_group = True
            return group["chat_id"]
    if not has_group:
        return False
def add_group_permission(access_token: str, group_id: str):
    url = f"https://open.larksuite.com/open-apis/drive/v1/permissions/Bmlgff7eSlXECKdHgjPlAY4xgMf/members"
    headers = {
        'Authorization': f'Bearer {access_token}'
    }
    data = {
        "member_type": "openchat",
        "member_id": group_id,
        "perm": "full_access"
    }
    response = requests.request(
        "POST", url, headers=headers, params={"type": "folder"} ,data=json.dumps(data))
    print(response.json())

def submit_doc(response: DocumentSchema, access_token: str):
    url = "https://open.larksuite.com/open-apis/doc/v2/create"
    test_doc = {"FolderToken": "Bmlgff7eSlXECKdHgjPlAY4xgMf", "Content": ""}
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
    document_structure = response.document_structure
    document_description = response.document_description
    for component in document_structure:
        if component.type == "h1":
            doc_title = component.content
            doc_content["title"]["elements"][0]["textRun"]["text"] = doc_title
        elif component.type == "h2":
            paragraph_content = [
                {
                    "type": "paragraph",
                    "paragraph": {
                        "elements": [
                            {
                                "type": "textRun",
                                "textRun": {
                                    "text": component.content
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
                                    "text": component.paragraph,
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
        'Authorization': f'Bearer {access_token}',
        'Content-Type':  'application/json; charset=utf-8'
    }
    doc_response = requests.request("POST", url, headers=headers, data=payload)
    doc_response = doc_response.json()
    if doc_response['code'] == 99991663: #Invalid token (expired)
        access_token = get_tenant_access_token()
        headers['Authorization'] = f'Bearer {access_token}'
        doc_response = requests.request("POST", url, headers=headers, data=payload)
        doc_response = doc_response.json()
    return doc_response, doc_title, document_description

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


def create_doc(key_word: str, product_name: str, shared_group: str):

    tenant_access_token = cache.get(key="larksuite_tenant_access_token")
    if tenant_access_token is None:
        tenant_access_token = get_tenant_access_token()

    client = openai.OpenAI(
        api_key=config("GPT_KEY"),
        timeout=constant.TIMEOUT,
        max_retries=constant.RETRY,
    )
    try:
        raw_response = client.beta.chat.completions.parse(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": 'You are a helpful SEO expert who need to write document base on the keywords provided by user \
                You need to put each paragraph of the document into a json with this format {{ {{"document_structure": [{{"type": "h1", "content": "The title of the document"}}, {{ "type": "h2", "content": "The title of the first paragraph", "paragraph": "The content of the fisrt paragraph" }}, {{"type": "h2", "content": "The title of the second paragraph", "paragraph": "The content of the second paragraph"}}]}}, {{ "document_description": "Page Meta Description for SEO that contain key words in {} to promote product: {} "}}  }}'.format(key_word, product_name)},
                {"role": "user", "content": f"Write SEO document for the following key words: {key_word}"},
            ],
            response_format=DocumentSchema
        )
        print(raw_response.choices[0].message.parsed)
        response = raw_response.choices[0].message.parsed


    except openai.APIConnectionError as e:
        response = f"Failed to connect to inference server: {e}"
        return "", response, response
    except openai.RateLimitError as e:
        response = f"Exceededing rate limit: {e}"
        return "", response, response
    except openai.APIError as e:
        response = f"Inference server returned an API Error: {e}"
        return "", response, response
    except ValueError as e:
        response = "Failed to parse the response from openai, try again."
        return "", response, response

    doc_response, doc_title, document_description = submit_doc(access_token=tenant_access_token, response=response)
    print(doc_response)
    update_doc_sharing_setting(
       access_token=tenant_access_token, doc_token=doc_response["data"]["objToken"])
    # - The folder token of Doc Bot is "nodlgekDroihB8PlH3czpay50pb"
    # - If you need to get it again: get_folder_list(access_token=tenant_access_token, root=True)
    # - The shared folder token of Doc Bot is "Bmlgff7eSlXECKdHgjPlAY4xgMf" and the name of the folder is: "Seo Output"
    # - If you want to get it again or get another folder: get_folder_list(access_token=tenant_access_token, root=False, folder_token="nodlgekDroihB8PlH3czpay50pb") 
    group_id = get_group_id(access_token=tenant_access_token, group_name=shared_group)
    if group_id:
        add_group_permission(access_token=tenant_access_token, group_id=group_id)
        return doc_response['data']['url'], doc_title, document_description
    else:
        return "Bot was not added to the group", "Bot was not added to the group", "Bot was not added to the group"


@api_view(["POST"])
@csrf_exempt
@throttle_classes([AnonRateThrottle])
def lark_base_button_webhook(request: HttpRequest) -> Response:
    post_data = json.loads(request.body.decode())
    key_word = post_data["key_word"]
    product_name = post_data["product_name"]
    shared_group = post_data["shared_group"] if post_data["shared_group"] else "Engineering"
    doc_url, title, desc = create_doc(key_word, product_name, shared_group)
    seo_desc = desc
    seo_title = title
    return Response({"seo_description_response": seo_desc, "seo_title": seo_title, "doc_url": doc_url}, status=status.HTTP_200_OK)
