from django.contrib.auth import authenticate
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

import const
from .serializers import (
    MyTokenObtainPairSerializer,
    CreateUserSerializer,
    UsersSerializer,
    UserWriteSerializer, PasswordResetSerializer,
)
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


class UserDetailView(generics.RetrieveUpdateAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return UsersSerializer
        return UserWriteSerializer

    def get_object(self):
        if self.request.user.is_staff and 'pk' in self.kwargs:  # 如果用户是管理员且传入了 PK
            pk = self.kwargs.get('pk')
            return Users.objects.get(pk=pk)
        else:  # 如果用户是管理员但没有传入 PK，或者是普通用户
            return self.request.user


class ResetPasswordAPIView(generics.UpdateAPIView):
    queryset = Users.objects.all()
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = PasswordResetSerializer

    def update(self, request, *args, **kwargs):
        self.object = self.request.user
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            self.object = serializer.update(self.object, serializer.validated_data)
            return Response({"message": "密码已成功更新"}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
