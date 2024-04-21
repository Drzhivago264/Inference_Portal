"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const documents_1 = require("@langchain/core/documents");
const astradb_1 = require("@langchain/community/vectorstores/astradb");
const utils_1 = require("../../../src/utils");
const VectorStoreUtils_1 = require("../VectorStoreUtils");
class Astra_VectorStores {
    constructor() {
        //@ts-ignore
        this.vectorStoreMethods = {
            async upsert(nodeData, options) {
                const docs = nodeData.inputs?.document;
                const embeddings = nodeData.inputs?.embeddings;
                const vectorDimension = nodeData.inputs?.vectorDimension;
                const astraNamespace = nodeData.inputs?.astraNamespace;
                const astraCollection = nodeData.inputs?.astraCollection;
                const similarityMetric = nodeData.inputs?.similarityMetric;
                const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
                const expectedSimilarityMetric = ['cosine', 'euclidean', 'dot_product'];
                if (similarityMetric && !expectedSimilarityMetric.includes(similarityMetric)) {
                    throw new Error(`Invalid Similarity Metric should be one of 'cosine' | 'euclidean' | 'dot_product'`);
                }
                const clientConfig = {
                    token: credentialData?.applicationToken,
                    endpoint: credentialData?.dbEndPoint
                };
                const astraConfig = {
                    ...clientConfig,
                    namespace: astraNamespace ?? 'default_keyspace',
                    collection: astraCollection ?? credentialData.collectionName ?? 'flowise_test',
                    collectionOptions: {
                        vector: {
                            dimension: vectorDimension ?? 1536,
                            metric: similarityMetric ?? 'cosine'
                        }
                    }
                };
                const flattenDocs = docs && docs.length ? (0, lodash_1.flatten)(docs) : [];
                const finalDocs = [];
                for (let i = 0; i < flattenDocs.length; i += 1) {
                    if (flattenDocs[i] && flattenDocs[i].pageContent) {
                        finalDocs.push(new documents_1.Document(flattenDocs[i]));
                    }
                }
                try {
                    await astradb_1.AstraDBVectorStore.fromDocuments(finalDocs, embeddings, astraConfig);
                    return { numAdded: finalDocs.length, addedDocs: finalDocs };
                }
                catch (e) {
                    throw new Error(e);
                }
            }
        };
        this.label = 'Astra';
        this.name = 'Astra';
        this.version = 2.0;
        this.type = 'Astra';
        this.icon = 'astra.svg';
        this.category = 'Vector Stores';
        this.description = `Upsert embedded data and perform similarity or mmr search upon query using DataStax Astra DB, a serverless vector database that’s perfect for managing mission-critical AI workloads`;
        this.baseClasses = [this.type, 'VectorStoreRetriever', 'BaseRetriever'];
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['AstraDBApi']
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
                label: 'Namespace',
                name: 'astraNamespace',
                type: 'string'
            },
            {
                label: 'Collection',
                name: 'astraCollection',
                type: 'string'
            },
            {
                label: 'Vector Dimension',
                name: 'vectorDimension',
                type: 'number',
                placeholder: '1536',
                optional: true,
                description: 'Dimension used for storing vector embedding'
            },
            {
                label: 'Similarity Metric',
                name: 'similarityMetric',
                type: 'string',
                placeholder: 'cosine',
                optional: true,
                description: 'cosine | euclidean | dot_product'
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
        (0, VectorStoreUtils_1.addMMRInputParams)(this.inputs);
        this.outputs = [
            {
                label: 'Astra Retriever',
                name: 'retriever',
                baseClasses: this.baseClasses
            },
            {
                label: 'Astra Vector Store',
                name: 'vectorStore',
                baseClasses: [this.type, ...(0, utils_1.getBaseClasses)(astradb_1.AstraDBVectorStore)]
            }
        ];
    }
    async init(nodeData, _, options) {
        const embeddings = nodeData.inputs?.embeddings;
        const vectorDimension = nodeData.inputs?.vectorDimension;
        const similarityMetric = nodeData.inputs?.similarityMetric;
        const astraNamespace = nodeData.inputs?.astraNamespace;
        const astraCollection = nodeData.inputs?.astraCollection;
        const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
        const expectedSimilarityMetric = ['cosine', 'euclidean', 'dot_product'];
        if (similarityMetric && !expectedSimilarityMetric.includes(similarityMetric)) {
            throw new Error(`Invalid Similarity Metric should be one of 'cosine' | 'euclidean' | 'dot_product'`);
        }
        const clientConfig = {
            token: credentialData?.applicationToken,
            endpoint: credentialData?.dbEndPoint
        };
        const astraConfig = {
            ...clientConfig,
            namespace: astraNamespace ?? 'default_keyspace',
            collection: astraCollection ?? credentialData.collectionName ?? 'flowise_test',
            collectionOptions: {
                vector: {
                    dimension: vectorDimension ?? 1536,
                    metric: similarityMetric ?? 'cosine'
                }
            }
        };
        const vectorStore = await astradb_1.AstraDBVectorStore.fromExistingIndex(embeddings, astraConfig);
        return (0, VectorStoreUtils_1.resolveVectorStoreOrRetriever)(nodeData, vectorStore);
    }
}
module.exports = { nodeClass: Astra_VectorStores };
//# sourceMappingURL=Astra.js.map