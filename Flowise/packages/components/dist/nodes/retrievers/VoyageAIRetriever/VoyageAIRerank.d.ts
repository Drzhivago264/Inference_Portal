import { Callbacks } from '@langchain/core/callbacks/manager';
import { Document } from '@langchain/core/documents';
import { BaseDocumentCompressor } from 'langchain/retrievers/document_compressors';
export declare class VoyageAIRerank extends BaseDocumentCompressor {
    private voyageAIAPIKey;
    private readonly VOYAGEAI_RERANK_API_URL;
    private model;
    private readonly k;
    constructor(voyageAIAPIKey: string, model: string, k: number);
    compressDocuments(documents: Document<Record<string, any>>[], query: string, _?: Callbacks | undefined): Promise<Document<Record<string, any>>[]>;
}
