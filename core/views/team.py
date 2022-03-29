from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Q
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from core.models import CustomUser, Team, InviteToTeam, Captain
from core.permissions import IsCaptain
from core.serializers import TeamSerializer, InviteSerializer


class TeamDetail(APIView):
    def get(self, request, teamId):
        team = Team.objects.get(id=teamId)
        serializer = TeamSerializer(team)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserInvite(APIView):
    def get(self, request):
        invites = InviteToTeam.objects.filter(user=request.user)
        serializer = InviteSerializer(invites, many=True)
        return Response(serializer.data)

    def post(self, request):
        """ Принимаем приглашение в команду """
        team = Team.objects.get(id=request.data["teamId"])
        # Проверяем наличие приглашения
        if InviteToTeam.objects.filter(user=request.user, team=team).exists():
            user = CustomUser.objects.get(id=request.user.id)
            user.team = team
            user.save()
            InviteToTeam.objects.get(user=request.user, team=team).delete()
            return Response()


class InvitePlayerToTeam(APIView):
    permission_classes = (permissions.IsAuthenticated, IsCaptain)

    def post(self, request):
        user = request.user
        invited_player_data = request.data["invitedPlayer"]
        try:
            invited_player_id = int(invited_player_data)
        except ValueError:
            invited_player_id = None
        try:
            invited_player = CustomUser.objects.get(Q(id=invited_player_id) | Q(username=invited_player_data))
            # если приглашение есть или игрок уже в этой команде
            if InviteToTeam.objects.filter(user=invited_player, team=user.team).exists() or \
                    invited_player.team == user.team:
                return Response(status=status.HTTP_400_BAD_REQUEST, data={'message': 'Приглашение уже есть '
                                                                                     'или игрок в команде'})
            invite = InviteToTeam(user=invited_player, team=user.team)
            invite.save()
            return Response(status=status.HTTP_200_OK, data={"message": "Приглашение создано"})
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST, data={"message": "Такого игрока не существует"})


class RemovePlayerFromTeam(APIView):
    permission_classes = (permissions.IsAuthenticated, IsCaptain)

    def post(self, request):
        user = request.user
        removed_player_data = request.data["removedPlayer"]
        try:
            removed_player_id = int(removed_player_data)
        except ValueError:
            removed_player_id = None
        try:
            removed_player = CustomUser.objects.get(Q(id=removed_player_id) | Q(username=removed_player_data))
            if removed_player.team == user.team:
                removed_player.team = None
                removed_player.save()
                return Response(status=status.HTTP_200_OK, data={"message": "Игрок удален из команды"})
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST, data={"message": "Такого игрока не существует"})


class LeaveFromTeam(APIView):
    def post(self, request):
        user = request.user
        if user.team:
            user.team = None
            user.save()
            return Response(status=status.HTTP_200_OK, data={"message": "Игрок вышел из команды"})
        return Response(status=status.HTTP_400_BAD_REQUEST, data={"message": "Неудачная попытка выхода"})


class ChangeCaptain(APIView):
    permission_classes = (permissions.IsAuthenticated, IsCaptain)

    def post(self, request):
        user = request.user
        assign_player_data = request.data["assignedPlayer"]
        try:
            assign_player_id = int(assign_player_data)
        except ValueError:
            assign_player_id = None
        try:
            assign_player = CustomUser.objects.get(Q(id=assign_player_id) | Q(username=assign_player_data))
            if assign_player.team == user.team:
                cap = Captain.objects.get(team=user.team, user=user)
                cap.user = assign_player
                cap.save()
                return Response(status=status.HTTP_200_OK, data={"message": "Новый капитан назначен"})
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST, data={"message": "Такого игрока не существует"})


class ChangeTeamName(APIView):
    permission_classes = (permissions.IsAuthenticated, IsCaptain)

    def post(self, request):
        user = request.user
        new_team_name = request.data["newTeamName"]
        if len(new_team_name) > 0:
            team = user.team
            team.name = new_team_name
            team.save()
            return Response()
        return Response()


class TeamList(APIView):
    """
        Возвращает список всех команд
    """
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        teams = Team.objects.all()
        serializer = TeamSerializer(teams, many=True)
        return Response(serializer.data)

        return Response(status=status.HTTP_400_BAD_REQUEST)

















