from django.shortcuts import render
from django.utils.safestring import mark_safe
import json

def index(request):
    return render(request, 'chat/index.html', {})

def chat(request):
    return render(request, 'chat/chat.html', {
        'room_name_json': mark_safe(json.dumps("chat"))
    })
