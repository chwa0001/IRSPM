# Generated by Django 3.1.7 on 2021-03-10 13:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('AGRApi', '0006_auto_20210309_2254'),
    ]

    operations = [
        migrations.RenameField(
            model_name='userdata',
            old_name='user',
            new_name='user_id',
        ),
    ]
