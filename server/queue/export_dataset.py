import csv
import json

import boto3
from celery import shared_task
from celery.exceptions import SoftTimeLimitExceeded
from celery.utils.log import get_task_logger
from decouple import config
from django.core.cache import cache
from smart_open import open

from server.models.dataset import Dataset, DatasetRecord
from server.utils.sync_.sync_cache import get_or_set_cache

logger = get_task_logger(__name__)
r2 = config("r2_access_key_id")
r2_account_id = config("r2_account_id")
r2_secret = config("r2_secret_access_key")


@shared_task(soft_time_limit=3600, time_limit=3650)
def export_large_dataset(
    dataset_id: int,
    url_safe_datasetname: str,
    unique: str,
    extension: str,
    hashed_key: str,
) -> str:
    """
    Export a dataset from a database to either a CSV or JSONL file stored in an S3-compatible storage service.

    Args:
        dataset_id (int): ID of the dataset to be exported.
        url_safe_datasetname (str): URL-safe name for the dataset.
        unique (str): Unique identifier for the export file.
        extension (str): File extension, either '.csv' or '.jsonl'.
        hashed_key (str): Hashed key for caching purposes.

    Returns:
        str: String indicating the success or failure of the export operation.
    """
    try:
        session = boto3.Session(
            aws_access_key_id=r2,
            aws_secret_access_key=r2_secret,
        )
        r2_client = session.client(
            "s3",
            endpoint_url=f"https://{r2_account_id}.r2.cloudflarestorage.com/professorparakeetmediafiles",
            region_name="auto",
        )
        dataset = get_or_set_cache(
            prefix="user_dataset",
            key=dataset_id,
            field_to_get="id",
            Model=Dataset,
            timeout=120,
        )
        result_records = DatasetRecord.objects.filter(dataset=dataset)
        i = 0
        with open(
            f"s3://download/{url_safe_datasetname}_{unique}{extension}",
            "w",
            transport_params={"client": r2_client},
        ) as fout:
            for r in result_records.iterator(chunk_size=2000):
                if extension == ".csv":
                    writer = csv.writer(fout)
                    if i == 0:
                        writer.writerow(
                            ["system_prompt", "prompt", "response", "evaluation"]
                        )
                        i += 1
                    writer.writerow(
                        [
                            r.system_prompt,
                            r.prompt,
                            r.response,
                            json.dumps(r.evaluation),
                        ]
                    )

                elif extension == ".jsonl":
                    data = {
                        "system_prompt": r.system_prompt,
                        "prompt": r.prompt,
                        "response": r.response,
                        "evaluation": r.evaluation,
                    }
                    json.dump(data, fout)
                    fout.write("\n")
        cache.set(f"allow_export_large_dataset_for_user_{hashed_key}", True, 3600)
    except SoftTimeLimitExceeded:
        cache.set(f"allow_export_large_dataset_for_user_{hashed_key}", True, 3600)
