import json
import requests
from decouple import config
from django.core.cache import cache
def get_tenant_access_token():
    url = "https://open.larksuite.com/open-apis/auth/v3/tenant_access_token/internal"
    headers = {"Content-Type": "application/json; charset=utf-8"}
    req = {"app_id": config("LARK_APP_ID"), "app_secret": config("LARK_APP_SECRET")}
    payload = json.dumps(req)
    response = requests.request("POST", url, headers=headers, data=payload)
    access_token = response.json()["tenant_access_token"]
    cache.set(key="larksuite_tenant_access_token", value=access_token, timeout=120)
    return access_token