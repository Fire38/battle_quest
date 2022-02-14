from django.urls import path
from .views import TeamList, UserTeam, UserInvite


urlpatterns = [
    path("teams/", TeamList.as_view()),
    path("get_user_team/", UserTeam.as_view()),
    path("invites/", UserInvite.as_view()),
]