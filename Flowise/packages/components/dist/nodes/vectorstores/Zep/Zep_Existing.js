"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zep_js_1 = require("@getzep/zep-js");
const zep_1 = require("@langchain/community/vectorstores/zep");
const documents_1 = require("@langchain/core/documents");
const utils_1 = require("../../../src/utils");
class Zep_Existing_VectorStores {
    constructor() {
        this.label = 'Zep Load Existing Index - Open Source';
        this.name = 'zepExistingIndex';
        this.version = 1.0;
        this.type = 'Zep';
        this.icon = 'zep.svg';
        this.category = 'Vector Stores';
        this.description = 'Load existing index from Zep (i.e: Document has been upserted)';
        this.baseClasses = [this.type, 'VectorStoreRetriever', 'BaseRetriever'];
        this.badge = 'DEPRECATING';
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            optional: true,
            description: 'Configure JWT authentication on your Zep instance (Optional)',
            credentialNames: ['zepMemoryApi']
        };
        this.inputs = [
            {
                label: 'Embeddings',
                name: 'embeddings',
                type: 'Embeddings'
            },
            {
                label: 'Base URL',
                name: 'baseURL',
                type: 'string',
                default: 'http://127.0.0.1:8000'
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
                label: 'Embedding Dimension',
                name: 'dimension',
                type: 'number',
                default: 1536,
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
        this.outputs = [
            {
                label: 'Zep Retriever',
                name: 'retriever',
                baseClasses: this.baseClasses
            },
            {
                label: 'Zep Vector Store',
                name: 'vectorStore',
                baseClasses: [this.type, ...(0, utils_1.getBaseClasses)(zep_1.ZepVectorStore)]
            }
        ];
    }
    async init(nodeData, _, options) {
        const baseURL = nodeData.inputs?.baseURL;
        const zepCollection = nodeData.inputs?.zepCollection;
        const zepMetadataFilter = nodeData.inputs?.zepMetadataFilter;
        const dimension = nodeData.inputs?.dimension;
        const embeddings = nodeData.inputs?.embeddings;
        const output = nodeData.outputs?.output;
        const topK = nodeData.inputs?.topK;
        const k = topK ? parseFloat(topK) : 4;
        const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
        const apiKey = (0, utils_1.getCredentialParam)('apiKey', credentialData, nodeData);
        const zepConfig = {
            apiUrl: baseURL,
            collectionName: zepCollection,
            embeddingDimensions: dimension,
            isAutoEmbedded: false
        };
        if (apiKey)
            zepConfig.apiKey = apiKey;
        if (zepMetadataFilter) {
            const metadatafilter = typeof zepMetadataFilter === 'object' ? zepMetadataFilter : JSON.parse(zepMetadataFilter);
            zepConfig.filter = metadatafilter;
        }
        const vectorStore = await ZepExistingVS.fromExistingIndex(embeddings, zepConfig);
        if (output === 'retriever') {
            const retriever = vectorStore.asRetriever(k);
            return retriever;
        }
        else if (output === 'vectorStore') {
            ;
            vectorStore.k = k;
            return vectorStore;
        }
        return vectorStore;
    }
}
function zepDocsToDocumentsAndScore(results) {
    return results.map((d) => [
        new documents_1.Document({
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
class ZepExistingVS extends zep_1.ZepVectorStore {
    constructor(embeddings, args) {
        super(embeddings, args);
        this.filter = args.filter;
        this.args = args;
    }
    async initalizeCollection(args) {
        this.client = await zep_js_1.ZepClient.init(args.apiUrl, args.apiKey);
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
        if (!args.embeddingDimensions) {
            throw new Error(`Collection ${args.collectionName} not found. You can create a new Collection by providing embeddingDimensions.`);
        }
        this.collection = await this.client.document.addCollection({
            name: args.collectionName,
            description: args.description,
            metadata: args.metadata,
            embeddingDimensions: args.embeddingDimensions,
            isAutoEmbedded: false
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
        await this.initalizeCollection(this.args).catch((err) => {
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
        const instance = new this(embeddings, dbConfig);
        return instance;
    }
}
module.exports = { nodeClass: Zep_Existing_VectorStores };
//# sourceMappingURL=Zep_Existing.js.map