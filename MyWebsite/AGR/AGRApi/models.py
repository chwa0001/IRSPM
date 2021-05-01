from django.db import models
import string
import random
import pandas as pd

def generate_unique_code():
    length = 6

    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if User.objects.filter(code=code).count() == 0:
            break

    return code

# Create your models here.

class User(models.Model):
    code        = models.CharField(max_length=6, default=generate_unique_code, unique=True)
    fullname    = models.CharField(max_length=50,default='Noname')
    DOB         = models.CharField(max_length=8,default='010190') ## should be in DateField? Char field user can put "099020"
    username    = models.CharField(max_length=50, unique=True)
    password    = models.CharField(max_length=50,unique=False)
    created_at  = models.DateTimeField(auto_now_add=True)
    status      = models.BooleanField(default=True)
    
    def __str__(self):
        return self.username

    class Meta:
        db_table = "USER_CREDENTIAL_DATABASE"


class UserData(models.Model):
    user            = models.ForeignKey(User,on_delete=models.CASCADE)
    fitness_level   = models.IntegerField(null=False, default=0)
    gender          = models.CharField(max_length=1, default='')
    goal            = models.IntegerField(null=False, default=0)
    bmi             = models.FloatField(null=False, default=20)
    intensity       = models.IntegerField(null=False, default=0)
    location        = models.IntegerField(null=False, default =0) #1 home, 2 gym 

    class Meta:
        db_table = "USER_DATABASE"



class Exercise(models.Model):
    exercise_name           = models.CharField(max_length=50, unique=True)
    main_musclegroup        = models.CharField(max_length=30,blank=True,null=True)
    detailed_musclegroup    = models.CharField(max_length=30,blank=True,null=True)
    other_musclegroups      = models.CharField(max_length=100,blank=True,null=True)
    exercise_type           = models.CharField(max_length=30,blank=True,null=True)
    mechanics               = models.CharField(max_length=30,blank=True,null=True)
    equipment               = models.CharField(max_length=100,blank=True,null=True)
    difficulty              = models.CharField(max_length=20,blank=True,null=True)
    instruction_text        = models.TextField(blank=True,null=True)
    pic_no                  = models.TextField(blank=True,null=True)
    link_url                = models.URLField(blank=True,null=True)

    def __str__(self):
        return self.exercise_name

    class Meta:
        db_table = 'EXERCISE'


class UserExerciseRating(models.Model): 
    user            = models.ForeignKey('AGRApi.UserData', on_delete=models.CASCADE)
    exercise        = models.ForeignKey(Exercise, on_delete=models.CASCADE)
    user_score      = models.FloatField(default=5)
    exercise_count  = models.IntegerField(default=1)
    class Meta:
        db_table = 'USER_EXERCISE'

class Routine(models.Model):
    userdata        = models.ForeignKey('AGRApi.UserData',on_delete=models.CASCADE)
    date            = models.DateField()
    rate            = models.BooleanField(default=False)
    mode            = models.IntegerField(default=0) #1 general #2 muscle #3 endurence 
    class Meta: 
        db_table = 'ROUTINE'

class RoutineExercises(models.Model):
    routine     = models.ForeignKey(Routine, on_delete=models.CASCADE)
    exercise    = models.ForeignKey(Exercise, on_delete=models.CASCADE)
    class Meta: 
        db_table = 'ROUTINE_EXERICSE'

def generate_database(): 
    # print("initiating database checkpoint 2")
    ex_db = pd.read_excel("./ExerciseDataBase.xlsx")
    # print("initiating database checkpoint 3")
    for ind,ex in ex_db.iterrows():
        e = Exercise(exercise_name = ex['Exercise Name'], main_musclegroup = ex['MainMuscleGroup'], 
                        detailed_musclegroup = ex['DetailedMuscleGroup'], other_musclegroups = ex['OtherMuscleGroups'],
                        exercise_type = ex['Type'], mechanics = ex['Mechanics'], equipment = ex['Equipment'], 
                        difficulty = ex['Difficulty'], instruction_text = ex['InstructionText'], 
                        pic_no = ex['PIC_NO'], link_url = ex['Link'])
        e.save()
        # print(f"save {ind}")


