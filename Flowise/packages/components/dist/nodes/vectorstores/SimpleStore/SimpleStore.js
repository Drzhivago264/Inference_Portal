"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const lodash_1 = require("lodash");
const llamaindex_1 = require("llamaindex");
const document_1 = require("langchain/document");
const src_1 = require("../../../src");
class SimpleStoreUpsert_LlamaIndex_VectorStores {
    constructor() {
        //@ts-ignore
        this.vectorStoreMethods = {
            async upsert(nodeData) {
                const basePath = nodeData.inputs?.basePath;
                const docs = nodeData.inputs?.document;
                const embeddings = nodeData.inputs?.embeddings;
                const model = nodeData.inputs?.model;
                let filePath = '';
                if (!basePath)
                    filePath = path_1.default.join((0, src_1.getUserHome)(), '.flowise', 'llamaindex');
                else
                    filePath = basePath;
                const flattenDocs = docs && docs.length ? (0, lodash_1.flatten)(docs) : [];
                const finalDocs = [];
                for (let i = 0; i < flattenDocs.length; i += 1) {
                    finalDocs.push(new document_1.Document(flattenDocs[i]));
                }
                const llamadocs = [];
                for (const doc of finalDocs) {
                    llamadocs.push(new llamaindex_1.Document({ text: doc.pageContent, metadata: doc.metadata }));
                }
                const serviceContext = (0, llamaindex_1.serviceContextFromDefaults)({ llm: model, embedModel: embeddings });
                const storageContext = await (0, llamaindex_1.storageContextFromDefaults)({ persistDir: filePath });
                try {
                    await llamaindex_1.VectorStoreIndex.fromDocuments(llamadocs, { serviceContext, storageContext });
                    return { numAdded: finalDocs.length, addedDocs: finalDocs };
                }
                catch (e) {
                    throw new Error(e);
                }
            }
        };
        this.label = 'SimpleStore';
        this.name = 'simpleStoreLlamaIndex';
        this.version = 1.0;
        this.type = 'SimpleVectorStore';
        this.icon = 'simplevs.svg';
        this.category = 'Vector Stores';
        this.description = 'Upsert embedded data to local path and perform similarity search';
        this.baseClasses = [this.type, 'VectorIndexRetriever'];
        this.tags = ['LlamaIndex'];
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
                label: 'Base Path to store',
                name: 'basePath',
                description: 'Path to store persist embeddings indexes with persistence. If not specified, default to same path where database is stored',
                type: 'string',
                optional: true
            },
            {
                label: 'Top K',
                name: 'topK',
                description: 'Number of top results to fetch. Default to 4',
                placeholder: '4',
                type: 'number',
                optional: true
            }
        ];
        this.outputs = [
            {
                label: 'SimpleStore Retriever',
                name: 'retriever',
                baseClasses: this.baseClasses
            },
            {
                label: 'SimpleStore Vector Store Index',
                name: 'vectorStore',
                baseClasses: [this.type, 'VectorStoreIndex']
            }
        ];
    }
    async init(nodeData) {
        const basePath = nodeData.inputs?.basePath;
        const embeddings = nodeData.inputs?.embeddings;
        const model = nodeData.inputs?.model;
        const topK = nodeData.inputs?.topK;
        const k = topK ? parseFloat(topK) : 4;
        let filePath = '';
        if (!basePath)
            filePath = path_1.default.join((0, src_1.getUserHome)(), '.flowise', 'llamaindex');
        else
            filePath = basePath;
        const serviceContext = (0, llamaindex_1.serviceContextFromDefaults)({ llm: model, embedModel: embeddings });
        const storageContext = await (0, llamaindex_1.storageContextFromDefaults)({ persistDir: filePath });
        const index = await llamaindex_1.VectorStoreIndex.init({ storageContext, serviceContext });
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
            return index;
        }
        return index;
    }
}
module.exports = { nodeClass: SimpleStoreUpsert_LlamaIndex_VectorStores };
//# sourceMappingURL=SimpleStore.js.map