from django.contrib import admin
from .models import Airline_Company, Country, Customer,Flight, Ticket, User
 
admin.site.register(Country)
admin.site.register(Flight)
admin.site.register(Ticket)
admin.site.register(Customer)
admin.site.register(Airline_Company)


# Register your models here.
