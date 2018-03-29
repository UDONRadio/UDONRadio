from .views import SongViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'song', SongViewSet, base_name='song')
urlpatterns = router.urls
