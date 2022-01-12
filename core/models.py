from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar = models.ImageField(upload_to="profile_images")


class Team(models.Model):
    name = models.CharField(max_length=100)
    members = models.ManyToManyField(User)


class Game(models.Model):
    title = models.CharField(max_length=150)
    date = models.DateTimeField()
    teams = models.ManyToManyField(Team, related_name="teams")
    captain = models.BooleanField(default=False)
    author = models.OneToOneField(User, null=True, on_delete=models.SET_NULL)


