from upload.views import FileUploadViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'files', FileUploadViewSet, base_name='file')
urlpatterns = router.urls
