from rest_framework import serializers
from .models import Song
from upload.models import FileUpload

class SongCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Song
        fields = ('id', 'length', 'artist', 'album', 'title', 'upload')
        read_only_fields = ('length',)

    def validate_upload(self, upload):
        dic = {}
        for related in FileUpload.CONTENT_RELATED_FIELDS:
            dic[related] = None
        if upload in self.context['request'].user.fileupload_set.filter(**dic):
            return upload
        else:
            raise serializers.ValidationError('upload value should be owned by user and not assigned.')
