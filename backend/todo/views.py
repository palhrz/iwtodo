from django.contrib.auth import authenticate, login as django_login, logout as django_logout
from django.contrib.auth.models import User
from django.shortcuts import render
from django.middleware.csrf import get_token
from rest_framework import viewsets
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import TodoSerializer, UserSerializer
from .models import Todo

class TodoView(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()

@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """
    user = request.user
    serializer = UserSerializer(user)
    return Response(serializer.data)

@api_view(['POST'])
def register(request):
    username = request.data.get('username')
    password = request.data.get('password')
    if User.objects.filter(username=username).exists():
        return Response({"error": "User already exists"}, status=status.HTTP_400_BAD_REQUEST)
    user = User.objects.create_user(username=username, password=password)
    return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)

def get_csrf_token(request):
    token = get_token(request)
    return Response({'csrfToken': token})

# Login view
@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(request, username=username, password=password)
    if user is not None:
        django_login(request, user)
        return Response({"message": "Login successful"}, status=status.HTTP_200_OK)
    return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

# Logout view
@api_view(['POST'])
def logout(request):
    django_logout(request)
    return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)