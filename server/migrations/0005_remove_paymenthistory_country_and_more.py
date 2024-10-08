# Generated by Django 5.1 on 2024-08-23 09:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("server", "0004_remove_paymenthistory_payment_id_and_more"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="paymenthistory",
            name="country",
        ),
        migrations.AddField(
            model_name="paymenthistory",
            name="amount_subtotal",
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="paymenthistory",
            name="billing_address_1",
            field=models.CharField(blank=True, max_length=256, null=True),
        ),
        migrations.AddField(
            model_name="paymenthistory",
            name="billing_address_2",
            field=models.CharField(blank=True, max_length=256, null=True),
        ),
        migrations.AddField(
            model_name="paymenthistory",
            name="billing_country_code",
            field=models.CharField(blank=True, max_length=2, null=True),
        ),
        migrations.AddField(
            model_name="paymenthistory",
            name="billing_postcode",
            field=models.CharField(blank=True, max_length=256, null=True),
        ),
        migrations.AddField(
            model_name="paymenthistory",
            name="billing_state",
            field=models.CharField(blank=True, max_length=256, null=True),
        ),
    ]
