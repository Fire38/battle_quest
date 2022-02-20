from rest_framework import serializers
from  core.models import CustomUser

from core.serializers import TeamSerializer


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)
    captain = serializers.BooleanField(default=False)

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data["username"],
            password=validated_data["password"],
        )
        return user

    class Meta:
        model = CustomUser
        fields = ("id", "username", "password", "team", "captain")
