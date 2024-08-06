from django.db import models

class CustomPermissionWithoutContentType(models.Model):

    class Meta:

        managed = False

        default_permissions = ()

        permissions = (
            ("allow_chat", "Global permission for chatroom"),
            ("allow_agent", "Global permission for using agent"),
            ("allow_toolbox", "Global permission for using toolbox"),
            ("allow_view_log", "Global permission for viewing log"),
            ("allow_chat_api", "Global permission for chat api"),
            ("allow_agent_api", "Global permission for using agent api"),
            ("allow_toolbox_api", "Global permission for using toolbox api"),
            ("allow_view_cost", "Global permission for viewing cost"),
            ("allow_data_synthesis", "Global permission for using data synthesis"),
            ("allow_create_token", "Global permission for creating token"),
        )
