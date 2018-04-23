from django.utils.http import limited_parse_qsl
from channels.auth import AuthMiddlewareStack
from rest_framework.authtoken.models import Token

class TokenAuthMiddleware:
    """
    Token authorization middleware for Django Channels 2
    """

    def __init__(self, inner):
        self.inner = inner

    def __call__(self, scope):
        #FIXME: handle bad utf-8 encoded urls
        query_string = limited_parse_qsl(scope['query_string'].decode())
        for key, val in query_string:
            if key == 'token':
                try:
                    token = Token.objects.get(key=val)
                    scope['user'] = token.user
                except Token.DoesNotExist:
                    pass
        return self.inner(scope)

TokenAuthMiddlewareStack = lambda inner: TokenAuthMiddleware(AuthMiddlewareStack(inner))
