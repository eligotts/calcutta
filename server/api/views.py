from django.shortcuts import render
from rest_framework.response import Response 
from rest_framework.decorators import api_view
from .models import Player 
from .serializers import PlayerSerializer

# Create your views here.

@api_view(['GET'])
def getRoutes(request):
    routes = [
        {
            'Endpoint': '/test/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Test post method'
        },
        {
            'Endpoint': '/test/get',
            'method': 'GET',
            'body': None,
            'description': 'Test get method'   
        },
        {
            'Endpoint': '/test/getsingle',
            'method': 'GET',
            'body': None,
            'description': 'Test get method, get one'   
        },
        
    ]
    return Response(routes)

@api_view(['GET'])
def getPlayers(request):
    players = Player.objects.all()
    serializer = PlayerSerializer(players, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getPlayer(request,pk):
    players = Player.objects.get(id=pk)
    serializer = PlayerSerializer(players, many=False)
    return Response(serializer.data)


#python3 manage.py runserver

#stopped at 1:46:39