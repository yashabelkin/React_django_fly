# Generated by Django 3.2.8 on 2022-07-05 09:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0010_auto_20220705_1144'),
    ]

    operations = [
        migrations.RenameField(
            model_name='administrator',
            old_name='user_id',
            new_name='user',
        ),
        migrations.RenameField(
            model_name='airline_company',
            old_name='user_id',
            new_name='user',
        ),
        migrations.RenameField(
            model_name='customer',
            old_name='user_id',
            new_name='user',
        ),
    ]
