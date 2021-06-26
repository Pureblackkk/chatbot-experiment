from django.http import JsonResponse, HttpResponse, response
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from .models import User, Scenario, Expirement, Task, Task_Anthropomorphism, Anthropomorphism
import json

tempInfo = {
    'id': 1,
    'name': 'black',
    'inroduction': [
        'intro1', 'intro2', 'intro3'
    ],
    'instruction': [
        ['instruction1-1', 'instrucntion1-2', 'instruction1-3'],
        ['instruction2-1', 'instrucntion2-2', 'instruction2-3'],
        ['instruction3-1', 'instrucntion3-2', 'instruction3-3'],
    ],
    'key': [
        [['aaa', 'key'], ['bbb', 'a', 'key'], ['ccc', 'key', 'cc', 'ddd']],
        [['aaa', 'key'], ['bbb', 'a', 'key'], ['ccc', 'key', 'cc', 'ddd']],
        [['aaa', 'key'], ['bbb', 'a', 'key'], ['ccc', 'key', 'cc', 'ddd']]
    ],
    'ans': [
        ['hhahaha', 'pupup', 'lalalal'],
        ['asdasd', 'qgfdhgdf', 'dsagfh'],
        ['asfgvc', 'asfasf', 'ffsdfsdf']
    ],
    'antroLevel': [
        {
            'name': 'bot',
            'avator': 0,
            'wait': True
        },
        {
            'name': 'Bruce',
            'avator': 1,
            'wait': False
        },
        {   
            'name': 'bot',
            'avator': 0,
            'wait': True
        }
    ],
    'color': [
            'teal',
            'tomato',
            'skyblue',
            'green'      
    ]
}


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
            resAns.append(ans)

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


class InfoViewSet(ViewSet):
    def create(self, request, pk=None):
        return Response(json.dumps(tempInfo))
        




