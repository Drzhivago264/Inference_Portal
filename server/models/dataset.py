from django.conf import settings
from django.contrib.auth.models import User
from django.db import models
from django.utils.translation import gettext_lazy as _
from pgvector.django import VectorField
from server.models.general_mixin import GeneralMixin
import numpy as np
from django.db import connection

User = settings.AUTH_USER_MODEL


def dictfetchall(cursor):
    """
    Return all rows from a cursor as a dict.
    Assume the column names are unique.
    """
    columns = [col[0] for col in cursor.description]
    return [dict(zip(columns, row)) for row in cursor.fetchall()]

class Dataset(GeneralMixin):
    name = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    default_system_prompt = models.TextField(max_length=128000, default="")
    default_evaluation = models.JSONField(default=list)
    is_embedding_dataset = models.BooleanField(default=True)
    default_content_structure = models.JSONField(default=list)
    def __str__(self) -> str:
        return self.name


class AbstractDatasetRecord(models.Model):
    dataset = models.ForeignKey(Dataset, on_delete=models.CASCADE)
    content = models.JSONField(default=dict)
    evaluation = models.JSONField()

    class Meta:
        abstract = True


class EmbeddingDatasetRecord(AbstractDatasetRecord, GeneralMixin):
    embedding = VectorField(
        dimensions=384,
        null=True,
        blank=True,
    )


    def filter_similar_records(self, k: int, distance: float = 1.0, include_self: bool = False):
        with connection.cursor() as cursor:
            string_array = np.array2string(self.embedding, separator=',', precision=9)
            if include_self:
                cursor.execute(
                    """
                    SELECT *, embedding <=> %s as distance FROM server_embeddingdatasetrecord  
                    WHERE embedding <=> %s < %s AND dataset_id = %s
                    ORDER BY distance  
                    LIMIT %s;
                    """,
                    [
                        string_array,
                        string_array,
                        distance,
                        self.dataset.id,
                        k
                    ] 
                )
            else:
                cursor.execute(
                    """
                    SELECT *, embedding <=> %s as distance FROM server_embeddingdatasetrecord  
                    WHERE embedding <=> %s < %s AND id != %s AND dataset_id = %s
                    ORDER BY distance  
                    LIMIT %s;
                    """,
                    [
                        string_array,
                        string_array,
                        distance,
                        self.id,
                        self.dataset.id,
                        k
                    ] 
                )
            
            rows = dictfetchall(cursor)
        return rows
