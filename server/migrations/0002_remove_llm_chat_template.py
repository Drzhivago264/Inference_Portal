# Generated by Django 5.1 on 2024-08-17 13:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("server", "0001_initial"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="llm",
            name="chat_template",
        ),
    ]