from django.apps import AppConfig


class ServerConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "server"

    def ready(self):
        from vectordb.shortcuts import autosync_model_to_vectordb

        from server.models.log import PromptResponse

        autosync_model_to_vectordb(PromptResponse)
