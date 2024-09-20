import requests
import json

def get_folder_list(access_token: str, root: bool, folder_token: str | None = None):
    url = "https://open.larksuite.com/open-apis/drive/explorer/v2/root_folder/meta" if root else f"https://open.larksuite.com/open-apis/drive/explorer/v2/folder/{folder_token}/children"
    headers = {
        'Authorization': f'Bearer {access_token}'
    }
    root_folder_response = requests.request(
        "GET", url, params={"types": "folder"} if not root else {}, headers=headers)
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

def create_empty_upgraded_doc(access_token: str, title: str, folder_token: str):
    url = "https://open.larksuite.com/open-apis/docx/v1/documents"
    headers = {
        'Authorization': f'Bearer {access_token}'
    }
    data = {
        "folder_token": folder_token,
        "title": title
    }
    payload = json.dumps(data)
    doc_response = requests.request("POST", url, headers=headers, data=payload)
    doc_response = doc_response.json()
    return doc_response["data"]["document"]["document_id"]


def add_block_to_empty_doc(access_token: str, document_id: str, children: list):
    url = f"https://open.larksuite.com/open-apis/docx/v1/documents/{document_id}/blocks/{document_id}/children"
    headers = {
        'Authorization': f'Bearer {access_token}'
    }
    data = {
        "index": 0,
        "children": children
    }
    payload = json.dumps(data)
    doc_response = requests.request("POST", url, headers=headers, data=payload)
    doc_response = doc_response.json()
    return doc_response
def get_folder_list(access_token: str, root: bool, folder_token: str | None = None):
    url = "https://open.larksuite.com/open-apis/drive/explorer/v2/root_folder/meta" if root else f"https://open.larksuite.com/open-apis/drive/explorer/v2/folder/{folder_token}/children"
    headers = {
        'Authorization': f'Bearer {access_token}'
    }
    root_folder_response = requests.request(
        "GET", url, params={"types": "folder"} if not root else {}, headers=headers)
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