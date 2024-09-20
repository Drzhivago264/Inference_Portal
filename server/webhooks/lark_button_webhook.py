import json
from django.http import HttpRequest
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.decorators import api_view, throttle_classes
from rest_framework.response import Response
from django.core.cache import cache
from rest_framework.throttling import AnonRateThrottle
import openai
from decouple import config
from constance import config as constant
from pydantic import BaseModel
from server.webhooks.lark_utils.lark_doc import add_block_to_empty_doc, create_empty_upgraded_doc
from server.webhooks.lark_utils.lark_token import get_tenant_access_token
from server.webhooks.lark_utils.lark_perm import get_group_id, add_group_permission
class ParagraphSchema(BaseModel):
    type: str
    content: str
    paragraph: str | None


class DocumentSchema(BaseModel):
    document_structure: list[ParagraphSchema]
    document_description: str

def submit_doc(response: DocumentSchema, access_token: str):
    doc_content = []
    document_structure = response.document_structure
    document_description = response.document_description
    for component in document_structure:
        if component.type == "h1":
            doc_title = component.content
            document_id = create_empty_upgraded_doc(
                access_token=access_token, title=doc_title, folder_token="Bmlgff7eSlXECKdHgjPlAY4xgMf")
        elif component.type == "h2":
            paragraph_content = [
                {
                    "block_type": 4,
                    "heading2": {
                        "elements": [
                            {
                                "text_run": {
                                    "content": component.content,
                                }
                            },
                        ],
                        "style": {}
                    }
                },
                {
                    "block_type": 2,
                    "text": {
                        "elements": [
                            {
                                "text_run": {
                                    "content": component.paragraph,
                                }
                            },
                        ],
                        "style": {}
                    }
                }

            ]
            doc_content += paragraph_content

    doc_response = add_block_to_empty_doc(
        access_token=access_token, document_id=document_id, children=doc_content)
    if doc_response['code'] == 99991663:  # Invalid token (expired)
        access_token = get_tenant_access_token()
        doc_response = add_block_to_empty_doc(
            access_token=access_token, document_id=document_id, children=doc_content)
    return document_id, doc_title, document_description


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

    doc_id, doc_title, document_description = submit_doc(
        access_token=tenant_access_token, response=response)
    # update_doc_sharing_setting(
    #   access_token=tenant_access_token, doc_token=doc_id)
    # - The folder token of Doc Bot is "nodlgekDroihB8PlH3czpay50pb"
    # - If you need to get it again: get_folder_list(access_token=tenant_access_token, root=True)
    # - The shared folder token of Doc Bot is "Bmlgff7eSlXECKdHgjPlAY4xgMf" and the name of the folder is: "Seo Output"
    # - If you want to get it again or get another folder: get_folder_list(access_token=tenant_access_token, root=False, folder_token="nodlgekDroihB8PlH3czpay50pb")
    group_id = get_group_id(
        access_token=tenant_access_token, group_name=shared_group)
    if group_id:
        add_group_permission(
            access_token=tenant_access_token, group_id=group_id)
        return f"https://agenix-intranet.sg.larksuite.com/docx/{doc_id}", doc_title, document_description
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
