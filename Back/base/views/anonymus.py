from django.http import HttpResponse, JsonResponse
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from base.models import Airline_Company, Country, Customer, Flight, Ticket, User

from base.serializer import Airline_Company_Serializer, Country_Serializer, CustomerSerializer, Flight_Serializer, Ticket_Serializer, UserSerializer
 
# Register
@api_view(['POST'])
def airline_register(request):
    username= request.data['username']
    password= request.data['password']
    name= request.data['name']
    country= Country.objects.get(name = request.data['country'])
    is_staff= True
    user= User.objects.create_user(username=username, password=password, is_staff=is_staff)
    Airline_Company.objects.create(name=name, country=country, user=user)
    return Response({"registerer":"successfully"})

@api_view(['POST'])
def customer_register(request):
        username= request.data['username']
        password= request.data['password']
        first_name = request.data['first_name']
        last_name = request.data['last_name']
        address = request.data['address']
        phone_no=request.data['phone_no']
        credit_card_no=request.data['credit_card_no']
        is_staff=False
        user = User.objects.create_user(username=username, password=password,is_staff=is_staff)
        Customer.objects.create(first_name=first_name, last_name=last_name, address=address, phone_no=phone_no, credit_card_no=credit_card_no, user=user)
        return Response("registered successfully")

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['is_staff'] = user.is_staff
        token['is_superuser'] = user.is_superuser

        # ...
        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh',
    ]
    return Response(routes)


@api_view(['GET','POST','DELETE','PUT'])
@permission_classes([IsAuthenticated])
def add_customer(request):
    user = request.user
    if user.is_active :    
        Customer.objects.create(
            first_name = request.data['first_name'],
            last_name = request.data['last_name'],
            address = request.data['address'],
            phone_no=request.data['phone_no'],
            credit_card_no=request.data['credit_card_no'],
            user= request.user.id)
        return JsonResponse({'POST':"test"})


