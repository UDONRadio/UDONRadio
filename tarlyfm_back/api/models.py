import os
from django.utils import timezone
from django.conf import settings
from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
	pass

class Audio(models.Model):
	title = models.CharField(max_length=128)
	artist = models.CharField(max_length=128)
#	emission =
	owner = models.ForeignKey(
		User,
		on_delete=models.DO_NOTHING,
		related_name='audios'
	)
	pass

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

'''
class EmissionInstance(models.Model):
	starts = models.DateTimeField()
	ends = models.DateTimeField()
	airtime_id = models.IntegerField(unique=True)
	recorded = models.BooleanField(default=False)
	emission = models.ForeignKey(
		Emission,
		on_delete=models.CASCADE,
		related_name='instances'
	)

	@property
	def has_played(self):
		return self.ends < timezone.now()

	def __unicode__(self):
		return str(self.airtime_id)
'''
