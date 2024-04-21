import { IActiveCache } from './Interface';
/**
 * This pool is to keep track of in-memory cache used for LLM and Embeddings
 */
export declare class CachePool {
    activeLLMCache: IActiveCache;
    activeEmbeddingCache: IActiveCache;
    /**
     * Add to the llm cache pool
     * @param {string} chatflowid
     * @param {Map<any, any>} value
     */
    addLLMCache(chatflowid: string, value: Map<any, any>): void;
    /**
     * Add to the embedding cache pool
     * @param {string} chatflowid
     * @param {Map<any, any>} value
     */
    addEmbeddingCache(chatflowid: string, value: Map<any, any>): void;
    /**
     * Get item from llm cache pool
     * @param {string} chatflowid
     */
    getLLMCache(chatflowid: string): Map<any, any> | undefined;
    /**
     * Get item from embedding cache pool
     * @param {string} chatflowid
     */
    getEmbeddingCache(chatflowid: string): Map<any, any> | undefined;
}
export declare function getInstance(): CachePool;
