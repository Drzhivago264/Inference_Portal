# Generated by Django 5.0.1 on 2024-01-21 14:18

import django_bleach.models
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('apikey', '0004_llm'),
    ]

    operations = [
        migrations.AlterField(
            model_name='key',
            name='owner',
            field=django_bleach.models.BleachField(max_length=400),
        ),
    ]
