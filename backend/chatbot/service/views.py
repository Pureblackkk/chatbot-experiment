from django.http import JsonResponse, HttpResponse, response
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
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


class InfoViewSet(ViewSet):
    def create(self, request, pk=None):
        return Response(json.dumps(tempInfo))
        




