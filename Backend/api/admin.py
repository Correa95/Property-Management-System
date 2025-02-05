from django.contrib import admin
from .models import Todo
# Register your models here.

class TodoAdmin(admin.ModelAdmin):
    list_display = ('title', 'status', 'priority', 'due_date', 'assigned_to')
    list_filter = ('status', 'priority', 'assigned_to')
    search_fields = ('title', 'description')

admin.site.register(Todo, TodoAdmin)
