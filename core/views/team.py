from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Q
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from core.models import CustomUser, Team, InviteToTeam, Captain
from core.permissions import IsCaptain
from core.serializers import TeamSerializer, InviteSerializer


class TeamDetail(APIView):
    """
    Возвращает просматриваемую команду
    """
    def get(self, request, teamId):
        team = Team.objects.get(id=teamId)
        serializer = TeamSerializer(team)
        return Response(serializer.data, status=status.HTTP_200_OK)


class PlayerTeamDetail(APIView):
    """
    Возвращает команду игрока
    """
    def get(self, request):
        if request.user.team:
            serializer = TeamSerializer(request.user.team)
            return Response(serializer.data)
        return Response(status=status.HTTP_400_BAD_REQUEST, data={"message": "Команда игрока не найдена"})


class UserInvite(APIView):
    def get(self, request):
        """
        Список приглашений
        """
        invites = InviteToTeam.objects.filter(user=request.user)
        serializer = InviteSerializer(invites, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        """
        Принимаем приглашение в команду
        """
        team = Team.objects.get(id=request.data["teamId"])
        # Проверяем наличие приглашения
        if InviteToTeam.objects.filter(user=request.user, team=team).exists():
            user = CustomUser.objects.get(id=request.user.id)
            user.team = team
            user.save()
            InviteToTeam.objects.get(user=request.user, team=team).delete()
            return Response(status=status.HTTP_200_OK, data={"message": "Вы присоединились к команде"})


class InvitePlayerToTeam(APIView):
    """
    Отправка приглашения в команду
    """
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
            return Response(status=status.HTTP_200_OK, data={"message": "Приглашение отправлено"})
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST, data={"message": "Такого игрока не существует"})


class RemovePlayerFromTeam(APIView):
    """
    Удаление игрока из команды
    """
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
            return Response(status=status.HTTP_400_BAD_REQUEST, data={"message": "Ошибка удаления игрока"})
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST, data={"message": "Такого игрока не существует"})


class LeaveFromTeam(APIView):
    """
    Выход из команды
    """
    def post(self, request):
        user = request.user
        if user.team:
            user.team = None
            user.save()
            if Captain.objects.filter(user=user).exists():
                Captain.objects.get(user=user).delete()
            return Response(status=status.HTTP_200_OK, data={"message": "Игрок вышел из команды"})
        return Response(status=status.HTTP_400_BAD_REQUEST, data={"message": "Неудачная попытка выхода"})


class ChangeCaptain(APIView):
    """
    Меняет капитана команды
    """
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
            return Response(status=status.HTTP_400_BAD_REQUEST, data={"message": "Произошла ошибка"})
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST, data={"message": "Такого игрока не существует"})


class ChangeTeamName(APIView):
    """
    Меняет название команды
    """

    permission_classes = (permissions.IsAuthenticated, IsCaptain)

    def post(self, request):
        user = request.user
        new_team_name = request.data["newTeamName"]
        if len(new_team_name.strip()) > 0:
            team = user.team
            team.name = new_team_name
            team.save()
            return Response(status=status.HTTP_200_OK, data={"message": "Название успешно изменено"})
        return Response(status=status.HTTP_400_BAD_REQUEST, data={"message": "Некорректное имя команды"})


class TeamList(APIView):
    """
    Возвращает список всех команд
    """
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        teams = Team.objects.all()
        serializer = TeamSerializer(teams, many=True)
        return Response(serializer.data)


class CreateTeam(APIView):
    """
    Создаем новую команду
    """

    def post(self, request):
        user = request.user
        team_name = request.data["teamName"]
        team, created = Team.objects.get_or_create(name=team_name)
        if created:
            print("Команда создана")
            user.team = team
            user.save()
            captain = Captain(team=team, user=user)
            captain.save()
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)














