from rest_framework import serializers
from namecards import models

class UserCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserCardModel
        fields = "__all__"


