from django.shortcuts import render
from rest_framework import generics, status
from .serializers import UserSerializer,UpdateUserSerializer
from .models import User,UserData
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.


class UserView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class LoginUserView(APIView):

    def post(self, request, format=None):
        try:
            if not self.request.session.exists(self.request.session.session_key):
                self.request.session.create()
            username = request.data.get("username")
            password = request.data.get("password")
            queryset = User.objects.filter(username=username)
            if queryset.exists():
                user = queryset[0]
                if user.username==username and user.password==password:
                    #status:0==> user credential verified okay
                    return Response({"status":0}, status=status.HTTP_200_OK)
                else:
                    #status:1==> user credential verified wrong password
                    return Response({"status":1}, status=status.HTTP_200_OK)
            else:
                #status:2==> user not found
                return Response({"status":2}, status=status.HTTP_200_OK)
        except Exception as error:
            return Response({"Bad Request": str(error)}, status=status.HTTP_400_BAD_REQUEST)
        

class CreateUserView(APIView):
    serializer_class = UpdateUserSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        try:
            username = request.data.get("username")
            password = request.data.get("password")
            queryset = User.objects.filter(username=username)
            if queryset.exists():
                user = queryset[0]
                user.username = username
                user.password = password
                user.save(update_fields=["username", "password"])
                return Response(UserSerializer(user).data, status=status.HTTP_200_OK) 
            else:
                serializer = self.serializer_class(data=request.data)
                if serializer.is_valid():
                    fullname = serializer.data.get("fullname")
                    dob = serializer.data.get("DOB")
                    user = User(username=username,fullname=fullname,DOB=dob,password=password)
                    user.save()
                    user_data = UserData(user_id=user.id)
                    user_data.save()
                    return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
        except Exception as error:
            return Response({"Bad Request": str(error)}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"Bad Request": "Unknown data"}, status=status.HTTP_400_BAD_REQUEST)