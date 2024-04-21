"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = require("ioredis");
const lodash_1 = require("lodash");
const ioredis_2 = require("@langchain/community/storage/ioredis");
const cache_backed_1 = require("langchain/embeddings/cache_backed");
const src_1 = require("../../../src");
let redisClientSingleton;
let redisClientOption;
let redisClientUrl;
const getRedisClientbyOption = (option) => {
    if (!redisClientSingleton) {
        // if client doesn't exists
        redisClientSingleton = new ioredis_1.Redis(option);
        redisClientOption = option;
        return redisClientSingleton;
    }
    else if (redisClientSingleton && !(0, lodash_1.isEqual)(option, redisClientOption)) {
        // if client exists but option changed
        redisClientSingleton.quit();
        redisClientSingleton = new ioredis_1.Redis(option);
        redisClientOption = option;
        return redisClientSingleton;
    }
    return redisClientSingleton;
};
const getRedisClientbyUrl = (url) => {
    if (!redisClientSingleton) {
        // if client doesn't exists
        redisClientSingleton = new ioredis_1.Redis(url);
        redisClientUrl = url;
        return redisClientSingleton;
    }
    else if (redisClientSingleton && url !== redisClientUrl) {
        // if client exists but option changed
        redisClientSingleton.quit();
        redisClientSingleton = new ioredis_1.Redis(url);
        redisClientUrl = url;
        return redisClientSingleton;
    }
    return redisClientSingleton;
};
class RedisEmbeddingsCache {
    constructor() {
        this.label = 'Redis Embeddings Cache';
        this.name = 'redisEmbeddingsCache';
        this.version = 1.0;
        this.type = 'RedisEmbeddingsCache';
        this.description = 'Cache generated Embeddings in Redis to avoid needing to recompute them.';
        this.icon = 'redis.svg';
        this.category = 'Cache';
        this.baseClasses = [this.type, ...(0, src_1.getBaseClasses)(cache_backed_1.CacheBackedEmbeddings)];
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            optional: true,
            credentialNames: ['redisCacheApi', 'redisCacheUrlApi']
        };
        this.inputs = [
            {
                label: 'Embeddings',
                name: 'embeddings',
                type: 'Embeddings'
            },
            {
                label: 'Time to Live (ms)',
                name: 'ttl',
                type: 'number',
                step: 10,
                default: 60 * 60,
                optional: true,
                additionalParams: true
            },
            {
                label: 'Namespace',
                name: 'namespace',
                type: 'string',
                optional: true,
                additionalParams: true
            }
        ];
    }
    async init(nodeData, _, options) {
        let ttl = nodeData.inputs?.ttl;
        const namespace = nodeData.inputs?.namespace;
        const underlyingEmbeddings = nodeData.inputs?.embeddings;
        const credentialData = await (0, src_1.getCredentialData)(nodeData.credential ?? '', options);
        const redisUrl = (0, src_1.getCredentialParam)('redisUrl', credentialData, nodeData);
        let client;
        if (!redisUrl || redisUrl === '') {
            const username = (0, src_1.getCredentialParam)('redisCacheUser', credentialData, nodeData);
            const password = (0, src_1.getCredentialParam)('redisCachePwd', credentialData, nodeData);
            const portStr = (0, src_1.getCredentialParam)('redisCachePort', credentialData, nodeData);
            const host = (0, src_1.getCredentialParam)('redisCacheHost', credentialData, nodeData);
            const sslEnabled = (0, src_1.getCredentialParam)('redisCacheSslEnabled', credentialData, nodeData);
            const tlsOptions = sslEnabled === true ? { tls: { rejectUnauthorized: false } } : {};
            client = getRedisClientbyOption({
                port: portStr ? parseInt(portStr) : 6379,
                host,
                username,
                password,
                ...tlsOptions
            });
        }
        else {
            client = getRedisClientbyUrl(redisUrl);
        }
        ttl ?? (ttl = '3600');
        let ttlNumber = parseInt(ttl, 10);
        const redisStore = new ioredis_2.RedisByteStore({
            client: client,
            ttl: ttlNumber
        });
        return cache_backed_1.CacheBackedEmbeddings.fromBytesStore(underlyingEmbeddings, redisStore, {
            namespace: namespace
        });
    }
}
module.exports = { nodeClass: RedisEmbeddingsCache };
//# sourceMappingURL=RedisEmbeddingsCache.js.map