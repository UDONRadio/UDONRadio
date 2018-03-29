from djoser.serializers import UserSerializer as _UserSerializer
from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()

class UserSerializer(_UserSerializer):

    is_adherent = serializers.BooleanField()

    class Meta:
        model = User
        read_only_fields = (
            User.USERNAME_FIELD,
            'is_staff',
            'is_adherent',
        )
        fields = tuple(User.REQUIRED_FIELDS) + (
            User._meta.pk.name,
        ) + read_only_fields
