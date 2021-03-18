from django.urls import path
from .views import UserView,CreateUserView,LoginUserView,ModelToLearn,SetUserData,GetUserData
from .views import AlgoToLearn,ExerciseRatingView

urlpatterns = [
    path('User', UserView.as_view()),
    path('CreateUser',CreateUserView.as_view()),
    path('LoginUser',LoginUserView.as_view()),
    path('AskModelToLearn',ModelToLearn.as_view()),
    path('SetUserData',SetUserData.as_view()),
    path('GetUserData',GetUserData.as_view()),
    path('Algo',AlgoToLearn.as_view()),
    path('ExerciseRating',ExerciseRatingView.as_view())
]
