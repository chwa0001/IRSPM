# Generated by Django 3.1.7 on 2021-02-28 15:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('AGRApi', '0004_auto_20210228_2324'),
    ]

    operations = [
        migrations.AlterOrderWithRespectTo(
            name='userdata',
            order_with_respect_to='user',
        ),
    ]
