from django.shortcuts import render
from rest_framework import mixins, viewsets

from udon_back.permissions import IsAdherentUser, IsLiquidsoap
from .serializers import SongCreateSerializer


from .models import Song
from rest_framework.decorators import list_route
from rest_framework.response import Response
class SongViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    permission_classes = [IsAdherentUser,]
    serializer_class = SongCreateSerializer

    @list_route(permission_classes=[IsLiquidsoap])
    def next(self, request):
        unplayed = Song.objects.filter(play_count=0)
        if unplayed.exists():
            song = unplayed.earliest('audio__created')
        else:
            # Raises an eexception if no song exists
            song = Song.objects.order_by('?')[0]
        song.play_count += 1
        song.save()
        return Response(song.audio.audio.name)
