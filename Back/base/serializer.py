from rest_framework.serializers import ModelSerializer
from base.models import Airline_Company, Country, Customer, Flight, Ticket, User

class FlightSerializer(ModelSerializer):
    class Meta:
        model = Flight
        fields = '__all__'
def Flight_Serializer(flight):
        return {
        "id":flight.id,
        "airline_company":flight.airline_company.name,
        "origin_country":flight.origin_country.name,
        "destination_country":flight.destination_country.name,
        "departure_time":flight.departure_time,
        "landing_time":flight.landing_time,
        "remaining_tickets":flight.remaining_tickets
        }

def CustomerSerializer(customer):
    return {
        "id":customer.id,
        "first_name":customer.first_name,
        "last_name":customer.last_name,
        "address":customer.address,
        "phone_no":customer.phone_no,
        "credit_card_no":customer.credit_card_no,
        "user":customer.user.id
        
        
    }

def Ticket_Serializer(ticket):
        return {
            "id":ticket.id,
            "flight":ticket.flight,
            "customer":ticket.customer.id
        }

class TicketSerializer(ModelSerializer):
    class Meta:
        model = Ticket
        fields = '__all__'

    def get_ticket(self, obj):
        return {
            "id":obj.id,
            "flight":self.get_flight(obj.flight),
            "customer":self.get_customer(obj.customer)
        }    
    def get_flight(self, obj):
        return {
            "id":obj.id,
            "airline_company":self.get_airline_company(obj.airline_company),
            "origin_country":self.get_country_ser(obj.origin_country),
            "destination_country":self.get_country_ser(obj.destination_country),
            "departure_time":obj.departure_time,
            "landing_time":obj.landing_time,
            "remaining_tickets":obj.remaining_tickets
        }
    def get_airline_company(self, obj):
        return {
            "id":obj.id,
            "name":obj.name,
            "country":self.get_country_ser(obj.country),
            "user":self.get_user(obj.user)
        }
    def get_country_ser(self, obj):
        return {
        "id": obj.id,
        "name": obj.name
        }
    def get_customer(self, obj):
        return {
            "id":obj.id,
            #"first_name":obj.first_name,
            #"last_name":obj.last_name,
            #"address":obj.address,
            #"phone_no":obj.phone_no,
            #"credit_card_no":obj.credit_card_no,
            #"user":self.get_user(obj.user)            
        }    
    def get_user(self, obj):
        return {
            "id":obj.id,
            #"username":obj.username,
            #"password":obj.password,
            #"email":obj.email,
            #"user_role":self.user_role_ser(obj.user_role)
        }


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
def User_Serializer(user):
        return {
            "id":user.id,
            "username":user.username,
            "email":user.email,

        }

def Country_Serializer(country):
        return {
        "id": country.id,
        "name": country.name
        }
class CountrySerializer(ModelSerializer):
    class Meta:
        model = Country
        fields = '__all__'
    

class Airline_CompanySerializer(ModelSerializer):
    class Meta:
        model = Airline_Company
        fields = '__all__'


def Airline_Company_Serializer(airline_company):
        return {
            "id":airline_company.id,
            "name":airline_company.name,
            "country":airline_company.country.name,
            "user":airline_company.user.id
        }


def get_user_ser(self, obj):
        return {
            "id":obj.id,
            "username":obj.username,
            "password":obj.password,
            "email":obj.email,
            "user_role":self.user_role_ser(obj.user_role)    
        }

