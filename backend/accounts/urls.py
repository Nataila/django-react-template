#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Author: cc
# @Date  :2024-04-23

from django.urls import path
from .views import CreateUserView, MyTokenObtainPairView, UserListView, UserDetailView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('users/', UserListView.as_view(), name='user-list'),
    path('user/', UserDetailView.as_view(), name='current-user-detail'),
    path('user/<str:pk>/', UserDetailView.as_view(), name='user-detail'),
    path('register/', CreateUserView.as_view(), name='register'),
    path('login/', MyTokenObtainPairView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
