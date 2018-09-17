from django.shortcuts import render
from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework import mixins, viewsets
from rest_framework.permissions import IsAdminUser
from udon_back.permissions import IsAdherentUser, IsLiquidsoap
from .serializers import SongCreateSerializer, SongPlaylistSerializer, LiveStreamSerializer

import json
from .models import Song, LiveStream
from rest_framework.decorators import list_route, action
from rest_framework.response import Response

LISTKEY = 'playlist'
LIVEKEY = 'livestream'

class SongViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    permission_classes = [IsAdherentUser,]
    serializer_class = SongCreateSerializer
    queryset = []

    @list_route(permission_classes=[IsLiquidsoap])
    def next(self, request, format=None):
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
        #TODO: exception handling for Song.DoesNotExist
        songs = [Song.objects.get(pk=pk) for pk in pks] # Keep it sorted
        serialized = SongPlaylistSerializer(songs, many=True)
        return Response(serialized.data)

class LiveStreamViewSet(viewsets.GenericViewSet):

    permission_classes = []
    serializer_class = LiveStreamSerializer

    @action(detail=False)
    def current(self, request):
        pk = settings.REDIS.get(LIVEKEY)
        live = LiveStream.objects.get(pk=int(pk)) if pk else None
        data = LiveStreamSerializer(live).data if live else None
        return Response(data)

    @action(detail=False, methods=['post'], permission_classes=[IsLiquidsoap])
    def connect(self, request):
        try:
            username=request.data.get('user')
            user = get_user_model().objects.get(username=username)
            password = request.data.get('password')
            if not user.check_password(password):
                raise Exception
        except:
            return Response('expected valid user and password params', status=400)
        if settings.REDIS.get(LIVEKEY):
            return Response('Multi-connection is not supported at the moment', status=400)
        try:
            live = LiveStream.objects.get(host=user)
        except LiveStream.DoesNotExist:
            return Response('this user is not allowed to livestream at the moment', status=403)

        settings.REDIS.set(LIVEKEY, live.pk)
        return (Response(LiveStreamSerializer(live).data))

    @action(detail=False, methods=['post'], permission_classes=[IsLiquidsoap])
    def disconnect(self, request):
        settings.REDIS.delete(LIVEKEY)
        return (Response(None))
