# Generated by Django 5.0.1 on 2024-03-20 18:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apikey', '0028_apikey_integrated_address_apikey_payment_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='apikey',
            name='monero_credit',
            field=models.FloatField(default=0.0),
        ),
    ]
