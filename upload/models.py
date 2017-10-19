from django.db import models
from django.contrib.auth import get_user_model

class FileUpload(models.Model):
    audio = models.FileField(upload_to='temp/%H%M%S/', blank=True)

    up_from = models.URLField(blank=True)
    up_by = models.ForeignKey(
        get_user_model(),
        on_delete=models.DO_NOTHING
    )

    processed = models.BooleanField(default=False)

class Song(models.Model):

    length = models.DurationField()

    artist = models.CharField(max_length=128)
    album = models.CharField(max_length=128)
    title = models.CharField(max_length=128)

    upload = models.OneToOneField(
        'FileUpload',
        on_delete=models.CASCADE
    )
