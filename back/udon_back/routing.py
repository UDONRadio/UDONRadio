from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.conf.urls import url
import chat.routing

ws_router = URLRouter([
    url(r'^ws/chat/', URLRouter(chat.routing.websocket_urlpatterns)),
])

application = ProtocolTypeRouter({
    # http->django views is added by default
    'websocket': AuthMiddlewareStack(
        URLRouter([
            url(r'^ws/', ws_router),
        ])
    ),
})
