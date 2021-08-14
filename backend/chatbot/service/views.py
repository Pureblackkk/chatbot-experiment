from django.http import JsonResponse, HttpResponse, response
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from rest_framework import status
from .models import User, Scenario, Expirement, Task, Task_Anthropomorphism, Anthropomorphism, DialogRelated
from .models import Questionnaire, Question, Survey, Survey_Answer
import json


class UserViewSet(ViewSet):
    def create(self, request, pk=None):
        # Register for user
        newUser = User.objects.create()
        # uid = str(newUser.pk)
        uid = 1
        
        # TODO: Return the user's id and experiment data
        # Inital a response object with fixed components
        responseData = {}
        responseData['id'] = uid
        responseData['name'] = 'user'
        responseData['color'] = ['teal', 'tomato', 'skyblue', 'green']
       
        # Get task based on uid 
        taskList = Task.objects.filter(task_id=uid).values_list()[0][1:]

        # Get anthropomorphism list
        antroLevelList = Task_Anthropomorphism.objects.filter(task_id=uid).values_list()[0][1:]
        resAntroLevel = []
        tonelist = []
        for levelId in antroLevelList:
            antroObj = {}

            # Old version 
            antroDetail = Anthropomorphism.objects.filter(level_id=levelId).values_list()[0][1:]
            antroObj['name'] = 'David' if antroDetail[2] else 'bot#15789' # old label name
            antroObj['avator'] = 1 if antroDetail[2] else 0 # old avator for human and bot

            # New version 
            antroObj['isAvator'] = True if antroDetail else False  # new is avator exist
            antroObj['wait'] = True if antroDetail[1] else False # new is type exist
            antroObj['human'] = True if antroDetail[2] else False # new is human like exist

            # Add tone type for later use
            tonelist.append(1 if antroDetail[2] else 0)

            # Add into responese 
            resAntroLevel.append(antroObj)
       

        # Get experiment data 
        resIntroduction = []
        resPostQuestion = []
        resInstruction = []
        resKey = []
        resAns = []

        for sceneId, antroLevel in zip(taskList, tonelist):
            # Get introduction
            intro = Scenario.objects.filter(scenario_id=sceneId).values_list('introduction')[0][0]
            resIntroduction.append(intro)

            # Get post question
            postQ = Scenario.objects.filter(scenario_id=sceneId).values_list('post_question')[0][0]
            resPostQuestion.append(postQ)

            # Get instruction 
            instr = list(Expirement.objects.filter(scenario_id=sceneId, antro_level=antroLevel).values_list('instruction', flat=True))
            resInstruction.append(instr)

            # Get Key
            strKeyList = Expirement.objects.filter(scenario_id=sceneId, antro_level=antroLevel).values_list('keyword')
            listKeyList = []
            for strKey in strKeyList:
                listKeyList.append(strKey[0].split(' | '))
            resKey.append(listKeyList)

            # Get Ans
            ans = list(Expirement.objects.filter(scenario_id=sceneId, antro_level=antroLevel).values_list('answer', flat=True))
            listAns = []
            for strAns in ans:
                splitAns = strAns.split(' | ')
                if len(splitAns) == 1:
                    listAns.append(splitAns[0])
                else:
                    listAns.append(splitAns)
            resAns.append(listAns)

        # Add the query value in return object 
        responseData['inroduction'] = resIntroduction
        responseData['postQuestion'] = resPostQuestion
        responseData['instruction'] = resInstruction
        responseData['key'] = resKey
        responseData['ans'] = resAns
        responseData['antroLevel'] = resAntroLevel
        
        return Response(json.dumps(responseData))
    
    def update(self, request, pk=None):
        userDemo = json.loads(request.body)
        uid = pk
        # Update
        try:
            User.objects.filter(uid=uid).update(
                age=userDemo['age'], 
                gender=userDemo['gender'],
                work_status=userDemo['work'],
                income=userDemo['income'],
                education=userDemo['education']
            ) 
            return Response(json.dumps({'res': 'ok', 'detail': 'null'}))
        except Exception as e:
            return Response(json.dumps({'res': 'fail', 'detail': str(e)}))

class QuestionViewSet(ViewSet):
    def retrieve(self, request, pk):
        partId = pk

        # Get questionnaire instance 
        try:
            questionnaireInst = Questionnaire.objects.get(part_id=partId)
            questionnaireRes = {
                'part_id': questionnaireInst.part_id,
                'part_name': questionnaireInst.part_name,
                'part_notation': questionnaireInst.part_notation,
                'part_title': questionnaireInst.part_title
            }
            
            # Get whole questionnaire according to question part id
            questionList = Question.objects.filter(part_id=questionnaireInst).values()

            # Prepare response object 
            resObject = {
                'questionnaire': questionnaireRes,
                'questions': questionList
            }
            return Response({'res': 'ok', 'data':resObject, 'detail': 'null'})
        except Exception as e:
            return Response(json.dumps({'res': 'fail', 'detail': str(e)}))

    def create(self, request, pk=None):
        questionData = json.loads(request.body)
        uid = questionData['uid']
        ansList = questionData['payload']

        try:
            # Create answer object
            userInst = User.objects.get(uid=uid)
            for item in ansList:
                if not item:
                    continue
                questionInst = Question.objects.get(qid=item['qid'])
                # See if answer already exist
                isExists = len(Survey_Answer.objects.filter(qid=questionInst, uid=userInst).values_list()) > 0
                isExists or Survey_Answer.objects.create(qid=questionInst, uid=userInst, ans=item['value'], ans_index=item['selectedIdx'])

            return Response(json.dumps({'res': 'yes', 'detail': 'Save success'}))
        except Exception as e:
            return Response(json.dumps({'res': 'fail', 'detail': str(e)}))

class DialogViewSet(ViewSet):
    def create(self, request, pk=None):
        userInfo = json.loads(request.body)
        # Get info 
        uid = userInfo['uid']
        dialog = userInfo['dialog']
        sceneId = userInfo['scenario']

        # Create dialog 
        preRes = DialogRelated.objects.filter(uid=uid, scenario_id=sceneId)
        if not preRes: 
            try:
                userObj = User.objects.get(uid=uid)
                DialogRelated.objects.create(uid=userObj, scenario_id=sceneId, dialog=dialog)
                return Response(json.dumps({'res': 'ok', 'detail': 'null'}))
            except Exception as e:
                print(e)
                return Response(json.dumps({'res': 'fail', 'detail': str(e)}))
        else:
            return Response(json.dumps({'res': 'fail', 'detail': 'dialog already existed'}))

    def update(self, request, pk=None):
        userInfo = json.loads(request.body)
        uid = pk
        sceneId = userInfo['scenario']
        willing = userInfo['willing']
        # Update
        try:
            dialogObj = DialogRelated.objects.filter(uid=uid, scenario_id=sceneId)
            isExisted = dialogObj.values_list('willing', flat=True)[0]
            isExisted or dialogObj.update(willing=willing)
            return Response(json.dumps({'res': 'ok', 'detail': 'null'}))
        except Exception as e:
            print(e)
            return Response(json.dumps({'res': 'fail', 'detail': str(e)}))

    


        




