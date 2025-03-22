from django.db import models
from django.utils.timezone import now
from django.utils.translation import gettext_lazy as _

from server.models.general_mixin import GeneralMixin


class LLM(GeneralMixin):
    name = models.CharField(max_length=255, unique=True)
    base = models.CharField(max_length=255, blank=True, null=True)
    size = models.IntegerField(default=1)
    desc = models.TextField()
    input_price = models.FloatField(default=0.0)
    output_price = models.FloatField(default=0.0)
    agent_availability = models.BooleanField(default=False)
    is_self_host = models.BooleanField(default=True)
    context_length = models.IntegerField(default=8192)
    max_history_length = models.IntegerField(default=0)
    extra_body_availability = models.BooleanField(default=False)
    def __str__(self) -> str:
        return self.name


class InferenceServer(GeneralMixin):
    name = models.CharField(max_length=255, unique=True)
    instance_type = models.CharField(max_length=255)
    url = models.URLField(max_length=255)
    alternative_url = models.URLField(max_length=255)
    hosted_model = models.ForeignKey(LLM, on_delete=models.CASCADE)
    public_ip = models.GenericIPAddressField()
    private_ip = models.GenericIPAddressField()
    last_message_time = models.DateTimeField(default=now)

    class HostModeType(models.IntegerChoices):
        LOCAL = 1, "Local"
        AWS = 2, "AWS"

    host_mode = models.IntegerField(choices=HostModeType.choices, default=HostModeType.AWS)

    class AvailabilityType(models.IntegerChoices):
        AVAILABLE = 1, "Available"
        NOT_AVAILABLE = 2, "Not Available"
        TESTING = 3, "Testing"

    availability = models.PositiveSmallIntegerField(
        choices=AvailabilityType.choices, default=AvailabilityType.NOT_AVAILABLE
    )

    class StatusType(models.IntegerChoices):
        PENDING = 1, "Pending"
        STOPPED = 2, "Stopped"
        STOPPING = 3, "Stopping"
        RUNNING = 4, "Running"
        SHUTTING_DOWN = 5, "Shutting Down"
        TERMINATED = 6, "Terminated"

    status = models.PositiveSmallIntegerField(
        choices=StatusType.choices, default=StatusType.STOPPED
    )

    def __str__(self) -> str:
        return self.name
