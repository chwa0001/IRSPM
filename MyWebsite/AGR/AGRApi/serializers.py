from rest_framework import serializers
from .models import User,UserData


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'code', 'fullname','DOB','username', 'password', 'created_at')

class UpdateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('fullname','DOB','username', 'password')

class UserDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserData
        fields = ('id','user','fitness_level','gender','goal','accomplishment','bmi','intensity')

class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserData
        fields = ('id','user','fitness_level','gender','goal','accomplishment','bmi','intensity')

