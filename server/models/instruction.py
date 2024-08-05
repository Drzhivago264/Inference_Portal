import datetime
import json

from django.conf import settings
from django.contrib.auth.models import User
from django.core.serializers.json import DjangoJSONEncoder
from django.db import models
from django.template.defaultfilters import slugify
from django.utils.timezone import now
from django.utils.translation import gettext_lazy as _
from mptt.models import MPTTModel, TreeForeignKey
from rest_framework_api_key.crypto import KeyGenerator
from rest_framework_api_key.models import AbstractAPIKey, BaseAPIKeyManager


class AbstractInstructionTree(MPTTModel):
    name = models.CharField(max_length=255, unique=True)
    code = models.TextField()
    instruct = models.TextField(default="", max_length=128000)
    default_child = models.BooleanField(default=False)
    default_editor_template = models.TextField(default="")
    parent = TreeForeignKey(
        "self", on_delete=models.CASCADE, null=True, blank=True, related_name="children"
    )

    def __str__(self) -> str:
        return f"{self.name}"

    class MPTTMeta:
        order_insertion_by = ["code"]

    class Meta:
        abstract = True


class InstructionTree(AbstractInstructionTree):
    pass


class UserInstructionTree(AbstractInstructionTree):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    displayed_name = models.TextField(default="")
