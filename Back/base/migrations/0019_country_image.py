# Generated by Django 4.0.4 on 2022-08-18 11:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0018_delete_administrator'),
    ]

    operations = [
        migrations.AddField(
            model_name='country',
            name='image',
            field=models.ImageField(blank=True, default='/placeholder.png', null=True, upload_to=''),
        ),
    ]