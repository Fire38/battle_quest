from django.db import models
from django.contrib.auth.models import AbstractUser


class Team(models.Model):
    name = models.CharField(max_length=100)
    logo = models.ImageField(upload_to="team_images", blank=True)

    def __str__(self):
        return self.name


class CustomUser(AbstractUser):
    avatar = models.ImageField(upload_to="profile_images", blank=True)
    team = models.ForeignKey(Team, related_name="members", on_delete=models.SET_NULL, blank=True, null=True)

    def __str__(self):
        return "Профиль {}".format(self.username)


class Captain(models.Model):
    team = models.OneToOneField(Team, on_delete=models.CASCADE, null=True, blank=True)
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return "{} капитан команды {}".format(self.user.username, self.team.name)


class InviteToTeam(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE, null=True, blank=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return "Приглашение от {} игроку {}".format(self.team.name, self.user.username)


class Game(models.Model):
    title = models.CharField(max_length=150)
    date = models.DateTimeField()
    teams = models.ManyToManyField(Team, related_name="teams")
    captain = models.BooleanField(default=False)
    author = models.OneToOneField(CustomUser, null=True, on_delete=models.SET_NULL)


