"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const documents_1 = require("@langchain/core/documents");
const lodash_1 = require("lodash");
const redis_1 = require("@langchain/community/vectorstores/redis");
const RedisSearchBase_1 = require("./RedisSearchBase");
const utils_1 = require("./utils");
class RedisUpsert_VectorStores extends RedisSearchBase_1.RedisSearchBase {
    constructor() {
        super();
        this.label = 'Redis Upsert Document';
        this.name = 'RedisUpsert';
        this.version = 1.0;
        this.description = 'Upsert documents to Redis';
        this.inputs.unshift({
            label: 'Document',
            name: 'document',
            type: 'Document',
            list: true
        });
    }
    async constructVectorStore(embeddings, indexName, replaceIndex, docs) {
        const storeConfig = {
            redisClient: this.redisClient,
            indexName: indexName
        };
        if (replaceIndex) {
            let response = await this.redisClient.ft.dropIndex(indexName);
            if (process.env.DEBUG === 'true') {
                // eslint-disable-next-line no-console
                console.log(`Redis Vector Store :: Dropping index [${indexName}], Received Response [${response}]`);
            }
        }
        return await redis_1.RedisVectorStore.fromDocuments(docs, embeddings, storeConfig);
    }
    async init(nodeData, _, options) {
        const docs = nodeData.inputs?.document;
        const flattenDocs = docs && docs.length ? (0, lodash_1.flatten)(docs) : [];
        const finalDocs = [];
        for (let i = 0; i < flattenDocs.length; i += 1) {
            if (flattenDocs[i] && flattenDocs[i].pageContent) {
                const document = new documents_1.Document(flattenDocs[i]);
                (0, utils_1.escapeAllStrings)(document.metadata);
                finalDocs.push(document);
            }
        }
        return super.init(nodeData, _, options, finalDocs);
    }
}
module.exports = { nodeClass: RedisUpsert_VectorStores };
//# sourceMappingURL=Redis_Upsert.js.map