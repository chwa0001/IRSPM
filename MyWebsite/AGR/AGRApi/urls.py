from django.urls import path
from .views import UserView,CreateUserView,LoginUserView,ModelToLearn,SetUserData,GetUserData
from .views import AlgoToLearn,ExerciseRating,GetAccountData
from .views import UserView,CreateUserView,LoginUserView,ModelToLearn,FirstReco
from .views import GetSetToRate,CreateSet,CreateSetExercises,GetExercise4Muscle,GetSetDetails
urlpatterns = [
    path('User', UserView.as_view()),
    path('CreateUser',CreateUserView.as_view()),
    path('LoginUser',LoginUserView.as_view()),
    path('AskModelToLearn',ModelToLearn.as_view()),
    path('SetUserData',SetUserData.as_view()),
    path('GetUserData',GetUserData.as_view()),
    path('Algo',AlgoToLearn.as_view()),
    path('ExerciseRating',ExerciseRating.as_view()),
    path('AccountData',GetAccountData.as_view()),
    path('FirstRecommend',FirstReco.as_view()),
    path('GetSetToRate',GetSetToRate.as_view()),
    path('CreateSet',CreateSet.as_view()),
    path('CreateSetExercises',CreateSetExercises.as_view()),
    path('GetExercise4Muscle',GetExercise4Muscle.as_view()),
    path('GetSetDetails',GetSetDetails.as_view()),

    
]
