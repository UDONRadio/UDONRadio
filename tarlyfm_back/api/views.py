from django.utils import timezone
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from tarlyfm_back.api.models import User
from tarlyfm_back.api.serializers import UserSerializer
from tarlyfm_back.api.permissions import IsOwnerOrReadOnly


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = (IsOwnerOrReadOnly,)
