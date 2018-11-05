from rest_framework import serializers
from .models import ChatMessage

class ChatMessageSerializer(serializers.ModelSerializer):

    author = serializers.SerializerMethodField()

    class Meta:
        model = ChatMessage
        fields = ('author', 'text', 'created', 'special')
        read_only_fields = ('author', 'created', 'special')

    def get_author(self, obj):
        return obj.author.username if obj.author else None
