
from django.db import models
from django.utils.timezone import now 
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ValidationError

# Create your models here.

VALID_BUILDINGS = [100, 200, 300, 400]

def validate_building(value):
    if value not in VALID_BUILDINGS:
        raise ValidationError(f"Building number must be one of {VALID_BUILDINGS}")

class User(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    user_email = models.EmailField(unique= True, max_length=254)
    user_name = models.CharField(max_length=20)
    user_password = models.CharField(max_length=100,unique=True)

    def save(self, *args, **kwargs):
        # Hash the password before saving
        if not self.pk or 'user_password' in self.get_dirty_fields():
            self.user_password = make_password(self.user_password)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    
class ApartmentComplex(models.Model):
    name = models.CharField(max_length=100, unique=True)
    address = models.TextField()

    def unit_count(self):
        return self.apartments.count()
    
    def occupied_unit_count(self):
        return self.apartments.filter(is_available=False).count()
    
    def occupancy_rate(self):
        total = self.unit_count()
        return (self.occupied_unit_count() / total * 100) if total > 0 else 0

    def __str__(self):
        return f"{self.name} ({self.unit_count()} units)"
    
class Apartment(models.Model):
    complex = models.ForeignKey(ApartmentComplex, related_name="apartments", on_delete=models.CASCADE)
    rent_amount = models.DecimalField(max_digits=8, decimal_places=2)

    unit_number = models.CharField(max_length=10)  
    # building_number = models.PositiveIntegerField()
    building_number = models.PositiveIntegerField(validators=[validate_building])

    num_bedrooms = models.PositiveIntegerField()
    square_footage = models.PositiveIntegerField()
    is_available = models.BooleanField(default=True)

    class Meta:unique_together = (("complex", "unit_number"),  # Ensure unique unit numbers per complex
     ("complex", "building_number"))  # Optional but helpful if needed
        
   

    def __str__(self):
         return f"{self.complex.name} - Bldg {self.building_number}, Unit {self.unit_number}"
    


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
    lease = models.ForeignKey(Lease, on_delete=models.CASCADE)
    Payment_amount = models.DecimalField(max_digits=8, decimal_places=2)
    payment_date = models.DateField(default=now)
    CREDIT_CARD = 'Credit Card'
    BANK_TRANSFER = 'Bank Transfer'
    PAYMENT_METHOD_CHOICES = [
    (CREDIT_CARD, 'Credit Card'),
    (BANK_TRANSFER, 'Bank Transfer'),
]
    payment_method = models.CharField(max_length=50, choices=[
        ('Credit Card', 'Credit Card'),
        ('Bank Transfer', 'Bank Transfer'),\
    ])
    is_late_payment = models.BooleanField(default=False)

    def __str__(self):
        return f"Payment of {self.amount} for {self.lease}"
    
class MaintenanceRequest(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE)
    description = models.TextField()  # Issue description
    request_date = models.DateTimeField(auto_now_add=True)  # Date of request
    status = models.CharField(
        max_length=20,
        choices=[('Pending', 'Pending'), ('In Progress', 'In Progress'), ('Completed', 'Completed')],
        default='Pending'
    )

    def __str__(self):
        return f"Request by {self.tenant.first_name} {self.tenant.last_name} - {self.status}"

    
