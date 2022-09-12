from django.http import JsonResponse
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from base.models import Airline_Company, Country, Customer, Flight, Ticket, User

from base.serializer import Airline_Company_Serializer, Country_Serializer, CustomerSerializer, Flight_Serializer, Ticket_Serializer, UserSerializer
 



@api_view(['GET'])
def get_flights(request,id=-1):
    if request.method == 'GET':    #method get all
        if int(id) > -1: #get single product
            flight= Flight.objects.get(id = id)
            return JsonResponse(Flight_Serializer(flight),safe=False)
        else:
            res=[] #create an empty list
            for flight in Flight.objects.all(): #run on every row in the table...
                res.append(Flight_Serializer(flight)) #append row by to row to res list
            return JsonResponse(res,safe=False) #return array as json response
    
@api_view(['GET'])
def airline_companies(request,id=-1):
    if request.method == 'GET':    #method get all
        if int(id) > -1: #get single product
            airline_company = Airline_Company.objects.get(id = id)
            return JsonResponse(Airline_Company_Serializer(airline_company),safe=False)
        else:
            res=[] #create an empty list
            for airline_company in Airline_Company.objects.all(): #run on every row in the table...
                res.append(Airline_Company_Serializer(airline_company)) #append row by to row to res list
            return JsonResponse(res,safe=False) #return array as json response

@api_view(['GET'])
def get_flights_by_parameters(request, origin_counry, detination_country, date ):
    res=[]
    for flights in Flight.objects.filter(
    origin_counry = origin_counry,
    detination_country = detination_country,
    date = date):
        res.append(Flight_Serializer(flights))
    return JsonResponse(res,safe=False) #return array as json response

@api_view(['GET'])
def countries(request,id=-1):
    if request.method == 'GET':    #method get all
        if int(id) > -1: #get single product
            country= Country.objects.get(id = id)
            return JsonResponse(Country_Serializer(country),safe=False)
        else: # return all
            res=[] #create an empty list
            for country in Country.objects.all(): #run on every row in the table...
                res.append(Country_Serializer(country)) #append row by to row to res list
            return JsonResponse(res,safe=False) #return array as json response
@api_view(['POST'])
def add_user(request):
    User.objects.create_user(
        username=request.data['username'],
        email=request.data['email'],
        password=request.data['password'],
        is_staff=request.data['is_staff'])
    return JsonResponse({"user created":request.data['username']} )
