"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const mongodb_1 = require("mongodb");
const mongodb_2 = require("@langchain/mongodb");
const documents_1 = require("@langchain/core/documents");
const utils_1 = require("../../../src/utils");
const VectorStoreUtils_1 = require("../VectorStoreUtils");
class MongoDBAtlas_VectorStores {
    constructor() {
        //@ts-ignore
        this.vectorStoreMethods = {
            async upsert(nodeData, options) {
                const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
                const databaseName = nodeData.inputs?.databaseName;
                const collectionName = nodeData.inputs?.collectionName;
                const indexName = nodeData.inputs?.indexName;
                let textKey = nodeData.inputs?.textKey;
                let embeddingKey = nodeData.inputs?.embeddingKey;
                const embeddings = nodeData.inputs?.embeddings;
                let mongoDBConnectUrl = (0, utils_1.getCredentialParam)('mongoDBConnectUrl', credentialData, nodeData);
                const docs = nodeData.inputs?.document;
                const flattenDocs = docs && docs.length ? (0, lodash_1.flatten)(docs) : [];
                const finalDocs = [];
                for (let i = 0; i < flattenDocs.length; i += 1) {
                    if (flattenDocs[i] && flattenDocs[i].pageContent) {
                        const document = new documents_1.Document(flattenDocs[i]);
                        finalDocs.push(document);
                    }
                }
                const mongoClient = await getMongoClient(mongoDBConnectUrl);
                try {
                    const collection = mongoClient.db(databaseName).collection(collectionName);
                    if (!textKey || textKey === '')
                        textKey = 'text';
                    if (!embeddingKey || embeddingKey === '')
                        embeddingKey = 'embedding';
                    const mongoDBAtlasVectorSearch = new mongodb_2.MongoDBAtlasVectorSearch(embeddings, {
                        collection,
                        indexName,
                        textKey,
                        embeddingKey
                    });
                    await mongoDBAtlasVectorSearch.addDocuments(finalDocs);
                    return { numAdded: finalDocs.length, addedDocs: finalDocs };
                }
                catch (e) {
                    throw new Error(e);
                }
            }
        };
        this.label = 'MongoDB Atlas';
        this.name = 'mongoDBAtlas';
        this.version = 1.0;
        this.description = `Upsert embedded data and perform similarity or mmr search upon query using MongoDB Atlas, a managed cloud mongodb database`;
        this.type = 'MongoDB Atlas';
        this.icon = 'mongodb.svg';
        this.category = 'Vector Stores';
        this.baseClasses = [this.type, 'VectorStoreRetriever', 'BaseRetriever'];
        this.badge = 'NEW';
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['mongoDBUrlApi']
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
        (0, VectorStoreUtils_1.addMMRInputParams)(this.inputs);
        this.outputs = [
            {
                label: 'MongoDB Retriever',
                name: 'retriever',
                baseClasses: this.baseClasses
            },
            {
                label: 'MongoDB Vector Store',
                name: 'vectorStore',
                baseClasses: [this.type, ...(0, utils_1.getBaseClasses)(mongodb_2.MongoDBAtlasVectorSearch)]
            }
        ];
    }
    async init(nodeData, _, options) {
        const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
        const databaseName = nodeData.inputs?.databaseName;
        const collectionName = nodeData.inputs?.collectionName;
        const indexName = nodeData.inputs?.indexName;
        let textKey = nodeData.inputs?.textKey;
        let embeddingKey = nodeData.inputs?.embeddingKey;
        const embeddings = nodeData.inputs?.embeddings;
        let mongoDBConnectUrl = (0, utils_1.getCredentialParam)('mongoDBConnectUrl', credentialData, nodeData);
        const mongoClient = await getMongoClient(mongoDBConnectUrl);
        try {
            const collection = mongoClient.db(databaseName).collection(collectionName);
            if (!textKey || textKey === '')
                textKey = 'text';
            if (!embeddingKey || embeddingKey === '')
                embeddingKey = 'embedding';
            const vectorStore = new mongodb_2.MongoDBAtlasVectorSearch(embeddings, {
                collection,
                indexName,
                textKey,
                embeddingKey
            });
            return (0, VectorStoreUtils_1.resolveVectorStoreOrRetriever)(nodeData, vectorStore);
        }
        catch (e) {
            throw new Error(e);
        }
    }
}
let mongoClientSingleton;
let mongoUrl;
const getMongoClient = async (newMongoUrl) => {
    if (!mongoClientSingleton) {
        // if client does not exist
        mongoClientSingleton = new mongodb_1.MongoClient(newMongoUrl);
        mongoUrl = newMongoUrl;
        return mongoClientSingleton;
    }
    else if (mongoClientSingleton && newMongoUrl !== mongoUrl) {
        // if client exists but url changed
        mongoClientSingleton.close();
        mongoClientSingleton = new mongodb_1.MongoClient(newMongoUrl);
        mongoUrl = newMongoUrl;
        return mongoClientSingleton;
    }
    return mongoClientSingleton;
};
module.exports = { nodeClass: MongoDBAtlas_VectorStores };
//# sourceMappingURL=MongoDBAtlas.js.map