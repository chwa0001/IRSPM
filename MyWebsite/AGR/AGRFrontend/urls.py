from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('Home', index),
    path('SignUp', index),
    path('Reset', index),
    path('UserData', index),
    path('ExerciseRating', index),
    path('AccountData',index),
    path('MuscleBuilding',index),
    path('ExerciseSet',index),
    path('ModeSelection',index),
    path('GeneralFitness',index),
    path('EndurenceTraining',index),
    path('ExerciseBuddy',index),
    path('RMuscleBuilding',index),
    path('Glossary',index),
    path('Test',index),
    path('REndurenceTraining',index),
    path('RGeneralFitness',index),
    path('ExerciseSets', index)

    
]
