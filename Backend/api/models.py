
from django.db import models
from django.utils.timezone import now 

# Create your models here.

class Apartment(models.Model):
    name = models.CharField(max_length=100)
    address = models.TextField()
    unit_number = models.CharField(max_length=10)
    num_bedrooms = models.PositiveBigIntegerField()
    num_bathrooms = models.PositiveBigIntegerField()
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
    
class Todo(models.Model):
    TASK_STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ]
        
    PRIORITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
        ]
        
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    due_date = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=TASK_STATUS_CHOICES, default='pending')
    priority = models.CharField(max_length=20, choices=PRIORITY_CHOICES, default='medium')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    assigned_to = models.ForeignKey(User, related_name='todos', on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
            return self.title

    class Meta:
        ordering = ['due_date']