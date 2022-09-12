from django.contrib import admin
from django.urls import path
from django.views import View
from django.conf import settings
from django.conf.urls.static import static
from .views import customer, views, base, anonymus, airline, adminv
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
urlpatterns = [

    #base urls
    path('flights/', base.get_flights ),
    path('flights/<id>', base.get_flights),
    path('airline_companies/', base.airline_companies),
    path('airline_companies/<id>', base.airline_companies),
    path('add_user/', base.add_user),
    path('countries/', base.countries),
    path('countries/<id>', base.countries),
    
    #customer

    path('auth_tickets/', customer.auth_tickets),
    path('auth_tickets/<id>', customer.auth_tickets),  
    path('update_cust/<id>', customer.update_cust),
    path('update_cust/', customer.update_cust),

    
    #anonymus
    path('add_customer/', anonymus.add_customer),
    path('token/', anonymus.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('customer_register/', anonymus.customer_register),
    path('airline_register/', anonymus.airline_register),



    #airline 
    path('auth_airline/<id>', airline.auth_airline_companies),
    path('auth_airline/', airline.auth_airline_companies),
    path('auth_flights/<id>', airline.auth_flights),
    path('auth_flights/', airline.auth_flights),

    # admin
    path('admin_flights/', adminv.admin_flights),    
    path('admin_flights/<id>', adminv.admin_flights),
    path('admin_airline/', adminv.admin_airline),    
    path('admin_airline/<id>', adminv.admin_airline),
    path('auth_countries/<id>', adminv.auth_countries), 
    path('auth_countries/', adminv.auth_countries), 



]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

