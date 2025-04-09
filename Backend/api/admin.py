from django.contrib import admin
from .models import User, Apartment, Tenant, Lease, Payment, ApartmentComplex

# Register your models here.

# Customize the admin interface for AdminUser
class UserAdmin(admin.ModelAdmin):
    read_only_fields = ('first_name', 'last_name', 'user_email', 'user_name')
    # search_fields = ('first_name', 'last_name', 'user_email', 'user_name')
    # readonly_fields = ("id", "upload_timestamp")

# class ApartmentComplexAdmin(admin.ModelAdmin):
#     read_only_fields = ("name", "address")
#     search_fields = ("address", "name")

# Customize the admin interface for other models if needed
class ApartmentAdmin(admin.ModelAdmin):
    read_only_fields = ('address', 'monthly_rent', 'available')  # Add appropriate fields
    search_fields = ('address',)

class TenantAdmin(admin.ModelAdmin):
    read_only_fields = ('full_name', 'email', 'phone_number')  # Add appropriate fields
    search_fields = ('full_name',"phone_number")

class LeaseAdmin(admin.ModelAdmin):
    read_only_fields = ('tenant', 'apartment', 'start_date', 'end_date')  # Add appropriate fields
    search_fields = ('tenant__full_name', 'unit_number')

class PaymentAdmin(admin.ModelAdmin):
    read_only_fields = ('tenant', 'lease', 'payment_date', 'amount_paid')  # Add appropriate fields
    search_fields = ('tenant__full_name', 'lease__apartment__address')

# Register models with their corresponding admin classes
admin.site.register(ApartmentComplex, ApartmentComplexAdmin),
admin.site.register(User, UserAdmin)
admin.site.register(Apartment, ApartmentAdmin)
admin.site.register(Tenant, TenantAdmin)
admin.site.register(Lease, LeaseAdmin)
admin.site.register(Payment, PaymentAdmin)
