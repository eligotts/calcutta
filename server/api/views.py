from django.shortcuts import render
from django.http import JsonResponse

# Create your views here.

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
    ]
    return JsonResponse(routes, safe = False)


#python3 manage.py runserver