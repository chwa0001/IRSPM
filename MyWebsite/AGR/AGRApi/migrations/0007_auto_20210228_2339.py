# Generated by Django 3.1.7 on 2021-02-28 15:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('AGRApi', '0006_auto_20210228_2327'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userdata',
            name='accomplishment',
            field=models.CharField(default=None, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='userdata',
            name='goal',
            field=models.CharField(default=None, max_length=50, null=True),
        ),
    ]
