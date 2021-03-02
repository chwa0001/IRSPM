from django.urls import path
from .views import UserView,CreateUserView,LoginUserView

urlpatterns = [
    path('User', UserView.as_view()),
    path('CreateUser',CreateUserView.as_view()),
    path('LoginUser',LoginUserView.as_view()),
]
