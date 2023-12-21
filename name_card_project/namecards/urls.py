from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

from namecards.views import UserCardView, get_image_options


urlpatterns = [
    path("usercard/", UserCardView.as_view(), name="user-card"),
    path("usercard/<int:pk>", UserCardView.as_view(),
         name="user-card-edit"),
    path("avatar/", get_image_options, name="avatars")
]
