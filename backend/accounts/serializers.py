from rest_framework import serializers

from .models import Users
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token

    def validate(self, attrs):
        data = super().validate(attrs)

        # 添加额外的返回信息
        data.update({
            'uid': self.user.id,
            'username': self.user.username,
            'email': self.user.email,
            'role': self.user.role,
            'name': self.user.name,
            # 可以继续添加更多你需要的用户信息
        })

        return data


class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ('username', 'email', 'role', 'name', 'id',)


class CreateUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(min_length=5, write_only=True)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = Users
        fields = ('username', 'password', 'password2',)

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError('两次输入的密码不一致')
        return data

    def create(self, validated_data):
        validated_data.pop('password2')
        user = Users.objects.create_user(**validated_data)
        return user
