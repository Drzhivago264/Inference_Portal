from constance import config as constant
from django.contrib.auth.decorators import permission_required
from django.db import transaction
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, throttle_classes
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from vectordb.utils import get_embedding_function

from server.models.dataset import Dataset, EmbeddingDatasetRecord
from server.utils.sync_.sync_cache import (
    delete_cache,
    get_or_set_cache,
    get_user_or_set_cache,
    update_cache,
)
from server.views.custom_paginator import PaginatorWithPageNum
from server.views.serializer import (
    DatasetCreateSerializer,
    DatasetDeleteRecordSerialzier,
    DatasetDeleteSerializer,
    DatasetEvaluationSerializer,
    DatasetGetSerializer,
    DatasetRecordCreateSerialzier,
    DatasetRecordGetSerialzier,
    DatasetUpdateSerializer,
)


@api_view(["GET"])
@throttle_classes([AnonRateThrottle])
@permission_classes([IsAuthenticated])
@permission_required("server.view_dataset", raise_exception=True)
def get_default_user_dataset_api(request):
    current_user = request.user
    _, master_user = get_user_or_set_cache(
        prefix="user_tuple",
        key=current_user.password,
        timeout=60,
        current_user=current_user,
    )
    if not master_user:
        raise PermissionDenied(detail="Your token is expired")
    elif Dataset.objects.filter(user=master_user).count() == 0:
        raise NotFound(detail="No dataset")
    else:
        dataset_list = Dataset.objects.filter(user=master_user).order_by("-id")
        if dataset_list:
            dataset_list_serializer = DatasetGetSerializer(dataset_list, many=True)
            return Response(
                {
                    "dataset_list": dataset_list_serializer.data,
                    "max_dataset_num": constant.MAX_DATASET_PER_USER,
                    "max_evaluation_num": constant.MAX_EVALUATION_PER_RECORD,
                },
                status=status.HTTP_200_OK,
            )
        else:
            raise NotFound(detail="No dataset")


@api_view(["GET"])
@throttle_classes([AnonRateThrottle])
@permission_classes([IsAuthenticated])
@permission_required("server.view_datasetrecord", raise_exception=True)
def get_user_records_api(request, id: int):
    current_user = request.user
    _, master_user = get_user_or_set_cache(
        prefix="user_tuple",
        key=current_user.password,
        timeout=60,
        current_user=current_user,
    )
    if not master_user:
        raise PermissionDenied(detail="Your token is expired")
    elif Dataset.objects.filter(user=master_user).count() == 0:
        raise NotFound(detail="No dataset")
    else:
        dataset = get_or_set_cache(
            prefix="user_dataset",
            key=id,
            field_to_get="id",
            Model=Dataset,
            timeout=120,
        )
        if not dataset:
            raise NotFound(detail="No dataset")
        paginator = PaginatorWithPageNum()
        paginator.page_size = 10
        records = EmbeddingDatasetRecord.objects.filter(dataset=dataset).order_by("-id")
        result_records = paginator.paginate_queryset(records, request)
        record_serializer = DatasetRecordGetSerialzier(result_records, many=True)
        return paginator.get_paginated_response(
            {"record_serializer": record_serializer.data}
        )


@api_view(["POST"])
@throttle_classes([AnonRateThrottle])
@permission_classes([IsAuthenticated])
@permission_required("server.add_dataset", raise_exception=True)
def create_user_dataset_api(request):
    current_user = request.user
    serializer = DatasetCreateSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        dataset_name = serializer.validated_data["name"]
        default_evaluation = list()
        default_system_prompt = serializer.validated_data["default_system_prompt"]
        field_name_list = serializer.validated_data["field_name_list"]
        _, master_user = get_user_or_set_cache(
            prefix="user_tuple",
            key=current_user.password,
            timeout=60,
            current_user=current_user,
        )

        evaluation_serializer = DatasetEvaluationSerializer(
            data=serializer.validated_data["default_evaluation"], many=True
        )
        if evaluation_serializer.is_valid(raise_exception=True):
            default_evaluation = evaluation_serializer.validated_data

        if not master_user:
            raise PermissionDenied(detail="Your token is expired")
        elif (
            Dataset.objects.filter(user=master_user).count()
            <= constant.MAX_DATASET_PER_USER
        ):
            dataset = Dataset.objects.create(
                user=master_user,
                name=dataset_name,
                default_evaluation=default_evaluation,
                default_system_prompt=default_system_prompt,
                default_content_structure=[
                    {"name": field_name_list[i], "value": ""}
                    for i in range(len(field_name_list))
                ],
            )
            return Response(
                {"detail": "Saved", "id": dataset.id, "name": dataset.name},
                status=status.HTTP_200_OK,
            )
        else:
            raise PermissionDenied(
                detail=f"Exceeding max number of datasets ({constant.MAX_DATASET_PER_USER}), cannot create more dataset!"
            )


