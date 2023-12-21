from django.urls import path, include
from rest_framework import routers
from user import views

router = routers.DefaultRouter()
router.register("user", views.UserProfileViewSet, basename="user-profile")


urlpatterns = [
    path('auth/', views.CheckUserAuth.as_view(), name='auth-user'),
    path("login/", views.LoginView.as_view(), name="login"),
    path("sign-up/", views.CreateUserView.as_view(), name="user-signup"),
    # path("login2/", views.UserLoginApiView.as_view()),
    path('', include(router.urls)),
]
