import os
from django.utils import timezone
from django.conf import settings
from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
	pass

def user_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    return 'audio/user_{0}/{1}'.format(instance.owner.id, filename)


class Emission(models.Model):
	title = models.CharField(max_length=64)
	pitch = models.CharField(max_length=128)
	owner = models.ForeignKey(
		User,
		on_delete=models.DO_NOTHING,
		related_name='emissions'
	)
	picture = models.ImageField(
		upload_to=os.path.join('emissions/'),
		blank=True
	)

	@property
	def picture_link(self):
		return self.picture.url if self.picture else '/404.jpg'

	def __unicode__(self):
		return self.title


class Audio(models.Model):
	title = models.CharField(max_length=128)
	artist = models.CharField(max_length=128)
	duration = models.DurationField(blank=True)
	emission = models.ForeignKey(
		Emission,
		on_delete=models.DO_NOTHING,
		related_name='instances',
		blank=True
	)
	owner = models.ForeignKey(
		User,
		on_delete=models.DO_NOTHING,
		related_name='audios'
	)
	uploaded_on = models.DateTimeField(auto_now_add=True)
	last_edited_on = models.DateTimeField(auto_now=True)
	last_played_on = models.DateTimeField(blank=True)
	path = models.FileField(upload_to=user_directory_path)
	processed = models.BooleanField(default=False)
	patched = models.BooleanField(default=False)
