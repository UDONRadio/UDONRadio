from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls import url, include
from django.contrib import admin

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.

urlpatterns = [
	url(r'^admin/', include(admin.site.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api/auth/', include('djoser.urls.authtoken')),
	url(r'^api/auth/', include('djoser.urls.base')),
	url(r'^api/upload/', include('upload.urls')),
]

urlpatterns += static('media/', document_root=settings.MEDIA_ROOT)
