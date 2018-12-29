from django.contrib import admin
from .models import AutoPlaylist, Song, LiveStream
from django.utils.html import mark_safe

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
        'uploaded_on',
    )

    def uploaded_by(self, obj):
        return obj.audio.up_by

    def uploaded_on(self, obj):
        return obj.audio.created

@admin.register(LiveStream)
class LiveStream(admin.ModelAdmin):
    list_display = (
        'host',
        'title',
        'show_webcaster_url'
    )
    readonly_fields = (
        'password',
    )

    def show_webcaster_url(self, obj):
        return mark_safe('<a target="_blank"' +
        ' rel="noopener noreferrer"' +
        ' style="color:white;background-color:red;padding-top:6px;padding-bottom:6px;padding-left:10px;padding-right:10px;border-radius:40px;"' +
        ' href=http://webcaster.udonradio.fr/?user={}&password={}>Start streaming now !</a>'.format(obj.host, obj.password))
