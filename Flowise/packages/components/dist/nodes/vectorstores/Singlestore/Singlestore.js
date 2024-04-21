"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const singlestore_1 = require("@langchain/community/vectorstores/singlestore");
const documents_1 = require("@langchain/core/documents");
const utils_1 = require("../../../src/utils");
class SingleStore_VectorStores {
    constructor() {
        //@ts-ignore
        this.vectorStoreMethods = {
            async upsert(nodeData, options) {
                const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
                const user = (0, utils_1.getCredentialParam)('user', credentialData, nodeData);
                const password = (0, utils_1.getCredentialParam)('password', credentialData, nodeData);
                const singleStoreConnectionConfig = {
                    connectionOptions: {
                        host: nodeData.inputs?.host,
                        port: 3306,
                        user,
                        password,
                        database: nodeData.inputs?.database
                    },
                    ...(nodeData.inputs?.tableName ? { tableName: nodeData.inputs.tableName } : {}),
                    ...(nodeData.inputs?.contentColumnName ? { contentColumnName: nodeData.inputs.contentColumnName } : {}),
                    ...(nodeData.inputs?.vectorColumnName ? { vectorColumnName: nodeData.inputs.vectorColumnName } : {}),
                    ...(nodeData.inputs?.metadataColumnName ? { metadataColumnName: nodeData.inputs.metadataColumnName } : {})
                };
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
                    const vectorStore = new singlestore_1.SingleStoreVectorStore(embeddings, singleStoreConnectionConfig);
                    vectorStore.addDocuments.bind(vectorStore)(finalDocs);
                    return { numAdded: finalDocs.length, addedDocs: finalDocs };
                }
                catch (e) {
                    throw new Error(e);
                }
            }
        };
        this.label = 'SingleStore';
        this.name = 'singlestore';
        this.version = 1.0;
        this.type = 'SingleStore';
        this.icon = 'singlestore.svg';
        this.category = 'Vector Stores';
        this.description =
            'Upsert embedded data and perform similarity search upon query using SingleStore, a fast and distributed cloud relational database';
        this.baseClasses = [this.type, 'VectorStoreRetriever', 'BaseRetriever'];
        this.badge = 'NEW';
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            description: 'Needed when using SingleStore cloud hosted',
            optional: true,
            credentialNames: ['singleStoreApi']
        };
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
                label: 'Host',
                name: 'host',
                type: 'string'
            },
            {
                label: 'Database',
                name: 'database',
                type: 'string'
            },
            {
                label: 'Table Name',
                name: 'tableName',
                type: 'string',
                placeholder: 'embeddings',
                additionalParams: true,
                optional: true
            },
            {
                label: 'Content Column Name',
                name: 'contentColumnName',
                type: 'string',
                placeholder: 'content',
                additionalParams: true,
                optional: true
            },
            {
                label: 'Vector Column Name',
                name: 'vectorColumnName',
                type: 'string',
                placeholder: 'vector',
                additionalParams: true,
                optional: true
            },
            {
                label: 'Metadata Column Name',
                name: 'metadataColumnName',
                type: 'string',
                placeholder: 'metadata',
                additionalParams: true,
                optional: true
            },
            {
                label: 'Top K',
                name: 'topK',
                placeholder: '4',
                type: 'number',
                additionalParams: true,
                optional: true
            }
        ];
        this.outputs = [
            {
                label: 'SingleStore Retriever',
                name: 'retriever',
                baseClasses: this.baseClasses
            },
            {
                label: 'SingleStore Vector Store',
                name: 'vectorStore',
                baseClasses: [this.type, ...(0, utils_1.getBaseClasses)(singlestore_1.SingleStoreVectorStore)]
            }
        ];
    }
    async init(nodeData, _, options) {
        const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
        const user = (0, utils_1.getCredentialParam)('user', credentialData, nodeData);
        const password = (0, utils_1.getCredentialParam)('password', credentialData, nodeData);
        const singleStoreConnectionConfig = {
            connectionOptions: {
                host: nodeData.inputs?.host,
                port: 3306,
                user,
                password,
                database: nodeData.inputs?.database
            },
            ...(nodeData.inputs?.tableName ? { tableName: nodeData.inputs.tableName } : {}),
            ...(nodeData.inputs?.contentColumnName ? { contentColumnName: nodeData.inputs.contentColumnName } : {}),
            ...(nodeData.inputs?.vectorColumnName ? { vectorColumnName: nodeData.inputs.vectorColumnName } : {}),
            ...(nodeData.inputs?.metadataColumnName ? { metadataColumnName: nodeData.inputs.metadataColumnName } : {})
        };
        const embeddings = nodeData.inputs?.embeddings;
        const output = nodeData.outputs?.output;
        const topK = nodeData.inputs?.topK;
        const k = topK ? parseFloat(topK) : 4;
        const vectorStore = new singlestore_1.SingleStoreVectorStore(embeddings, singleStoreConnectionConfig);
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
module.exports = { nodeClass: SingleStore_VectorStores };
//# sourceMappingURL=Singlestore.js.map