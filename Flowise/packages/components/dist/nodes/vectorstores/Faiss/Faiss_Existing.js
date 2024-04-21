"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faiss_1 = require("@langchain/community/vectorstores/faiss");
const utils_1 = require("../../../src/utils");
class Faiss_Existing_VectorStores {
    constructor() {
        this.label = 'Faiss Load Existing Index';
        this.name = 'faissExistingIndex';
        this.version = 1.0;
        this.type = 'Faiss';
        this.icon = 'faiss.svg';
        this.category = 'Vector Stores';
        this.description = 'Load existing index from Faiss (i.e: Document has been upserted)';
        this.baseClasses = [this.type, 'VectorStoreRetriever', 'BaseRetriever'];
        this.badge = 'DEPRECATING';
        this.inputs = [
            {
                label: 'Embeddings',
                name: 'embeddings',
                type: 'Embeddings'
            },
            {
                label: 'Base Path to load',
                name: 'basePath',
                description: 'Path to load faiss.index file',
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
        const embeddings = nodeData.inputs?.embeddings;
        const basePath = nodeData.inputs?.basePath;
        const output = nodeData.outputs?.output;
        const topK = nodeData.inputs?.topK;
        const k = topK ? parseFloat(topK) : 4;
        const vectorStore = await faiss_1.FaissStore.load(basePath, embeddings);
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
module.exports = { nodeClass: Faiss_Existing_VectorStores };
//# sourceMappingURL=Faiss_Existing.js.map