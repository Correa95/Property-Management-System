from django.contrib import admin
# from django.contrib.auth.admin import AdminUser
from .models import AdminUser, Apartment, Tenant, Lease, Payment
# Register your models here.

class UserAdmin(admin.ModelAdmin):  # Rename this class to avoid conflicts
    list_display = ('first_name', 'last_name', 'user_email', 'user_name')
    search_fields = ('first_name', 'last_name', 'user_email', 'user_name')

admin.site.register(AdminUser, UserAdmin)
admin.site.register(Apartment, UserAdmin)
admin.site.register(Tenant, UserAdmin)
admin.site.register(Lease, UserAdmin)
admin.site.register(Payment, UserAdmin)
