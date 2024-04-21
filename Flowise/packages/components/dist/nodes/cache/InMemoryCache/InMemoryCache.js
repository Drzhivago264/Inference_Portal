"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const caches_1 = require("@langchain/core/caches");
const object_hash_1 = __importDefault(require("object-hash"));
const src_1 = require("../../../src");
class InMemoryCache {
    constructor() {
        this.label = 'InMemory Cache';
        this.name = 'inMemoryCache';
        this.version = 1.0;
        this.type = 'InMemoryCache';
        this.description = 'Cache LLM response in memory, will be cleared once app restarted';
        this.icon = 'Memory.svg';
        this.category = 'Cache';
        this.baseClasses = [this.type, ...(0, src_1.getBaseClasses)(InMemoryCacheExtended)];
        this.inputs = [];
    }
    async init(nodeData, _, options) {
        const memoryMap = options.cachePool.getLLMCache(options.chatflowid) ?? new Map();
        const inMemCache = new InMemoryCacheExtended(memoryMap);
        inMemCache.lookup = async (prompt, llmKey) => {
            const memory = options.cachePool.getLLMCache(options.chatflowid) ?? inMemCache.cache;
            return Promise.resolve(memory.get(getCacheKey(prompt, llmKey)) ?? null);
        };
        inMemCache.update = async (prompt, llmKey, value) => {
            inMemCache.cache.set(getCacheKey(prompt, llmKey), value);
            options.cachePool.addLLMCache(options.chatflowid, inMemCache.cache);
        };
        return inMemCache;
    }
}
const getCacheKey = (...strings) => (0, object_hash_1.default)(strings.join('_'));
class InMemoryCacheExtended extends caches_1.BaseCache {
    constructor(map) {
        super();
        this.cache = map;
    }
    lookup(prompt, llmKey) {
        return Promise.resolve(this.cache.get(getCacheKey(prompt, llmKey)) ?? null);
    }
    async update(prompt, llmKey, value) {
        this.cache.set(getCacheKey(prompt, llmKey), value);
    }
}
module.exports = { nodeClass: InMemoryCache };
//# sourceMappingURL=InMemoryCache.js.map