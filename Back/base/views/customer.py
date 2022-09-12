from django.http import JsonResponse
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from base.models import Airline_Company, Country, Customer, Flight, Ticket, User
from base.serializer import Ticket_Serializer, UserSerializer, TicketSerializer



@api_view(['GET','POST','DELETE','PUT'])
@permission_classes([IsAuthenticated])
def update_cust(request,id):
    user = request.user
    if user.is_active:
        if request.method == 'PUT': #method delete a row
            temp=Customer.objects.get(id = id)
            temp.first_name = request.data['first_name'],
            temp.last_name = request.data['last_name'],
            temp.address = request.data['address'],
            temp.phone_no = request.data['phone_no'],
            temp.credit_card_no = request.data['credit_card_no'],
            temp.user= User.objects.get(id = user.Customer.id)
            temp.save()
        return JsonResponse({'PUT': id})
    

@api_view(['GET','POST','DELETE'])
@permission_classes([IsAuthenticated])
def auth_tickets(request,id=-1):
    user = request.user
    if user.is_active:
        if request.method == 'GET':    #method get all
                res=[] #create an empty list
                for ticket in Ticket.objects.filter(customer = user.customer.id): #run on every row in the table...
                    res.append(TicketSerializer().get_ticket(ticket)) #append row by to row to res list
                return JsonResponse(res,safe=False) #return array as json response
        if request.method == 'POST': #method post add new row
            Ticket.objects.create(
                flight = Flight.objects.get(id = request.data['flight']),
                customer = Customer.objects.get(id=user.customer.id))
            return JsonResponse({'POST':"test"})
        if request.method == 'DELETE': #method delete a row
            temp= Ticket.objects.get(id = id)
            temp.delete()
            return JsonResponse({'DELETE': id})
