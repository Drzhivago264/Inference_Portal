import uuid

from django.contrib.auth.decorators import permission_required
from rest_framework import status
from rest_framework.decorators import (api_view, permission_classes,
                                       throttle_classes)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle

from server.celery_tasks import export_large_dataset
from server.models import Dataset, DatasetRecord
from server.utils import constant
from server.utils.sync_.manage_permissions import \
    get_master_key_and_master_user
from server.views.serializer import (DatasetExportSerializer,
                                     DatasetRecordGetSerialzier)


@api_view(["POST"])
@throttle_classes([AnonRateThrottle])
@permission_classes([IsAuthenticated])
@permission_required(
    ["server.view_dataset", "server.view_datasetrecord"], raise_exception=True
)
def export_user_dataset_api(request):
    current_user = request.user
    serializer = DatasetExportSerializer(data=request.data)

    if serializer.is_valid():
        dataset_id = serializer.data["id"]
        extension = serializer.data["extension"]
        _, master_user = get_master_key_and_master_user(current_user=current_user)
        try:
            dataset = Dataset.objects.get(user=master_user, id=dataset_id)
            result_records = DatasetRecord.objects.filter(dataset=dataset)

            record_count = result_records.count()
            url_safe_datasetname = "".join(x for x in dataset.name if x.isalnum())
            if record_count == 0:
                return Response(
                    {"detail": "Failed! Dataset does not contain any records"},
                    status=status.HTTP_404_NOT_FOUND,
                )
            elif record_count <= constant.MAX_ROW_NUMBER_FOR_DIRECT_EXPORT:
                record_serializer = DatasetRecordGetSerialzier(
                    result_records, many=True
                )
                return Response(
                    {"records": record_serializer.data, "export_type": "direct"},
                    status=status.HTTP_200_OK,
                )
            else:
                unique = uuid.uuid4().hex
                task = export_large_dataset.delay(
                    dataset_id=dataset_id,
                    url_safe_datasetname=url_safe_datasetname,
                    unique=unique,
                    extension=extension,
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

        except Dataset.DoesNotExist:
            return Response(
                {"detail": "Failed! dataset Does not exist"},
                status=status.HTTP_404_NOT_FOUND,
            )
    else:
        return Response(
            {"detail": "Save Failed!, ensure that fields do not contain empty string"},
            status=status.HTTP_404_NOT_FOUND,
        )
