from django.shortcuts import render
from rest_framework import generics, status
from .serializers import UserSerializer,AccountDataSerializer,UpdateUserSerializer, RoutineSerializer, RoutineExercisesSerializer
from .models import User,UserData,Routine,RoutineExercises
from .models import get_userid_from_userdb, get_data_from_userdb,get_alluserdata_from_userdb,get_set_to_review
from .models import User, UserExerciseRating
from .serializers import UserSerializer,UpdateUserSerializer, RoutineSerializer, RoutineExercisesSerializer, ExerciseSerializer
from .models import User,UserData,Routine,RoutineExercises, Exercise
from rest_framework.views import APIView
from rest_framework.response import Response
from datetime import date
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
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
        
class SetUserData(APIView):
    def post(self, request, format=None):
        try:
            if not self.request.session.exists(self.request.session.session_key):
                self.request.session.create()

            # print("reach here")
            # if len(Exercise.objects.all()) < 1 : 
            #     print("initiating database")
            #     generate_database()

            print(f"requestdata : {request.data}")
            username = request.data.get("username")
            fitness_level = request.data.get("fitness_level")
            gender = request.data.get("gender")
            goal = request.data.get("goal")
            intensity = request.data.get("intensity")
            bmi = request.data.get("bmi")

            user_id = get_userid_from_userdb(username)
            queryset = UserData.objects.filter(user_id=user_id)
            if queryset.exists():
                user = queryset[0]
                if user.user_id==user_id:
                    #status:0==> user credential verified okay
                    if (fitness_level != ""):
                        print(f"print fitness {fitness_level}")
                        user.fitness_level=int(fitness_level)
                    if (goal != ""):
                        print(f"print goal {goal}")
                        user.goal = goal
                    if (gender != ""):
                        print(f"print gender {gender}")
                        user.gender = gender
                    if (intensity != ""):
                        print(f"print intensity {intensity}")
                        user.intensity = int(intensity)
                    if (bmi != None and bmi != ""):
                        print(f"print bmi {bmi}")
                        user.bmi = int(bmi)
                    print(f"print fitness {fitness_level}")
                    user.save()
                    print(user.user_id+5)

                    return Response({"status":0}, status=status.HTTP_200_OK)
                else:
                    #status:1==> user credential verified wrong password
                    return Response({"status":1}, status=status.HTTP_200_OK)
            else:
                #status:2==> user not found
                user_data = UserData(user_id=user.id)
                user_data.save()
                return Response({"status":2}, status=status.HTTP_200_OK)
        except Exception as error:
            print("Exception in SetUserData")
            return Response({"Bad Request": str(error)}, status=status.HTTP_400_BAD_REQUEST)

#currently not used yet 
class GetUserData(APIView):
    def post(self, request, format=None):
        try:
            if not self.request.session.exists(self.request.session.session_key):
                print("AGRApi no session")
                self.request.session.create()
            username = request.data.get("username")
            print(username)
            userdata = get_alluserdata_from_userdb(username)
            return Response({"gender":userdata.gender,
                            "fitness_level":userdata.fitness_level,
                            "goal":userdata.goal,
                            "intensity":userdata.intensity,
                            "bmi":userdata.bmi}, status=status.HTTP_200_OK)
        except Exception as error:
            return Response({"Bad Request": str(error)}, status=status.HTTP_400_BAD_REQUEST)

class GetAccountData(APIView):
    def get(self, request, format=None):
        username = request.GET.get('username')
        queryset = User.objects.filter(username=username)
        try:
            if username!=None:
                user = queryset[0]
                return Response(AccountDataSerializer(user).data, status=status.HTTP_200_OK)
        except Exception as error:
            return Response({"Bad Request": str(error)}, status=status.HTTP_200_OK)

