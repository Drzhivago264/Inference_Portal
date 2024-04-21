"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const zep_cloud_1 = require("@getzep/zep-cloud");
const langchain_1 = require("@getzep/zep-cloud/langchain");
const document_1 = require("langchain/document");
const utils_1 = require("../../../src/utils");
const VectorStoreUtils_1 = require("../VectorStoreUtils");
const fake_1 = require("langchain/embeddings/fake");
class Zep_CloudVectorStores {
    constructor() {
        //@ts-ignore
        this.vectorStoreMethods = {
            async upsert(nodeData, options) {
                const zepCollection = nodeData.inputs?.zepCollection;
                const docs = nodeData.inputs?.document;
                const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
                const apiKey = (0, utils_1.getCredentialParam)('apiKey', credentialData, nodeData);
                const flattenDocs = docs && docs.length ? (0, lodash_1.flatten)(docs) : [];
                const finalDocs = [];
                for (let i = 0; i < flattenDocs.length; i += 1) {
                    if (flattenDocs[i] && flattenDocs[i].pageContent) {
                        finalDocs.push(new document_1.Document(flattenDocs[i]));
                    }
                }
                const client = await zep_cloud_1.ZepClient.init(apiKey);
                const zepConfig = {
                    apiKey: apiKey,
                    collectionName: zepCollection,
                    client
                };
                try {
                    await langchain_1.ZepVectorStore.fromDocuments(finalDocs, new fake_1.FakeEmbeddings(), zepConfig);
                    return { numAdded: finalDocs.length, addedDocs: finalDocs };
                }
                catch (e) {
                    throw new Error(e);
                }
            }
        };
        this.label = 'Zep Collection - Cloud';
        this.name = 'zepCloud';
        this.version = 2.0;
        this.type = 'Zep';
        this.icon = 'zep.svg';
        this.category = 'Vector Stores';
        this.description =
            'Upsert embedded data and perform similarity or mmr search upon query using Zep, a fast and scalable building block for LLM apps';
        this.baseClasses = [this.type, 'VectorStoreRetriever', 'BaseRetriever'];
        this.badge = 'NEW';
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            optional: false,
            description: 'Configure JWT authentication on your Zep instance (Optional)',
            credentialNames: ['zepMemoryApi']
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
                label: 'Zep Collection',
                name: 'zepCollection',
                type: 'string',
                placeholder: 'my-first-collection'
            },
            {
                label: 'Zep Metadata Filter',
                name: 'zepMetadataFilter',
                type: 'json',
                optional: true,
                additionalParams: true
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
                label: 'Zep Retriever',
                name: 'retriever',
                baseClasses: this.baseClasses
            },
            {
                label: 'Zep Vector Store',
                name: 'vectorStore',
                baseClasses: [this.type, ...(0, utils_1.getBaseClasses)(langchain_1.ZepVectorStore)]
            }
        ];
    }
    async init(nodeData, _, options) {
        const zepCollection = nodeData.inputs?.zepCollection;
        const zepMetadataFilter = nodeData.inputs?.zepMetadataFilter;
        const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
        const apiKey = (0, utils_1.getCredentialParam)('apiKey', credentialData, nodeData);
        const zepConfig = {
            apiKey,
            collectionName: zepCollection
        };
        if (zepMetadataFilter) {
            zepConfig.filter = typeof zepMetadataFilter === 'object' ? zepMetadataFilter : JSON.parse(zepMetadataFilter);
        }
        zepConfig.client = await zep_cloud_1.ZepClient.init(zepConfig.apiKey);
        const vectorStore = await ZepExistingVS.init(zepConfig);
        return (0, VectorStoreUtils_1.resolveVectorStoreOrRetriever)(nodeData, vectorStore);
    }
}
function zepDocsToDocumentsAndScore(results) {
    return results.map((d) => [
        new document_1.Document({
            pageContent: d.content,
            metadata: d.metadata
        }),
        d.score ? d.score : 0
    ]);
}
function assignMetadata(value) {
    if (typeof value === 'object' && value !== null) {
        return value;
    }
    if (value !== undefined) {
        console.warn('Metadata filters must be an object, Record, or undefined.');
    }
    return undefined;
}
class ZepExistingVS extends langchain_1.ZepVectorStore {
    constructor(embeddings, args) {
        super(embeddings, args);
        this.filter = args.filter;
        this.args = args;
    }
    async initializeCollection(args) {
        this.client = await zep_cloud_1.ZepClient.init(args.apiKey, args.apiUrl);
        try {
            this.collection = await this.client.document.getCollection(args.collectionName);
        }
        catch (err) {
            if (err instanceof Error) {
                if (err.name === 'NotFoundError') {
                    await this.createNewCollection(args);
                }
                else {
                    throw err;
                }
            }
        }
    }
    async createNewCollection(args) {
        this.collection = await this.client.document.addCollection({
            name: args.collectionName,
            description: args.description,
            metadata: args.metadata
        });
    }
    async similaritySearchVectorWithScore(query, k, filter) {
        if (filter && this.filter) {
            throw new Error('cannot provide both `filter` and `this.filter`');
        }
        const _filters = filter ?? this.filter;
        const ANDFilters = [];
        for (const filterKey in _filters) {
            let filterVal = _filters[filterKey];
            if (typeof filterVal === 'string')
                filterVal = `"${filterVal}"`;
            ANDFilters.push({ jsonpath: `$[*] ? (@.${filterKey} == ${filterVal})` });
        }
        const newfilter = {
            where: { and: ANDFilters }
        };
        await this.initializeCollection(this.args).catch((err) => {
            console.error('Error initializing collection:', err);
            throw err;
        });
        const results = await this.collection.search({
            embedding: new Float32Array(query),
            metadata: assignMetadata(newfilter)
        }, k);
        return zepDocsToDocumentsAndScore(results);
    }
    static async fromExistingIndex(embeddings, dbConfig) {
        return new this(embeddings, dbConfig);
    }
}
module.exports = { nodeClass: Zep_CloudVectorStores };
//# sourceMappingURL=ZepCloud.js.map