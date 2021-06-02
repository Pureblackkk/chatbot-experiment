from django.http import JsonResponse, HttpResponse
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.viewsets import ModelViewSet

class Info(ModelViewSet):
    def create(self, request, pk=None):
        