@api_view(["PUT"])
@throttle_classes([AnonRateThrottle])
@permission_classes([IsAuthenticated])
@permission_required("server.change_dataset", raise_exception=True)
def update_user_dataset_api(request):
    current_user = request.user
    serializer = DatasetUpdateSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        id = serializer.validated_data["id"]
        new_dataset_name = serializer.validated_data["new_name"]
        new_default_system_prompt = serializer.validated_data[
            "new_default_system_prompt"
        ]
        new_field_name_list = serializer.validated_data["new_field_name_list"]
        _, master_user = get_user_or_set_cache(
            prefix="user_tuple",
            key=current_user.password,
            timeout=60,
            current_user=current_user,
        )

        evaluation_serializer = DatasetEvaluationSerializer(
            data=serializer.validated_data["new_default_evaluation"], many=True
        )
        if evaluation_serializer.is_valid(raise_exception=True):
            new_default_evaluation = evaluation_serializer.validated_data

        if not master_user:
            raise PermissionDenied(detail="Your token is expired")
        try:
            with transaction.atomic():
                dataset = Dataset.objects.select_for_update().get(
                    id=id, user=master_user
                )
                dataset.name = new_dataset_name
                dataset.default_evaluation = new_default_evaluation
                dataset.default_system_prompt = new_default_system_prompt
                dataset.default_content_structure = [
                    {"name": new_field_name_list[i], "value": ""}
                    for i in range(len(new_field_name_list))
                ]
                dataset.save()
                update_cache(
                    prefix="user_dataset", key=id, model_instance=dataset, timeout=120
                )
            return Response({"detail": "Saved"}, status=status.HTTP_200_OK)
        except Dataset.DoesNotExist:
            raise NotFound(detail="No dataset")


@api_view(["DELETE"])
@throttle_classes([AnonRateThrottle])
@permission_classes([IsAuthenticated])
@permission_required("server.delete_dataset", raise_exception=True)
def delete_user_dataset_api(request):
    current_user = request.user
    serializer = DatasetDeleteSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        id = serializer.validated_data["id"]
        _, master_user = get_user_or_set_cache(
            prefix="user_tuple",
            key=current_user.password,
            timeout=60,
            current_user=current_user,
        )
        if not master_user:
            raise PermissionDenied(detail="Your token is expired")
        try:
            with transaction.atomic():
                dataset = Dataset.objects.select_for_update().get(
                    id=id, user=master_user
                )
                delete_cache(prefix="user_dataset", key=[id])
                dataset.delete()
            return Response({"detail": "Deleted"}, status=status.HTTP_200_OK)
        except Dataset.DoesNotExist:
            raise NotFound(detail="No dataset")


@api_view(["POST"])
@throttle_classes([AnonRateThrottle])
@permission_classes([IsAuthenticated])
@permission_required("server.add_datasetrecord", raise_exception=True)
def create_user_record_api(request):
    serializer = DatasetRecordCreateSerialzier(data=request.data)
    if serializer.is_valid(raise_exception=True):
        dataset_id = serializer.validated_data["dataset_id"]
        system_prompt = serializer.validated_data["system_prompt"]
        evaluation = serializer.validated_data["evaluation"]
        content = serializer.validated_data["content"]
        full_content = [{"name": "System Prompt", "value": system_prompt}]
        full_content += content
        text_to_embed = "\n".join(c["value"] for c in full_content)
        embedding_fn, _ = get_embedding_function()
        embedding = embedding_fn(text_to_embed)
        dataset = get_or_set_cache(
            prefix="user_dataset",
            key=dataset_id,
            field_to_get="id",
            Model=Dataset,
            timeout=120,
        )
        if not dataset:
            raise NotFound(detail="No dataset")
        EmbeddingDatasetRecord.objects.create(
            dataset=dataset,
            content=full_content,
            evaluation=evaluation,
            embedding=embedding,
        )
        return Response({"detail": "Saved"}, status=status.HTTP_200_OK)


@api_view(["PUT"])
@throttle_classes([AnonRateThrottle])
@permission_classes([IsAuthenticated])
@permission_required("server.change_datasetrecord", raise_exception=True)
def update_user_record_api(request):
    serializer = DatasetRecordCreateSerialzier(data=request.data)
    if serializer.is_valid(raise_exception=True):
        dataset_id = serializer.validated_data["dataset_id"]
        system_prompt = serializer.validated_data["system_prompt"]
        content = serializer.validated_data["content"]
        text_to_embed = "\n".join(c["value"] for c in content)
        evaluation = serializer.validated_data["evaluation"]
        record_id = serializer.validated_data["record_id"]
        dataset = get_or_set_cache(
            prefix="user_dataset",
            key=dataset_id,
            field_to_get="id",
            Model=Dataset,
            timeout=120,
        )
        if not dataset:
            raise NotFound(detail="No dataset")
        try:
            embedding_fn, _ = get_embedding_function()
            embedding = embedding_fn(text_to_embed)
            with transaction.atomic():
                record = EmbeddingDatasetRecord.objects.select_for_update().get(
                    dataset=dataset, id=record_id
                )
                record.system_prompt = system_prompt
                record.content = content
                record.evaluation = evaluation
                record.embedding = embedding
                record.save()
            return Response({"detail": "Saved"}, status=status.HTTP_200_OK)
        except EmbeddingDatasetRecord.DoesNotExist:
            raise NotFound(detail="Record does not exist")


@api_view(["DELETE"])
@throttle_classes([AnonRateThrottle])
@permission_classes([IsAuthenticated])
@permission_required("server.delete_datasetrecord", raise_exception=True)
def delete_user_record_api(request):
    serializer = DatasetDeleteRecordSerialzier(data=request.data)
    if serializer.is_valid(raise_exception=True):
        record_id = serializer.validated_data["record_id"]
        dataset_id = serializer.validated_data["dataset_id"]
        dataset = get_or_set_cache(
            prefix="user_dataset",
            key=dataset_id,
            field_to_get="id",
            Model=Dataset,
            timeout=120,
        )
        if not dataset:
            raise NotFound(detail="No dataset")
        try:
            with transaction.atomic():
                record = EmbeddingDatasetRecord.objects.select_for_update().get(
                    dataset=dataset, id=record_id
                )
                record.delete()
            return Response({"detail": "Saved"}, status=status.HTTP_200_OK)
        except EmbeddingDatasetRecord.DoesNotExist:
            raise NotFound(detail="Record does not exist")
