from unicodedata import name
from django.http import JsonResponse
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from base.models import Airline_Company, Country, Customer, Flight, Ticket, User

from base.serializer import Airline_Company_Serializer, Country_Serializer, CustomerSerializer, Flight_Serializer, Ticket_Serializer, UserSerializer

@api_view(['GET','POST','DELETE','PUT'])
@permission_classes([IsAuthenticated])
def admin_flights(request,id=-1):
    user = request.user
    if user.is_superuser :
        if request.method == 'GET':    #method get all
                res=[] #create an empty list
                for flight in Flight.objects.filter(airline_company=user.airline_company.id): #run on every row in the table...
                    res.append(Flight_Serializer(flight)) #append row by to row to res list
                return JsonResponse(res,safe=False) #return array as json response
        if request.method == 'POST': #method post add new row
                Flight.objects.create(
                    airline_company= Airline_Company.objects.get(name = request.data['airline_company']),
                    origin_country=Country.objects.get(name = request.data['origin_country']),
                    destination_country=Country.objects.get(name = request.data['destination_country']),
                    departure_time=request.data['departure_time'],
                    landing_time=request.data['landing_time'],
                    remaining_tickets=request.data['remaining_tickets'],)
                return JsonResponse({'POST':"test"})
        if request.method == 'DELETE': #method delete a row
            temp= Flight.objects.get(id = id)
            temp.delete()
            return JsonResponse({'DELETE': id})
        if request.method == 'PUT': #method delete a row
            temp=Flight.objects.get(id = id)
            temp.airline_company=Airline_Company.objects.get(name = request.data['airline_company'])
            temp.origin_country=Country.objects.get(name = request.data['origin_country'])
            temp.destination_country=Country.objects.get(name = request.data['destination_country'])
            temp.departure_time =request.data['departure_time']
            temp.landing_time =request.data['landing_time']
            temp.remaining_tickets =request.data['remaining_tickets']
            temp.save()
            return JsonResponse({'PUT': id})
    else:
        return JsonResponse({'Access':"unotherized"})  



@api_view(['GET','POST','DELETE','PUT'])
def admin_airline(request,id=-1):
    user = request.user
    if user.is_superuser :
        if request.method == 'POST': #method post add new row
            username= request.data['username']
            password= request.data['password']
            name= request.data['name']
            country= Country.objects.get(name = request.data['country'])
            is_staff= True
            user= User.objects.create_user(username=username, password=password, is_staff=is_staff)
            Airline_Company.objects.create(name=name, country=country, user=user)
            return Response("sucsses")
        if request.method == 'DELETE': #method delete a row
            temp= Airline_Company.objects.get(id = id)
            temp.delete()
            return Response(Airline_Company_Serializer(temp))
        if request.method == 'PUT': #method PUT a row
            temp=Airline_Company.objects.get(id = id)
            temp.name = request.data['name']
            temp.country = Country.objects.get(name = request.data['country'])
            temp.user = User.objects.get(id = temp.user.id)
            temp.save()
            return Response(Airline_Company_Serializer(temp))

@api_view(['GET','POST','DELETE','PUT'])
def auth_countries(request,id=-1):
    user = request.user
    if user.is_superuser :
        if request.method == 'POST': #method post add new row
            country = Country.objects.create(
                name = request.data['name'])
            return Response(Country_Serializer(country))
        if request.method == 'DELETE': #method delete a row
            temp= Country.objects.get(id = id)
            temp.delete()
            return JsonResponse({'DELETE': id})
        if request.method == 'PUT': #method delete a row
            temp=Country.objects.get(id = id)
            temp.name = request.data['name']
            temp.save()
            return Response(Country_Serializer(temp))
        
    else:
        return JsonResponse({'Access':"Unotherized"})      
@api_view(['GET','POST','DELETE','PUT'])
@permission_classes([IsAuthenticated])
def auth_tickets(request,id=-1):
    user = request.user
    if user.is_stuff :
        if request.method == 'GET':    #method get all
            if int(id) > -1: #get single product
                ticket= Ticket.objects.get(id = id)
                return JsonResponse(Ticket_Serializer(ticket),safe=False)
            else:
                res=[] #create an empty list
                for ticket in Ticket.objects.all(): #run on every row in the table...
                    res.append(Ticket_Serializer(ticket)) #append row by to row to res list
                return JsonResponse(res,safe=False) #return array as json response
        if request.method == 'POST': #method post add new row
            Ticket.objects.create(
                flight_id = Flight.objects.get(id = request.data['flight_id']),
                customer_id = Customer.objects.get(id = request.data['customer_id']))
            return JsonResponse({'POST':"test"})
        if request.method == 'DELETE': #method delete a row
            temp= Ticket.objects.get(id = id)
            temp.delete()
            return JsonResponse({'DELETE': id})
        if request.method == 'PUT': #method PUT a row
            temp=Ticket.objects.get(id = id)
            temp.flight_id = Flight.objects.get(id = request.data['flight_id'])
            temp.customer_id = Customer.objects.get(id = request.data['customer_id'])
            temp.save()
            return JsonResponse({'PUT': id})
    else:
        return JsonResponse({'POST':"unotherized"})  

