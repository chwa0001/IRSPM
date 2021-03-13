from django.urls import path
from .views import UserView,CreateUserView,LoginUserView,ModelToLearn, FirstReco

urlpatterns = [
    path('User', UserView.as_view()),
    path('CreateUser',CreateUserView.as_view()),
    path('LoginUser',LoginUserView.as_view()),
    path('AskModelToLearn',ModelToLearn.as_view()),
    path('FirstRecommend',FirstReco.as_view()),
]
