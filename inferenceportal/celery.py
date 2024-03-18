from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from django.conf import settings
import apikey
from apikey.util.constant import *
# Set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'inferenceportal.settings')

app = Celery('inferenceportal')  # Replace 'your_project' with your project's name.

# Configure Celery using settings from Django settings.py.
app.config_from_object('django.conf:settings', namespace='CELERY')

# Load tasks from all registered Django app configs.
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)

app.conf.beat_schedule = {
    'periodically_monitor_EC2_instance': {
        'task': 'apikey.celery_tasks.periodically_monitor_EC2_instance',      
        'schedule': MONITOR_ITERVAL,
        'options': {'queue': 'periodic'}
    },
    'periodically_shutdown_EC2_instance': {
        'task': 'apikey.celery_tasks.periodically_shutdown_EC2_instance',      
        'schedule': SHUTDOWN_INTERVAL,
        'options': {'queue': 'periodic'}

    },
}