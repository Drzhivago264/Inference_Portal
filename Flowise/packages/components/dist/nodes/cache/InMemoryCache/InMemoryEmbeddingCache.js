"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stores_1 = require("@langchain/core/stores");
const cache_backed_1 = require("langchain/embeddings/cache_backed");
const src_1 = require("../../../src");
class InMemoryEmbeddingCache {
    constructor() {
        this.label = 'InMemory Embedding Cache';
        this.name = 'inMemoryEmbeddingCache';
        this.version = 1.0;
        this.type = 'InMemoryEmbeddingCache';
        this.description = 'Cache generated Embeddings in memory to avoid needing to recompute them.';
        this.icon = 'Memory.svg';
        this.category = 'Cache';
        this.baseClasses = [this.type, ...(0, src_1.getBaseClasses)(cache_backed_1.CacheBackedEmbeddings)];
        this.inputs = [
            {
                label: 'Embeddings',
                name: 'embeddings',
                type: 'Embeddings'
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
        const namespace = nodeData.inputs?.namespace;
        const underlyingEmbeddings = nodeData.inputs?.embeddings;
        const memoryMap = options.cachePool.getEmbeddingCache(options.chatflowid) ?? {};
        const inMemCache = new InMemoryEmbeddingCacheExtended(memoryMap);
        inMemCache.mget = async (keys) => {
            const memory = options.cachePool.getEmbeddingCache(options.chatflowid) ?? inMemCache.store;
            return keys.map((key) => memory[key]);
        };
        inMemCache.mset = async (keyValuePairs) => {
            for (const [key, value] of keyValuePairs) {
                inMemCache.store[key] = value;
            }
            options.cachePool.addEmbeddingCache(options.chatflowid, inMemCache.store);
        };
        inMemCache.mdelete = async (keys) => {
            for (const key of keys) {
                delete inMemCache.store[key];
            }
            options.cachePool.addEmbeddingCache(options.chatflowid, inMemCache.store);
        };
        return cache_backed_1.CacheBackedEmbeddings.fromBytesStore(underlyingEmbeddings, inMemCache, {
            namespace: namespace
        });
    }
}
class InMemoryEmbeddingCacheExtended extends stores_1.BaseStore {
    constructor(map) {
        super();
        this.lc_namespace = ['langchain', 'storage', 'in_memory'];
        this.store = {};
        this.store = map;
    }
    /**
     * Retrieves the values associated with the given keys from the store.
     * @param keys Keys to retrieve values for.
     * @returns Array of values associated with the given keys.
     */
    async mget(keys) {
        return keys.map((key) => this.store[key]);
    }
    /**
     * Sets the values for the given keys in the store.
     * @param keyValuePairs Array of key-value pairs to set in the store.
     * @returns Promise that resolves when all key-value pairs have been set.
     */
    async mset(keyValuePairs) {
        for (const [key, value] of keyValuePairs) {
            this.store[key] = value;
        }
    }
    /**
     * Deletes the given keys and their associated values from the store.
     * @param keys Keys to delete from the store.
     * @returns Promise that resolves when all keys have been deleted.
     */
    async mdelete(keys) {
        for (const key of keys) {
            delete this.store[key];
        }
    }
    /**
     * Asynchronous generator that yields keys from the store. If a prefix is
     * provided, it only yields keys that start with the prefix.
     * @param prefix Optional prefix to filter keys.
     * @returns AsyncGenerator that yields keys from the store.
     */
    async *yieldKeys(prefix) {
        const keys = Object.keys(this.store);
        for (const key of keys) {
            if (prefix === undefined || key.startsWith(prefix)) {
                yield key;
            }
        }
    }
}
module.exports = { nodeClass: InMemoryEmbeddingCache };
//# sourceMappingURL=InMemoryEmbeddingCache.js.map