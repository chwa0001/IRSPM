from django.db import models
# Create your models here.

class Exercise(models.Model):
    exercise_name           = models.CharField(max_length=50, unique=True)
    main_musclegroup        = models.CharField(max_length=30,blank=True,null=True)
    detailed_musclegroup    = models.CharField(max_length=30,blank=True,null=True)
    other_musclegroups      = models.CharField(max_length=100,blank=True,null=True)
    exercise_type           = models.CharField(max_length=30,blank=True,null=True)
    mechanics               = models.CharField(max_length=30,blank=True,null=True)
    equipment               = models.CharField(max_length=100,blank=True,null=True)
    difficulty              = models.CharField(max_length=20,blank=True,null=True)
    instruction_text        = models.TextField(blank=True,null=True)
    pic_url                 = models.TextField(blank=True,null=True)
    link_url                = models.URLField(blank=True,null=True)
    class Meta:
        db_table = 'EXERCISE'

class UserExerciseRating(models.Model): 
    userdata        = models.ForeignKey('AGRApi.UserData', on_delete=models.CASCADE)
    exercise        = models.ForeignKey(Exercise, on_delete=models.CASCADE)
    user_score      = models.FloatField(default=5)
    exercise_count  = models.IntegerField(default=1)
    class Meta:
        db_table = 'USER_EXERCISE'

class Routine(models.Model):
    userdata        = models.ForeignKey('AGRApi.UserData',on_delete=models.CASCADE)
    set_id          = models.IntegerField()
    date            = models.DateField()
    class Meta: 
        db_table = 'ROUTINE'

class RoutineExercises(models.Model):
    set_id          = models.ForeignKey(Routine, on_delete=models.CASCADE)
    Exercise        = models.ForeignKey(Exercise, on_delete=models.CASCADE)
    class Meta: 
        db_table = 'ROUTINE_EXERICSE'