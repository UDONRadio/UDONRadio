from django.contrib import admin
from .models import AutoPlaylist, AutoPlaylistIndex, Song

admin.site.register(AutoPlaylist)

@admin.register(Song)
class SongAdmin(admin.ModelAdmin):

    date_hierarchy = 'audio__created'
    search_fields = ('title', 'artist', 'album')
    list_display = (
        'title',
        'artist',
        'album',
        'length',
        'play_count',
        'uploaded_by',
        'uploaded_on'
    )

    def uploaded_by(self, obj):
        return obj.audio.up_by

    def uploaded_on(self, obj):
        return obj.audio.created
