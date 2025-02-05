# from django.test import TestCase

# Create your tests here.
from django.test import TestCase
from api.models import Apartment, Tenant, Lease, Payment
from api.serializers import ApartmentSerializer, TenantSerializer, LeaseSerializer, PaymentSerializer
from datetime import date

class ApartmentSerializerTest(TestCase):
    def setUp(self):
        self.apartment = Apartment.objects.create(
            name="Sunrise Apartments",
            address="123 Main Street",
            unit_number="A101",
            num_bedrooms=2,
            num_bathrooms=2,
            square_footage=1000,
        )
    
    def test_apartment_serializer_data(self):
        serializer = ApartmentSerializer(self.apartment)
        self.assertEqual(serializer.data['name'], "Sunrise Apartments")

class TenantSerializerTest(TestCase):
    def setUp(self):
        self.tenant = Tenant.objects.create(
            first_name="John",
            last_name="Doe",
            email="john.doe@example.com",
            phone_number="1234567890",
            date_of_birth="1990-01-01"
        )

    def test_full_name(self):
        serializer = TenantSerializer(self.tenant)
        self.assertEqual(serializer.data['full_name'], "John Doe")

class LeaseSerializerTest(TestCase):
    def setUp(self):
        self.apartment = Apartment.objects.create(
            name="Sunrise Apartments",
            address="123 Main Street",
            unit_number="A101",
            num_bedrooms=2,
            num_bathrooms=2,
            square_footage=1000,
        )
        self.tenant = Tenant.objects.create(
            first_name="Jane",
            last_name="Doe",
            email="jane.doe@example.com",
            phone_number="9876543210",
            date_of_birth="1992-05-10"
        )
        self.lease = Lease.objects.create(
            apartment=self.apartment,
            tenant=self.tenant,
            start_date=date.today(),
            end_date=date.today().replace(year=date.today().year + 1),
            monthly_rent=1200.00,
            security_deposit=1200.00
        )

    def test_tenant_name_field(self):
        serializer = LeaseSerializer(self.lease)
        self.assertEqual(serializer.data['tenant_name'], "Jane Doe")

class PaymentSerializerTest(TestCase):
    def setUp(self):
        self.apartment = Apartment.objects.create(
            name="Sunrise Apartments",
            address="123 Main Street",
            unit_number="A101",
            num_bedrooms=2,
            num_bathrooms=2,
            square_footage=1000,
        )
        self.tenant = Tenant.objects.create(
            first_name="Mike",
            last_name="Smith",
            email="mike.smith@example.com",
            phone_number="4561237890",
            date_of_birth="1989-07-15"
        )
        self.lease = Lease.objects.create(
            apartment=self.apartment,
            tenant=self.tenant,
            start_date=date.today(),
            end_date=date.today().replace(year=date.today().year + 1),
            monthly_rent=1400.00,
            security_deposit=1400.00
        )
        self.payment = Payment.objects.create(
            lease=self.lease,
            amount=1400.00,
            payment_date=date.today(),
            payment_method="Credit Card"
        )

    def test_formatted_date(self):
        serializer = PaymentSerializer(self.payment)
        self.assertEqual(serializer.data['formatted_date'], date.today().strftime('%B %d, %Y'))

