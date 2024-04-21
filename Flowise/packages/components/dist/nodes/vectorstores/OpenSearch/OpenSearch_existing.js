"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const opensearch_1 = require("@langchain/community/vectorstores/opensearch");
const opensearch_2 = require("@opensearch-project/opensearch");
const utils_1 = require("../../../src/utils");
class OpenSearch_Existing_VectorStores {
    constructor() {
        this.label = 'OpenSearch Load Existing Index';
        this.name = 'openSearchExistingIndex';
        this.version = 1.0;
        this.type = 'OpenSearch';
        this.icon = 'opensearch.svg';
        this.category = 'Vector Stores';
        this.description = 'Load existing index from OpenSearch (i.e: Document has been upserted)';
        this.baseClasses = [this.type, 'VectorStoreRetriever', 'BaseRetriever'];
        this.badge = 'DEPRECATING';
        this.inputs = [
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
        const embeddings = nodeData.inputs?.embeddings;
        const opensearchURL = nodeData.inputs?.opensearchURL;
        const indexName = nodeData.inputs?.indexName;
        const output = nodeData.outputs?.output;
        const topK = nodeData.inputs?.topK;
        const k = topK ? parseFloat(topK) : 4;
        const client = new opensearch_2.Client({
            nodes: [opensearchURL]
        });
        const vectorStore = new opensearch_1.OpenSearchVectorStore(embeddings, {
            client,
            indexName
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
module.exports = { nodeClass: OpenSearch_Existing_VectorStores };
//# sourceMappingURL=OpenSearch_existing.js.map