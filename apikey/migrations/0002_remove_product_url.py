# Generated by Django 5.0.1 on 2024-01-20 11:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('apikey', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='url',
        ),
    ]
