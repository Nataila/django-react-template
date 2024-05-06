from enum import Enum

from django.contrib.auth.models import AbstractUser
from django.db import models
from model_utils.models import UUIDModel

genders_choice = [("m", "男"), ("f", "女")]

roles_choice = [(0, '角色1'), (1, '角色2')]


class Users(AbstractUser, UUIDModel):
    name = models.CharField(max_length=50, null=True, blank=True, verbose_name="名字")
    gender = models.CharField(
        null=True,
        blank=True,
        max_length=10,
        choices=genders_choice,
        default='m',
        verbose_name="性别",
    )
    info = models.CharField(
        null=True,
        blank=True,
        max_length=255,
        verbose_name="个人简介",
        help_text="一句话介绍自己，不要超过250字",
    )
    role = models.IntegerField(choices=roles_choice, default=1, verbose_name="角色")

    def __str__(self):
        return self.username

    class Meta:
        db_table = 'user'
        verbose_name = '用户'
        verbose_name_plural = '用户'
