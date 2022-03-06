from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q
from django.core.exceptions import ObjectDoesNotExist

from django.contrib.auth.models import User
from core.models import CustomUser, Team, InviteToTeam, Captain
from core.serializers import TeamSerializer, InviteSerializer

from core.validators import is_captain

class UserTeam(APIView):
    def get(self, request):
        user = CustomUser.objects.get(id=request.user.id)
        if user.team:
            serializer = TeamSerializer(user.team)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


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
    def post(self, request):
        user = request.user
        if is_captain(user):
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
        return Response(status=status.HTTP_400_BAD_REQUEST, data={"message": "Ошибка приглашения, не капитан"})


class RemovePlayerFromTeam(APIView):
    def post(self, request):
        user = request.user
        if is_captain(user):
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
        return Response(status=status.HTTP_400_BAD_REQUEST, data={"message": "Неудачная попытка удаления"})


class LeaveFromTeam(APIView):
    def post(self, request):
        user = request.user
        if user.team:
            user.team = None
            user.save()
            return Response(status=status.HTTP_200_OK, data={"message": "Игрок вышел из команды"})
        return Response(status=status.HTTP_400_BAD_REQUEST, data={"message": "Неудачная попытка выхода"})


class ChangeCaptain(APIView):
    def post(self, request):
        user = request.user
        if is_captain(user):
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
        return Response(status=status.HTTP_400_BAD_REQUEST, data={"message": "Неудачная попытка назначения капитана"})


class ChangeTeamName(APIView):
    def post(self, request):
        user = request.user
        new_team_name = request.data["newTeamName"]
        if is_captain(user) and len(new_team_name) > 0:
            team = user.team
            team.name = new_team_name
            team.save()
            return Response()
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