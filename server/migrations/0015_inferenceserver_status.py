# Generated by Django 5.1 on 2024-08-27 10:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("server", "0014_remove_inferenceserver_status"),
    ]

    operations = [
        migrations.AddField(
            model_name="inferenceserver",
            name="status",
            field=models.PositiveSmallIntegerField(
                choices=[
                    (1, "Pending"),
                    (2, "Stopped"),
                    (3, "Stopping"),
                    (4, "Running"),
                    (5, "Shutting Down"),
                    (6, "Terminated"),
                ],
                default=2,
            ),
        ),
    ]
