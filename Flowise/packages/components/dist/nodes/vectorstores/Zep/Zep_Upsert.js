"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const zep_1 = require("@langchain/community/vectorstores/zep");
const documents_1 = require("@langchain/core/documents");
const utils_1 = require("../../../src/utils");
class Zep_Upsert_VectorStores {
    constructor() {
        this.label = 'Zep Upsert Document - Open Source';
        this.name = 'zepUpsert';
        this.version = 1.0;
        this.type = 'Zep';
        this.icon = 'zep.svg';
        this.category = 'Vector Stores';
        this.description = 'Upsert documents to Zep';
        this.baseClasses = [this.type, 'VectorStoreRetriever', 'BaseRetriever'];
        this.badge = 'DEPRECATING';
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            optional: true,
            description: 'Configure JWT authentication on your Zep instance (Optional)',
            credentialNames: ['zepMemoryApi']
        };
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
                label: 'Base URL',
                name: 'baseURL',
                type: 'string',
                default: 'http://127.0.0.1:8000'
            },
            {
                label: 'Zep Collection',
                name: 'zepCollection',
                type: 'string',
                placeholder: 'my-first-collection'
            },
            {
                label: 'Embedding Dimension',
                name: 'dimension',
                type: 'number',
                default: 1536,
                additionalParams: true
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
                label: 'Zep Retriever',
                name: 'retriever',
                baseClasses: this.baseClasses
            },
            {
                label: 'Zep Vector Store',
                name: 'vectorStore',
                baseClasses: [this.type, ...(0, utils_1.getBaseClasses)(zep_1.ZepVectorStore)]
            }
        ];
    }
    async init(nodeData, _, options) {
        const baseURL = nodeData.inputs?.baseURL;
        const zepCollection = nodeData.inputs?.zepCollection;
        const dimension = nodeData.inputs?.dimension ?? 1536;
        const docs = nodeData.inputs?.document;
        const embeddings = nodeData.inputs?.embeddings;
        const topK = nodeData.inputs?.topK;
        const k = topK ? parseFloat(topK) : 4;
        const output = nodeData.outputs?.output;
        const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
        const apiKey = (0, utils_1.getCredentialParam)('apiKey', credentialData, nodeData);
        const flattenDocs = docs && docs.length ? (0, lodash_1.flatten)(docs) : [];
        const finalDocs = [];
        for (let i = 0; i < flattenDocs.length; i += 1) {
            if (flattenDocs[i] && flattenDocs[i].pageContent) {
                finalDocs.push(new documents_1.Document(flattenDocs[i]));
            }
        }
        const zepConfig = {
            apiUrl: baseURL,
            collectionName: zepCollection,
            embeddingDimensions: dimension,
            isAutoEmbedded: false
        };
        if (apiKey)
            zepConfig.apiKey = apiKey;
        const vectorStore = await zep_1.ZepVectorStore.fromDocuments(finalDocs, embeddings, zepConfig);
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
module.exports = { nodeClass: Zep_Upsert_VectorStores };
//# sourceMappingURL=Zep_Upsert.js.map