from django.contrib import admin

from accounts.models import Users


class UsersAdmin(admin.ModelAdmin):
    list_display = (
        'username',
        'email',
    )
    list_filter = ('username',)
    search_fields = (
        'username',
        'email',
    )


admin.site.register(Users, UsersAdmin)
