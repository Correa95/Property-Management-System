from django.contrib import admin
from .models import AdminUser, Apartment, Tenant, Lease, Payment

# Customize the admin interface for AdminUser
class AdminUserAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'user_email', 'user_name')
    # search_fields = ('first_name', 'last_name', 'user_email', 'user_name')

# Customize the admin interface for other models if needed
class ApartmentAdmin(admin.ModelAdmin):
    list_display = ('address', 'monthly_rent', 'available')  # Add appropriate fields
    search_fields = ('address',)

class TenantAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'email', 'phone_number')  # Add appropriate fields
    search_fields = ('full_name',)

class LeaseAdmin(admin.ModelAdmin):
    list_display = ('tenant', 'apartment', 'start_date', 'end_date')  # Add appropriate fields
    search_fields = ('tenant__full_name', 'apartment__address')

class PaymentAdmin(admin.ModelAdmin):
    list_display = ('tenant', 'lease', 'payment_date', 'amount_paid')  # Add appropriate fields
    search_fields = ('tenant__full_name', 'lease__apartment__address')

# Register models with their corresponding admin classes
admin.site.register(AdminUser, AdminUserAdmin)
admin.site.register(Apartment, ApartmentAdmin)
admin.site.register(Tenant, TenantAdmin)
admin.site.register(Lease, LeaseAdmin)
admin.site.register(Payment, PaymentAdmin)
