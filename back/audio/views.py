from rest_framework import mixins, viewsets
from .serializers import AudioCreateRetrieveSerializer
from udon_back.permissions import IsAdherentUser
from .models import Audio
from .tasks import process_audio
from django_celery_results.models import TaskResult

class AudioViewSet(mixins.CreateModelMixin,
                        mixins.ListModelMixin,
                        viewsets.GenericViewSet):

    permission_classes = [IsAdherentUser,]
    serializer_class = AudioCreateRetrieveSerializer

    def get_queryset(self):
        dic = {}
        for related in Audio.CONTENT_RELATED_FIELDS:
            dic[related] = None
        return self.request.user.audio_set.filter(**dic)

    def perform_create(self, serializer):
        if serializer.validated_data.get('audio', None):
            base_name = serializer.validated_data['audio'].name
        else:
            base_name = serializer.validated_data['up_from']
        obj = serializer.save(
            up_by=self.request.user,
            base_name=base_name
        )
        process_audio.delay(obj.pk)
