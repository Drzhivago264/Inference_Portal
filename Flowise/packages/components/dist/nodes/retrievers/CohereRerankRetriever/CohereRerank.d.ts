import { Callbacks } from '@langchain/core/callbacks/manager';
import { Document } from '@langchain/core/documents';
import { BaseDocumentCompressor } from 'langchain/retrievers/document_compressors';
export declare class CohereRerank extends BaseDocumentCompressor {
    private cohereAPIKey;
    private COHERE_API_URL;
    private readonly model;
    private readonly k;
    private readonly maxChunksPerDoc;
    constructor(cohereAPIKey: string, model: string, k: number, maxChunksPerDoc: number);
    compressDocuments(documents: Document<Record<string, any>>[], query: string, _?: Callbacks | undefined): Promise<Document<Record<string, any>>[]>;
}
