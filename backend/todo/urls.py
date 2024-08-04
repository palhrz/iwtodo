from django.urls import path, include
from .views import current_user, register, login, logout, TodoView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'todos', TodoView, basename='todo')

urlpatterns = [
    path('register/', register, name='register'),
    path('login/', login, name='login'),
    path('logout/', logout, name='logout'),
    path('user/', current_user, name='current_user'),
    path('', include(router.urls)),
]