
from django.db import models
from django.utils.timezone import now 
from django.contrib.auth.hashers import make_password

# Create your models here.
class AdminUser(models.Model):
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

class Apartment(models.Model):
    name = models.CharField(max_length=100)
    address = models.TextField()
    unit_number = models.CharField(max_length=10)
    num_bedrooms = models.PositiveBigIntegerField()
    square_footage = models.PositiveIntegerField()
    is_available = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.name} - Unit {self.unit_number}"

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
    amount = models.DecimalField(max_digits=8, decimal_places=2)
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
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('In Progress', 'In Progress'),
        ('Completed', 'Completed'),
    ]
    apartment = models.ForeignKey(Apartment, on_delete=models.CASCADE)
    tenant = models.ForeignKey(Tenant, on_delete=models.SET_NULL, null=True, blank=True)
    request_date = models.DateField(default=now)
    description = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')

    def __str__(self):
        return f"Request for {self.apartment} - {self.status}"
    
