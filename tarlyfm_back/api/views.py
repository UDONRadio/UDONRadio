from django.utils import timezone
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from tarlyfm_back.api.models import User, EmissionInstance
from tarlyfm_back.api.serializers import UserSerializer, EmissionInstanceSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

class EmissionInstanceViewSet(viewsets.ModelViewSet):
	"""
	API endpoint that allows emissions to be viewed or edited
	"""
	queryset = EmissionInstance.objects.all().order_by('ends')
	serializer_class = EmissionInstanceSerializer
	permission_classes = (IsAuthenticatedOrReadOnly,)
