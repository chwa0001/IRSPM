from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('Home', index),
    path('SecondHome', index),
    path('SignUp', index),
    path('Reset', index),
]
