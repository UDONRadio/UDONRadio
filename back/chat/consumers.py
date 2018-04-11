from channels.generic.websocket import AsyncWebsocketConsumer
import random
import json

def make_chat_message(message, username=None, user=None):
    if user:
        type_ = 'user'
    elif username:
        type_ = 'anon'
    else:
        type_ = 'server'
    return {
        "action": "chat-message",
        "args": {
            "type": type_,
            "content": message,
            "username": username
        }
    }

def get_random_greeting():
    greetings = [
        "Wesh !",
        "Salam !",
        "Bien ou bien ?",
        "C' est comment ?",
        "What up booooooy ?"
    ]
    return random.choice(greetings)


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):

        # Join chat group
        await self.channel_layer.group_add(
            "chat",
            self.channel_name
        )

        await self.channel_layer.send(
            self.channel_name,
            {
                'type': 'chat_message',
                'message': make_chat_message(get_random_greeting())
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
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        # Send message to room group
        await self.channel_layer.group_send(
            "chat",
            {
                'type': 'chat_message',
                'message': make_chat_message(message, username="unimplemented")
            }
        )

    # Receive message from room group
    async def chat_message(self, event):
        message = event['message']

        # Send message to WebSocket
        await self.send(text_data=json.dumps(
            message
        ))
