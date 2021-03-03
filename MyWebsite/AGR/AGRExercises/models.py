from django.db import models

# Create your models here.

class Exercise(models.Model):
    exercise                = models.IntegerField(primary_key=True)
    exercise_name           = models.CharField(max_length=50, unique=True)
    main_musclegroup        = models.CharField(max_length=30)
    detailed_musclegroup    = models.CharField(max_length=30)
    other_musclegroups      = models.CharField(max_length=100)
    exercise_type           = models.CharField(max_length=30)
    mechanics               = models.Mechanics(max_length=30)
    equipment               = models.CharField(max_length=100)
    difficulty              = models.Difficulty(max_length=30)
    instruction_text        = models.TextField()
    pic_url                 = models.TextField()
    link_url                = models.URLField()
    class Meta:
        db_table = 'EXERCISE'

class UserExerciseRating(models.Model): 
    user            = models.ForeignKey(User, on_delete=models.CASCADE())
    exercise        = models.ForeignKey(Exercise, on_delete=models.CASCADE())
    user_score      = models.FloatField(default=5)
    exercise_count  = models.IntegerField(default=1)
    class Meta:
        db_table = 'USER_EXERCISE'

class Routine(models.Model):
    user            = models.ForeignKey(User,on_delete=models.CASCADE())
    date            = models.DateField()
    class Meta: 
        db_table = 'ROUTINE'

class RoutineExercises(modes.Model):
    routine_id      = models.ForeignKey(Routine, on_delete=models.CASCADE())
    Exercise        = models.ForeignKey(Exercise, on_delete=models.CASCADE())
    class Meta: 
        db_table = 'ROUTINE_EXERICSE'