"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const redis_1 = require("redis");
const redis_2 = require("@langchain/community/vectorstores/redis");
const documents_1 = require("@langchain/core/documents");
const utils_1 = require("../../../src/utils");
const utils_2 = require("./utils");
let redisClientSingleton;
let redisClientOption;
const getRedisClient = async (option) => {
    if (!redisClientSingleton) {
        // if client doesn't exists
        redisClientSingleton = (0, redis_1.createClient)(option);
        await redisClientSingleton.connect();
        redisClientOption = option;
        return redisClientSingleton;
    }
    else if (redisClientSingleton && !(0, lodash_1.isEqual)(option, redisClientOption)) {
        // if client exists but option changed
        redisClientSingleton.quit();
        redisClientSingleton = (0, redis_1.createClient)(option);
        await redisClientSingleton.connect();
        redisClientOption = option;
        return redisClientSingleton;
    }
    return redisClientSingleton;
};
class Redis_VectorStores {
    constructor() {
        //@ts-ignore
        this.vectorStoreMethods = {
            async upsert(nodeData, options) {
                const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
                const indexName = nodeData.inputs?.indexName;
                let contentKey = nodeData.inputs?.contentKey;
                let metadataKey = nodeData.inputs?.metadataKey;
                let vectorKey = nodeData.inputs?.vectorKey;
                const embeddings = nodeData.inputs?.embeddings;
                const replaceIndex = nodeData.inputs?.replaceIndex;
                let redisUrl = (0, utils_1.getCredentialParam)('redisUrl', credentialData, nodeData);
                if (!redisUrl || redisUrl === '') {
                    const username = (0, utils_1.getCredentialParam)('redisCacheUser', credentialData, nodeData);
                    const password = (0, utils_1.getCredentialParam)('redisCachePwd', credentialData, nodeData);
                    const portStr = (0, utils_1.getCredentialParam)('redisCachePort', credentialData, nodeData);
                    const host = (0, utils_1.getCredentialParam)('redisCacheHost', credentialData, nodeData);
                    redisUrl = 'redis://' + username + ':' + password + '@' + host + ':' + portStr;
                }
                const docs = nodeData.inputs?.document;
                const flattenDocs = docs && docs.length ? (0, lodash_1.flatten)(docs) : [];
                const finalDocs = [];
                for (let i = 0; i < flattenDocs.length; i += 1) {
                    if (flattenDocs[i] && flattenDocs[i].pageContent) {
                        const document = new documents_1.Document(flattenDocs[i]);
                        (0, utils_2.escapeAllStrings)(document.metadata);
                        finalDocs.push(document);
                    }
                }
                try {
                    const redisClient = await getRedisClient({ url: redisUrl });
                    const storeConfig = {
                        redisClient: redisClient,
                        indexName: indexName
                    };
                    const isIndexExists = await checkIndexExists(redisClient, indexName);
                    if (replaceIndex && isIndexExists) {
                        let response = await redisClient.ft.dropIndex(indexName);
                        if (process.env.DEBUG === 'true') {
                            // eslint-disable-next-line no-console
                            console.log(`Redis Vector Store :: Dropping index [${indexName}], Received Response [${response}]`);
                        }
                    }
                    const vectorStore = await redis_2.RedisVectorStore.fromDocuments(finalDocs, embeddings, storeConfig);
                    if (!contentKey || contentKey === '')
                        contentKey = 'content';
                    if (!metadataKey || metadataKey === '')
                        metadataKey = 'metadata';
                    if (!vectorKey || vectorKey === '')
                        vectorKey = 'content_vector';
                    // Avoid Illegal invocation error
                    vectorStore.similaritySearchVectorWithScore = async (query, k, filter) => {
                        return await similaritySearchVectorWithScore(query, k, indexName, metadataKey, vectorKey, contentKey, redisClient, filter);
                    };
                    return { numAdded: finalDocs.length, addedDocs: finalDocs };
                }
                catch (e) {
                    throw new Error(e);
                }
            }
        };
        this.label = 'Redis';
        this.name = 'redis';
        this.version = 1.0;
        this.description =
            'Upsert embedded data and perform similarity search upon query using Redis, an open source, in-memory data structure store';
        this.type = 'Redis';
        this.icon = 'redis.svg';
        this.category = 'Vector Stores';
        this.baseClasses = [this.type, 'VectorStoreRetriever', 'BaseRetriever'];
        this.badge = 'NEW';
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['redisCacheUrlApi', 'redisCacheApi']
        };
        this.inputs = [
            {
                label: 'Document',
                name: 'document',
                type: 'Document',
                list: true,
                optional: true
            },
            {
                label: 'Embeddings',
                name: 'embeddings',
                type: 'Embeddings'
            },
            {
                label: 'Index Name',
                name: 'indexName',
                placeholder: '<VECTOR_INDEX_NAME>',
                type: 'string'
            },
            {
                label: 'Replace Index on Upsert',
                name: 'replaceIndex',
                description: 'Selecting this option will delete the existing index and recreate a new one when upserting',
                default: false,
                type: 'boolean'
            },
            {
                label: 'Content Field',
                name: 'contentKey',
                description: 'Name of the field (column) that contains the actual content',
                type: 'string',
                default: 'content',
                additionalParams: true,
                optional: true
            },
            {
                label: 'Metadata Field',
                name: 'metadataKey',
                description: 'Name of the field (column) that contains the metadata of the document',
                type: 'string',
                default: 'metadata',
                additionalParams: true,
                optional: true
            },
            {
                label: 'Vector Field',
                name: 'vectorKey',
                description: 'Name of the field (column) that contains the vector',
                type: 'string',
                default: 'content_vector',
                additionalParams: true,
                optional: true
            },
            {
                label: 'Top K',
                name: 'topK',
                description: 'Number of top results to fetch. Default to 4',
                placeholder: '4',
                type: 'number',
                additionalParams: true,
                optional: true
            }
        ];
        this.outputs = [
            {
                label: 'Redis Retriever',
                name: 'retriever',
                baseClasses: this.baseClasses
            },
            {
                label: 'Redis Vector Store',
                name: 'vectorStore',
                baseClasses: [this.type, ...(0, utils_1.getBaseClasses)(redis_2.RedisVectorStore)]
            }
        ];
    }
    async init(nodeData, _, options) {
        const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
        const indexName = nodeData.inputs?.indexName;
        let contentKey = nodeData.inputs?.contentKey;
        let metadataKey = nodeData.inputs?.metadataKey;
        let vectorKey = nodeData.inputs?.vectorKey;
        const embeddings = nodeData.inputs?.embeddings;
        const topK = nodeData.inputs?.topK;
        const k = topK ? parseFloat(topK) : 4;
        const output = nodeData.outputs?.output;
        let redisUrl = (0, utils_1.getCredentialParam)('redisUrl', credentialData, nodeData);
        if (!redisUrl || redisUrl === '') {
            const username = (0, utils_1.getCredentialParam)('redisCacheUser', credentialData, nodeData);
            const password = (0, utils_1.getCredentialParam)('redisCachePwd', credentialData, nodeData);
            const portStr = (0, utils_1.getCredentialParam)('redisCachePort', credentialData, nodeData);
            const host = (0, utils_1.getCredentialParam)('redisCacheHost', credentialData, nodeData);
            redisUrl = 'redis://' + username + ':' + password + '@' + host + ':' + portStr;
        }
        const redisClient = await getRedisClient({ url: redisUrl });
        const storeConfig = {
            redisClient: redisClient,
            indexName: indexName
        };
        const vectorStore = new redis_2.RedisVectorStore(embeddings, storeConfig);
        if (!contentKey || contentKey === '')
            contentKey = 'content';
        if (!metadataKey || metadataKey === '')
            metadataKey = 'metadata';
        if (!vectorKey || vectorKey === '')
            vectorKey = 'content_vector';
        // Avoid Illegal invocation error
        vectorStore.similaritySearchVectorWithScore = async (query, k, filter) => {
            return await similaritySearchVectorWithScore(query, k, indexName, metadataKey, vectorKey, contentKey, redisClient, filter);
        };
        if (output === 'retriever') {
            return vectorStore.asRetriever(k);
        }
        else if (output === 'vectorStore') {
            ;
            vectorStore.k = k;
            return vectorStore;
        }
        return vectorStore;
    }
}
const checkIndexExists = async (redisClient, indexName) => {
    try {
        await redisClient.ft.info(indexName);
    }
    catch (err) {
        if (err?.message.includes('unknown command')) {
            throw new Error('Failed to run FT.INFO command. Please ensure that you are running a RediSearch-capable Redis instance: https://js.langchain.com/docs/modules/data_connection/vectorstores/integrations/redis#setup');
        }
        // index doesn't exist
        return false;
    }
    return true;
};
const buildQuery = (query, k, metadataKey, vectorKey, contentKey, filter) => {
    const vectorScoreField = 'vector_score';
    let hybridFields = '*';
    // if a filter is set, modify the hybrid query
    if (filter && filter.length) {
        // `filter` is a list of strings, then it's applied using the OR operator in the metadata key
        hybridFields = `@${metadataKey}:(${filter.map(utils_2.escapeSpecialChars).join('|')})`;
    }
    const baseQuery = `${hybridFields} => [KNN ${k} @${vectorKey} $vector AS ${vectorScoreField}]`;
    const returnFields = [metadataKey, contentKey, vectorScoreField];
    const options = {
        PARAMS: {
            vector: Buffer.from(new Float32Array(query).buffer)
        },
        RETURN: returnFields,
        SORTBY: vectorScoreField,
        DIALECT: 2,
        LIMIT: {
            from: 0,
            size: k
        }
    };
    return [baseQuery, options];
};
const similaritySearchVectorWithScore = async (query, k, indexName, metadataKey, vectorKey, contentKey, redisClient, filter) => {
    const results = await redisClient.ft.search(indexName, ...buildQuery(query, k, metadataKey, vectorKey, contentKey, filter));
    const result = [];
    if (results.total) {
        for (const res of results.documents) {
            if (res.value) {
                const document = res.value;
                if (document.vector_score) {
                    const metadataString = (0, utils_2.unEscapeSpecialChars)(document[metadataKey]);
                    result.push([
                        new documents_1.Document({
                            pageContent: document[contentKey],
                            metadata: JSON.parse(metadataString)
                        }),
                        Number(document.vector_score)
                    ]);
                }
            }
        }
    }
    return result;
};
module.exports = { nodeClass: Redis_VectorStores };
//# sourceMappingURL=Redis.js.map