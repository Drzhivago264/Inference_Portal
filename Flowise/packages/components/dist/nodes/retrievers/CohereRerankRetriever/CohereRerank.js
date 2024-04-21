"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CohereRerank = void 0;
const axios_1 = __importDefault(require("axios"));
const document_compressors_1 = require("langchain/retrievers/document_compressors");
class CohereRerank extends document_compressors_1.BaseDocumentCompressor {
    constructor(cohereAPIKey, model, k, maxChunksPerDoc) {
        super();
        this.COHERE_API_URL = 'https://api.cohere.ai/v1/rerank';
        this.cohereAPIKey = cohereAPIKey;
        this.model = model;
        this.k = k;
        this.maxChunksPerDoc = maxChunksPerDoc;
    }
    async compressDocuments(documents, query, _) {
        // avoid empty api call
        if (documents.length === 0) {
            return [];
        }
        const config = {
            headers: {
                Authorization: `Bearer ${this.cohereAPIKey}`,
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        };
        const data = {
            model: this.model,
            topN: this.k,
            max_chunks_per_doc: this.maxChunksPerDoc,
            query: query,
            return_documents: false,
            documents: documents.map((doc) => doc.pageContent)
        };
        try {
            let returnedDocs = await axios_1.default.post(this.COHERE_API_URL, data, config);
            const finalResults = [];
            returnedDocs.data.results.forEach((result) => {
                const doc = documents[result.index];
                doc.metadata.relevance_score = result.relevance_score;
                finalResults.push(doc);
            });
            return finalResults.splice(0, this.k);
        }
        catch (error) {
            return documents;
        }
    }
}
exports.CohereRerank = CohereRerank;
//# sourceMappingURL=CohereRerank.js.map