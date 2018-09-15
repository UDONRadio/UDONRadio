from .views import SongViewSet, LiveStreamViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'song', SongViewSet, base_name='song')
router.register(r'live', LiveStreamViewSet, base_name='live')
urlpatterns = router.urls
