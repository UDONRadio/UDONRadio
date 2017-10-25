from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

class User(AbstractUser):
    email = models.EmailField(_('email address'))
    REQUIRED_FIELDS = ['email',]

    @property
    def is_adherent(self):
        return bool(self.groups.filter(name='adherent'))
