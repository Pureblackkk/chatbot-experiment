from django.db import models
# Create your models here.

# User information
class User(models.Model):
    uid = models.AutoField(primary_key=True)
    register_time = models.DateTimeField(auto_now_add=True)
    age = models.IntegerField(null=True)
    gender = models.CharField(max_length=10, null=True)
    work_status = models.CharField(max_length=20, null=True)
    income = models.IntegerField(null=True)
    education = models.CharField(max_length=50, null=True)

class Scenario(models.Model):
    scenario_id = models.AutoField(primary_key=True)
    


