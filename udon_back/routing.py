from channels.routing import route, include

routes = [
    route('websocket.connect', 'udon_back.consumers.ws_connect'),
    route('websocket.receive', 'udon_back.consumers.ws_message'),
    route('websocket.disconnect', 'udon_back.consumers.ws_disconnect')
]

channel_routing = [
    include(routes, path=r'^/ws')
]
