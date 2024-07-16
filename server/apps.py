from django.apps import AppConfig


class ServerConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'server'
    def ready(self):
        from .models import PromptResponse
        from vectordb.shortcuts import autosync_model_to_vectordb
        autosync_model_to_vectordb(PromptResponse)