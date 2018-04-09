from .views import AudioViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'files', AudioViewSet, base_name='file')
urlpatterns = router.urls
