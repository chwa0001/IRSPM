from django.shortcuts import render
from rest_framework import generics, status
from .models import User,UserData,Routine,RoutineExercises
from .models import get_userid_from_userdb, get_data_from_userdb,get_alluserdata_from_userdb,get_set_to_review,get_set_exercises
from .models import User, UserExerciseRating
from .serializers import UserSerializer,UserDataSerializer,UpdateUserSerializer, RoutineSerializer, RoutineExercisesSerializer, ExerciseSerializer, AccountDataSerializer
from .models import User,UserData,Routine,RoutineExercises,Exercise
from rest_framework.views import APIView
from rest_framework.response import Response
from datetime import date
import pandas as pd
import numpy as np
import random
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

            print(f"requestdata : {request.data}")
            username = request.data.get("username")
            fitness_level = request.data.get("fitness_level")
            gender = request.data.get("gender")
            goal = request.data.get("goal")
            intensity = request.data.get("intensity")
            bmi = request.data.get("bmi")
            location = request.data.get("location")

            user_id = get_userid_from_userdb(username)
            queryset = UserData.objects.filter(user_id=user_id)
            if queryset.exists():
                user = queryset[0]
                if user.user_id==user_id:
                    #status:0==> user credential verified okay
                    print(f"print fitness {fitness_level}")
                    user.fitness_level=int(fitness_level)
                    print(f"print goal {goal}")
                    user.goal = goal
                    print(f"print gender {gender}")
                    user.gender = gender
                    print(f"print intensity {intensity}")
                    user.intensity = int(intensity)
                    print(f"print bmi {bmi}")
                    user.bmi = int(bmi)
                    print(f"print fitness {fitness_level}")
                    user.location = int(location)

                    user.save()
                    print(user.user_id)

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

#impletmention done. connection done. no bug so far
class GetUserData(APIView):
    def post(self, request, format=None):
        try:
            if not self.request.session.exists(self.request.session.session_key):
                print("AGRApi no session")
                self.request.session.create()
            username = request.data.get("username")
            print(username)
            userdata = get_alluserdata_from_userdb(username)
            print(UserDataSerializer(userdata).data)
            return Response(UserDataSerializer(userdata).data, status=status.HTTP_200_OK)
            # return Response({"gender":userdata.gender,
            #                 "fitness_level":userdata.fitness_level,
            #                 "goal":userdata.goal,
            #                 "intensity":userdata.intensity,
            #                 "bmi":userdata.bmi}, status=status.HTTP_200_OK)
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
                    #Cannot find the username
                    return Response({"status":2}, status=status.HTTP_200_OK)
            elif CreateUser==2:
                if queryset.exists():
                    user = queryset[0]
                    user.username = request.data.get("newUsername")
                    user.password = password
                    user.DOB = request.data.get("DOB")
                    user.fullname = request.data.get("fullname")
                    user.save(update_fields=["username", "password","DOB","fullname"])
                    # return Response(UserSerializer(user).data, status=status.HTTP_200_OK) 
                    return Response({"status":0}, status=status.HTTP_200_OK)
                else:
                    #incorrect username
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

#antonia 03/23/21 initiate to test 
class ExerciseRating(APIView):
    def post(self, request, format=None):
        try:
            if not self.request.session.exists(self.request.session.session_key):
                self.request.session.create()
            
            username = request.data.get('username')
            set_id = request.data.get('set_id')
            score = int(request.data.get('score'))
            print(f"username: {username}, set_id: {set_id}, score: {score}")
            user_id = get_userid_from_userdb(username)

            if user_id == None :
                return Response({"Bad Request":"Username doesnt exist"}, status=status.HTTP_400_BAD_REQUEST)

            # print(f"score: {score}")
            # print(f"exercise_id: {exercise_id}")
            # print(f"set_id {set_id}")
            routine = Routine.objects.get(id=set_id)
            # print(f"routine, {routine}, routine id: {routine.id}")
            _,__,eids = get_set_exercises(routine)
            # print(f"eids : {eids}")
            for eid in eids: 
                exrate = UserExerciseRating.objects.filter(user=user_id, exercise_id=eid)
                if exrate.exists() : 
                    uer = exrate[0]
                    print(f"Exercise {eid}. count {uer.exercise_count}, score: {uer.user_score}")
                    
                    score_average = ( uer.user_score + score ) / 2
                    print(f"score_average : {score_average}")
                    count = uer.user_score + 1

                    # uer = UserExerciseRating(user_id=user_id, exercise_id=eid, user_score=score_average,exercise_count= count)
                    # uer.save()
                    uer.user_score = score_average
                    uer.exercise_count += 1
                    uer.save()
                    print(f"data saved! {uer.id}")

                else : 
                    print(f"this is the first time user raiting exercise {eid}")
                    #create a UserExerciseRating (uer) object 
                    uer = UserExerciseRating(user_id=user_id, exercise_id=eid, user_score=score,exercise_count=1)
                    uer.save()
                    print("data saved!")


            routine.rate = True
            routine.save()
            return Response({"status":0}, status=status.HTTP_200_OK) 
        except Exception as error:
            return Response({"status":0, "Bad Request":"Unable to run"}, status=status.HTTP_400_BAD_REQUEST)

