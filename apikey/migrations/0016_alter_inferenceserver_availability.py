# Generated by Django 5.0.1 on 2024-02-20 10:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apikey', '0015_rename_availaibility_inferenceserver_availability'),
    ]

    operations = [
        migrations.AlterField(
            model_name='inferenceserver',
            name='availability',
            field=models.CharField(default='Not Available', max_length=200),
        ),
    ]
