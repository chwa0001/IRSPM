# Generated by Django 3.1.7 on 2021-02-28 16:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('AGRApi', '0009_auto_20210228_2349'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='session_key',
        ),
        migrations.AlterField(
            model_name='user',
            name='password',
            field=models.CharField(max_length=50),
        ),
    ]
