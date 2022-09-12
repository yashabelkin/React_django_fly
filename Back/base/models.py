from django.db import models
from django.contrib.auth.models import User



class Country(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.TextField(unique=True)

class Airline_Company(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.TextField(unique=True)
    country = models.ForeignKey(Country, on_delete=models.CASCADE, null=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True)


class Flight(models.Model):
    id = models.AutoField(primary_key=True)
    airline_company = models.ForeignKey(Airline_Company, on_delete=models.CASCADE, null=True)
    origin_country = models.ForeignKey(Country, related_name = 'origin', on_delete=models.CASCADE, null=True)
    destination_country = models.ForeignKey(Country, related_name = 'destination', on_delete=models.CASCADE, null=True)
    departure_time = models.DateTimeField(null=True)
    landing_time = models.DateTimeField(blank=False)
    remaining_tickets = models.IntegerField(blank=False)



class Customer(models.Model):
    id = models.AutoField(primary_key=True)
    first_name = models.TextField(blank=False)
    last_name = models.TextField(blank=False)
    address = models.TextField(blank=False)
    phone_no = models.TextField(unique=True)
    credit_card_no = models.TextField(unique=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True)


class Ticket(models.Model):
    id = models.AutoField(primary_key=True)
    flight = models.ForeignKey(Flight, on_delete=models.CASCADE, null=True)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, null=True)



