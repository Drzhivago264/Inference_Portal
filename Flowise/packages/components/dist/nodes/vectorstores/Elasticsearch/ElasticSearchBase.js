"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElasticSearchBase = void 0;
const src_1 = require("../../../src");
const elasticsearch_1 = require("@elastic/elasticsearch");
const elasticsearch_2 = require("@langchain/community/vectorstores/elasticsearch");
class ElasticSearchBase {
    constructor() {
        this.type = 'Elasticsearch';
        this.icon = 'elasticsearch.png';
        this.category = 'Vector Stores';
        this.badge = 'DEPRECATING';
        this.baseClasses = [this.type, 'VectorStoreRetriever', 'BaseRetriever'];
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['elasticsearchApi', 'elasticSearchUserPassword']
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
                placeholder: '<INDEX_NAME>',
                type: 'string'
            },
            {
                label: 'Top K',
                name: 'topK',
                description: 'Number of top results to fetch. Default to 4',
                placeholder: '4',
                type: 'number',
                additionalParams: true,
                optional: true
            },
            {
                label: 'Similarity',
                name: 'similarity',
                description: 'Similarity measure used in Elasticsearch.',
                type: 'options',
                default: 'l2_norm',
                options: [
                    {
                        label: 'l2_norm',
                        name: 'l2_norm'
                    },
                    {
                        label: 'dot_product',
                        name: 'dot_product'
                    },
                    {
                        label: 'cosine',
                        name: 'cosine'
                    }
                ],
                additionalParams: true,
                optional: true
            }
        ];
        this.outputs = [
            {
                label: 'Elasticsearch Retriever',
                name: 'retriever',
                baseClasses: this.baseClasses
            },
            {
                label: 'Elasticsearch Vector Store',
                name: 'vectorStore',
                baseClasses: [this.type, ...(0, src_1.getBaseClasses)(elasticsearch_2.ElasticVectorSearch)]
            }
        ];
    }
    async init(nodeData, _, options, docs) {
        const credentialData = await (0, src_1.getCredentialData)(nodeData.credential ?? '', options);
        const endPoint = (0, src_1.getCredentialParam)('endpoint', credentialData, nodeData);
        const cloudId = (0, src_1.getCredentialParam)('cloudId', credentialData, nodeData);
        const indexName = nodeData.inputs?.indexName;
        const embeddings = nodeData.inputs?.embeddings;
        const topK = nodeData.inputs?.topK;
        const similarityMeasure = nodeData.inputs?.similarityMeasure;
        const k = topK ? parseFloat(topK) : 4;
        const output = nodeData.outputs?.output;
        const elasticSearchClientArgs = this.prepareClientArgs(endPoint, cloudId, credentialData, nodeData, similarityMeasure, indexName);
        const vectorStore = await this.constructVectorStore(embeddings, elasticSearchClientArgs, docs);
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
    prepareConnectionOptions(endPoint, cloudId, credentialData, nodeData) {
        let elasticSearchClientOptions = {};
        if (endPoint) {
            let apiKey = (0, src_1.getCredentialParam)('apiKey', credentialData, nodeData);
            elasticSearchClientOptions = {
                node: endPoint,
                auth: {
                    apiKey: apiKey
                }
            };
        }
        else if (cloudId) {
            let username = (0, src_1.getCredentialParam)('username', credentialData, nodeData);
            let password = (0, src_1.getCredentialParam)('password', credentialData, nodeData);
            if (cloudId.startsWith('http')) {
                elasticSearchClientOptions = {
                    node: cloudId,
                    auth: {
                        username: username,
                        password: password
                    },
                    tls: {
                        rejectUnauthorized: false
                    }
                };
            }
            else {
                elasticSearchClientOptions = {
                    cloud: {
                        id: cloudId
                    },
                    auth: {
                        username: username,
                        password: password
                    }
                };
            }
        }
        return elasticSearchClientOptions;
    }
    prepareClientArgs(endPoint, cloudId, credentialData, nodeData, similarityMeasure, indexName) {
        let elasticSearchClientOptions = this.prepareConnectionOptions(endPoint, cloudId, credentialData, nodeData);
        let vectorSearchOptions = {};
        switch (similarityMeasure) {
            case 'dot_product':
                vectorSearchOptions = {
                    similarity: 'dot_product'
                };
                break;
            case 'cosine':
                vectorSearchOptions = {
                    similarity: 'cosine'
                };
                break;
            default:
                vectorSearchOptions = {
                    similarity: 'l2_norm'
                };
        }
        const elasticSearchClientArgs = {
            client: new elasticsearch_1.Client(elasticSearchClientOptions),
            indexName: indexName,
            vectorSearchOptions: vectorSearchOptions
        };
        return elasticSearchClientArgs;
    }
}
exports.ElasticSearchBase = ElasticSearchBase;
//# sourceMappingURL=ElasticSearchBase.js.map