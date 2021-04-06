from django.shortcuts import render
from rest_framework import generics, status
from .models import User,UserData,Routine,RoutineExercises
from .models import get_userid_from_userdb, get_data_from_userdb,get_alluserdata_from_userdb,get_set_to_review,get_set_exercises
from .models import User, UserExerciseRating
from .serializers import UserSerializer,UserDataSerializer,UpdateUserSerializer, RoutineSerializer, RoutineExercisesSerializer, ExerciseSerializer, UserDataSerializer,AccountDataSerializer
from .models import User,UserData,Routine,RoutineExercises, Exercise
from rest_framework.views import APIView
from rest_framework.response import Response
from datetime import date
import pandas as pd
import numpy as np
import random
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from ast import literal_eval
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
            print(request.data)
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
            setToReview = get_set_to_review(username,rate=False)
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

# create a set given the username, mode and exercise ids
# return the set id
def createSetExercises(username, mode, exercise_ids):
    try:
        user_id = get_userid_from_userdb(username)
        print(username,user_id,mode,type(mode),exercise_ids)
        print(user_id, mode, date.today())
        
        routine = Routine(userdata_id=user_id, mode=mode, date=date.today())
        print(username,user_id)
        print(routine)

        try:
            routine.save()
        except  Exception as error: 
            print("error in saving routine")

        print(username,user_id)
        for exercise_id in exercise_ids:
            re = RoutineExercises(routine_id=routine.id, exercise_id=exercise_id)
            re.save()
        return (routine.id,routine.date) #Set and Exercise Created
    except Exception as error: 
        return (-1) #error

#antonia 04/02/21 filter database so that user can use any exercise equalto or below its fitness
#input argument muscle and fitness 
#return argumenet exercesises query
def getExerciseMuscleFitness(muscle,fitness):
    expert_exercises = Exercise.objects.filter(main_musclegroup=muscle,difficulty='Expert')
    intermediate_exercises = Exercise.objects.filter(main_musclegroup=muscle,difficulty='Intermediate')
    beginner_exercises = Exercise.objects.filter(main_musclegroup=muscle,difficulty='Beginner')
    if fitness=='Expert':
        exercises = beginner_exercises.union(intermediate_exercises,expert_exercises)
    elif fitness == 'Intermediate':
        exercises = beginner_exercises.union(intermediate_exercises)
    else:
        exercises = beginner_exercises

    return exercises 

#antonia 04/02/21 filter database so that user can use any exercise equalto or below its fitness
#input argument muscle and fitness 
#return argumenet exercesises query
def getExerciseGeneralFitness(fitness):
    expert_exercises = Exercise.objects.filter(difficulty='Expert')
    intermediate_exercises = Exercise.objects.filter(difficulty='Intermediate')
    beginner_exercises = Exercise.objects.filter(difficulty='Beginner')

    if fitness=='Expert':
        exercises = beginner_exercises.union(intermediate_exercises,expert_exercises)
    elif fitness == 'Intermediate':
        exercises = beginner_exercises.union(intermediate_exercises)
    else:
        exercises = beginner_exercises

    return exercises 

# antonia 04/02/21 get the fitness and location of a user
def getfitnesslocation(username):
    user_id = int(get_userid_from_userdb(username))
    userdata = UserData.objects.filter(user_id=user_id)[0]
    print(f"getfitnesslocation userdata:{userdata}")

    if(userdata.fitness_level==1):
        fitness = 'Beginner'
    elif (userdata.fitness_level==2):
        fitness = 'Intermediate'
    else: 
        fitness = 'Expert'
    location = userdata.location #may not be used due to ambuguity of exercises in db (barbell at home?)
    
    print(f"getfitnesslocation fitness, location:{fitness}, {location}")

    return (fitness, location)

#changing pic_no string, to array
def pic2array (excerciseDetailsData):
    excerciseDetailsData['pic_no'] = literal_eval(excerciseDetailsData['pic_no'])
    return excerciseDetailsData

#changing string text to array 
def instruction2array (excerciseDetailsData):
    # excerciseDetailsData['instruction_text'] = excerciseDetailsData['instruction_text'].replace("\n","")
    excerciseDetailsData['instruction_text'] = excerciseDetailsData['instruction_text'].split("\n\n")
    return excerciseDetailsData

#grouping together changes for accessibility 
#taking exercise data in dic/json, convert pic_no to array and instruction to array
def prepExerciseDetails (excerciseDetailsData):
    return instruction2array(pic2array(excerciseDetailsData))

