from channels import Group
from channels.sessions import channel_session
from urllib.parse import parse_qs
from djoser.conf import settings
import json

#TODO: Better serializing / desierializing model, retrieve objects directly from channel_session
# Cookie is sent when connection is closed...

def make_chat_message(message, username=None, user=None):
    if user:
        type_ = 'user'
    elif username:
        type_ = 'anon'
    else:
        type_ = 'server'
    return {
        "text": json.dumps({
            "action": "chat-message",
            "args": {
                "type": type_,
                "content": message,
                "username": username
            }
        })
    }

def authenticate(token):
    return settings.TOKEN_MODEL.objects.get(key=token).user

@channel_session
def ws_message(message):
    # ASGI WebSocket packet-received and send-packet message types
    # both have a "text" key for their textual data.

    data = json.loads(message['text'])
    action = data.get('action', 'reject')
    args = data.get('args', {})

    if action == 'chat-join':
        Group("chat").add(message.reply_channel)
        message.reply_channel.send(make_chat_message("welcome to the chat !"))

    elif action == 'chat-message':
        user = message.channel_session.get('user', None)
        username = message.channel_session.get('username', None)
        if username:
            content = args.get('content', '')
            Group("chat").send(make_chat_message(content, username, user))

    elif action == 'chat-anon-name':
        username = args.get('username', None)
        if type(username) == str and username:
            message.channel_session['username'] = username
            message.channel_session.pop('user', None)
            message.reply_channel.send({
                "text": json.dumps({
                    "action": "chat-anon-name",
                    "args": {
                        "username": username
                    }
                })
            })

    elif action == 'auth':
        try:
            user = authenticate(args.get('token', ''))
            message.channel_session['user'] = user.pk
            message.channel_session['username'] = user.username
        except:
            message.reply_channel.send({"text": json.dumps({"error": "bad token"})})

    elif action == 'upload-subscribe':
        Group("upload-subscribe").add(message.reply_channel)
    elif action == 'upload-unsubscribe':
        Group("upload-subscribe").discard(message.reply_channel)
    else:
        return

@channel_session
def ws_connect(message):
    # Accept the incoming connection
    message.reply_channel.send({"accept": True})
    # Add them to the chat group

@channel_session
def ws_disconnect(message):
    Group("chat").discard(message.reply_channel)
    Group("upload-subscribe").discard(message.reply_channel)
