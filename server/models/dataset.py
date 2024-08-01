from django.conf import settings
from django.contrib.auth.models import User
from django.db import models
from django.utils.translation import gettext_lazy as _


User = settings.AUTH_USER_MODEL
class Dataset(models.Model):
    name = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    default_system_prompt = models.TextField(max_length=128000, default="")
    default_evaluation = models.JSONField(default=list)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.name


class DatasetRecord(models.Model):
    dataset = models.ForeignKey(Dataset, on_delete=models.CASCADE)
    system_prompt = models.TextField()
    prompt = models.TextField(max_length=128000, blank=True, null=True)
    response = models.TextField(max_length=128000, blank=True, null=True)
    evaluation = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.dataset.name
