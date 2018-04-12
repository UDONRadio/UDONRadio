from django.shortcuts import render
from django.conf import settings
from rest_framework import mixins, viewsets

from udon_back.permissions import IsAdherentUser, IsLiquidsoap
from .serializers import SongCreateSerializer, SongPlaylistSerializer

import json
from .models import Song
from rest_framework.decorators import list_route
from rest_framework.response import Response

LISTKEY = 'playlist'

class SongViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    permission_classes = [IsAdherentUser,]
    serializer_class = SongCreateSerializer
    queryset = []

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

        with settings.REDIS.pipeline() as pipe:
            pipe.multi()
            pipe.lpush(LISTKEY, song.pk)
            pipe.ltrim(LISTKEY, 0, 10)
            pipe.execute()
        return Response(song.audio.audio.name)

    @list_route(permission_classes=[])
    def played(self, request):
        pks = [int(pk) for pk in settings.REDIS.lrange(LISTKEY, 0, 10)]
        songs = [Song.objects.get(pk=pk) for pk in pks]
        serialized = SongPlaylistSerializer(songs, many=True)
        return Response(serialized.data)
