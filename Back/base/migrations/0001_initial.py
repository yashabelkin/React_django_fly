# Generated by Django 3.2.8 on 2022-06-29 10:39

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Airline_Company',
            fields=[
                ('id', models.BigIntegerField(primary_key=True, serialize=False)),
                ('name', models.TextField(unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Country',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('name', models.TextField(unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('id', models.BigIntegerField(primary_key=True, serialize=False)),
                ('first_name', models.TextField()),
                ('last_name', models.TextField()),
                ('address', models.TextField()),
                ('phone_no', models.TextField(unique=True)),
                ('credit_card_no', models.TextField(unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Flight',
            fields=[
                ('id', models.BigIntegerField(primary_key=True, serialize=False)),
                ('departure_time', models.DateTimeField()),
                ('landing_time', models.DateTimeField()),
                ('remaining_tickets', models.IntegerField()),
                ('airline_company_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='base.airline_company')),
                ('destination_country_Id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='destination', to='base.country')),
                ('origin_country_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='origin', to='base.country')),
            ],
        ),
        migrations.CreateModel(
            name='User_Role',
            fields=[
                ('id', models.BigIntegerField(primary_key=True, serialize=False)),
                ('role_name', models.TextField(unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigIntegerField(primary_key=True, serialize=False)),
                ('username', models.TextField(unique=True)),
                ('password', models.TextField()),
                ('email', models.TextField(unique=True)),
                ('user_role', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='base.user_role')),
            ],
        ),
        migrations.CreateModel(
            name='Tickets',
            fields=[
                ('id', models.BigIntegerField(primary_key=True, serialize=False)),
                ('customer_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='base.customer')),
                ('flight_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='base.flight')),
            ],
        ),
        migrations.AddField(
            model_name='customer',
            name='user_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='base.user'),
        ),
        migrations.AddField(
            model_name='airline_company',
            name='country_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='base.country'),
        ),
        migrations.AddField(
            model_name='airline_company',
            name='user_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='base.user'),
        ),
        migrations.CreateModel(
            name='Administrators',
            fields=[
                ('id', models.BigIntegerField(primary_key=True, serialize=False)),
                ('first_name', models.TextField()),
                ('last_name', models.TextField()),
                ('user_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='base.user')),
            ],
        ),
    ]
