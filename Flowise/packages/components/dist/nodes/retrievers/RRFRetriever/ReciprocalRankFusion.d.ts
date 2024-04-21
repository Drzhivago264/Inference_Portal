import { Document } from '@langchain/core/documents';
import { Callbacks } from '@langchain/core/callbacks/manager';
import { BaseLanguageModel } from '@langchain/core/language_models/base';
import { VectorStoreRetriever } from '@langchain/core/vectorstores';
import { BaseDocumentCompressor } from 'langchain/retrievers/document_compressors';
export declare class ReciprocalRankFusion extends BaseDocumentCompressor {
    private readonly llm;
    private readonly queryCount;
    private readonly topK;
    private readonly c;
    private baseRetriever;
    constructor(llm: BaseLanguageModel, baseRetriever: VectorStoreRetriever, queryCount: number, topK: number, c: number);
    compressDocuments(documents: Document<Record<string, any>>[], query: string, _?: Callbacks | undefined): Promise<Document<Record<string, any>>[]>;
    reciprocalRankFunction(docList: Document<Record<string, any>>[][], k: number): Document<Record<string, any>>[];
}
