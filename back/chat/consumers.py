from rest_framework.authtoken.models import Token #FIXME: breaks app encapsulation
from django.conf import settings
from channels.generic.websocket import AsyncJsonWebsocketConsumer
from channels.db import database_sync_to_async

from .settings import CHAT_GROUP_KEY, CHAT_COUNT_KEY, REDIS_HOST
from .serializers import ChatMessageSerializer
from .models import ChatMessage

import datetime
import json
import aioredis

################################ Helpers #######################################

REDIS = None
async def get_redis_pool():
    global REDIS
    if REDIS != None:
        return REDIS
    REDIS = await aioredis.create_pool('redis://' + REDIS_HOST)
    #XXX: This is really not a good way to perform initialization. It does not
    #     scale. Proper cleanup should be done when the server quits
    await REDIS.execute('set', CHAT_COUNT_KEY, 0)
    return REDIS

@database_sync_to_async
def is_anonymous(user):
    return user.is_anonymous

@database_sync_to_async
def auth(message):
    #FIXME: Breaks app encapsulation
    try:
        token = Token.objects.get(key=message)
        return token.user
    except Token.DoesNotExist:
        return None

#FIXME: this should take as an argument the time to query for the backlog:
#       it would avoid double-received messages
@database_sync_to_async
def get_chat_backlog():
    delta = datetime.datetime.now() - datetime.timedelta(hours=12)
    return ChatMessageSerializer(
            reversed(ChatMessage.objects.filter(created__gt=delta).order_by('-created')[:50]),
        many=True
    ).data

##################################### Consumer #################################

class ChatConsumer(AsyncJsonWebsocketConsumer):

    async def connect(self):
        # Add to the chat group
        await self.channel_layer.group_add(CHAT_GROUP_KEY, self.channel_name)
        # Queue an authentication check
        await self.channel_layer.send(self.channel_name, {
            'type': 'chat_auth'
        })
        # Queue sending backlog messages
        await self.channel_layer.send(self.channel_name, {
            'type': 'chat_backlog'
        })
        # Increment the group count
        pool = await get_redis_pool()
        res = await pool.execute('incr', CHAT_COUNT_KEY)
        await self.channel_layer.group_send(CHAT_GROUP_KEY, {
            'type': 'chat_count',
            'count': res
        })
        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        pool = await get_redis_pool()
        res = await pool.execute('decr', CHAT_COUNT_KEY)
        await self.channel_layer.group_send(CHAT_GROUP_KEY, {
            'type': 'chat_count',
            'count': res
        })
        await self.channel_layer.group_discard(
            CHAT_GROUP_KEY,
            self.channel_name
        )

    async def receive_json(self, content):
        action = content.get('action', None)
        args = content.get('args', {})
        if type(action) != str:
            await self.send_json({"error": "malformed action"})
            return

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
                    self.channel_name, { 'type': 'chat_auth' }
                )
            else:
                await self.send_json({"error": "auth: malformed message"})
        #TODO add a logout option
        else:
            await self.send_json({"error": "unknown action: " + action})

    async def chat_auth(self, message):
        anon = await is_anonymous(self.scope["user"])
        await self.send_json({
            'type': 'auth',
            'auth': False if anon else True
        })

    async def chat_backlog(self, event):
        backlog = await get_chat_backlog()
        await self.channel_layer.send(
            self.channel_name,
            {
                'type': 'chat_messages',
                'messages': backlog
            }
        )

    # Receive message from room group
    async def chat_messages(self, event):
        await self.send_json({
            'type': 'messages',
            'messages': event['messages']
        })

    async def chat_count(self, event):
        await self.send_json({
            'type': 'count',
            'count': event['count']
        })
