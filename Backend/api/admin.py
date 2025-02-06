from django.contrib import admin
# from django.contrib.auth.admin import AdminUser
from .models import AdminUser
# Register your models here.

class AdminUserAdmin(admin.ModelAdmin):  # Rename this class to avoid conflicts
    list_display = ('first_name', 'last_name', 'email', 'user_name')
    search_fields = ('first_name', 'last_name', 'email', 'user_name')

admin.site.register(AdminUser, AdminUserAdmin)
