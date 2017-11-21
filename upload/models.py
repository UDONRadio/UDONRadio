from django.db import models
from django.contrib.auth import get_user_model
from django_celery_results.models import TaskResult

class FileUpload(models.Model):
    audio = models.FileField(upload_to='file/', max_length=1024, blank=True) #XXX need to take extra steps in upload to trim filename if necessary

    up_from = models.URLField(blank=True)
    up_by = models.ForeignKey(
        get_user_model(),
        on_delete=models.DO_NOTHING
    )

    base_name = models.CharField(max_length=254, null=True)
    created = models.DateTimeField(auto_now_add=True)
    edited = models.DateTimeField(auto_now=True)
    processed = models.BooleanField(default=False)
    task = models.ForeignKey(TaskResult, on_delete=models.SET_NULL, null=True)

    CONTENT_RELATED_FIELDS = ['song',] #XXX Bad app encapsulation
