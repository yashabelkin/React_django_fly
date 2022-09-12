from django.http import JsonResponse
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from base.models import Airline_Company, Country, Customer, Flight, Ticket, User

from base.serializer import Airline_Company_Serializer, Country_Serializer, CustomerSerializer, Flight_Serializer, Ticket_Serializer, UserSerializer


@api_view(['PUT'])
def auth_airline_companies(request,id=-1):
    user = request.user
    if user.is_stuff:
        if request.method == 'PUT': #method PUT a row
            temp=Airline_Company.objects.get(id = id)
            temp.name = request.data['name'],
            temp.country = Country.objects.get(id = request.data['country'])
            temp.user = User.objects.get(id = user.Airline_Company.id)
            temp.save()
        return JsonResponse({'PUT': id})

@api_view(['GET','POST','DELETE','PUT'])
def auth_airline_companies(request,id=-1):
    user = request.user
    if user.is_staff :
        if request.method == 'PUT': #method PUT a row
            temp=Airline_Company.objects.get(id = user.airline_company.id)
            temp.name = request.data['name']
            temp.country = Country.objects.get(name = request.data['country'])
            temp.user = User.objects.get(id = user.id)
            temp.save()
            return Response("updated sucssesfully")


@api_view(['GET','POST','DELETE','PUT'])
@permission_classes([IsAuthenticated])
def auth_flights(request,id=-1):
    user = request.user
    if user.is_staff :
        if request.method == 'GET':    #method get all
            res=[] #create an empty list
            for flight in Flight.objects.filter(airline_company=user.airline_company.id): #run on every row in the table...
                res.append(Flight_Serializer(flight)) #append row by to row to res list
            return JsonResponse(res,safe=False) #return array as json response
        if request.method == 'POST': #method post add new row
                Flight.objects.create(
                    airline_company = Airline_Company.objects.get(name = user.airline_company.name),
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
            temp.airline_company = Airline_Company.objects.get(id = user.airline_company.id )
            temp.origin_country=Country.objects.get(id = request.data['origin_country'])
            temp.destination_country=Country.objects.get(id = request.data['destination_country'])
            temp.departure_time =request.data['departure_time']
            temp.landing_time =request.data['landing_time']
            temp.remaining_tickets =request.data['remaining_tickets']
            temp.save()
            return JsonResponse({'PUT': id})
    else:
        return JsonResponse({'Access':"unotherized"})  


