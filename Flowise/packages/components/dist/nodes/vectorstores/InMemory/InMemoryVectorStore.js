"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const memory_1 = require("langchain/vectorstores/memory");
const documents_1 = require("@langchain/core/documents");
const utils_1 = require("../../../src/utils");
class InMemoryVectorStore_VectorStores {
    constructor() {
        //@ts-ignore
        this.vectorStoreMethods = {
            async upsert(nodeData) {
                const docs = nodeData.inputs?.document;
                const embeddings = nodeData.inputs?.embeddings;
                const flattenDocs = docs && docs.length ? (0, lodash_1.flatten)(docs) : [];
                const finalDocs = [];
                for (let i = 0; i < flattenDocs.length; i += 1) {
                    if (flattenDocs[i] && flattenDocs[i].pageContent) {
                        finalDocs.push(new documents_1.Document(flattenDocs[i]));
                    }
                }
                try {
                    await memory_1.MemoryVectorStore.fromDocuments(finalDocs, embeddings);
                    return { numAdded: finalDocs.length, addedDocs: finalDocs };
                }
                catch (e) {
                    throw new Error(e);
                }
            }
        };
        this.label = 'In-Memory Vector Store';
        this.name = 'memoryVectorStore';
        this.version = 1.0;
        this.type = 'Memory';
        this.icon = 'memory.svg';
        this.category = 'Vector Stores';
        this.description = 'In-memory vectorstore that stores embeddings and does an exact, linear search for the most similar embeddings.';
        this.baseClasses = [this.type, 'VectorStoreRetriever', 'BaseRetriever'];
        this.inputs = [
            {
                label: 'Document',
                name: 'document',
                type: 'Document',
                list: true,
                optional: true
            },
            {
                label: 'Embeddings',
                name: 'embeddings',
                type: 'Embeddings'
            },
            {
                label: 'Top K',
                name: 'topK',
                description: 'Number of top results to fetch. Default to 4',
                placeholder: '4',
                type: 'number',
                optional: true
            }
        ];
        this.outputs = [
            {
                label: 'Memory Retriever',
                name: 'retriever',
                baseClasses: this.baseClasses
            },
            {
                label: 'Memory Vector Store',
                name: 'vectorStore',
                baseClasses: [this.type, ...(0, utils_1.getBaseClasses)(memory_1.MemoryVectorStore)]
            }
        ];
    }
    async init(nodeData) {
        const docs = nodeData.inputs?.document;
        const embeddings = nodeData.inputs?.embeddings;
        const output = nodeData.outputs?.output;
        const topK = nodeData.inputs?.topK;
        const k = topK ? parseFloat(topK) : 4;
        const flattenDocs = docs && docs.length ? (0, lodash_1.flatten)(docs) : [];
        const finalDocs = [];
        for (let i = 0; i < flattenDocs.length; i += 1) {
            if (flattenDocs[i] && flattenDocs[i].pageContent) {
                finalDocs.push(new documents_1.Document(flattenDocs[i]));
            }
        }
        const vectorStore = await memory_1.MemoryVectorStore.fromDocuments(finalDocs, embeddings);
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
module.exports = { nodeClass: InMemoryVectorStore_VectorStores };
//# sourceMappingURL=InMemoryVectorStore.js.map