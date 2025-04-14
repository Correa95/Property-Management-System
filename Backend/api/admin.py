from django.contrib import admin
from .models import User, Apartment, Tenant, Lease, Payment, ApartmentComplex, Building

# Register your models here.

# Customize the admin interface for AdminUser
class UserAdmin(admin.ModelAdmin):
    read_only_fields = ('first_name', 'last_name', 'user_email', 'user_name')
    # search_fields = ('first_name', 'last_name', 'user_email', 'user_name')
    # readonly_fields = ("id", "upload_timestamp")

class ApartmentComplexAdmin(admin.ModelAdmin):
    read_only_fields = ("name", "address")
        # list_display = ("name", "address", "unit_count", "occupied_unit_count", "occupancy_rate")
    search_fields = ("address", "name")

class BuildingAdmin(admin.ModelAdmin):
    read_only_fields = ("building_number", "complex")
    # list_filter = ("complex",)
    search_fields = ("building_number", "complex__name")

# Customize the admin interface for other models if needed
class ApartmentAdmin(admin.ModelAdmin):
    read_only_fields = ('address', 'monthly_rent', "building_Number", 'available')  # Add appropriate fields
    search_fields = ('address',"building_Number")

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
admin.site.register(Building, BuildingAdmin),
admin.site.register(User, UserAdmin)
admin.site.register(Apartment, ApartmentAdmin)
admin.site.register(Tenant, TenantAdmin)
admin.site.register(Lease, LeaseAdmin)
admin.site.register(Payment, PaymentAdmin)
