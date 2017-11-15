from django.shortcuts import render
from rest_framework import mixins, viewsets

from udon_back.permissions import IsAdherentUser
from .serializers import SongCreateSerializer


class SongViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    permission_classes = [IsAdherentUser,]
    serializer_class = SongCreateSerializer
