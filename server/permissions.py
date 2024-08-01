from rest_framework_api_key.permissions import BaseHasAPIKey

from server.models.api_key import APIKEY


class HasCustomAPIKey(BaseHasAPIKey):
    model = APIKEY
