from rest_framework import serializers, permissions
from core.models import Team
from .user import UserProfileSerializer


class TeamSerializer(serializers.ModelSerializer):
    members = UserProfileSerializer(read_only=True, many=True)

    class Meta:
        model = Team
        fields = ('id', 'name', 'logo', 'members')
