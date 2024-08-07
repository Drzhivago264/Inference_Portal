from __future__ import absolute_import, unicode_literals

import os

import django
from celery import Celery
from django.conf import settings

from server.utils.constant import *

# Set the default Django settings module for the 'celery' program.
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "inferenceportal.settings")
django.setup()

app = Celery("inferenceportal")  # Replace 'your_project' with your project's name.

# Configure Celery using settings from Django settings.py.
app.config_from_object("django.conf:settings", namespace="CELERY")

# Load tasks from all registered Django app configs.
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS, force=True)

app.conf.beat_schedule = {
    "periodically_monitor_EC2_instance": {
        "task": "server.queue.ec2_manage.periodically_monitor_EC2_instance",
        "schedule": MONITOR_ITERVAL,
        "options": {"queue": "periodic"},
    },
    "periodically_shutdown_EC2_instance": {
        "task": "server.queue.ec2_manage.periodically_shutdown_EC2_instance",
        "schedule": SHUTDOWN_INTERVAL,
        "options": {"queue": "periodic"},
    },
    "periodically_update_xrm_prince": {
        "task": "server.queue.update_xmr.update_crypto_rate",
        "schedule": XMR_PRICE_INTERVAL,
        "args": (["xmr"]),
        "options": {"queue": "periodic"},
    },
    "periodically_delete_unused_key": {
        "task": "server.queue.object_expire.periodically_delete_unused_key",
        "schedule": DELETE_KEY_INTERVAL,
        "options": {"queue": "periodic"},
    },
}
