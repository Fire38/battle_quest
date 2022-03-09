from rest_framework import permissions

from .models import Captain


class IsCaptain(permissions.BasePermission):
    """
    Проверка капитан ли совершает запрос
    """

    def has_permission(self, request, view):
        return Captain.objects.filter(user=request.user).exists()

