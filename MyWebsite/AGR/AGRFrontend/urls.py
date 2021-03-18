from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('Home', index),
    path('SignUp', index),
    path('Reset', index),
    path('UserData', index),
    path('ExerciseSet', index),
]
