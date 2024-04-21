"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const upstash_redis_1 = require("@langchain/community/caches/upstash_redis");
const src_1 = require("../../../src");
class UpstashRedisCache {
    constructor() {
        this.label = 'Upstash Redis Cache';
        this.name = 'upstashRedisCache';
        this.version = 1.0;
        this.type = 'UpstashRedisCache';
        this.description = 'Cache LLM response in Upstash Redis, serverless data for Redis and Kafka';
        this.icon = 'Upstash.svg';
        this.category = 'Cache';
        this.baseClasses = [this.type, ...(0, src_1.getBaseClasses)(upstash_redis_1.UpstashRedisCache)];
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            optional: true,
            credentialNames: ['upstashRedisApi']
        };
        this.inputs = [];
    }
    async init(nodeData, _, options) {
        const credentialData = await (0, src_1.getCredentialData)(nodeData.credential ?? '', options);
        const upstashConnectionUrl = (0, src_1.getCredentialParam)('upstashConnectionUrl', credentialData, nodeData);
        const upstashToken = (0, src_1.getCredentialParam)('upstashConnectionToken', credentialData, nodeData);
        const cache = new upstash_redis_1.UpstashRedisCache({
            config: {
                url: upstashConnectionUrl,
                token: upstashToken
            }
        });
        return cache;
    }
}
module.exports = { nodeClass: UpstashRedisCache };
//# sourceMappingURL=UpstashRedisCache.js.map