import { HfInference } from '@huggingface/inference';
import { Embeddings, EmbeddingsParams } from '@langchain/core/embeddings';
export interface HuggingFaceInferenceEmbeddingsParams extends EmbeddingsParams {
    apiKey?: string;
    model?: string;
    endpoint?: string;
}
export declare class HuggingFaceInferenceEmbeddings extends Embeddings implements HuggingFaceInferenceEmbeddingsParams {
    apiKey?: string;
    endpoint?: string;
    model: string;
    client: HfInference;
    constructor(fields?: HuggingFaceInferenceEmbeddingsParams);
    _embed(texts: string[]): Promise<number[][]>;
    embedQuery(document: string): Promise<number[]>;
    embedDocuments(documents: string[]): Promise<number[][]>;
}
