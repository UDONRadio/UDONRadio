from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.contrib.auth import get_user_model
import datetime

class Schedule(models.Model):

    priority = models.IntegerField(default=1)
    show_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    show_id = models.PositiveIntegerField()
    show = GenericForeignKey('show_type', 'show_id')

class Show(models.Model):

    class Meta:
        abstract = True

    short_description = models.CharField(max_length=128, null=True)
    full_description = models.TextField(null=True)
    authors = models.ManyToManyField(
        get_user_model(),
        blank=True
    )

    @property
    def length(self):
        raise NotImplementedError()

    @property
    def fallible(self):
        raise NotImplementedError()


class LiveStream(models.Model):

    host = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    title = models.CharField(max_length=128, null=True)
    description = models.TextField(null=True, blank=True)

class AutoPlaylist(Show):

    fallible = False
    songs = models.ManyToManyField(
        'Song',
        through='AutoPlaylistIndex'
    )

    @property
    def length(self):
        return sum([song.length for song in self.songs.all()], datetime.timedelta(0))

    def pop(self): #XXX changes schedule time
        '''
            Removes and returns Song model with the latest index.
            Returns None if playlist is empty.
        '''
        if AutoPlaylistIndex.objects.count() != 0:
            return None
        item = AutoPlaylistIndex.objects.filter(auto_playlist=self).order_by('-index')
        song = item.song
        item.delete()
        return song

    def push(self, song): #XXX changes schedule time
        '''
            Appends song to the playlist.
        '''
        AutoPlaylistIndex.objects.create(
            song=song,
            auto_playlist=self,
            index=AutoPlaylistIndex.objects.filter(auto_playlist=self).count(),
        )

    def __str__(self):
        return 'auto_playlist {}: {}'.format(self.pk, [str(song) for song in self.songs.all()])


class AutoPlaylistIndex(models.Model):
    '''
        Should be 0-indexed
    '''
    
    song = models.ForeignKey('Song', on_delete=models.CASCADE)
    auto_playlist = models.ForeignKey('AutoPlaylist', on_delete=models.CASCADE)
    index = models.IntegerField()


class Jingle(Show):
    pass
class RecordedShow(Show):
    pass

#TODO
'''
class CuratedPlaylist(Show):
    pass
'''

# ################################# FILES #################################### #

class Song(models.Model):

    length = models.DurationField(default=datetime.timedelta(0))

    artist = models.CharField(max_length=128)
    album = models.CharField(max_length=128, blank=True)
    title = models.CharField(max_length=128)

    audio = models.OneToOneField(
        'audio.Audio',
        on_delete=models.CASCADE
    )
    play_count = models.IntegerField(default=0)