#antonia 03/23/21 working
class GetSetToRate(APIView):
    
    def post(self, request, format=None):
        print(f"requestdata : {request.data}")
        try:
            if not self.request.session.exists(self.request.session.session_key):
                self.request.session.create()

            # print("reach here")
            # if len(Exercise.objects.all()) < 1 : 
            #     print("initiating database")
            #     generate_database()

            if not self.request.session.exists(self.request.session.session_key):
                print("AGRApi no session")
                self.request.session.create()
            username = request.data.get("username")
            # queryset = User.objects.filter(username=username)
            print(username)
            setToReview = get_set_to_review(username)
            if setToReview == "no exercise to rate":
                return Response({"status":3 , "Bad Request":"No Exercise to rate"}, status=status.HTTP_200_OK)
            else :
                exercises,edic,_ = get_set_exercises(setToReview)
                print(exercises)
                return Response({"status":"good", "user_id":setToReview.userdata_id ,  
                                "date":setToReview.date , "set_id":setToReview.id , 
                                "exercises": edic , "exercise1" : exercises[0],
                                "exercise2" : exercises[1], "exercise3" : exercises[2],
                                "exercise4" : exercises[3], "exercise5" : exercises[4],
                                "exercise6" : exercises[5],
                                }, status=status.HTTP_200_OK)
        except Exception as error:
            return Response({"status":2, "Bad Request":"Unable to run"}, status=status.HTTP_400_BAD_REQUEST)

#antonia 03/23/21 initiate to test 
class CreateSet(APIView):
    def post(self, request, format=None):
        try:
            username = request.data.get("username")
            mode = int(request.data.get("mode"))
            user_id = get_userid_from_userdb(username)
            routine = Routine(userdata=user_id, rate=False, mode=mode, date=date.today())
            routine.save()
            return Response({"status":"good"}, status=status.HTTP_200_OK)
        except Exception as error:
            return Response({"Bad Request":"unable to save"}, status=status.HTTP_400_BAD_REQUEST)

#antonia 03/23/21 initiate to test 
class CreateSetExercises(APIView):
    def post(self, request, format=None):
        try:
            routine = request.data.get("routine")
            exercise_ids = request.data.get("exercise_ids")
            for exercise_id in exercise_ids:
                re = RoutineExercises(routine=routine, exercise=exercise_id)
                re.save()
            return Response({"status":"good"}, status=status.HTTP_200_OK)
        except Exception as error:
            return Response({"Bad Request":"unable to save"}, status=status.HTTP_400_BAD_REQUEST)

def createSetExercises(username, mode, exercise_ids):
    try:
        user_id = get_userid_from_userdb(username)
        print(username,user_id,mode,type(mode),exercise_ids)
        print(user_id, mode, date.today())

        routine = Routine(userdata_id=user_id, mode=mode, date=date.today())
        print(username,user_id)

        routine.save()
        print(username,user_id)
        for exercise_id in exercise_ids:
            re = RoutineExercises(routine_id=routine.id, exercise_id=exercise_id)
            re.save()
        return (routine.id) #Set and Exercise Created
    except Exception as error: 
        return (-1) #error

