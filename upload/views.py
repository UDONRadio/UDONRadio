from rest_framework import mixins, viewsets
from .serializers import FileUploadCreateRetrieveSerializer
from udon_back.permissions import IsAdherentUser

class FileUploadViewSet(mixins.CreateModelMixin,
                        mixins.ListModelMixin,
                        viewsets.GenericViewSet):

    permission_classes = [IsAdherentUser,]
    serializer_class = FileUploadCreateRetrieveSerializer

    def get_queryset(self):
        return self.request.user.fileupload_set.filter(processed=False)

    def perform_create(self, serializer):
        serializer.save(up_by=self.request.user)
