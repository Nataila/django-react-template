import logging

from django.contrib.auth import authenticate
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import Users

logger = logging.getLogger('log')


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token

    def validate(self, attrs):
        data = super().validate(attrs)

        # 添加额外的返回信息
        data.update(
            {
                'uid': self.user.id,
                'username': self.user.username,
                'email': self.user.email,
                'role': self.user.role,
                'name': self.user.name,
                # 可以继续添加更多你需要的用户信息
            }
        )

        return data


class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = (
            'username',
            'email',
            'role',
            'name',
            'id',
        )


class UserWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = (
            'name',
        )


class CreateUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(min_length=5, write_only=True)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = Users
        fields = (
            'username',
            'password',
            'password2',
        )
        extra_kwargs = {
            'username': {
                'error_messages': {
                    'blank': '用户名不能为空',
                    'invalid': '输入的用户名无效',
                }
            },
            'password': {
                'error_messages': {
                    'blank': '密码不能为空',
                }
            },
        }

    def validate(self, data):
        logger.error('valid 校验密码')
        if data['password'] != data['password2']:
            raise serializers.ValidationError('两次输入的密码不一致')
        return data

    def create(self, validated_data):
        validated_data.pop('password2')
        user = Users.objects.create_user(**validated_data)
        return user


class PasswordResetSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
    new_password2 = serializers.CharField(required=True)

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not authenticate(username=user.username, password=value):
            raise serializers.ValidationError("原密码不正确")
        return value

    def validate(self, data):
        if data['new_password'] != data['new_password2']:
            raise serializers.ValidationError({"confirm_new_password": "两次输入的新密码不匹配"})
        return data

    def update(self, instance, validated_data):
        instance.set_password(validated_data['new_password'])
        instance.save()
        return instance
