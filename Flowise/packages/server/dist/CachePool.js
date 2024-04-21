"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInstance = exports.CachePool = void 0;
/**
 * This pool is to keep track of in-memory cache used for LLM and Embeddings
 */
class CachePool {
    constructor() {
        this.activeLLMCache = {};
        this.activeEmbeddingCache = {};
    }
    /**
     * Add to the llm cache pool
     * @param {string} chatflowid
     * @param {Map<any, any>} value
     */
    addLLMCache(chatflowid, value) {
        this.activeLLMCache[chatflowid] = value;
    }
    /**
     * Add to the embedding cache pool
     * @param {string} chatflowid
     * @param {Map<any, any>} value
     */
    addEmbeddingCache(chatflowid, value) {
        this.activeEmbeddingCache[chatflowid] = value;
    }
    /**
     * Get item from llm cache pool
     * @param {string} chatflowid
     */
    getLLMCache(chatflowid) {
        return this.activeLLMCache[chatflowid];
    }
    /**
     * Get item from embedding cache pool
     * @param {string} chatflowid
     */
    getEmbeddingCache(chatflowid) {
        return this.activeEmbeddingCache[chatflowid];
    }
}
exports.CachePool = CachePool;
let cachePoolInstance;
function getInstance() {
    if (cachePoolInstance === undefined) {
        cachePoolInstance = new CachePool();
    }
    return cachePoolInstance;
}
exports.getInstance = getInstance;
//# sourceMappingURL=CachePool.js.map