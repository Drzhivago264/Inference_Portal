"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const opensearch_1 = require("@langchain/community/vectorstores/opensearch");
const documents_1 = require("@langchain/core/documents");
const opensearch_2 = require("@opensearch-project/opensearch");
const lodash_1 = require("lodash");
const utils_1 = require("../../../src/utils");
class OpenSearchUpsert_VectorStores {
    constructor() {
        this.label = 'OpenSearch Upsert Document';
        this.name = 'openSearchUpsertDocument';
        this.version = 1.0;
        this.type = 'OpenSearch';
        this.icon = 'opensearch.svg';
        this.category = 'Vector Stores';
        this.description = 'Upsert documents to OpenSearch';
        this.baseClasses = [this.type, 'VectorStoreRetriever', 'BaseRetriever'];
        this.badge = 'DEPRECATING';
        this.inputs = [
            {
                label: 'Document',
                name: 'document',
                type: 'Document',
                list: true
            },
            {
                label: 'Embeddings',
                name: 'embeddings',
                type: 'Embeddings'
            },
            {
                label: 'OpenSearch URL',
                name: 'opensearchURL',
                type: 'string',
                placeholder: 'http://127.0.0.1:9200'
            },
            {
                label: 'Index Name',
                name: 'indexName',
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
            }
        ];
        this.outputs = [
            {
                label: 'OpenSearch Retriever',
                name: 'retriever',
                baseClasses: this.baseClasses
            },
            {
                label: 'OpenSearch Vector Store',
                name: 'vectorStore',
                baseClasses: [this.type, ...(0, utils_1.getBaseClasses)(opensearch_1.OpenSearchVectorStore)]
            }
        ];
    }
    async init(nodeData) {
        const docs = nodeData.inputs?.document;
        const embeddings = nodeData.inputs?.embeddings;
        const opensearchURL = nodeData.inputs?.opensearchURL;
        const indexName = nodeData.inputs?.indexName;
        const output = nodeData.outputs?.output;
        const topK = nodeData.inputs?.topK;
        const k = topK ? parseFloat(topK) : 4;
        const flattenDocs = docs && docs.length ? (0, lodash_1.flatten)(docs) : [];
        const finalDocs = [];
        for (let i = 0; i < flattenDocs.length; i += 1) {
            if (flattenDocs[i] && flattenDocs[i].pageContent) {
                finalDocs.push(new documents_1.Document(flattenDocs[i]));
            }
        }
        const client = new opensearch_2.Client({
            nodes: [opensearchURL]
        });
        const vectorStore = await opensearch_1.OpenSearchVectorStore.fromDocuments(finalDocs, embeddings, {
            client,
            indexName: indexName
        });
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
module.exports = { nodeClass: OpenSearchUpsert_VectorStores };
//# sourceMappingURL=OpenSearch_Upsert.js.map