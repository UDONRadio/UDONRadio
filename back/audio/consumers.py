from channels.generic.websocket import AsyncJsonWebsocketConsumer
from channels.db import database_sync_to_async
from rest_framework.authtoken.models import Token #FIXME: breaks app encapsulation
from django.conf import settings
from .models import Audio

@database_sync_to_async
def is_anonymous(user):
    return user.is_anonymous

@database_sync_to_async
def username(user):
    return user.username

@database_sync_to_async
def auth(message):
    #FIXME: Breaks app encapsulation
    try:
        token = Token.objects.get(key=message)
        return token.user
    except Token.DoesNotExist:
        return None

class UploadConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):

        await self.channel_layer.send(
            self.channel_name, { 'type': 'confirm_auth' }
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            "upload",
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive_json(self, content):
        action = content.get('action', None)
        args = content.get('args', {})
        if type(action) != str:
            await self.send_json({"error": "malformed action"})
            return
        await self.send_json({"error": "unknown action: " + action})

    async def confirm_auth(self, message):
        anon = await is_anonymous(self.scope["user"])
        message = {
            'action': 'confirm_auth',
            'args': {
                'auth': False if anon else True
            }
        }
        if not anon:
            await self.channel_layer.group_add(
            "upload",
            self.channel_name
            )
        await self.send_json(message)

    # Receive message from room group
    async def upload_processed(self, event):
        pk = event['pk']

        # Send message to WebSocket
        await self.send_json({
            'action': 'upload_processed',
            'args': {
                'pk': pk
            }
        })
