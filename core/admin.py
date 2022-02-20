from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import Team, InviteToTeam, CustomUser, Captain


class CustomUserAdmin(UserAdmin):
    fieldsets = (
        (None, {
            'fields': ('username', 'password')
        }),
        ('Personal info', {
            'fields': ('first_name', 'last_name', 'email')
        }),
        ('Permissions', {
            'fields': (
                'is_active', 'is_staff', 'is_superuser',
                'groups', 'user_permissions'
            )
        }),
        ('Important dates', {
            'fields': ('last_login', 'date_joined')
        }),
        ('Additional info', {
            'fields': ('team',)
        }))


admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Team)
admin.site.register(InviteToTeam)
admin.site.register(Captain)

