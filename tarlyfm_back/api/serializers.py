from rest_framework import serializers

from tarlyfm_back.api.models import User, Emission

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email')

class EmissionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Emission
        fields = ('title', 'pitch', 'owner', 'picture_link')
