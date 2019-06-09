from django.db import models
from django.contrib.auth import get_user_model
import datetime


class Archive(models.Model):
    title = models.CharField(max_length=256, null=True)


class LiveStream(models.Model):

    host = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    title = models.CharField(max_length=128, null=True)
    description = models.TextField(null=True, blank=True)
    password = models.CharField(max_length=8)

    def save(self, *args, **kwargs):
        if not self.pk:
            self.password = get_user_model().objects.make_random_password(length=8)
        super(LiveStream, self).save(*args, **kwargs)

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

    enabled = models.BooleanField(default=True)

    archive = models.ManyToManyField(Archive)
