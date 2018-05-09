from __future__ import absolute_import, unicode_literals
from celery import shared_task
from .song_manager import download, postprocess
from .models import Audio
#from channels import Group
import json
import celery
from django_celery_results.models import TaskResult
from django.conf import settings
import os
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

#throws: expected errors
@shared_task(bind=True, throws=())
def process_audio(self, pk):
    obj = Audio.objects.get(pk=pk)
    if not self.request.called_directly:
        result, created = TaskResult.objects.get_or_create(task_id=self.request.id)
        obj.task = result
        obj.save()

    if obj.up_from:
        obj.audio = download(obj.up_from, dest_dir=os.path.join(settings.MEDIA_ROOT, 'youtube-dl/'))
        obj.base_name = os.path.basename(obj.audio.path)
    obj.audio = postprocess(
        obj.audio.path,
        dest_dir=os.path.join(settings.MEDIA_ROOT, 'processed/{}/'.format(obj.up_by.pk))
    )
    obj.processed = True
    obj.save()

    async_to_sync(get_channel_layer().group_send)(
        "upload",
        {"type": "upload_processed", "pk": obj.pk},
    )
