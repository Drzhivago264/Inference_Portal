from django.db import models
from django.utils.timezone import now
from django.utils.translation import gettext_lazy as _


class LLM(models.Model):
    name = models.CharField(max_length=255)
    base = models.CharField(max_length=255, blank=True, null=True)
    size = models.IntegerField(default=1)
    desc = models.TextField()
    chat_template = models.TextField(default="")
    input_price = models.FloatField(default=0.0)
    output_price = models.FloatField(default=0.0)
    agent_availability = models.BooleanField(default=False)
    is_self_host = models.BooleanField(default=True)
    context_length = models.IntegerField(default=8192)
    max_history_length = models.IntegerField(default=0)

    def __str__(self) -> str:
        return self.name


class InferenceServer(models.Model):
    name = models.CharField(max_length=255)
    instance_type = models.CharField(max_length=255)
    url = models.URLField(max_length=255)
    alternative_url = models.URLField(max_length=255)
    hosted_model = models.ForeignKey(LLM, on_delete=models.CASCADE)
    public_ip = models.GenericIPAddressField()
    private_ip = models.GenericIPAddressField()
    status = models.CharField(max_length=255, default="off")
    last_message_time = models.DateTimeField(default=now)
    availability = models.CharField(max_length=255, default="Not Available")

    def __str__(self) -> str:
        return self.name
