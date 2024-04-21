"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("@langchain/community/vectorstores/redis");
const RedisSearchBase_1 = require("./RedisSearchBase");
class RedisExisting_VectorStores extends RedisSearchBase_1.RedisSearchBase {
    constructor() {
        super();
        this.label = 'Redis Load Existing Index';
        this.name = 'RedisIndex';
        this.version = 1.0;
        this.description = 'Load existing index from Redis (i.e: Document has been upserted)';
        // Remove replaceIndex from inputs as it is not applicable while fetching data from Redis
        let input = this.inputs.find((i) => i.name === 'replaceIndex');
        if (input)
            this.inputs.splice(this.inputs.indexOf(input), 1);
    }
    async constructVectorStore(embeddings, indexName, 
    // eslint-disable-next-line unused-imports/no-unused-vars
    replaceIndex, _) {
        const storeConfig = {
            redisClient: this.redisClient,
            indexName: indexName
        };
        return new redis_1.RedisVectorStore(embeddings, storeConfig);
    }
    async init(nodeData, _, options) {
        return super.init(nodeData, _, options, undefined);
    }
}
module.exports = { nodeClass: RedisExisting_VectorStores };
//# sourceMappingURL=Redis_Existing.js.map