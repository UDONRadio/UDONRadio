from django.conf.urls import url
from .views import ChatMessageCreate

from . import views

app_name = 'chat'

urlpatterns = [
    url(r'^$', ChatMessageCreate.as_view()),
    url(r'^test$', views.index, name='index'),
]
