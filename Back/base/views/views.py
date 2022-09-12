from sqlite3 import Date
from unicodedata import name
from django.http import JsonResponse
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from base.models import Airline_Company, Country, Customer, Flight, Ticket, User
import datetime
from base.serializer import Airline_Company_Serializer, Country_Serializer, CustomerSerializer, Flight_Serializer, Ticket_Serializer, User_Serializer, UserSerializer
from django.db.models.functions.datetime import TruncDay




def index(req):
    return JsonResponse('hello', safe=False)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['username'] = user.username
        token['username'] = user.username

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


# Register

# Make account
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
            user_id= request.user.id)
        return JsonResponse({'POST':"test"})
    else:
        return JsonResponse({'Error':"you need to register first"})

# customers CRUD
@api_view(['GET','POST','DELETE','PUT'])
@permission_classes([IsAuthenticated])
def get_customers(request,id=-1):
    user = request.user
    if user.is_superuser:
        if request.method == 'GET':    #method get all
            if int(id) > -1: #get single product
                customer= Customer.objects.get(id = id)
                return JsonResponse(CustomerSerializer(customer),safe=False)
            else:
                res=[] #create an empty list
                for customer in Customer.objects.all(): #run on every row in the table...
                    res.append(CustomerSerializer(customer)) #append row by to row to res list
                return JsonResponse(res,safe=False) #return array as json response
        if request.method == 'POST': #method post add new row
            Customer.objects.create(
                first_name = request.data['first_name'],
                last_name = request.data['last_name'],
                address = request.data['address'],
                phone_no=request.data['phone_no'],
                credit_card_no=request.data['credit_card_no'],
                user_id= User.objects.get(id =request.data['user_id']))
            return JsonResponse({'POST':"test"})
        if request.method == 'DELETE': #method delete a row
            temp= Customer.objects.get(id = id)
            temp.delete()
            return JsonResponse({'DELETE': id})
        if request.method == 'PUT': #method delete a row
            temp=Customer.objects.get(id = id)
            temp.first_name = request.data['first_name']
            temp.last_name = request.data['last_name']
            temp.address = request.data['address']
            temp.phone_no=request.data['phone_no']
            temp.credit_card_no=request.data['credit_card_no']
            temp.user= User.objects.get(id =request.data['user'])
            temp.save()
            return JsonResponse({'PUT': id})

# countries CRUD
# anonymus
@api_view(['GET','POST','DELETE','PUT'])
def auth_countries(request,id=-1):
    user = request.user
    if user.is_superuser :
        if request.method == 'POST': #method post add new row
            created = Country.objects.create(
                name = request.data['name'])
            return Response(Country_Serializer(created))
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

# tickets CRUD
# tickets anonymus
@api_view(['GET'])
def get_tickets(request,id=-1):
    if request.method == 'GET':    #method get all
        if int(id) > -1: #get single product
            ticket= Ticket.objects.get(id = id)
            return JsonResponse(Ticket_Serializer(ticket),safe=False)
        else:
            res=[] #create an empty list
            for ticket in Ticket.objects.all(): #run on every row in the table...
                res.append(Ticket_Serializer(ticket)) #append row by to row to res list
            return JsonResponse(res,safe=False) #return array as json response

# tickets authorized
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

  
# flights CRUD
#anonymus flights

