from django.contrib import admin
from .models import Audio

@admin.register(Audio)
class AudioAdmin(admin.ModelAdmin):

    list_display = (
        'base_name',
        'assigned'
    )

    def assigned(self, obj):
        dic = {}
        for related in Audio.CONTENT_RELATED_FIELDS:
            dic[related] = None
        return obj in Audio.objects.filter(**dic)
