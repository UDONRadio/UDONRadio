from rest_framework import serializers

from tarlyfm_back.api.models import User, Emission, EmissionInstance

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email')

class EmissionSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Emission
		fields = ('title', 'pitch', 'host', 'picture_link')

class EmissionInstanceSerializer(serializers.HyperlinkedModelSerializer):

	emission = EmissionSerializer()
	class Meta:
		model = EmissionInstance
		fields = ('starts', 'ends', 'emission')
