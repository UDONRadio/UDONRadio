from django.conf.urls import url

from . import consumers

#TODO: https://github.com/django/channels/issues/870 make the urlpattern
#      non project aware.
websocket_urlpatterns = [
    url(r'^ws/chat/$', consumers.ChatConsumer),
]
