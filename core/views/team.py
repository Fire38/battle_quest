from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response

from django.contrib.auth.models import User
from core.models import Team
from core.serializers import TeamSerializer


class UserTeam(APIView):
    def get(self, request):
        print(request.user.profile.team)
        user = User.objects.get(id=request.user.id)



class TeamList(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        teams = Team.objects.all()
        serializer = TeamSerializer(teams, many=True)
        print(serializer.data)
        return Response(serializer.data)



class TeamDetail(APIView):
    def get(self, request, pk):

        return Response