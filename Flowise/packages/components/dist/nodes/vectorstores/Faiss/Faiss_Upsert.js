"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const documents_1 = require("@langchain/core/documents");
const faiss_1 = require("@langchain/community/vectorstores/faiss");
const utils_1 = require("../../../src/utils");
class FaissUpsert_VectorStores {
    constructor() {
        this.label = 'Faiss Upsert Document';
        this.name = 'faissUpsert';
        this.version = 1.0;
        this.type = 'Faiss';
        this.icon = 'faiss.svg';
        this.category = 'Vector Stores';
        this.description = 'Upsert documents to Faiss';
        this.baseClasses = [this.type, 'VectorStoreRetriever', 'BaseRetriever'];
        this.badge = 'DEPRECATING';
        this.inputs = [
            {
                label: 'Document',
                name: 'document',
                type: 'Document',
                list: true
            },
            {
                label: 'Embeddings',
                name: 'embeddings',
                type: 'Embeddings'
            },
            {
                label: 'Base Path to store',
                name: 'basePath',
                description: 'Path to store faiss.index file',
                placeholder: `C:\\Users\\User\\Desktop`,
                type: 'string'
            },
            {
                label: 'Top K',
                name: 'topK',
                description: 'Number of top results to fetch. Default to 4',
                placeholder: '4',
                type: 'number',
                additionalParams: true,
                optional: true
            }
        ];
        this.outputs = [
            {
                label: 'Faiss Retriever',
                name: 'retriever',
                baseClasses: this.baseClasses
            },
            {
                label: 'Faiss Vector Store',
                name: 'vectorStore',
                baseClasses: [this.type, ...(0, utils_1.getBaseClasses)(faiss_1.FaissStore)]
            }
        ];
    }
    async init(nodeData) {
        const docs = nodeData.inputs?.document;
        const embeddings = nodeData.inputs?.embeddings;
        const output = nodeData.outputs?.output;
        const basePath = nodeData.inputs?.basePath;
        const topK = nodeData.inputs?.topK;
        const k = topK ? parseFloat(topK) : 4;
        const flattenDocs = docs && docs.length ? (0, lodash_1.flatten)(docs) : [];
        const finalDocs = [];
        for (let i = 0; i < flattenDocs.length; i += 1) {
            if (flattenDocs[i] && flattenDocs[i].pageContent) {
                finalDocs.push(new documents_1.Document(flattenDocs[i]));
            }
        }
        const vectorStore = await faiss_1.FaissStore.fromDocuments(finalDocs, embeddings);
        await vectorStore.save(basePath);
        // Avoid illegal invocation error
        vectorStore.similaritySearchVectorWithScore = async (query, k) => {
            const index = vectorStore.index;
            if (k > index.ntotal()) {
                const total = index.ntotal();
                console.warn(`k (${k}) is greater than the number of elements in the index (${total}), setting k to ${total}`);
                k = total;
            }
            const result = index.search(query, k);
            return result.labels.map((id, index) => {
                const uuid = vectorStore._mapping[id];
                return [vectorStore.docstore.search(uuid), result.distances[index]];
            });
        };
        if (output === 'retriever') {
            const retriever = vectorStore.asRetriever(k);
            return retriever;
        }
        else if (output === 'vectorStore') {
            ;
            vectorStore.k = k;
            return vectorStore;
        }
        return vectorStore;
    }
}
module.exports = { nodeClass: FaissUpsert_VectorStores };
//# sourceMappingURL=Faiss_Upsert.js.map