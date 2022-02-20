from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response

from django.contrib.auth.models import User
from core.models import CustomUser, Team, InviteToTeam
from core.serializers import TeamSerializer, InviteSerializer


class UserTeam(APIView):
    def get(self, request):
        user = CustomUser.objects.get(id=request.user.id)
        if user.team:
            serializer = TeamSerializer(user.team)
            return Response(serializer.data)
        else:
            return Response(data={"team": False})


class UserInvite(APIView):
    def get(self, request):
        invites = InviteToTeam.objects.filter(user=request.user)
        serializer = InviteSerializer(invites, many=True)
        return Response(serializer.data)

    def post(self, request):
        team = Team.objects.get(id=request.data["teamId"])
        # Проверяем наличие приглашения
        if InviteToTeam.objects.filter(user=request.user, team=team).exists():
            user = CustomUser.objects.get(id=request.user.id)
            user.team = team
            user.save()
            InviteToTeam.objects.get(user=request.user, team=team).delete()
            return Response()


class TeamList(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        teams = Team.objects.all()
        serializer = TeamSerializer(teams, many=True)
        return Response(serializer.data)


class TeamDetail(APIView):
    def get(self, request):

        return Response