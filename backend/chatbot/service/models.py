from django.db import models
## User information Part
# User information
class User(models.Model):
    uid = models.AutoField(primary_key=True)
    register_time = models.DateTimeField(auto_now_add=True)
    age = models.IntegerField(null=True)
    gender = models.CharField(max_length=10, null=True)
    work_status = models.CharField(max_length=20, null=True)
    income = models.IntegerField(null=True)
    education = models.CharField(max_length=50, null=True)

# Basic information about this scenario
class Scenario(models.Model):
    scenario_id = models.AutoField(primary_key=True)
    scenario_name = models.CharField(max_length=50, null=True)
    introduction = models.CharField(max_length=2000, null=False)
    post_question = models.CharField(max_length=2000, null=True)

# Key and ans for each scenario
class Expirement(models.Model):
    scenario = models.ForeignKey(Scenario, related_name='scenario_expirement', on_delete=models.CASCADE)
    section_id = models.IntegerField(null=False)
    instruction = models.CharField(max_length=1000, null=False)
    keyword = models.CharField(max_length=1000, null=False)
    antro_level = models.IntegerField(null=True)
    answer = models.CharField(max_length=1000, null=False)

# Scenario order for each user
class Task(models.Model):
    task_id = models.AutoField(primary_key=True)
    task1 = models.IntegerField(null=True)
    task2 = models.IntegerField(null=True)
    task3 = models.IntegerField(null=True)

# Anthro-level for each task
class Task_Anthropomorphism(models.Model):
    task_id = models.AutoField(primary_key=True)
    task1_level = models.IntegerField(null=True)
    task2_level = models.IntegerField(null=True)
    task3_level = models.IntegerField(null=True)

# Antro type for different degree
class Anthropomorphism(models.Model):
    level_id = models.AutoField(primary_key=True)
    avatar = models.BooleanField(null=False)
    typing = models.BooleanField(null=False)
    tone = models.BooleanField(null=False)

# Dialog with bot for each user 
class DialogRelated(models.Model):
    uid = models.ForeignKey(User, related_name='user_dialog', on_delete=models.CASCADE)
    scenario_id = models.IntegerField(null=False)
    dialog = models.CharField(max_length=10000, null=True)
    willing = models.IntegerField(null=True)


## Questionnaire Part
# Basic questionnaire information
class Questionnaire(models.Model):
    part_id = models.AutoField(primary_key=True)
    part_name = models.CharField(max_length=50, null=True)
    part_notation = models.CharField(max_length=1000, null=True)
    part_title = models.CharField(max_length=1000, null=True)

# Question and selectable answers
class Question(models.Model):
    qid = models.AutoField(primary_key=True)
    part_id = models.ForeignKey(Questionnaire, related_name='questionnaire_question', on_delete=models.CASCADE)
    content = models.CharField(max_length=1000, null=True)
    min_text = models.CharField(max_length=50, null=False)
    max_text = models.CharField(max_length=50, null=False)
    form_array = models.CharField(max_length=100, null=False)
    type = models.CharField(max_length=10, null=False)

# Same like Task, it's the order of survey for each user (may not necessary)
class Survey(models.Model):
    survey_id = models.AutoField(primary_key=True)
    survey_order = models.CharField(max_length=100, null=False)

# User answers for each question
class Survey_Answer(models.Model):
    qid = models.ForeignKey(Question, related_name='question_answer', on_delete=models.CASCADE)
    uid = models.ForeignKey(User, related_name='user_surveyans', on_delete=models.CASCADE)
    ans = models.CharField(max_length=100, null=False)
    ans_index = models.IntegerField(null=False)










