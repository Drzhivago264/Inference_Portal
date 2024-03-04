from rest_framework_api_key.permissions import BaseHasAPIKey
from .models import APIKEY

class HasCustomAPIKey(BaseHasAPIKey):
    model = APIKEY