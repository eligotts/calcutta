from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('players/', views.getPlayers, name="players"),
    path('players/<str:pk>/update/', views.updatePlayer, name="update-player"),
    path('players/<str:pk>/', views.getPlayer, name="players"),
    path('numplayers/', views.getNumPlayers, name="num-players"),
    path('addplayer/', views.addPlayer, name="add-player"),
]


# if settings.DEBUG:
#         urlpatterns += static(settings.MEDIA_URL,
#                               document_root=settings.MEDIA_ROOT)