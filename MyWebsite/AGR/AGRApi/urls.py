from django.urls import path
from .views import UserView,CreateUserView,LoginUserView,ModelToLearn,SetUserData,GetUserData
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> main
from .views import AlgoToLearn,ExerciseSetView
=======
from .views import UserView,CreateUserView,LoginUserView,ModelToLearn,AlgoToLearn
>>>>>>> parent of cec25ce3 (remove gitignore files)
<<<<<<< HEAD
=======
from .views import UserView,CreateUserView,LoginUserView,ModelToLearn,AlgoToLearn
>>>>>>> parent of cec25ce3 (remove gitignore files)
=======
from .views import UserView,CreateUserView,LoginUserView,ModelToLearn,AlgoToLearn
>>>>>>> parent of cec25ce3 (remove gitignore files)
=======
from .views import UserView,CreateUserView,LoginUserView,ModelToLearn,AlgoToLearn
>>>>>>> parent of cec25ce3 (remove gitignore files)
=======
>>>>>>> main

urlpatterns = [
    path('User', UserView.as_view()),
    path('CreateUser',CreateUserView.as_view()),
    path('LoginUser',LoginUserView.as_view()),
    path('AskModelToLearn',ModelToLearn.as_view()),
    path('SetUserData',SetUserData.as_view()),
    path('GetUserData',GetUserData.as_view()),
    path('Algo',AlgoToLearn.as_view()),
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    path('ExerciseSet',ExerciseSetView.as_view())
=======
>>>>>>> parent of cec25ce3 (remove gitignore files)
=======
>>>>>>> parent of cec25ce3 (remove gitignore files)
=======
>>>>>>> parent of cec25ce3 (remove gitignore files)
=======
>>>>>>> parent of cec25ce3 (remove gitignore files)
=======
    path('ExerciseSet',ExerciseSetView.as_view())
=======
>>>>>>> parent of cec25ce3 (remove gitignore files)
>>>>>>> main
]
