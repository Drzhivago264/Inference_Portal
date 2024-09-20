import requests
import json

def get_group_id(group_name: str, access_token: str):
    url = "https://open.larksuite.com/open-apis/im/v1/chats"
    headers = {
        'Authorization': f'Bearer {access_token}'
    }
    response = requests.request("GET", url, headers=headers)
    response = response.json()
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
        "POST", url, headers=headers, params={"type": "folder"}, data=json.dumps(data))
    print(response.json())


