# Generated by Django 5.1 on 2024-08-28 04:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("server", "0018_embeddingdatasetrecord"),
    ]

    operations = [
        migrations.AddField(
            model_name="finegrainapikey",
            name="updated_at",
            field=models.DateTimeField(auto_now=True),
        ),
    ]
