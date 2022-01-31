from rest_framework import serializers
from django.contrib.auth.models import User

from core.serializers import ProfileSerializer, TeamSerializer


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)
    profile = ProfileSerializer(read_only=True)

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            password=validated_data["password"],
        )
        return user

    class Meta:
        model = User
        fields = ("id", "username", "password", "profile")