#authorizied flights
@api_view(['GET','POST','DELETE','PUT'])
@permission_classes([IsAuthenticated])
def auth_flights(request,id=-1):
    user = request.user
    if user.is_staff :
        if request.method == 'GET':    #method get all
            if int(id) > -1: #get single product
                flight= Flight.objects.get(id = id)
                return JsonResponse(Flight_Serializer(flight),safe=False)
            else:
                res=[] #create an empty list
                for flight in Flight.objects.all(): #run on every row in the table...
                    res.append(Flight_Serializer(flight)) #append row by to row to res list
                return JsonResponse(res,safe=False) #return array as json response
        if request.method == 'POST': #method post add new row
                Flight.objects.create(
                    airline_company_id = Airline_Company.objects.get(name =request.data['airline_company_id']),
                    origin_country_id=Country.objects.get(name = request.data['origin_country_id']),
                    destination_country_id=Country.objects.get(name = request.data['destination_country_id']),
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
            temp.airline_company_id = Airline_Company.objects.get(id =request.data['airline_company_id'])
            temp.origin_country_id=Country.objects.get(id = request.data['origin_country_id'])
            temp.destination_country_id=Country.objects.get(id = request.data['destination_country_id'])
            temp.departure_time =request.data['departure_time']
            temp.landing_time =request.data['landing_time']
            temp.remaining_tickets =request.data['remaining_tickets']
            temp.save()
            return JsonResponse({'PUT': id})
    else:
        return JsonResponse({'Access':"unotherized"})  



#airline CRUD
@api_view(['GET','POST','DELETE','PUT'])
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
    user = request.user
    if user.is_superuser :
        if request.method == 'POST': #method post add new row
            Airline_Company.objects.create(
                name = request.data['name'],
                country_id = Country.objects.get(id = request.data['country_id']),
                user = User.objects.get(id = request.data['user']))
            return JsonResponse({'POST':"test"})
        if request.method == 'DELETE': #method delete a row
            temp= Airline_Company.objects.get(id = id)
            temp.delete()
            return JsonResponse({'DELETE': id})
        if request.method == 'PUT': #method PUT a row
            temp=Airline_Company.objects.get(id = id)
            temp.name = request.data['name'],
            temp.country_id = Country.objects.get(id = request.data['country_id'])
            temp.user = User.objects.get(id = request.data['user'])
            temp.save()
            return JsonResponse({'PUT': id})

#users CRUD
@api_view(['GET','POST','DELETE','PUT'])
@permission_classes([IsAuthenticated])
def users(request,id=-1):
    if request.method == 'GET':    #method get all
        if int(id) > -1: #get single product
            users = User.objects.get(id = id)
            return JsonResponse({
            "id":users.id,
            "username":users.username,
            "password":users.password,
            "email":users.email,
            },safe=False)
        else:
            users = User.objects.all()
            serializer = UserSerializer(users, many=True)
            return Response(serializer.data)
    if request.method == 'POST': #method post add new row
        User.objects.create(
            username = request.data['username'],
            password = request.data['password'],
            email = request.data['email'],
            )
        return JsonResponse({'POST':"test"})
    if request.method == 'DELETE': #method delete a row
        temp= User.objects.get(id = id)
        temp.delete()
        return JsonResponse({'DELETE': id})
    if request.method == 'PUT': #method PUT a row
        temp=User.objects.get(id = id)
        temp.username = request.data['username'],
        temp.email = request.data['email'],
        temp.password =  request.data['password'],
        temp.save()
        return JsonResponse({'PUT': id})


#@api_view(['GET','POST','DELETE','PUT'])
#def user_roles(request,id=-1):
#    if request.method == 'GET':    #method get all
#        if int(id) > -1: #get single product
#            user_roles = User_Role.objects.get(id = id)
#            return JsonResponse({
#            "id":user_roles.id,
#            "role_name":user_roles.role_name,
#            },safe=False)
#        else:
#            user_roles = User_Role.objects.all()
#            serializer = User_RoleSerializer (user_roles, many=True)
#            return Response(serializer.data)
#    if request.method == 'POST': #method post add new row
#        User.objects.create(
#            user_role = request.data['user_role'],)
#        return JsonResponse({'POST':"test"})
#    if request.method == 'DELETE': #method delete a row
#        temp= User_Role.objects.get(id = id)
#        temp.delete()
#        return JsonResponse({'DELETE': id})
#    if request.method == 'PUT': #method PUT a row
#        temp=User_Role.objects.get(id = id)
#        temp.role_name = id = request.data['role_name'],
#        temp.save()
#        return JsonResponse({'PUT': id})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_customsder_by_username(request, username):
    username = User.objects.get(username = username)
    customer = Customer.objects.get(user_id = username.id)
    return Response(CustomerSerializer(customer))


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_by_username(request,username):
        username = User.objects.get(username = username)
        return  JsonResponse(User_Serializer(username),safe=False)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_flights_by_airline_id(request, id):
    id = Airline_Company.objects.get(id = id)
    res=[] #create an empty list
    for flight in Flight.objects.filter(airline_company_id = id): #run on every row in the table...
        res.append(Flight_Serializer(flight)) #append row by to row to res list
    return JsonResponse(res,safe=False) #return array as json response

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_airline_by_username(request, username):
    username = User.objects.get(username = username)
    airline_Company = Airline_Company.objects.get(user_id = username.id)
    return JsonResponse(Airline_Company_Serializer(airline_Company),safe=False) #return array as json response

