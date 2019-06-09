from django.shortcuts import render
from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework import mixins, viewsets
from rest_framework.permissions import IsAdminUser
from udon_back.permissions import IsAdherentUser, IsLiquidsoap
from .serializers import SongCreateSerializer, SongPlaylistSerializer, LiveStreamSerializer

import json
import redis
from .models import Song, LiveStream
from rest_framework.decorators import list_route, action
from rest_framework.response import Response

LISTKEY = 'playlist'
LIVEKEY = 'livestream'

def get_redis_connection():
    return redis.StrictRedis(host=settings.REDIS_HOST, port=6379, db=1)

class SongViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    permission_classes = [IsAdherentUser,]
    serializer_class = SongCreateSerializer
    queryset = []

    @list_route(permission_classes=[IsLiquidsoap])
    def next(self, request, format=None):
        songs = Song.objects.filter(enabled=True, archive=None)
        unplayed = songs.filter(play_count=0)
        if unplayed.exists():
            song = unplayed.earliest('audio__created')
        else:
            # Raises an exception if no enabled song exists
            song = songs.order_by('?')[0]
        song.play_count += 1
        song.save()

        r = get_redis_connection()
        with r.pipeline() as pipe:
            pipe.multi()
            pipe.lpush(LISTKEY, song.pk)
            pipe.ltrim(LISTKEY, 0, 10)
            pipe.execute()
        return Response(song.audio.audio.name)

    @list_route(permission_classes=[])
    def played(self, request):
        r = get_redis_connection()
        pks = [int(pk) for pk in r.lrange(LISTKEY, 0, 10)]
        #TODO: exception handling for Song.DoesNotExist
        songs = [Song.objects.get(pk=pk) for pk in pks] # Keep it sorted
        serialized = SongPlaylistSerializer(songs, many=True)
        return Response(serialized.data)

class LiveStreamViewSet(viewsets.GenericViewSet):

    permission_classes = []
    serializer_class = LiveStreamSerializer

    @action(detail=False)
    def current(self, request):
        r = get_redis_connection()
        pk = r.get(LIVEKEY)
        live = LiveStream.objects.get(pk=int(pk)) if pk else None
        data = LiveStreamSerializer(live).data if live else None
        return Response(data)

    @action(detail=False, methods=['post'], permission_classes=[IsLiquidsoap])
    def connect(self, request):
        try:
            username=request.data.get('user')
            user = get_user_model().objects.get(username=username)
        except:
            return Response('expected valid user', status=400)
        r = get_redis_connection()
        if r.get(LIVEKEY):
            return Response('Multi-connection is not supported at the moment', status=400)
        lives = LiveStream.objects.filter(host=user)
        if not lives.exists():
            return Response('this user is not allowed to livestream at the moment', status=403)
        password = request.data.get('password')
        lives = lives.filter(password=password)
        if (password is None) or not lives.exists():
            return Response('expected valid password', status=400)
        live = lives[0]
        r.set(LIVEKEY, live.pk)
        return (Response(LiveStreamSerializer(live).data))

    @action(detail=False, methods=['post'], permission_classes=[IsLiquidsoap])
    def disconnect(self, request):
        r = get_redis_connection()
        r.delete(LIVEKEY)
        return (Response(None))
