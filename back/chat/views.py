from django.shortcuts import render
from rest_framework import mixins, generics
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings

from .serializers import ChatMessageSerializer

def index(request):
    return render(request, 'chat/index.html', {})

class ChatMessageCreate(mixins.CreateModelMixin, generics.GenericAPIView):

    serializer_class = ChatMessageSerializer
    def post(self, request, *args, **kwargs):

        serializer = ChatMessageSerializer(data=request.data)
        if (serializer.is_valid()):
            if request.user.is_authenticated:
                serializer.validated_data['author'] = request.user
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
