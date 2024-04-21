"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDBSearchBase = void 0;
const src_1 = require("../../../src");
const mongodb_atlas_1 = require("@langchain/community/vectorstores/mongodb_atlas");
const mongodb_1 = require("mongodb");
class MongoDBSearchBase {
    constructor() {
        this.type = 'MongoDB Atlas';
        this.icon = 'mongodb.svg';
        this.category = 'Vector Stores';
        this.baseClasses = [this.type, 'VectorStoreRetriever', 'BaseRetriever'];
        this.badge = 'DEPRECATING';
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['mongoDBUrlApi']
        };
        this.inputs = [
            {
                label: 'Embeddings',
                name: 'embeddings',
                type: 'Embeddings'
            },
            {
                label: 'Database',
                name: 'databaseName',
                placeholder: '<DB_NAME>',
                type: 'string'
            },
            {
                label: 'Collection Name',
                name: 'collectionName',
                placeholder: '<COLLECTION_NAME>',
                type: 'string'
            },
            {
                label: 'Index Name',
                name: 'indexName',
                placeholder: '<VECTOR_INDEX_NAME>',
                type: 'string'
            },
            {
                label: 'Content Field',
                name: 'textKey',
                description: 'Name of the field (column) that contains the actual content',
                type: 'string',
                default: 'text',
                additionalParams: true,
                optional: true
            },
            {
                label: 'Embedded Field',
                name: 'embeddingKey',
                description: 'Name of the field (column) that contains the Embedding',
                type: 'string',
                default: 'embedding',
                additionalParams: true,
                optional: true
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
                label: 'MongoDB Retriever',
                name: 'retriever',
                baseClasses: this.baseClasses
            },
            {
                label: 'MongoDB Vector Store',
                name: 'vectorStore',
                baseClasses: [this.type, ...(0, src_1.getBaseClasses)(mongodb_atlas_1.MongoDBAtlasVectorSearch)]
            }
        ];
    }
    async init(nodeData, _, options, docs) {
        const credentialData = await (0, src_1.getCredentialData)(nodeData.credential ?? '', options);
        const databaseName = nodeData.inputs?.databaseName;
        const collectionName = nodeData.inputs?.collectionName;
        const indexName = nodeData.inputs?.indexName;
        let textKey = nodeData.inputs?.textKey;
        let embeddingKey = nodeData.inputs?.embeddingKey;
        const embeddings = nodeData.inputs?.embeddings;
        const topK = nodeData.inputs?.topK;
        const k = topK ? parseFloat(topK) : 4;
        const output = nodeData.outputs?.output;
        let mongoDBConnectUrl = (0, src_1.getCredentialParam)('mongoDBConnectUrl', credentialData, nodeData);
        this.mongoClient = new mongodb_1.MongoClient(mongoDBConnectUrl);
        const collection = this.mongoClient.db(databaseName).collection(collectionName);
        if (!textKey || textKey === '')
            textKey = 'text';
        if (!embeddingKey || embeddingKey === '')
            embeddingKey = 'embedding';
        const vectorStore = await this.constructVectorStore(embeddings, collection, indexName, textKey, embeddingKey, docs);
        if (output === 'retriever') {
            return vectorStore.asRetriever(k);
        }
        else if (output === 'vectorStore') {
            ;
            vectorStore.k = k;
            return vectorStore;
        }
        return vectorStore;
    }
}
exports.MongoDBSearchBase = MongoDBSearchBase;
//# sourceMappingURL=MongoDBSearchBase.js.map