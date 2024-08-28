from django.conf import settings
from django.contrib.auth.models import User
from django.db import models
from django.utils.translation import gettext_lazy as _
from pgvector.django import VectorField
from server.models.general_mixin import GeneralMixin
User = settings.AUTH_USER_MODEL


class Dataset(GeneralMixin):
    name = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    default_system_prompt = models.TextField(max_length=128000, default="")
    default_evaluation = models.JSONField(default=list)

    def __str__(self) -> str:
        return self.name

class AbstractDatasetRecord(models.Model):
    dataset = models.ForeignKey(Dataset, on_delete=models.CASCADE)
    system_prompt = models.TextField()
    prompt = models.TextField(max_length=128000, blank=True, null=True)
    response = models.TextField(max_length=128000, blank=True, null=True)
    evaluation = models.JSONField()

    class Meta:
        abstract = True
class DatasetRecord(AbstractDatasetRecord, GeneralMixin):

    def __str__(self) -> str:
        return self.dataset.name


class EmbeddingDatasetRecord(AbstractDatasetRecord, GeneralMixin):
    embedding = VectorField(
        dimensions=384,
        null=True,
        blank=True,
    )