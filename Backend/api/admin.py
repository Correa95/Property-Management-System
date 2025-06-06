from django.contrib import admin
from .models import User, Apartment, Tenant, Lease, Payment, ApartmentComplex, Building, MaintenanceRequest, Document, Employee, Payroll

# Register your models here.

# Customize the admin interface for AdminUser
class UserAdmin(admin.ModelAdmin):
    read_only_fields = ('first_name', 'last_name', 'user_email', 'user_name')

class ApartmentComplexAdmin(admin.ModelAdmin):
    read_only_fields = ("name", "address")
    search_fields = ("address", "name")

class BuildingAdmin(admin.ModelAdmin):
    read_only_fields = ("building_number", "complex")
    search_fields = ("building_number", "complex__name")

class ApartmentAdmin(admin.ModelAdmin):
    read_only_fields = ('address', 'monthly_rent', "unit_number" "building_Number", 'available')  
    search_fields = ('address',"building_Number","unit_number")

class TenantAdmin(admin.ModelAdmin):
    read_only_fields = ('full_name', 'email', 'phone_number',"last_name","date_of_birth")  
    search_fields = ('full_name',"phone_number","date_of_birth","last_name")

class LeaseAdmin(admin.ModelAdmin):
    read_only_fields = ('tenant', 'apartment', 'start_date', 'end_date'," monthly_rent")  
    search_fields = ("tenant","full_name", 'unit_number')

class PaymentAdmin(admin.ModelAdmin):
    read_only_fields = ('tenant', 'lease', 'payment_date', 'payment_amount')  
    search_fields = ("tenant","full_name", "lease","address")

class DocumentAdmin(admin.ModelAdmin):
    list_display = ('name', 'document_type', 'uploaded_at')
    list_filter = ('document_type', 'uploaded_at')
    search_fields = ('name',)
    
class MaintenanceRequestAdmin(admin.ModelAdmin):
    list_display = ('tenant', 'description', 'request_date', 'status')
    list_filter = ('status', 'request_date')
    search_fields = ('tenant__first_name', 'tenant__last_name', 'description')

class EmployeeAdmin(admin.ModelAdmin):
    list_display = ('id', 'first_name', 'last_name', 'email', 'employee_type', 'salary', 'start_date', 'city', 'state')
    list_filter = ('employee_type', 'state', 'start_date')
    search_fields = ('first_name', 'last_name', 'email', 'phone')
    ordering = ('-start_date',)
    readonly_fields = ('start_date',)

class PayrollAdmin(admin.ModelAdmin):
    list_display = ('id', 'employee', 'pay_period_start', 'pay_period_end', 'gross_pay', 'deductions', 'net_pay', 'is_paid', 'paid_on')
    list_filter = ('is_paid', 'pay_period_end')
    search_fields = ('employee__first_name', 'employee__last_name')
    ordering = ('-pay_period_end',)
    readonly_fields = ('net_pay',)
# Register models with their corresponding admin classes
admin.site.register(ApartmentComplex, ApartmentComplexAdmin),
admin.site.register(Building, BuildingAdmin),
admin.site.register(User, UserAdmin)
admin.site.register(Apartment, ApartmentAdmin)
admin.site.register(Tenant, TenantAdmin)
admin.site.register(Lease, LeaseAdmin)
admin.site.register(Payment, PaymentAdmin)
admin.site.register(MaintenanceRequest, MaintenanceRequestAdmin)
admin.site.register(Document, DocumentAdmin)
admin.site.register(Payroll, PayrollAdmin)
admin.site.register(Employee, EmployeeAdmin)
