from django.urls import path
from .views import UserView,CreateUserView

urlpatterns = [
    path('User', UserView.as_view()),
    path('CreateUser',CreateUserView.as_view()),
]
