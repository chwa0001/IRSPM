from django.contrib import admin
from .models import User,UserData,Routine,RoutineExercises
from .models import get_userid_from_userdb, get_data_from_userdb,get_alluserdata_from_userdb,get_set_to_review
from .models import UserExerciseRating
from .models import Exercise

# Register your models here.
admin.site.register(Routine)
admin.site.register(RoutineExercises)
admin.site.register(Exercise)