# Generated by Django 5.0.6 on 2024-07-21 14:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0033_alter_userinstructiontree_instruct_dataset_and_more'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='DatesetRecord',
            new_name='DatasetRecord',
        ),
        migrations.AlterModelOptions(
            name='custompermissionwithoutcontenttype',
            options={'default_permissions': (), 'managed': False, 'permissions': (('allow_chat', 'Global permission for chatroom'), ('allow_agent', 'Global permission for using agent'), ('allow_toolbox', 'Global permission for using toolbox'), ('allow_view_log', 'Global permission for viewing log'), ('allow_chat_api', 'Global permission for chat api'), ('allow_agent_api', 'Global permission for using agent api'), ('allow_toolbox_api', 'Global permission for using toolbox api'), ('allow_view_cost', 'Global permission for viewing cost'), ('allow_create_template', 'Global permission for creating template'), ('allow_data_synthesis', 'Global permission for using data synthesis'), ('allow_create_token', 'Global permission for creating token'), ('allow_create_dataset', 'Global permission for creating dataset'))},
        ),
    ]
