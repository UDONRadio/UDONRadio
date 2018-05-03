from channels.generic.websocket import AsyncJsonWebsocketConsumer
from channels.db import database_sync_to_async
from rest_framework.authtoken.models import Token #FIXME: breaks app encapsulation
from django.conf import settings

from .greetings import get_random_greeting

@database_sync_to_async
def is_anonymous(user):
    return user.is_anonymous

@database_sync_to_async
def username(user):
    return user.username

async def make_chat_message(message, user=None, server=False):

    args = {
        "content": message
    }
    if server:
        args["from"] = 'server'
    else:
        if await is_anonymous(user):
            args["from"] = 'anon'
        else:
            args["from"] = 'user'
            args["username"] = await username(user)

    return {
        "action": "chat_message",
        "args": args
    }

@database_sync_to_async
def auth(message):
    #FIXME: Breaks app encapsulation
    try:
        token = Token.objects.get(key=message)
        return token.user
    except Token.DoesNotExist:
        return None

class ChatConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):

        # Join chat group
        await self.channel_layer.group_add(
            "chat",
            self.channel_name
        )

        await self.channel_layer.send(
            self.channel_name, { 'type': 'chat_confirm_auth' }
        )

        message = await make_chat_message(
            get_random_greeting(),
            server=True
        )
        await self.channel_layer.send(
            self.channel_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            "chat",
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive_json(self, content):
        action = content.get('action', None)
        args = content.get('args', {})

        if type(action) != str:
            await self.send_json({"error": "malformed action"})
            return

        if action == "chat_message":
            message = args.get('content', None)
            if type(message) == str:
                answer = await make_chat_message(
                    message,
                    user=self.scope['user']
                )
                await self.channel_layer.group_send(
                    "chat",
                    {
                        'type': 'chat_message',
                        'message': answer
                    }
                )
            else:
                await self.send_json({
                    "error": "chat_message: malformed message"
                })
        elif action == "auth":
            message = args.get('content', None)
            if type(message) == str:
                user = await auth(message)
                if user != None:
                    self.scope['user'] = user
                else:
                    self.send_json({
                        "error": "auth: bad token"
                    })
                await self.channel_layer.send(
                    self.channel_name, { 'type': 'chat_confirm_auth' }
                )
            else:
                await self.send_json({"error": "auth: malformed message"})
        #TODO add a logout option
        else:
            self.send_json({"error": "unknown action: " + action})

    async def chat_confirm_auth(self, message):
        anon = await is_anonymous(self.scope["user"])
        message = {
            'action': 'chat_confirm_auth',
            'args': {
                'auth': False if anon else True
            }
        }
        await self.send_json(message)

    # Receive message from room group
    async def chat_message(self, event):
        message = event['message']

        # Send message to WebSocket
        await self.send_json(message)
