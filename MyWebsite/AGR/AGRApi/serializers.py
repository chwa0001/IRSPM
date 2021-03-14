from rest_framework import serializers
from .models import User,UserData,Exercise,UserExerciseRating,Routine,RoutineExercises


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
<<<<<<< HEAD
<<<<<<< HEAD
        fields = ('id','user','fitness_level','gender','goal','bmi','intensity')
=======
        fields = ('id','user','fitness_level','gender','goal','accomplishment','bmi','intensity')
>>>>>>> parent of cec25ce3 (remove gitignore files)
=======
        fields = ('id','user','fitness_level','gender','goal','accomplishment','bmi','intensity')
>>>>>>> parent of cec25ce3 (remove gitignore files)

class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = ('id','exercise_name','main_musclegroup','detailed_musclegroup','other_musclegroups',
                    'exercise_type','mechanics','equipment','difficulty','instruction_text','pic_no','link_url')

class RoutineSerializer (serializers.ModelSerializer):
    class Meta:
        model = Routine
        fields = ('id','userdata','set_id','date')

class RoutineExercisesSerializer (serializers.ModelSerializer):
    class Meta: 
        model = RoutineExercises
        fields = ('id','set_id','exercise_id')