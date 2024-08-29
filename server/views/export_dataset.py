import uuid

from constance import config as constant
from django.contrib.auth.decorators import permission_required
from django.core.cache import cache
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, throttle_classes
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from server.api_throttling_rates import DatasetExportRateThrottle
from server.models.dataset import Dataset, EmbeddingDatasetRecord
from server.queue.export_dataset import export_large_dataset
from server.utils.sync_.sync_cache import get_or_set_cache, get_user_or_set_cache
from server.views.serializer import DatasetExportSerializer, DatasetRecordGetSerialzier


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@permission_required(
    ["server.view_dataset", "server.view_datasetrecord"], raise_exception=True
)
@throttle_classes([DatasetExportRateThrottle])
def export_user_dataset_api(request):
    current_user = request.user
    serializer = DatasetExportSerializer(data=request.data)

    if serializer.is_valid(raise_exception=True):
        dataset_id = serializer.validated_data["id"]
        extension = serializer.validated_data["extension"]
        _, master_user = get_user_or_set_cache(
            prefix="user_tuple",
            key=current_user.password,
            timeout=60,
            current_user=current_user,
        )
        if not master_user:
            raise PermissionDenied(detail="Your token is expired")
        try:
            dataset = get_or_set_cache(
                prefix="user_dataset",
                key=[master_user, dataset_id],
                field_to_get=["user", "id"],
                Model=Dataset,
                timeout=84000,
            )
            result_records = EmbeddingDatasetRecord.objects.filter(dataset=dataset)

            record_count = result_records.count()
            url_safe_datasetname = "".join(x for x in dataset.name if x.isalnum())
            if record_count == 0:
                raise NotFound(detail="Failed! Dataset does not contain any records")

            elif record_count <= constant.MAX_ROW_NUMBER_FOR_DIRECT_EXPORT:
                record_serializer = DatasetRecordGetSerialzier(
                    result_records, many=True
                )
                return Response(
                    {"records": record_serializer.data, "export_type": "direct"},
                    status=status.HTTP_200_OK,
                )
            else:
                hashed_key = master_user.apikey.hashed_key
                allow_export_large_dataset = cache.get(
                    f"allow_export_large_dataset_for_user_{hashed_key}"
                )

                if allow_export_large_dataset or allow_export_large_dataset is None:
                    cache.set(
                        f"allow_export_large_dataset_for_user_{hashed_key}", False, 3600
                    )
                    unique = uuid.uuid4().hex
                    task = export_large_dataset.delay(
                        dataset_id=dataset_id,
                        url_safe_datasetname=url_safe_datasetname,
                        unique=unique,
                        extension=extension,
                        hashed_key=hashed_key,
                    )
                    return Response(
                        {
                            "download_link": f"https://dataset.professorparakeet.com/download/{url_safe_datasetname}_{unique}{extension}",
                            "task_id": task.id,
                            "id": dataset.id,
                            "name": dataset.name,
                            "export_type": "celery",
                        },
                        status=status.HTTP_200_OK,
                    )
                else:
                    return Response(
                        {"detail": "Failed, Previous export job was not finised!"},
                        status=status.HTTP_404_NOT_FOUND,
                    )
        except Dataset.DoesNotExist:
            raise NotFound(detail="Failed! Dataset does not exist")
