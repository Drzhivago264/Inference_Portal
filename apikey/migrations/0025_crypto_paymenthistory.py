# Generated by Django 5.0.1 on 2024-03-19 18:05

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apikey', '0024_inferenceserver_alternative_url_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Crypto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('coin', models.CharField(max_length=200)),
                ('address', models.CharField(max_length=400)),
                ('balance', models.FloatField(default=0.0)),
            ],
        ),
        migrations.CreateModel(
            name='PaymentHistory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.FloatField(default=0.0)),
                ('integrated_address', models.CharField(max_length=400)),
                ('transaction_id', models.CharField(max_length=400)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('status', models.CharField(max_length=100)),
                ('current_block_num', models.IntegerField(default=0)),
                ('crypto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='apikey.crypto')),
                ('key', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='apikey.apikey')),
            ],
        ),
    ]
