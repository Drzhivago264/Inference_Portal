"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const elasticsearch_1 = require("@elastic/elasticsearch");
const documents_1 = require("@langchain/core/documents");
const elasticsearch_2 = require("@langchain/community/vectorstores/elasticsearch");
const utils_1 = require("../../../src/utils");
const indexing_1 = require("../../../src/indexing");
class Elasticsearch_VectorStores {
    constructor() {
        //@ts-ignore
        this.vectorStoreMethods = {
            async upsert(nodeData, options) {
                const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
                const endPoint = (0, utils_1.getCredentialParam)('endpoint', credentialData, nodeData);
                const cloudId = (0, utils_1.getCredentialParam)('cloudId', credentialData, nodeData);
                const indexName = nodeData.inputs?.indexName;
                const embeddings = nodeData.inputs?.embeddings;
                const similarityMeasure = nodeData.inputs?.similarityMeasure;
                const recordManager = nodeData.inputs?.recordManager;
                const docs = nodeData.inputs?.document;
                const flattenDocs = docs && docs.length ? (0, lodash_1.flatten)(docs) : [];
                const finalDocs = [];
                for (let i = 0; i < flattenDocs.length; i += 1) {
                    if (flattenDocs[i] && flattenDocs[i].pageContent) {
                        finalDocs.push(new documents_1.Document(flattenDocs[i]));
                    }
                }
                // The following code is a workaround for a bug (Langchain Issue #1589) in the underlying library.
                // Store does not support object in metadata and fail silently
                finalDocs.forEach((d) => {
                    delete d.metadata.pdf;
                    delete d.metadata.loc;
                });
                // end of workaround
                const elasticSearchClientArgs = prepareClientArgs(endPoint, cloudId, credentialData, nodeData, similarityMeasure, indexName);
                const vectorStore = new elasticsearch_2.ElasticVectorSearch(embeddings, elasticSearchClientArgs);
                try {
                    if (recordManager) {
                        const vectorStore = await elasticsearch_2.ElasticVectorSearch.fromExistingIndex(embeddings, elasticSearchClientArgs);
                        await recordManager.createSchema();
                        const res = await (0, indexing_1.index)({
                            docsSource: finalDocs,
                            recordManager,
                            vectorStore,
                            options: {
                                cleanup: recordManager?.cleanup,
                                sourceIdKey: recordManager?.sourceIdKey ?? 'source',
                                vectorStoreName: indexName
                            }
                        });
                        return res;
                    }
                    else {
                        await vectorStore.addDocuments(finalDocs);
                        return { numAdded: finalDocs.length, addedDocs: finalDocs };
                    }
                }
                catch (e) {
                    throw new Error(e);
                }
            }
        };
        this.label = 'Elasticsearch';
        this.name = 'elasticsearch';
        this.version = 2.0;
        this.description =
            'Upsert embedded data and perform similarity search upon query using Elasticsearch, a distributed search and analytics engine';
        this.type = 'Elasticsearch';
        this.icon = 'elasticsearch.png';
        this.category = 'Vector Stores';
        this.baseClasses = [this.type, 'VectorStoreRetriever', 'BaseRetriever'];
        this.badge = 'NEW';
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['elasticsearchApi', 'elasticSearchUserPassword']
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
                label: 'Record Manager',
                name: 'recordManager',
                type: 'RecordManager',
                description: 'Keep track of the record to prevent duplication',
                optional: true
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
                baseClasses: [this.type, ...(0, utils_1.getBaseClasses)(elasticsearch_2.ElasticVectorSearch)]
            }
        ];
    }
    async init(nodeData, _, options) {
        const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
        const endPoint = (0, utils_1.getCredentialParam)('endpoint', credentialData, nodeData);
        const cloudId = (0, utils_1.getCredentialParam)('cloudId', credentialData, nodeData);
        const indexName = nodeData.inputs?.indexName;
        const embeddings = nodeData.inputs?.embeddings;
        const topK = nodeData.inputs?.topK;
        const similarityMeasure = nodeData.inputs?.similarityMeasure;
        const k = topK ? parseFloat(topK) : 4;
        const output = nodeData.outputs?.output;
        const elasticSearchClientArgs = prepareClientArgs(endPoint, cloudId, credentialData, nodeData, similarityMeasure, indexName);
        const vectorStore = await elasticsearch_2.ElasticVectorSearch.fromExistingIndex(embeddings, elasticSearchClientArgs);
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
const prepareConnectionOptions = (endPoint, cloudId, credentialData, nodeData) => {
    let elasticSearchClientOptions = {};
    if (endPoint) {
        let apiKey = (0, utils_1.getCredentialParam)('apiKey', credentialData, nodeData);
        elasticSearchClientOptions = {
            node: endPoint,
            auth: {
                apiKey: apiKey
            }
        };
    }
    else if (cloudId) {
        let username = (0, utils_1.getCredentialParam)('username', credentialData, nodeData);
        let password = (0, utils_1.getCredentialParam)('password', credentialData, nodeData);
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
};
const prepareClientArgs = (endPoint, cloudId, credentialData, nodeData, similarityMeasure, indexName) => {
    let elasticSearchClientOptions = prepareConnectionOptions(endPoint, cloudId, credentialData, nodeData);
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
};
module.exports = { nodeClass: Elasticsearch_VectorStores };
//# sourceMappingURL=Elasticsearch.js.map