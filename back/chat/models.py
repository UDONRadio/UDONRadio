from django.db import models
from django.contrib.auth import get_user_model
from .settings import CHAT_GROUP_KEY

class ChatMessage(models.Model):

    author = models.ForeignKey(
        get_user_model(),
        on_delete=models.SET_NULL,
        null=True
    )
    text = models.CharField(max_length=256)
    created = models.DateTimeField(auto_now_add=True)
    special = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        ret = super(ChatMessage, self).save(*args, **kwargs)
        broadcast_message_sync(self)
        return ret

#NOTE: we avoid a circular import by declaring the following out of ChatMessage
# It is probably worth a refactoring
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from .serializers import ChatMessageSerializer

def broadcast_message_sync(message):
    async_to_sync(get_channel_layer().group_send)(
        CHAT_GROUP_KEY,
        {
            "type": "chat_messages",
            "messages": [ChatMessageSerializer(message).data]
        }
    )