class CreateUserView(APIView):
    serializer_class = UpdateUserSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        try:
            CreateUser = request.data.get("CreateUser")
            username = request.data.get("username")
            password = request.data.get("password")
            queryset = User.objects.filter(username=username)
            if CreateUser==0:
                if queryset.exists():
                    user = queryset[0]
                    if user.DOB == request.data.get("DOB"):
                        user.username = username
                        user.password = password
                        user.save(update_fields=["username", "password"])
                        # return Response(UserSerializer(user).data, status=status.HTTP_200_OK) 
                        return Response({"status":0}, status=status.HTTP_200_OK)
                    else:
                        #incorrect data of birth
                        return Response({"status":1}, status=status.HTTP_200_OK)
                else:
                    #incorrect data of birth
                    return Response({"status":2}, status=status.HTTP_200_OK)
            else:
                if queryset.exists():
                    #The same username is stored in database
                    return Response({"status":1}, status=status.HTTP_200_OK)
                else:
                    request.data.pop('CreateUser')
                    serializer = self.serializer_class(data=request.data)
                    if serializer.is_valid(raise_exception=True):
                        fullname = serializer.data.get("fullname")
                        dob = serializer.data.get("DOB")
                        user = User(username=username,fullname=fullname,DOB=dob,password=password)
                        user.save()
                        user_data = UserData(user_id=user.id)
                        user_data.save()
                        # return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
                        return Response({"status":0}, status=status.HTTP_200_OK)
        except Exception as error:
            print(error)
            return Response({"Bad Request": str(error), "status":1}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"Bad Request": "Unknown data", "status":2 }, status=status.HTTP_400_BAD_REQUEST)
        
class RoutineView(APIView):
    serializer_class = UpdateUserSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        try:
            user_id = request.data.get("user_id") ##need to doublecheck this when running
            set_id = request.data.get("set_id")
            exercise_ids = request.data.get("exercise_ids") ## should get in term of string seperated by # example 43#23#12 --> exercise 43, 23 and 12
            routine = Routine(user_id=user_id, set_id=set_id, date=date.today())
            routine.save()
            set_id = 1 ##how to get set_id? 
            for exercise_id in exercise_ids.split("#"):
                routine_exercise = RoutineExercises(set_id=set_id,exercise_id=exercise_id)
                routine_exercise.save()
            return Response(UserSerializer(user).data, status=status.HTTP_200_OK) 
        except Exception as error:
            return Response({"Bad Request": str(error)}, status=status.HTTP_400_BAD_REQUEST) 

class ModelToLearn(APIView):
    def get(self, request, format=None):
        username = request.GET.get('username')
        queryset = User.objects.filter(username=username)
        try:
            if username!=None:
                user = queryset[0]
                f = open('./FolderToTest/'+username+".txt","w+")
                f.write("This is %s/r/n"%username)
                f.close()
                return Response(UserSerializer(user).data, status=status.HTTP_200_OK)
            else:
                return Response({"Bad Request": "No Username"}, status=status.HTTP_200_OK)
        except Exception as error:
            return Response({"Bad Request": str(error)}, status=status.HTTP_200_OK)

#empty class
class ExerciseRating(APIView):
    def get(self, request, format=None):
        username = request.GET.get('username')
        exercise_id = request.GET.get('exercise_id')
        score = request.GET.get('score')
        print(f"exercise id: {exercis_id}, score: {score}")
        return Response({"status":1}) 

