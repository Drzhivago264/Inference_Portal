# Generated by Django 5.1 on 2024-08-17 13:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("server", "0002_remove_llm_chat_template"),
    ]

    operations = [
        migrations.AlterField(
            model_name="apikey",
            name="integrated_address",
            field=models.TextField(max_length=106),
        ),
        migrations.AlterField(
            model_name="apikey",
            name="payment_id",
            field=models.TextField(max_length=32),
        ),
        migrations.AlterField(
            model_name="paymenthistory",
            name="integrated_address",
            field=models.CharField(max_length=106),
        ),
        migrations.AlterField(
            model_name="paymenthistory",
            name="payment_id",
            field=models.CharField(max_length=32),
        ),
        migrations.AlterField(
            model_name="paymenthistory",
            name="transaction_hash",
            field=models.CharField(max_length=64),
        ),
    ]
