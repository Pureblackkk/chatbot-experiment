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
    scenario_name = models.CharField(max_length=50, null=True)
    introduction = models.CharField(max_length=2000, null=False)
    post_question = models.CharField(max_length=2000, null=True)


class Expirement(models.Model):
    scenario = models.ForeignKey(Scenario, related_name='scenario_expirement', on_delete=models.CASCADE)
    section_id = models.IntegerField(null=False)
    instruction = models.CharField(max_length=1000, null=False)
    keyword = models.CharField(max_length=1000, null=False)
    antro_level = models.IntegerField(null=True)
    answer = models.CharField(max_length=1000, null=False)

class Task(models.Model):
    task_id = models.AutoField(primary_key=True)
    task1 = models.IntegerField(null=False)
    task2 = models.IntegerField(null=False)
    task3 = models.IntegerField(null=False)

class Task_Anthropomorphism(models.Model):
    task_id = models.AutoField(primary_key=True)
    task1_level = models.IntegerField(null=False)
    task2_level = models.IntegerField(null=False)
    task3_level = models.IntegerField(null=False)

class Anthropomorphism(models.Model):
    level_id = models.AutoField(primary_key=True)
    avatar = models.BooleanField(null=False)
    typing = models.BooleanField(null=False)
    tone = models.BooleanField(null=False)






