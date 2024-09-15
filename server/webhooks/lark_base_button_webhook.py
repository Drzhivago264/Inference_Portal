import json

from django.http import HttpRequest
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.decorators import api_view, throttle_classes
from rest_framework.response import Response
from django.core.cache import cache
from rest_framework.throttling import AnonRateThrottle
from server.webhooks.lark_webhook import get_access_token
import requests  
import openai
from decouple import config
from constance import config as constant

def create_doc(content: str):
    access_token = cache.get(key="larksuite_access_token")
    if access_token is None:
        access_token = get_access_token()
    client = openai.OpenAI(
        api_key=config("GPT_KEY"),
        timeout=constant.TIMEOUT,
        max_retries=constant.RETRY,
    )
    try:
        raw_response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a helpful SEO expert who need to write document base on the keywords provided by user."},
                {"role": "user", "content": f"Write SEO document for the following key words: {content}"},
            ],
            stream=False
        )
        response = raw_response.choices[0].message.content
        response = response.replace('"',"'")
        response = response.replace('\n',"")
    except openai.APIConnectionError as e:
        response= f"Failed to connect to inference server: {e}"
    except openai.RateLimitError as e:
        response = f"Exceededing rate limit: {e}"
    except openai.APIError as e:
        response = f"Inference server returned an API Error: {e}"

    url = "https://open.larksuite.com/open-apis/doc/v2/create"
    test_doc = {"FolderToken":"","Content":"{\"title\":{\"elements\":[{\"type\":\"textRun\",\"textRun\":{\"text\":\"Test SEO document\",\"style\":{}}}]},\"body\":{\"blocks\":[{\"type\":\"paragraph\",\"paragraph\":{\"elements\":[{\"type\":\"textRun\",\"textRun\":{\"text\":"+ '"' + str(response) + "\",\"style\":{}}}]}}]}}"}

    payload = json.dumps(test_doc)
    print(payload)
    headers = {
        'Authorization': f'Bearer {access_token}',  # your access token
        'Content-Type':  'application/json; charset=utf-8'
    }
    doc_response = requests.request("POST", url, headers=headers, data=payload)
    print(doc_response.json())
    return doc_response.json()['data']['url']

@api_view(["POST"])
@csrf_exempt
@throttle_classes([AnonRateThrottle])
def lark_base_button_webhook(request: HttpRequest) -> Response:
    post_data = json.loads(request.body.decode())
    print(post_data)

    ### Implement Agent Here
    doc_url = create_doc(post_data['key_word'])
    seo_desc = "Something agent say"
    seo_title = "Agent title output"
    return Response({"seo_description_response": seo_desc, "seo_title":seo_title, "doc_url": doc_url}, status=status.HTTP_200_OK)
