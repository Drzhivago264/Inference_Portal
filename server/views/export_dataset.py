import uuid

from django.contrib.auth.decorators import permission_required
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, throttle_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle

from server.celery_tasks import export_large_dataset
from server.models import Dataset, DatasetRecord
from server.utils import constant
from server.utils.sync_.manage_permissions import get_master_key_and_master_user
from server.views.serializer import DatasetDeleteSerializer, DatasetRecordGetSerialzier


@api_view(["POST"])
@throttle_classes([AnonRateThrottle])
@permission_classes([IsAuthenticated])
@permission_required(
    ["server.view_dataset", "server.view_datasetrecord"], raise_exception=True
)
def export_user_dataset_api(request):
    current_user = request.user
    serializer = DatasetDeleteSerializer(data=request.data)
    if serializer.is_valid():
        dataset_id = serializer.data["id"]
        _, master_user = get_master_key_and_master_user(current_user=current_user)
        try:
            dataset = Dataset.objects.get(user=master_user, id=dataset_id)
            result_records = DatasetRecord.objects.filter(dataset=dataset)
            record_count = result_records.count()
            if record_count == 0:
                return Response(
                    {"detail": "Failed! Dataset does not contain any records"},
                    status=status.HTTP_404_NOT_FOUND,
                )
            elif record_count <= 10:
                record_serializer = DatasetRecordGetSerialzier(
                    result_records, many=True
                )
                return Response(
                    {"records": record_serializer}, status=status.HTTP_200_OK
                )
            else:
                unique = uuid.uuid4().hex
                task = export_large_dataset.delay(
                    dataset_id=dataset_id, dataset_name=dataset.name, unique=unique
                )
            return Response(
                {
                    "download_link": f"https://dataset.professorparakeet.com/{''.join(x for x in dataset.name if x.isalnum())}_{unique}",
                    "task_id": task.id,
                    "id": dataset.id,
                    "name": dataset.name,
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
