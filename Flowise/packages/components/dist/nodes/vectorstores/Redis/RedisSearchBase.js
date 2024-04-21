"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisSearchBase = void 0;
const redis_1 = require("redis");
const lodash_1 = require("lodash");
const documents_1 = require("@langchain/core/documents");
const redis_2 = require("@langchain/community/vectorstores/redis");
const utils_1 = require("./utils");
const src_1 = require("../../../src");
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
class RedisSearchBase {
    constructor() {
        this.type = 'Redis';
        this.icon = 'redis.svg';
        this.category = 'Vector Stores';
        this.baseClasses = [this.type, 'VectorStoreRetriever', 'BaseRetriever'];
        this.badge = 'DEPRECATING';
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['redisCacheUrlApi', 'redisCacheApi']
        };
        this.inputs = [
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
                label: 'Replace Index?',
                name: 'replaceIndex',
                description: 'Selecting this option will delete the existing index and recreate a new one',
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
                baseClasses: [this.type, ...(0, src_1.getBaseClasses)(redis_2.RedisVectorStore)]
            }
        ];
    }
    async init(nodeData, _, options, docs) {
        const credentialData = await (0, src_1.getCredentialData)(nodeData.credential ?? '', options);
        const indexName = nodeData.inputs?.indexName;
        let contentKey = nodeData.inputs?.contentKey;
        let metadataKey = nodeData.inputs?.metadataKey;
        let vectorKey = nodeData.inputs?.vectorKey;
        const embeddings = nodeData.inputs?.embeddings;
        const topK = nodeData.inputs?.topK;
        const replaceIndex = nodeData.inputs?.replaceIndex;
        const k = topK ? parseFloat(topK) : 4;
        const output = nodeData.outputs?.output;
        let redisUrl = (0, src_1.getCredentialParam)('redisUrl', credentialData, nodeData);
        if (!redisUrl || redisUrl === '') {
            const username = (0, src_1.getCredentialParam)('redisCacheUser', credentialData, nodeData);
            const password = (0, src_1.getCredentialParam)('redisCachePwd', credentialData, nodeData);
            const portStr = (0, src_1.getCredentialParam)('redisCachePort', credentialData, nodeData);
            const host = (0, src_1.getCredentialParam)('redisCacheHost', credentialData, nodeData);
            redisUrl = 'redis://' + username + ':' + password + '@' + host + ':' + portStr;
        }
        this.redisClient = await getRedisClient({ url: redisUrl });
        const vectorStore = await this.constructVectorStore(embeddings, indexName, replaceIndex, docs);
        if (!contentKey || contentKey === '')
            contentKey = 'content';
        if (!metadataKey || metadataKey === '')
            metadataKey = 'metadata';
        if (!vectorKey || vectorKey === '')
            vectorKey = 'content_vector';
        const buildQuery = (query, k, filter) => {
            const vectorScoreField = 'vector_score';
            let hybridFields = '*';
            // if a filter is set, modify the hybrid query
            if (filter && filter.length) {
                // `filter` is a list of strings, then it's applied using the OR operator in the metadata key
                hybridFields = `@${metadataKey}:(${filter.map(utils_1.escapeSpecialChars).join('|')})`;
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
        vectorStore.similaritySearchVectorWithScore = async (query, k, filter) => {
            const results = await this.redisClient.ft.search(indexName, ...buildQuery(query, k, filter));
            const result = [];
            if (results.total) {
                for (const res of results.documents) {
                    if (res.value) {
                        const document = res.value;
                        if (document.vector_score) {
                            const metadataString = (0, utils_1.unEscapeSpecialChars)(document[metadataKey]);
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
exports.RedisSearchBase = RedisSearchBase;
//# sourceMappingURL=RedisSearchBase.js.map