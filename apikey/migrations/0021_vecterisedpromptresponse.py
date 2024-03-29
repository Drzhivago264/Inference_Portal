# Generated by Django 5.0.1 on 2024-03-15 02:47

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apikey', '0020_alter_promptresponse_key_delete_key'),
    ]

    operations = [
        migrations.CreateModel(
            name='VecterisedPromptResponse',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('prompt', models.CharField(max_length=4048)),
                ('response', models.CharField(max_length=4048)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('p_type', models.TextField(default='prompt')),
                ('key', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='apikey.apikey')),
                ('model', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='apikey.llm')),
            ],
        ),
    ]
