from rest_framework import serializers
from .models import Song, LiveStream
from audio.models import Audio

class SongCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Song
        fields = ('id', 'length', 'artist', 'album', 'title', 'audio')
        read_only_fields = ('length',)

    def validate_upload(self, audio):
        dic = {}
        for related in Audio.CONTENT_RELATED_FIELDS:
            dic[related] = None
        if audio in self.context['request'].user.audio_set.filter(
                **dic,
                processed=True):
            return audio
        else:
            raise serializers.ValidationError('audio value should be processed,'
                    ' owned by user and unassigned.')

class SongPlaylistSerializer(serializers.ModelSerializer):

    class Meta:
        model = Song
        fields = ('artist', 'title', 'album')


class LiveStreamSerializer(serializers.ModelSerializer):

    host = serializers.SerializerMethodField()

    class Meta:
        model = LiveStream
        fields = ('id', 'host', 'title', 'description')

    def get_host(self, obj):
        return obj.host.username
