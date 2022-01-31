from rest_framework import serializers
from core.models import Profile

from .team import TeamSerializer


class ProfileSerializer(serializers.ModelSerializer):
    team = TeamSerializer(read_only=True)

    class Meta:
        model = Profile
        fields = '__all__'