#antonia 03/28/21 to get list of exercise in an array
class GetExercise4Muscle(APIView):
    def post(self, request, format=None):
        try:
            username = request.data.get("username")
            muscle = request.data.get("muscle")
            print(f"muscle,username: {muscle},{username}")

            fitness, location = getfitnesslocation(username)
            print(f"muscle,fitness: {muscle},{fitness}")
            
            exercises = getExerciseMuscleFitness(muscle,fitness)
            # exercises = Exercise.objects.filter(main_musclegroup=muscle).get(difficulty=fitness)
            print(exercises)
            if (len(exercises)>0):
                renderExercise = []
                print(f"len(exercises): {len(exercises)}")
                # print(f"exercises: {exercises}")
                random4 = random.sample(range(len(exercises)-1),4)
                print(random4)
                for ran in random4: 
                    exercise = exercises[ran]
                    renderExercise.append(prepExerciseDetails(ExerciseSerializer(exercise).data))

                # print(f"renderExercise: {renderExercise}")
                return Response({"exercises":renderExercise , "status":"good"}, status=status.HTTP_200_OK)
            else:
                return Response({"Bad Request":"unable to fetch exercises","status":"bad"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as error:
            return Response({"Bad Request":"unable to save"}, status=status.HTTP_400_BAD_REQUEST)

#antonia 04/02/21 to get list of exercise in an array
class GetExercise4General(APIView):
    def post(self, request, format=None):
        try:
            username = request.data.get("username")
            print(f"username: {username}")

            fitness, location = getfitnesslocation(username)
            print(f"location,fitness: {location},{fitness}")
            
            exercises = getExerciseGeneralFitness(fitness)
            # exercises = Exercise.objects.filter(main_musclegroup=muscle).get(difficulty=fitness)
            print(exercises)
            if (len(exercises)>0):
                renderExercise = []
                print(f"len(exercises): {len(exercises)}")
                # print(f"exercises: {exercises}")
                random4 = random.sample(range(len(exercises)-1),4)
                print(random4)
                for ran in random4: 
                    renderExercise.append(prepExerciseDetails(ExerciseSerializer(exercises[ran]).data))
                    print(f"renderExercise: {renderExercise}")

            return Response({"exercises":renderExercise , "status":"good"}, status=status.HTTP_200_OK)
        except Exception as error:
            return Response({"Bad Request":"unable to save"}, status=status.HTTP_400_BAD_REQUEST)

class GetSetDetails(APIView):
    def post(self, request, format=None):
        try:
            username = request.data.get("username")
            set_id = request.data.get("set_id")
            if (set_id == None):
                set_id = get_sets(username)
            
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
                exercises_details.append(prepExerciseDetails(ExerciseSerializer(item).data))


            print(f"exercises_details: {exercises_details}")

            return Response({"set_date":routine.date, "set_type":set_type,"exercises_details":exercises_details , "status":1}, status=status.HTTP_200_OK)
        except Exception as error:
            return Response({"Bad Request":"unable to retrieved exercises"}, status=status.HTTP_400_BAD_REQUEST)


class CheckModeFirst(APIView):
    def get(self, request, format=None):
        try:
            username = request.GET.get('username')
            mode = int(request.GET.get('mode'))
            user_id = int(get_userid_from_userdb(username))

            routines = Routine.objects.filter(userdata_id=user_id,mode=mode)

            if(len(routines)>0):
                return Response({"firsttime":"NO"}, status=status.HTTP_200_OK)
            else:
                return Response({"firsttime":"YES"}, status=status.HTTP_200_OK)

        except Exception as error:
            return Response({"Bad Request": str(error)}, status=status.HTTP_400_BAD_REQUEST)

class GetExerciseList(APIView):
    def get(self, request, format=None):
        try:
            defaultNumbers = 50
            keywords=request.GET.get('search')
            numbers=int(request.GET.get('numbers'))
            if numbers>0:
                defaultNumbers = numbers
            if 'search' not in request.GET.keys() or keywords==None or keywords=="":
                exercises=Exercise.objects.order_by('exercise_name')[0:defaultNumbers]
            else:
                exercises=Exercise.objects.filter(exercise_name__contains=keywords)[0:defaultNumbers]
            renderExercise=[]
            for exercise in exercises:
                renderExercise.append(prepExerciseDetails(ExerciseSerializer(exercise).data))
            return Response({"exercises":renderExercise , "status":"good"}, status=status.HTTP_200_OK)
        except Exception as error:
            return Response({"Bad Request": str(error)}, status=status.HTTP_400_BAD_REQUEST)

class GetSetList(APIView):
    def get(self, request, format=None):
        try:
            defaultNumbers = 50
            username=request.GET.get('username')
            user_id = int(get_userid_from_userdb(username))
            numbers=int(request.GET.get('numbers'))
            if numbers>0:
                defaultNumbers = numbers
            sets = Routine.objects.filter(userdata_id = user_id).order_by('date')

            if(len(sets)<1):
                return Response({"status": -2,}, status=status.HTTP_200_OK)
            
            set_return = []
            for s in sets:
                set_details = {}
                set_details["date"] = s.date
                mode_int = s.mode
                if mode_int == 1:
                    set_details["mode"] = "General Fitness"
                elif mode_int == 2: 
                    set_details["mode"] = "Muscle Building"
                else:
                    set_details["mode"] = "Endurence Training"
                routine_exercises_class = RoutineExercises.objects.filter(routine_id = s.id)
                exercises_details = []
                exercise_name = []
                for routine_exercises in routine_exercises_class:
                    print(f"exercise_item.exercise_id: {routine_exercises.exercise_id}")
                    
                    item = Exercise.objects.get(id=routine_exercises.exercise_id)
                    exercise_name.append(item.exercise_name)
                    exercises_details.append(prepExerciseDetails(ExerciseSerializer(item).data))
                set_details["exercises"] = exercises_details
                set_details["exercises_name"] = exercise_name
                set_return.append(set_details)
            return Response({"set_details":set_return , "status":1}, status=status.HTTP_200_OK)
        except Exception as error:
            return Response({"Bad Request": str(error)}, status=status.HTTP_400_BAD_REQUEST)


                    



# concert exercise list (array) into dictionary/json file with processed data.
def convertExerciseListToDetailsJson(exercise):
    recoEx = Exercise.objects.filter(id__in = exercise) #filter for Exercise db for recommended exercise according to models.py format
    recoExArray = []
    i = 0
    while i < len(recoEx):
        print("in the while loop of convertExerciseListToDetailsJson")
        recoExArray.append(prepExerciseDetails(ExerciseSerializer(recoEx[i]).data)) #serialize into json format
        i += 1
    print(recoExArray)
    return recoExArray



from AGRApi.recommender_algo_AGR import *
from django_pandas.io import read_frame
from django_pandas.managers import DataFrameManager
from datetime import date
import json
import random

class AlgoToExercise(APIView):
    # serializer_class = UpdateUserSerializer

    def get(self, request, format=None):
        username = request.GET.get('username')
        mode = int(request.GET.get('mode'))
        muscle = request.GET.get("muscle")
        fitness, location = getfitnesslocation(username)
        try:
            user_id = int(get_userid_from_userdb(username))
            qs = UserExerciseRating.objects.all()
            q = qs.values('user_id', 'exercise_id','user_score')
            df1 = pd.DataFrame.from_records(q)
            
            if username != None and mode == 1: #For general fitness
            # exercise_data = Exercise.objects.filter(difficulty=fitness) #get all exercise data from db according to models.py format filtered by difficulty and equipment
                exercise_data = getExerciseGeneralFitness(fitness)
                df = pd.DataFrame.from_records(exercise_data.values())
                print("ALL: ", df.tail)
            
            elif username != None and mode == 2: #For focused muscle building
                # exercise_data = Exercise.objects.filter(main_musclegroup=muscle, difficulty=fitness) #get exercise data filetered for muscle, difficulty and equipment from db according to models.py format
                exercise_data = getExerciseMuscleFitness(muscle,fitness)
                print(exercise_data)
                df = pd.DataFrame.from_records(exercise_data.values())
                print("MUSCLE: ", df.head)

            elif username != None  and mode == 3: #For cardio
                muscle = "Cardio" #set muscle to cardio
                exercise_data = Exercise.objects.filter(main_musclegroup= muscle) #get exercise data filetered for cardio from db according to models.py format
                df = pd.DataFrame.from_records(exercise_data.values())
                #print("CARDIO: ", df.head)

            else:
                return Response({"Bad Request": "No Username and/or exercise_id out of range"}, status=status.HTTP_400_BAD_REQUEST)

            # recommend exercise (individual)
            exercise, usermatrix, itemid  = recommend_exercise(user_id, df1, df, n=6, rating_scale=(1, 5))
            # exercise = [10,20,40,90,130,140]
            print(exercise)
            print(f"exercisessss: {exercise}")
            ################## result 0, hard coding return 
            # exercise = [10,20,40,90,130,140]
            recoExArray = convertExerciseListToDetailsJson(exercise)

            print(username, mode, exercise)
            set_id,set_date = createSetExercises(username, mode, exercise)
            print(set_id,set_date)

            return Response({"status":3 ,"set_exercise_details":recoExArray,"set_id": set_id, "set_date": set_date}, status=status.HTTP_200_OK)
        except Exception as error:
            return Response({"Bad Request": str(error)}, status=status.HTTP_400_BAD_REQUEST)


class AlgoToLearn(APIView):
    # serializer_class = UpdateUserSerializer

    def get(self, request, format=None):
        user_id = request.GET.get('user_id')
        try:
            user_id = int(user_id)
            qs = UserExerciseRating.objects.all()
            q = qs.values('user_id', 'exercise_id','user_score')
            df1 = pd.DataFrame.from_records(q)
            exercise_data = Exercise.objects.all()
            df = pd.DataFrame.from_records(exercise_data.values())
            # recommend exercise (individual)
            exercise, usermatrix, itemid  = recommend_exercise(user_id, df1 ,df, n=5, rating_scale=(1, 5))
            # recommend exercise buddy
            nearestusers = nearestuser(20,5,usermatrix)
            nearestusers = nearestusers.astype(int)
            
            # buddy_exercisesdata = []
            
            # for k in nearestusers:
            #     buddy_exercises = recommend_exercise_n_users([user_id,int(k)], df , n=3, rating_scale=(1, 5))
            #     exercisepics_buddy=[]
            #     for m in range(0,len(buddy_exercises)):  
            #         exercisepics = Exercise.objects.filter(id = str(buddy_exercises[m])).values('pic_no')
            #         exercisepics_buddy.append(exercisepics)
            #     buddy_exercisesdata.append(exercisepics_buddy)

            # recommend exercise for buddy/group
            # nearestusers = [1,2,3]
            exercisepicsdata=[]
            for j in nearestusers:
                print(j)
                group_exercises = recommend_exercise_n_users([user_id,j], df1, n=3, rating_scale=(1, 5))
                for i in range(0,len(group_exercises)):  
                    exercisepics = Exercise.objects.filter(id = str(group_exercises[i])).values('pic_no')
                    # exercisepicsdata.append(exercisepics)
                    df2 = pd.DataFrame.from_records(exercisepics)
                    numbers = []
                    for word in df2['pic_no'][0].split("'"):
                        if word.isdigit():
                            numbers.append(int(word))
                    exercisepicsdata.append(numbers[0])


            # group_exercises = recommend_exercise_n_users([1,2,3], df , n=3, rating_scale=(1, 10))
            # exercisepicsdata=[]
            # for i in range(0,len(group_exercises)):  
            #     exercisepics = Exercise.objects.filter(id = str(group_exercises[i])).values('pic_no')
            #     # exercisepicsdata.append(exercisepics)
            #     df = pd.DataFrame.from_records(exercisepics)
            #     numbers = []
            #     for word in df['pic_no'][0].split("'"):
            #         if word.isdigit():
            #             numbers.append(int(word))
            #     exercisepicsdata.append(numbers[0])

            # Extract exercise buddy user data
            nearestusersdata=[]
            # nearestusers = [1,2,3]
            def calculate_age(born):
                today = date.today()
                return today.year - int(born[-4:]) # - ((today.month, today.day) < (int(born[2:4])), int(born[0:2]))

            for i in range(0,len(nearestusers)):  
                nulist = UserData.objects.filter(user_id = str(nearestusers[i])).values('user_id','bmi','gender','goal','fitness_level','location')
                # nulist2 = User.objects.filter(id = str(nearestusers[i])).values('DOB')
                # cal_age = calculate_age(nulist2[0]['DOB'])
                random_age = random.randint(20, 30)
                age = [json.loads(json.dumps({"age":random_age}))]
                count = [json.loads(json.dumps({"count":i+1}))]
                combined_nulist = [nulist,age,count]
                nearestusersdata.append(combined_nulist)


            # return Response({"Recommneded exercise":exercise,"Recommneded buddies":nearestusers,"Recommneded buddy/group exercise":group_exercises}, status=status.HTTP_200_OK)
            return Response({"ex":exercise,"nu":nearestusers,"ge":group_exercises, "nudata":nearestusersdata, "expics":exercisepicsdata}, status=status.HTTP_200_OK)
        except Exception as error:
            return Response({"Bad Request": str(error)}, status=status.HTTP_400_BAD_REQUEST)


# class GetExerciseDetails(APIView):
#     def get(self, request, format=None):
#         id1 = request.GET.getlist('id')
#         pic_list = []
#         try:
#             for i in id1:
#                 qs = Exercise.objects.filter(id = i)
#                 q = qs.values('pic_no')
#                 df = pd.DataFrame.from_records(q)
#                 numbers = []
#                 for word in df['pic_no'][0].split("'"):
#                     if word.isdigit():
#                         numbers.append(int(word))
#                 pic_list.append(numbers[0])
#             return Response({"pic_no":pic_list}, status=status.HTTP_200_OK)
#         except Exception as error:
#             return Response({"Bad Request": str(error)}, status=status.HTTP_400_BAD_REQUEST)

class FirstReco(APIView):
    def get(self, request, format=None):
        username = request.GET.get('username')
        exercise_id = int(request.GET.get('exercise_id'))
        mode = int(request.GET.get('mode'))
        muscle = request.GET.get("muscle")
        print(f"username,exercise_id,mode,muscle: {username},{exercise_id},{mode},{muscle}")

        fitness, location = getfitnesslocation(username)

        print(f"username,exercise_id,mode,muscle,fitness,location: {username},{exercise_id},{mode},{muscle},{fitness},{location}")

        print(f"len(Exercise.objects.filter(id= exercise_id)):{len(Exercise.objects.filter(id= exercise_id))}")
        if username != None and exercise_id != None and Exercise.objects.filter(id= exercise_id).exists() and mode == 1: #For general fitness
            # exercise_data = Exercise.objects.filter(difficulty=fitness) #get all exercise data from db according to models.py format filtered by difficulty and equipment
            exercise_data = getExerciseGeneralFitness(fitness)
            df = pd.DataFrame.from_records(exercise_data.values())
            print("ALL: ", df.tail)
        
        elif username != None and exercise_id != None and Exercise.objects.filter(id= exercise_id).exists() and mode == 2: #For focused muscle building
            # exercise_data = Exercise.objects.filter(main_musclegroup=muscle, difficulty=fitness) #get exercise data filetered for muscle, difficulty and equipment from db according to models.py format
            exercise_data = getExerciseMuscleFitness(muscle,fitness)
            print(exercise_data)
            df = pd.DataFrame.from_records(exercise_data.values())
            print("MUSLCE: ", df.head)

        elif username != None and exercise_id != None and Exercise.objects.filter(id= exercise_id).exists() and mode == 3: #For cardio
            muscle = "Cardio" #set muscle to cardio
            exercise_data = Exercise.objects.filter(main_musclegroup= muscle) #get exercise data filetered for cardio from db according to models.py format
            df = pd.DataFrame.from_records(exercise_data.values())
            #print("CARDIO: ", df.head)

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
        print(df[feature])

        #Create combined features column
        def combined_features(row):
            return row['other_musclegroups']+" "+row['exercise_type']+" "+row['mechanics']+" "+row['exercise_name']+" "+row['equipment']
        df["combined_features"] = df.apply(combined_features, axis =1)
        print(df["combined_features"])

        #Use CountVectorizer to convert words into word count for cosine similarity
        cv = CountVectorizer()
        count_matrix = cv.fit_transform(df["combined_features"])
        print("Count Matrix:", count_matrix.toarray())

        #Cosine similarity
        cosine_sim = cosine_similarity(count_matrix)
        print("here", len(cosine_sim))

        exercise_index = df[df['id'] == exercise_id].index[0] #Convert exercise_id into row number in filtered df
        print('ROW NUMBER HERE: ', exercise_index)

        #Place similar exercises in list and sort in descending similarity score
        similar_exercises = list(enumerate(cosine_sim[exercise_index]))
        #print(similar_exercises)
        sorted_similar_exercises = sorted(similar_exercises, key=lambda x:x[1], reverse=True)
        #print("SORTED SIMILAR ", sorted_similar_exercises)

        #Store top 6 similar exercise_id in list
        recoList = []
        i=0
        for exercise in sorted_similar_exercises:
            reco_id = df.loc[exercise[0], 'id'] #Convert row number in filtered df back to exercise_id
            recoList.append(reco_id)
            i=i+1
            if i>5:
                break
            
        #print("RECOLIST HERE ", recoList)


        # Creating json
        data = {}
        data["recoList"] = recoList

        recoExArray = convertExerciseListToDetailsJson(recoList)
        data['recoExList'] = recoExArray

        set_id,set_date = createSetExercises(username, mode, recoList)

        if set_id >=0: 
            data['set_id'] = set_id
            data['set_date'] = set_date
        else:
            return Response({"Bad Request": "Set is not created"}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"status":3 ,"set_exercise_id": data["recoList"], "set_exercise_details": data['recoExList'], "set_id": data['set_id'], "set_date": data['set_date']}, status=status.HTTP_200_OK)
        