# Generated by Django 3.1.7 on 2021-03-14 03:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('AGRApi', '0010_auto_20210314_1151'),
    ]

    operations = [
        migrations.RenameField(
            model_name='userdata',
            old_name='uuser',
            new_name='user',
        ),
        migrations.RemoveField(
            model_name='userdata',
            name='user_id',
        ),
        migrations.RemoveField(
            model_name='userexerciserating',
            name='userdata',
        ),
        migrations.AddField(
            model_name='userexerciserating',
            name='user_id',
            field=models.IntegerField(default=1),
        ),
    ]
