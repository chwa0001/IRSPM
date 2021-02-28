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

class CreateUserView(APIView):
    serializer_class = UpdateUserSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        try:
            serializer = self.serializer_class(data=request.data)
            if serializer.is_valid():
                username = serializer.data.get('username')
                password = serializer.data.get('password')
                queryset = User.objects.filter(username=username)
                if queryset.exists():
                    user = queryset[0]
                    user.username = username
                    user.password = password
                    user.save(update_fields=['username', 'password'])
                    return Response(UserSerializer(user).data, status=status.HTTP_200_OK)
                else:
                    fullname = serializer.data.get('fullname')
                    dob = serializer.data.get('DOB')
                    user = User(username=username,fullname=fullname,DOB=dob,password=password)
                    user.save()
                    user_data = UserData(user_id=user.id)
                    user_data.save()
                    return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
        except Exception as error:
            return Response({'Bad Request': str(error)}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'Bad Request': 'Unknown...'}, status=status.HTTP_400_BAD_REQUEST)