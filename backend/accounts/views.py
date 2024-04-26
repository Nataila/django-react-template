from django.contrib.auth import authenticate
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

import const
from .serializers import MyTokenObtainPairSerializer, CreateUserSerializer, UsersSerializer
from .models import Users


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class CreateUserView(generics.CreateAPIView):
    queryset = Users.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = CreateUserSerializer


class UserListView(generics.ListAPIView):
    queryset = Users.objects.all()
    serializer_class = UsersSerializer
    permission_classes = (permissions.IsAuthenticated,)

