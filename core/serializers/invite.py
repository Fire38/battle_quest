from rest_framework import serializers
from core.models import InviteToTeam
from core.serializers import TeamSerializer


class InviteSerializer(serializers.ModelSerializer):
    team = TeamSerializer(read_only=True)

    class Meta:
        model = InviteToTeam
        fields = "__all__"
