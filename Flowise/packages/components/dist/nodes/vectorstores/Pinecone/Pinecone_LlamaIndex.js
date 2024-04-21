"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const llamaindex_1 = require("llamaindex");
const pinecone_1 = require("@pinecone-database/pinecone");
const lodash_1 = require("lodash");
const document_1 = require("langchain/document");
const utils_1 = require("../../../src/utils");
class PineconeLlamaIndex_VectorStores {
    constructor() {
        //@ts-ignore
        this.vectorStoreMethods = {
            async upsert(nodeData, options) {
                const indexName = nodeData.inputs?.pineconeIndex;
                const pineconeNamespace = nodeData.inputs?.pineconeNamespace;
                const docs = nodeData.inputs?.document;
                const embeddings = nodeData.inputs?.embeddings;
                const model = nodeData.inputs?.model;
                const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
                const pineconeApiKey = (0, utils_1.getCredentialParam)('pineconeApiKey', credentialData, nodeData);
                const pcvs = new PineconeVectorStore({
                    indexName,
                    apiKey: pineconeApiKey,
                    namespace: pineconeNamespace
                });
                const flattenDocs = docs && docs.length ? (0, lodash_1.flatten)(docs) : [];
                const finalDocs = [];
                for (let i = 0; i < flattenDocs.length; i += 1) {
                    if (flattenDocs[i] && flattenDocs[i].pageContent) {
                        finalDocs.push(new document_1.Document(flattenDocs[i]));
                    }
                }
                const llamadocs = [];
                for (const doc of finalDocs) {
                    llamadocs.push(new llamaindex_1.Document({ text: doc.pageContent, metadata: doc.metadata }));
                }
                const serviceContext = (0, llamaindex_1.serviceContextFromDefaults)({ llm: model, embedModel: embeddings });
                const storageContext = await (0, llamaindex_1.storageContextFromDefaults)({ vectorStore: pcvs });
                try {
                    await llamaindex_1.VectorStoreIndex.fromDocuments(llamadocs, { serviceContext, storageContext });
                    return { numAdded: finalDocs.length, addedDocs: finalDocs };
                }
                catch (e) {
                    throw new Error(e);
                }
            }
        };
        this.label = 'Pinecone';
        this.name = 'pineconeLlamaIndex';
        this.version = 1.0;
        this.type = 'Pinecone';
        this.icon = 'pinecone.svg';
        this.category = 'Vector Stores';
        this.description = `Upsert embedded data and perform similarity search upon query using Pinecone, a leading fully managed hosted vector database`;
        this.baseClasses = [this.type, 'VectorIndexRetriever'];
        this.tags = ['LlamaIndex'];
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['pineconeApi']
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
                label: 'Chat Model',
                name: 'model',
                type: 'BaseChatModel_LlamaIndex'
            },
            {
                label: 'Embeddings',
                name: 'embeddings',
                type: 'BaseEmbedding_LlamaIndex'
            },
            {
                label: 'Pinecone Index',
                name: 'pineconeIndex',
                type: 'string'
            },
            {
                label: 'Pinecone Namespace',
                name: 'pineconeNamespace',
                type: 'string',
                placeholder: 'my-first-namespace',
                additionalParams: true,
                optional: true
            },
            {
                label: 'Pinecone Metadata Filter',
                name: 'pineconeMetadataFilter',
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
        this.outputs = [
            {
                label: 'Pinecone Retriever',
                name: 'retriever',
                baseClasses: this.baseClasses
            },
            {
                label: 'Pinecone Vector Store Index',
                name: 'vectorStore',
                baseClasses: [this.type, 'VectorStoreIndex']
            }
        ];
    }
    async init(nodeData, _, options) {
        const indexName = nodeData.inputs?.pineconeIndex;
        const pineconeNamespace = nodeData.inputs?.pineconeNamespace;
        const pineconeMetadataFilter = nodeData.inputs?.pineconeMetadataFilter;
        const embeddings = nodeData.inputs?.embeddings;
        const model = nodeData.inputs?.model;
        const topK = nodeData.inputs?.topK;
        const k = topK ? parseFloat(topK) : 4;
        const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
        const pineconeApiKey = (0, utils_1.getCredentialParam)('pineconeApiKey', credentialData, nodeData);
        const obj = {
            indexName,
            apiKey: pineconeApiKey
        };
        if (pineconeNamespace)
            obj.namespace = pineconeNamespace;
        let metadatafilter = {};
        if (pineconeMetadataFilter) {
            metadatafilter = typeof pineconeMetadataFilter === 'object' ? pineconeMetadataFilter : JSON.parse(pineconeMetadataFilter);
            obj.queryFilter = metadatafilter;
        }
        const pcvs = new PineconeVectorStore(obj);
        const serviceContext = (0, llamaindex_1.serviceContextFromDefaults)({ llm: model, embedModel: embeddings });
        const storageContext = await (0, llamaindex_1.storageContextFromDefaults)({ vectorStore: pcvs });
        const index = await llamaindex_1.VectorStoreIndex.init({
            nodes: [],
            storageContext,
            serviceContext
        });
        const output = nodeData.outputs?.output;
        if (output === 'retriever') {
            const retriever = index.asRetriever();
            retriever.similarityTopK = k;
            retriever.serviceContext = serviceContext;
            return retriever;
        }
        else if (output === 'vectorStore') {
            ;
            index.k = k;
            if (metadatafilter) {
                ;
                index.metadatafilter = metadatafilter;
            }
            return index;
        }
        return index;
    }
}
class PineconeVectorStore {
    constructor(params) {
        this.storesText = true;
        this.indexName = params?.indexName;
        this.apiKey = params?.apiKey;
        this.namespace = params?.namespace ?? '';
        this.chunkSize = params?.chunkSize ?? Number.parseInt(process.env.PINECONE_CHUNK_SIZE ?? '100');
        this.queryFilter = params?.queryFilter ?? {};
    }
    async getDb() {
        if (!this.db) {
            this.db = new pinecone_1.Pinecone({
                apiKey: this.apiKey
            });
        }
        return Promise.resolve(this.db);
    }
    client() {
        return this.getDb();
    }
    async index() {
        const db = await this.getDb();
        return db.Index(this.indexName);
    }
    async clearIndex() {
        const db = await this.getDb();
        return await db.index(this.indexName).deleteAll();
    }
    async add(embeddingResults) {
        if (embeddingResults.length == 0) {
            return Promise.resolve([]);
        }
        const idx = await this.index();
        const nodes = embeddingResults.map(this.nodeToRecord);
        for (let i = 0; i < nodes.length; i += this.chunkSize) {
            const chunk = nodes.slice(i, i + this.chunkSize);
            const result = await this.saveChunk(idx, chunk);
            if (!result) {
                return Promise.reject();
            }
        }
        return Promise.resolve([]);
    }
    async saveChunk(idx, chunk) {
        try {
            const namespace = idx.namespace(this.namespace ?? '');
            await namespace.upsert(chunk);
            return true;
        }
        catch (err) {
            return false;
        }
    }
    async delete(refDocId) {
        const idx = await this.index();
        const namespace = idx.namespace(this.namespace ?? '');
        return namespace.deleteOne(refDocId);
    }
    async query(query) {
        const queryOptions = {
            vector: query.queryEmbedding,
            topK: query.similarityTopK,
            filter: this.queryFilter
        };
        const idx = await this.index();
        const namespace = idx.namespace(this.namespace ?? '');
        const results = await namespace.query(queryOptions);
        const idList = results.matches.map((row) => row.id);
        const records = await namespace.fetch(idList);
        const rows = Object.values(records.records);
        const nodes = rows.map((row) => {
            return new llamaindex_1.Document({
                id_: row.id,
                text: this.textFromResultRow(row),
                metadata: this.metaWithoutText(row.metadata),
                embedding: row.values
            });
        });
        const result = {
            nodes: nodes,
            similarities: results.matches.map((row) => row.score || 999),
            ids: results.matches.map((row) => row.id)
        };
        return Promise.resolve(result);
    }
    /**
     * Required by VectorStore interface. Currently ignored.
     */
    persist() {
        return Promise.resolve();
    }
    textFromResultRow(row) {
        return row.metadata?.text ?? '';
    }
    metaWithoutText(meta) {
        return Object.keys(meta)
            .filter((key) => key != 'text')
            .reduce((acc, key) => {
            acc[key] = meta[key];
            return acc;
        }, {});
    }
    nodeToRecord(node) {
        let id = node.id_.length ? node.id_ : null;
        return {
            id: id,
            values: node.getEmbedding(),
            metadata: {
                ...cleanupMetadata(node.metadata),
                text: node.text
            }
        };
    }
}
const cleanupMetadata = (nodeMetadata) => {
    // Pinecone doesn't support nested objects, so we flatten them
    const documentMetadata = { ...nodeMetadata };
    // preserve string arrays which are allowed
    const stringArrays = {};
    for (const key of Object.keys(documentMetadata)) {
        if (Array.isArray(documentMetadata[key]) && documentMetadata[key].every((el) => typeof el === 'string')) {
            stringArrays[key] = documentMetadata[key];
            delete documentMetadata[key];
        }
    }
    const metadata = {
        ...(0, utils_1.flattenObject)(documentMetadata),
        ...stringArrays
    };
    // Pinecone doesn't support null values, so we remove them
    for (const key of Object.keys(metadata)) {
        if (metadata[key] == null) {
            delete metadata[key];
        }
        else if (typeof metadata[key] === 'object' && Object.keys(metadata[key]).length === 0) {
            delete metadata[key];
        }
    }
    return metadata;
};
module.exports = { nodeClass: PineconeLlamaIndex_VectorStores };
//# sourceMappingURL=Pinecone_LlamaIndex.js.map