from django.shortcuts import render
from django.contrib.auth import authenticate
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response

from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.settings import api_settings
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import LoginSerializer, UserSerializer
from user import models


# Create your views here.


class UserProfileViewSet(viewsets.ModelViewSet):
    """Profilok létrehozásának és frissítésének a kezelése"""
    serializer_class = UserSerializer
    queryset = models.UserModel.objects.all()


class CreateUserView(APIView):
    def post(self, request):
        print(request.data)
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Sikeres regisztráció!"}, status=status.HTTP_201_CREATED)
        return Response({"message": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class CheckUserAuth(APIView): 
    def get(self, request):
        current_user = request.user
        if current_user.is_authenticated:
            serialized_user = UserSerializer(current_user).data
            return Response({"message": True, "user": serialized_user["name"]})
        else:
            return Response({"message": False})


class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)

        if serializer.is_valid():
            user = authenticate(
                username=serializer.validated_data["email"], password=serializer.validated_data["password"])
            if user:
                refresh = RefreshToken.for_user(user)

                return Response(
                    {
                        "refresh": str(refresh),
                        "access": str(refresh.access_token)
                    },
                    status=status.HTTP_200_OK
                )
            return Response({"message": "Hibás email vagy jelszó!"}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class UserLoginApiView(ObtainAuthToken):
#     renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES
