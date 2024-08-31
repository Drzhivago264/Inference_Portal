from datasets import load_dataset
from vectordb.utils import get_embedding_function

from server.models.dataset import Dataset, EmbeddingDatasetRecord


def load_dataset():
    docs = load_dataset(
        f"Cohere/wikipedia-22-12-simple-embeddings", split="train", streaming=True
    )
    dataset_1 = Dataset.objects.get(id=138)
    dataset_2 = Dataset.objects.get(id=140)
    for doc in docs:
        title = doc["title"]
        text = doc["text"]
        embedding_fn, _ = get_embedding_function()
        embedding = embedding_fn(f"{title}\n{text}")
        EmbeddingDatasetRecord.objects.create(
            dataset=dataset_1,
            system_prompt=title,
            prompt=text,
            response=text,
            evaluation=list(),
            embedding=embedding,
        )
        EmbeddingDatasetRecord.objects.create(
            dataset=dataset_2,
            system_prompt=title,
            prompt=text,
            response=text,
            evaluation=list(),
            embedding=embedding,
        )
