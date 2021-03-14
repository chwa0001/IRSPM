from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('Home', index),
    path('SecondHome', index),
    path('SignUp', index),
    path('Reset', index),
<<<<<<< HEAD
<<<<<<< HEAD
    path('UserData', index),
    path('ExerciseSet', index)
=======
    path('Test', index),
>>>>>>> parent of cec25ce3 (remove gitignore files)
=======
    path('Test', index),
>>>>>>> parent of cec25ce3 (remove gitignore files)
]