#antonia 03/28/21 to get list of exercise in an array
class GetExercise4Muscle(APIView):
    def post(self, request, format=None):
        try:
            muscle = request.data.get("muscle")
            print(f"muscle: {muscle}")
            exercises = Exercise.objects.filter(main_musclegroup=muscle)
            
            if (len(exercises)>0):
                renderExercise = []
                print(f"len(exercises): {len(exercises)}")
                print(f"exercises: {exercises}")
                random4 = random.sample(range(len(exercises)-1),4)
                print(random4)
                for ran in random4: 
                    exercise = exercises[ran]
                    renderExercise.append(ExerciseSerializer(exercise).data)

                print(f"renderExercise: {renderExercise}")

            return Response({"exercises":renderExercise , "status":"good"}, status=status.HTTP_200_OK)
        except Exception as error:
            return Response({"Bad Request":"unable to save"}, status=status.HTTP_400_BAD_REQUEST)


class GetSetDetails(APIView):
    def post(self, request, format=None):
        try:
            username = request.data.get("username")
            set_id = request.data.get("set_id")
            print(f"username,set_id: {username}, {set_id}")
            routine = Routine.objects.get(id=set_id)
            print(f"routine: {routine}, {routine.id}")
            
            if (routine.mode) == 1:
                set_type = 'General Fitness'
            elif routine.mode == 2:
                set_type = 'Muscle Building'
            elif routine.mode == 3: 
                set_type = 'Endurence'
            else: 
                set_type = 'unknown'

            exercise_class = RoutineExercises.objects.filter(routine_id=set_id)
            print(f"exercise_class: {exercise_class}")

            exercises_details = []
            for exercise_item in exercise_class:
                print(f"exercise_item.exercise_id: {exercise_item.exercise_id}")
                
                item = Exercise.objects.get(id=exercise_item.exercise_id)
                # print(f"item: {item}")

                exercises_details.append(ExerciseSerializer(item).data)


            print(f"exercises_details: {exercises_details}")

            return Response({"set_date":routine.date, "set_type":set_type,"exercises_details":exercises_details , "status":1}, status=status.HTTP_200_OK)
        except Exception as error:
            return Response({"Bad Request":"unable to retrieved exercises"}, status=status.HTTP_400_BAD_REQUEST)








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
            exercise, val, itemid  = recommend_exercise(101, df , n=1, rating_scale=(1, 10))
            return Response({"status":exercise}, status=status.HTTP_200_OK)
        except Exception as error:
            return Response({"Bad Request": str(error)}, status=status.HTTP_200_OK)

class FirstReco(APIView):
    def get(self, request, format=None):
        username = request.GET.get('username')
        exercise_id = int(request.GET.get('exercise_id'))
        mode = int(request.GET.get('mode'))
        muscle = request.GET.get("muscle")
        print(Exercise.objects.filter(id= exercise_id).exists())

        if username != None and exercise_id != None and Exercise.objects.filter(id= exercise_id).exists() and mode == 1:
            exercise_data = Exercise.objects.all() #get all exercise data from db according to models.py format 
            df = pd.DataFrame.from_records(exercise_data.values())
        
        elif username != None and exercise_id != None and Exercise.objects.filter(id= exercise_id).exists() and mode == 2:
            exercise_data = Exercise.objects.filter(main_musclegroup=muscle) #get exercise data filetered for muscle from db according to models.py format
            df = pd.DataFrame.from_records(exercise_data.values())
            print(df.len)

        elif username != None and exercise_id != None and Exercise.objects.filter(id= exercise_id).exists() and mode == 3:
            exercise_data = Exercise.objects.filter(main_musclegroup= "cardio") #get exercise data filetered for cardio from db according to models.py format

        else:
            print(f"username, exercise_id ,Exercise.objects.filter(id= exercise_id).exists(): {username, exercise_id ,Exercise.objects.filter(id= exercise_id).exists()}")
            return Response({"Bad Request": "No Username and/or exercise_id out of range"}, status=status.HTTP_400_BAD_REQUEST)

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


        user_id = int(get_userid_from_userdb(username))
        routine = Routine(userdata_id=user_id, date=date.today(), mode=mode)
        routine.save()
        for exercise_id in recoList:
            re = RoutineExercises(routine_id=routine.id, exercise_id=exercise_id)
            re.save()


        set_id = createSetExercises(username, mode, recoList)
        
        if set_id >=0: 
            data['set_id'] = set_id
        else:
            return Response({"Bad Request": "Set is not created"}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"status":3 ,"set_exercise_id": data["recoList"], "set_exercise_details": data['recoExList'], "set_id": data['set_id']}, status=status.HTTP_200_OK)
        

