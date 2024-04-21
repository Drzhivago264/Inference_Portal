"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_atlas_1 = require("@langchain/community/vectorstores/mongodb_atlas");
const MongoDBSearchBase_1 = require("./MongoDBSearchBase");
class MongoDBExisting_VectorStores extends MongoDBSearchBase_1.MongoDBSearchBase {
    constructor() {
        super();
        this.label = 'MongoDB Atlas Load Existing Index';
        this.name = 'MongoDBIndex';
        this.version = 1.0;
        this.description = 'Load existing data from MongoDB Atlas (i.e: Document has been upserted)';
    }
    async init(nodeData, _, options) {
        return super.init(nodeData, _, options, undefined);
    }
    async constructVectorStore(embeddings, collection, indexName, textKey, embeddingKey, _) {
        return new mongodb_atlas_1.MongoDBAtlasVectorSearch(embeddings, {
            collection: collection,
            indexName: indexName,
            textKey: textKey,
            embeddingKey: embeddingKey
        });
    }
}
module.exports = { nodeClass: MongoDBExisting_VectorStores };
//# sourceMappingURL=MongoDB_Existing.js.map