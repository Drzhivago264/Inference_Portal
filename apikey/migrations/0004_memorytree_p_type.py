# Generated by Django 5.0.1 on 2024-04-09 16:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apikey', '0003_memorytree_delete_sessiontree'),
    ]

    operations = [
        migrations.AddField(
            model_name='memorytree',
            name='p_type',
            field=models.CharField(default='prompt', max_length=4096),
        ),
    ]