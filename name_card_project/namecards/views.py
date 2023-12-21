from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from namecards.serializers import UserCardSerializer
from namecards.models import UserCardModel


# Create your views here.


class UserCardView(APIView):
    """Új névjegykártya létrehozás és meglévők lekérése"""
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request):
        user_card_data = UserCardModel.objects.all()
        serialized_data = UserCardSerializer(user_card_data, many=True)
        return Response(serialized_data.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = UserCardSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Sikeres mentés"}, status=status.HTTP_200_OK)
        return Response({"message": "Sikertelen mentés"}, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk):
        try:
            user_card_data = UserCardModel.objects.get(pk=pk)
        except UserCardModel.DoesNotExist:
            return Response({"message": "Névjegykártya nem található"}, status=status.HTTP_404_NOT_FOUND)

        serializer = UserCardSerializer(
            user_card_data, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Sikeres frissítés"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            user_card_data = UserCardModel.objects.get(pk=pk)
        except UserCardModel.DoesNotExist:
            return Response({"message": "Névjegykártya nem található"}, status=status.HTTP_404_NOT_FOUND)

        user_card_data.delete()
        return Response({"message": "Névjegykártya sikeresen törölve"}, status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
@permission_classes([IsAuthenticatedOrReadOnly])
def get_image_options(request):
    """avatar képek lekérése, hogy a FrontEnd dropdown menüje megkaphassa az adatokat"""
    return Response(UserCardModel.IMAGE_CHOICES)
