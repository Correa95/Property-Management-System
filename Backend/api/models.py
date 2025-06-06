
from django.db import models
from django.utils.timezone import now 
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ValidationError
from django.core.validators import RegexValidator

# Create your models here.

VALID_BUILDINGS = [100, 200, 300, 400]
US_STATE_ABBREVIATIONS = {
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN',
    'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV',
    'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN',
    'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
}


def validate_building(value):
    if value <= 0:
        raise ValidationError("Building number must be a positive integer.")

def validate_us_state(value):
    if value.upper() not in US_STATE_ABBREVIATIONS:
        raise ValidationError(f"{value} is not a valid US state abbreviation.")
class User(models.Model):
    MANAGER = 'manager'
    ADMIN = 'admin'
    CLIENT = 'client'
    ROLE_CHOICES = [
        (MANAGER, 'Manager'),
        (ADMIN, 'Admin'),
        (CLIENT, 'Client'),
    ]
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(unique= True, max_length=254)
    userName = models.CharField(max_length=20)
    password = models.CharField(max_length=100,unique=True)

    def save(self, *args, **kwargs):
        if not self.pk or not self.password.startswith('pbkdf2_'):
            self.password = make_password(self.password)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    
class ApartmentComplex(models.Model):
    name = models.CharField(max_length=100, unique=True)
    street = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=2, validators=[validate_us_state])
    zipcode = models.CharField(
        max_length=10,
        validators=[RegexValidator(
            regex=r'^\d{5}(-\d{4})?$',
            message="Enter a valid US ZIP code (e.g. 12345 or 12345-6789)."
        )]
    )
    def unit_count(self):
        return Apartment.objects.filter(building__complex=self).count()
    def occupied_unit_count(self):
        return self.apartments.filter(is_available=False).count()
    def occupancy_rate(self):
        total = self.unit_count()
        return (self.occupied_unit_count() / total * 100) if total > 0 else 0
    def __str__(self):
        return f"{self.name} ({self.unit_count()} units)"
    
class Building(models.Model):
    complex = models.ForeignKey(ApartmentComplex, related_name="buildings", on_delete=models.CASCADE)
    building_number = models.PositiveIntegerField(validators=[validate_building])

    class Meta:
        unique_together = ("complex", "building_number")

    def __str__(self):
        return f"Building {self.building_number} - {self.complex.name}"
    
class Apartment(models.Model):
    building = models.ForeignKey(Building, related_name="apartments", on_delete=models.CASCADE)
    building_number = models.PositiveIntegerField(validators=[validate_building])
    unit_number = models.CharField(max_length=10)
    rent_amount = models.DecimalField(max_digits=10, decimal_places=2)
    num_bedrooms = models.PositiveIntegerField()
    square_footage = models.PositiveIntegerField()
    is_available = models.BooleanField(default=True)

    class Meta:
        unique_together = ("building", "unit_number")  
        
    def __str__(self):
        return f"{self.building.complex.name} - Bldg {self.building.building_number}, Unit {self.unit_number}"

    


class Tenant(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15)
    date_of_birth = models.DateField()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Lease(models.Model):
    apartment = models.OneToOneField(Apartment, on_delete=models.CASCADE)
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()
    monthly_rent = models.DecimalField(max_digits=8, decimal_places=2)
    security_deposit = models.DecimalField(max_digits=8, decimal_places=2)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"Lease for {self.apartment} with {self.tenant}"
    
class Payment(models.Model):
    lease = models.ForeignKey(Lease, on_delete=models.CASCADE, related_name="payments")
    payment_amount = models.DecimalField(max_digits=8, decimal_places=2)
    payment_date = models.DateField(default=now)
    CREDIT_CARD = 'Credit Card'
    BANK_TRANSFER = 'Bank Transfer'
    PAYMENT_METHOD_CHOICES = [
        (CREDIT_CARD, 'Credit Card'),
        (BANK_TRANSFER, 'Bank Transfer'),
    ]

    payment_method = models.CharField(max_length=50, choices=PAYMENT_METHOD_CHOICES)
    is_late_payment = models.BooleanField(default=False)

    def __str__(self):
        return f"Payment of {self.payment_amount} for {self.lease}"


    
class MaintenanceRequest(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE)
    description = models.TextField() 
    request_date = models.DateTimeField(auto_now_add=True) 
    status = models.CharField(
        max_length=20,
        choices=[('Pending', 'Pending'), ('In Progress', 'In Progress'), ('Completed', 'Completed')],
        default='Pending'
    )

    def __str__(self):
        return f"Request by {self.tenant.first_name} {self.tenant.last_name} - {self.status}"


class Document(models.Model):
    name = models.CharField(max_length=255)
    DOCUMENT_TYPES = [
        ('invoice', 'Invoice'),
        ('receipt', 'Receipt'),
        ('lease_agreement', 'Lease Agreement'),
        ('other', 'Other'),
    ]

    document_type = models.CharField(max_length=20, choices=DOCUMENT_TYPES)
    uploaded_file = models.FileField(upload_to='documents/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    
    

    def __str__(self):
        return f"{self.name} ({self.document_type})"
    
class Employee(models.Model):
    FULL_TIME = 'FT'
    PART_TIME = 'PT'
    CONTRACT = 'CT'

    EMPLOYEE_TYPE_CHOICES = [
        (FULL_TIME, 'Full-Time'),
        (PART_TIME, 'Part-Time'),
        (CONTRACT, 'Contract'),
    ]

    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20)
    employee_type = models.CharField(max_length=2, choices=EMPLOYEE_TYPE_CHOICES)
    salary = models.DecimalField(max_digits=10, decimal_places=2)  # monthly or hourly
    hourly_rate = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    start_date = models.DateField()

    street = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=2, validators=[validate_us_state])
    zipcode = models.CharField(
        max_length=10,
        validators=[RegexValidator(
            regex=r'^\d{5}(-\d{4})?$',
            message="Enter a valid US ZIP code (e.g. 12345 or 12345-6789)."
        )]
    )

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Payroll(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    pay_period_start = models.DateField()
    pay_period_end = models.DateField()
    gross_pay = models.DecimalField(max_digits=10, decimal_places=2)
    state_tax_rate = models.DecimalField(max_digits=5, decimal_places=4, default=0.05)
    federal_tax_rate = models.DecimalField(max_digits=5, decimal_places=4, default=0.10)
    deductions = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    net_pay = models.DecimalField(max_digits=10, decimal_places=2)
    is_paid = models.BooleanField(default=False)
    paid_on = models.DateField(null=True, blank=True)

    def save(self, *args, **kwargs):
        total_tax = (self.gross_pay * self.state_tax_rate) + (self.gross_pay * self.federal_tax_rate)
        self.deductions = total_tax
        self.net_pay = self.gross_pay - total_tax
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.employee.first_name} {self.employee.last_name} - {self.pay_period_end}"

    
    