class GetSetToRate(APIView):
    def post(self, request, format=None):
        try:
            print("debug part 1")
            if not self.request.session.exists(self.request.session.session_key):
                print("AGRApi no session")
                self.request.session.create()
            print("debug part 2")
            username = request.GET.get('username')
            print("debug part 3")
            queryset = User.objects.filter(username=username)
            print("debug part 4")
            setToReview = get_set_to_review(username)
            print("debug part 5")
            if len(setToReview) > 0 :
                return Response(UserSerializer(setToReview[0]).data, status=status.HTTP_200_OK)
            else : 
                return Response({"Bad Request":"No Exercise to rate"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as error:
            return Response({"Bad Request":"Unable to run"}, status=status.HTTP_400_BAD_REQUEST)


from AGRApi.recommender_algo_AGR import *
from django_pandas.io import read_frame
from django_pandas.managers import DataFrameManager


class AlgoToLearn(APIView):
    # serializer_class = UpdateUserSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        try:
            qs = UserExerciseRating.objects.all()
            q = qs.values('user_id', 'exercise_id','user_score')
            df = pd.DataFrame.from_records(q)
            # recommend exercise (individual)
            exercise, usermatrix, itemid  = recommend_exercise(61, df , n=10, rating_scale=(1, 10))
            # recommend exercise buddy
            nearestusers = nearestuser(20,3,usermatrix)
            # recommend exercise for buddy/group
            group_exercises = recommend_exercise_n_users([1,2,3], df , n=10, rating_scale=(1, 10))
            return Response({"Recommneded exercise":exercise,"Recommneded buddies":nearestusers,"Recommneded buddy/group exercise":group_exercises}, status=status.HTTP_200_OK)
        except Exception as error:
            return Response({"Bad Request": str(error)}, status=status.HTTP_200_OK)

class FirstReco(APIView):
    def get(self, request, format=None):
        username = request.GET.get('username')
        exercise_id = request.GET.get('exercise_id')
        print(Exercise.objects.filter(id= exercise_id).exists())
        if username != None and exercise_id != None and Exercise.objects.filter(id= exercise_id).exists():
            exercise_data = Exercise.objects.all() #get all data from db according to models.py format
            df = pd.DataFrame.from_records(exercise_data.values())
            # exercisesArr = []
            # i = 0
            # while i < len(exercise_data):
            #     exercisesArr.append(ExerciseSerializer(exercise_data[i]).data) #convert into list of json format
            #     i += 1
            # df = pd.DataFrame(exercisesArr) #convert into dataframe
            # print("here", len(df))

            #Select features to find similarity
            features = ['other_musclegroups', 'exercise_type', 'mechanics', 'equipment', 'exercise_name'] #type change to exercise type because type is special keyword
            for feature in features:
                df[feature] = df[feature].fillna('')
            #print(df[feature])

            #Create combined features column
            def combined_features(row):
                return row['other_musclegroups']+" "+row['exercise_type']+" "+row['mechanics']+" "+row['exercise_name']+" "+row['equipment']
            df["combined_features"] = df.apply(combined_features, axis =1)
            #print(df["combined_features"])

            #Use CountVectorizer to convert words into word count for cosine similarity
            cv = CountVectorizer()
            count_matrix = cv.fit_transform(df["combined_features"])
            #print("Count Matrix:", count_matrix.toarray())

            #Cosine similarity
            cosine_sim = cosine_similarity(count_matrix)
            # print("here", len(cosine_sim))

            exercise_index = int(exercise_id) #user input in exercise_id

            #Place similar exercises in list and sort in descending similarity score
            similar_exercises = list(enumerate(cosine_sim[exercise_index]))
            #print(similar_exercises)
            sorted_similar_exercises = sorted(similar_exercises, key=lambda x:x[1], reverse=True)

            #Store top 6 similar exercise_id in list
            recoList = []
            i=0
            for exercise in sorted_similar_exercises:
                recoList.append(exercise[0])
                i=i+1
                if i>5:
                    break
                
            print(recoList)


            # Creating json
            data = {}
            data["recoList"] = recoList

            recoEx = Exercise.objects.filter(id__in = recoList) #filter for Exercise db for recommended exercise according to models.py format
            recoExArray = []
            i = 0
            while i < len(recoEx):
                recoExArray.append(ExerciseSerializer(recoEx[i]).data) #serialize into json format
                i += 1
            data['recoExList'] = recoExArray


            return Response(data, status=status.HTTP_200_OK)
            
        else:
            return Response({"Bad Request": "No Username and/or exercise_id out of range"}, status=status.HTTP_400_BAD_REQUEST)
