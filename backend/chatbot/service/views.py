from django.http import JsonResponse, HttpResponse, response
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from .models import User
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
        uid = str(newUser.pk)
        
        # TODO: Return the user's id and experiment data 
        resInfo = tempInfo
        resInfo['id'] = uid
        return Response(json.dumps(resInfo))
    
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
        




