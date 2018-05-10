from .token_auth import TokenAuthMiddlewareStack
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.conf.urls import url
import chat.routing
import audio.routing

ws_router = URLRouter([
    url(r'^chat/', URLRouter(chat.routing.websocket_urlpatterns)),
    url(r'^audio/', URLRouter(audio.routing.websocket_urlpatterns))
])

application = ProtocolTypeRouter({
    # http->django views is added by default
    'websocket': TokenAuthMiddlewareStack(
        URLRouter([
            url(r'^ws/', ws_router),
        ])
    ),
})
