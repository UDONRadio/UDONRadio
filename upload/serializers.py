from rest_framework import serializers
from .models import FileUpload

class FileUploadCreateRetrieveSerializer(serializers.ModelSerializer):
    class Meta:
        model = FileUpload
        fields = ('id', 'up_from', 'audio', 'processed', 'created')
        read_only_fields = ('processed', 'created')
        extra_kwargs = {
            'audio': {
                'use_url': False
            }
        }

    def validate(self, data):
        up_from = data.get('up_from', '')
        if 'audio' in data and not up_from:
            return data
        elif not 'audio' in data and up_from:
            return data
        else:
            raise serializers.ValidationError(
                'must specify either audio or up_from'
            )
