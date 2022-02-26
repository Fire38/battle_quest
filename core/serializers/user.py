from rest_framework import serializers
from core.models import CustomUser


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ("id", "username", "captain")
