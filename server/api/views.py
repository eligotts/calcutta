from django.shortcuts import render
from itsdangerous import Serializer
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
def getNumPlayers(request):
    # players = Player.objects.all()
    # serializer = PlayerSerializer(players, many=True)
    return Response(Player.objects.count())

@api_view(['GET'])
def getPlayer(request,pk):
    players = Player.objects.get(id=pk)
    serializer = PlayerSerializer(players, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
def updatePlayer(request,pk):
    data = request.data
    player = Player.objects.get(id = pk)
    price_object = Player._meta.get_field('price')
    price = price_object.value_from_object(player)

    if int(data['price']) > price:
        serializer = PlayerSerializer(instance=player, data=data)

        if serializer.is_valid():
            serializer.save()
    else:
        serializer = PlayerSerializer(player, many=False)


    return Response(serializer.data)

#python3 manage.py runserver

#stopped at 1:58:16

#look into the async await thing, might want to use it

#when you make changes to the api, you have to run makemigrations, migrate, then clear cookies in the console for it to work