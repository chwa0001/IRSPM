from django.db import models
import string
import random


def generate_unique_code():
    length = 6

    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if User.objects.filter(code=code).count() == 0:
            break

    return code

# Create your models here.

class User(models.Model):
    code = models.CharField(max_length=8, default=generate_unique_code, unique=True)
    fullname = models.CharField(max_length=50,default='Noname')
    DOB = models.CharField(max_length=6,default='010190') ## should be in DateField? Char field user can put "099020"
    username = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=50,unique=False)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.BooleanField(default=True)
    class Meta:
        db_table = "USER_CREDENTIAL_DATABASE"

class UserData(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    fitness_level = models.IntegerField(null=False, default=1)
    gender = models.CharField(max_length=1, default='M')
    goal = models.CharField(max_length=50, default='')
    accomplishment = models.CharField(max_length=50, default='')
    bmi = models.IntegerField(null=False, default=0)
    intensity = models.IntegerField(null=False, default=0)
    class Meta:
        db_table = "USER_DATABASE"
