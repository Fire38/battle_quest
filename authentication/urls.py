from django.urls import path
from rest_framework_simplejwt import views
from .views import UserCreate, GetUser


urlpatterns = [
    path("user/create/", UserCreate.as_view()),
    path("token/obtain/", views.TokenObtainPairView.as_view()),
    path("token/refresh/", views.TokenRefreshView.as_view()),
    path("get_user/", GetUser.as_view()),

]