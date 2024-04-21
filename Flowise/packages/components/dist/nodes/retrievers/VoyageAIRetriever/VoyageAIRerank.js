"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoyageAIRerank = void 0;
const axios_1 = __importDefault(require("axios"));
const document_compressors_1 = require("langchain/retrievers/document_compressors");
class VoyageAIRerank extends document_compressors_1.BaseDocumentCompressor {
    constructor(voyageAIAPIKey, model, k) {
        super();
        this.VOYAGEAI_RERANK_API_URL = 'https://api.voyageai.com/v1/rerank';
        this.model = 'rerank-lite-1';
        this.voyageAIAPIKey = voyageAIAPIKey;
        this.model = model;
        this.k = k;
    }
    async compressDocuments(documents, query, _) {
        // avoid empty api call
        if (documents.length === 0) {
            return [];
        }
        const config = {
            headers: {
                Authorization: `Bearer ${this.voyageAIAPIKey}`,
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        };
        const data = {
            model: this.model,
            query: query,
            documents: documents.map((doc) => doc.pageContent)
        };
        try {
            let returnedDocs = await axios_1.default.post(this.VOYAGEAI_RERANK_API_URL, data, config);
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
exports.VoyageAIRerank = VoyageAIRerank;
//# sourceMappingURL=VoyageAIRerank.js.map