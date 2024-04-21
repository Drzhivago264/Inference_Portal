"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const documents_1 = require("@langchain/core/documents");
const mongodb_atlas_1 = require("@langchain/community/vectorstores/mongodb_atlas");
const MongoDBSearchBase_1 = require("./MongoDBSearchBase");
class MongoDBUpsert_VectorStores extends MongoDBSearchBase_1.MongoDBSearchBase {
    constructor() {
        super();
        this.label = 'MongoDB Atlas Upsert Document';
        this.name = 'MongoDBUpsert';
        this.version = 1.0;
        this.description = 'Upsert documents to MongoDB Atlas';
        this.inputs.unshift({
            label: 'Document',
            name: 'document',
            type: 'Document',
            list: true
        });
    }
    async constructVectorStore(embeddings, collection, indexName, textKey, embeddingKey, docs) {
        const mongoDBAtlasVectorSearch = new mongodb_atlas_1.MongoDBAtlasVectorSearch(embeddings, {
            collection: collection,
            indexName: indexName,
            textKey: textKey,
            embeddingKey: embeddingKey
        });
        await mongoDBAtlasVectorSearch.addDocuments(docs);
        return mongoDBAtlasVectorSearch;
    }
    async init(nodeData, _, options) {
        const docs = nodeData.inputs?.document;
        const flattenDocs = docs && docs.length ? (0, lodash_1.flatten)(docs) : [];
        const finalDocs = [];
        for (let i = 0; i < flattenDocs.length; i += 1) {
            if (flattenDocs[i] && flattenDocs[i].pageContent) {
                const document = new documents_1.Document(flattenDocs[i]);
                finalDocs.push(document);
            }
        }
        return super.init(nodeData, _, options, finalDocs);
    }
}
module.exports = { nodeClass: MongoDBUpsert_VectorStores };
//# sourceMappingURL=MongoDB_Upsert.js.map