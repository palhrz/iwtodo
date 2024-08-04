from django.contrib import admin
from .models import Todo

class TodoAdmin(admin.ModelAdmin):
    list_display = ('title', 'completed', 'due_date', 'notifications_enabled')
    list_filter = ('completed', 'notifications_enabled')
    search_fields = ('title', 'description')

# Register your models here.

admin.site.register(Todo, TodoAdmin)