def save_routine_exercises ():
    # to add in how to write the server
    return 0

#antonia 03/24/21
#database is connected by username and cookies is by username. to get the user id
def get_userid_from_userdb (username):
    queryset = User.objects.filter(username=username)

    if queryset.exists():
        user = queryset[0]
        # print(user.id)
        if user.username==username:
            #status:0==> user credential verified okay
            user_id = user.id
            # print(f"print user_id from get_userid_from_userdb function: {user_id}")
            return user_id
    else:
        return -1


##currently not used yet
def get_data_from_userdb (username,request_type):
    # print("was here")
    queryset = User.objects.filter(username=username)

    if queryset.exists():
        user = queryset[0]
        # print(f"get_data_from_userdb: {user.id}")
        if user.username==username:
            #status:0==> user credential verified okay
            return_var = user.request_type
            # print(f"print user_id from get_userid_from_userdb function: {return_var}")
            return return_var
    else:
        return -1

#antonia 03/24/21
#Given the username, return the details
def get_alluserdata_from_userdb (username):
    # print("was here")
    user = User.objects.filter(username=username)[0]
    # print(f"user id from get_alluserdata_from_userdb: {user.id}")
    userdata = UserData.objects.filter(user_id=user.id)[0]
    if userdata.user_id==user.id:
        # print(f"user from get_alluserdata_from_userdb function: {userdata.gender}")
        # print("{" + f""""gender":{userdata.gender},
        #                     "fitness_level":{userdata.fitness_level},
        #                     "goal":{userdata.goal},
        #                     "intensity":{userdata.intensity},
        #                     "bmi":{userdata.bmi}"""+"}")
        # print(userdata)
        return userdata
    return -1

#antonia 03/24/21
#get all the set that have not been reviewed
#get the first set. 
def get_set_to_review (username, rate = False):
    # print("was here - get_set_to_review")
    # print(username)
    user = User.objects.get(username=username)
    # print(f"user id from get_alluserdata_from_userdb: {user.id}")
    # return "nothing"
    routine_set = Routine.objects.filter(userdata = user.id, rate = rate).order_by('-date')
    # print(f"routine_set len: {len(routine_set)}")
    # print(f"routine_set:{routine_set}")

    if len(routine_set) > 0 :
        # print(f"routine_set:{routine_set}")
        routine = routine_set[0]
        # print(f"user from get_alluserdata_from_userdb function: {routine.userdata_id}")
        # print("{" + f""""user_id":{routine.userdata_id},
        #                     "set_id":{routine.id},
        #                     "date":{routine.date},
        #                     "rate":{routine.rate}"""+"}")
        # print(routine)
        return routine
    else :
        # print("no exercise to rate")
        return "no exercise to rate"    

#antonia 04/02/21
#get set to show
# #get the first set. 
def get_set (username):
    user = User.objects.get(username=username)
    # return "nothing"
    routine_set = Routine.objects.filter(userdata = user.id).order_by('-date')
    if len(routine_set) > 0 :
        routine = routine_set[0]
        return routine.id
    else :
        return "no exercise to return"    


#antonia 03/24/21
#from routine object, get all the exercises associated with that routine set
def get_set_exercises (routine):
    # print("was here - get_set_exercises")
    exercises = RoutineExercises.objects.filter(routine = routine.id)
    # print(f"routine: {routine}")
    # print(f"exercises: {exercises}")

    edic = []
    enames = []
    eids = []
    for exercise in exercises:
        temp_dic = {}
        e = Exercise.objects.get(id = exercise.exercise_id)
        # print(f"ename: {e.exercise_name}")
        # print(f"exercise.exercise_id : {exercise.exercise_id}")
        temp_dic["id"] = e.id
        temp_dic["name"] = e.exercise_name
        edic.append(temp_dic)
        enames.append(e.exercise_name)
        eids.append(e.id)
    # print(edic)
    return enames,edic,eids 

#antonia 03/24/21 not used -- to delete in the future if not used
def get_set_exercises_output_in_str (eids):
    counter = 1
    eids_str = '{'
    for eid in eids:
        eids_str = eids_str + f' "exercise_id_{counter}" : "{eid}" ,'
        counter = counter + 1
    eids_str = eids_str + '}'
    return eids_str