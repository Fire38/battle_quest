from django.urls import path
from .views import *


urlpatterns = [
    path("teams_list/", TeamList.as_view()),
    path("get_player_team/", PlayerTeamDetail.as_view()),
    path("get_team/<int:teamId>/", TeamDetail.as_view()),
    path("invites/", UserInvite.as_view()),
    path("invite_to_team/", InvitePlayerToTeam.as_view()),
    path("remove_from_team/", RemovePlayerFromTeam.as_view()),
    path("change_captain/", ChangeCaptain.as_view()),
    path("change_team_name/", ChangeTeamName.as_view()),
    path("leave_from_team/", LeaveFromTeam.as_view()),
    path("create-team/", CreateTeam.as_view()),
]
