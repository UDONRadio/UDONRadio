from django.contrib import admin
from .models import AutoPlaylist, AutoPlaylistIndex, Song

admin.site.register(AutoPlaylist)
admin.site.register(Song)
