from django.db import models
from django.contrib.auth.models import User


class Team(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar = models.ImageField(upload_to="profile_images", blank=True)
    team = models.ForeignKey(Team, related_name="members", on_delete=models.SET_NULL, blank=True, null=True)

    def __str__(self):
        return "Профиль {}".format(self.user.username)


class Game(models.Model):
    title = models.CharField(max_length=150)
    date = models.DateTimeField()
    teams = models.ManyToManyField(Team, related_name="teams")
    captain = models.BooleanField(default=False)
    author = models.OneToOneField(User, null=True, on_delete=models.SET_NULL)


