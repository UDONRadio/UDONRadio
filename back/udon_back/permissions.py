from rest_framework import permissions
from django.conf import settings

class IsAdherentUser(permissions.BasePermission):

    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_adherent

class IsLiquidsoap(permissions.BasePermission):

    def has_permission(self, request, view):
        return settings.LIQUIDSOAP_BRIDGE
