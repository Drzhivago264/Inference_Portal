"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const documents_1 = require("@langchain/core/documents");
const elasticsearch_1 = require("@langchain/community/vectorstores/elasticsearch");
const ElasticSearchBase_1 = require("./ElasticSearchBase");
class ElasicsearchUpsert_VectorStores extends ElasticSearchBase_1.ElasticSearchBase {
    constructor() {
        super();
        this.label = 'Elasticsearch Upsert Document';
        this.name = 'ElasticsearchUpsert';
        this.version = 1.0;
        this.description = 'Upsert documents to Elasticsearch';
        this.inputs.unshift({
            label: 'Document',
            name: 'document',
            type: 'Document',
            list: true
        });
    }
    async constructVectorStore(embeddings, elasticSearchClientArgs, docs) {
        const vectorStore = new elasticsearch_1.ElasticVectorSearch(embeddings, elasticSearchClientArgs);
        await vectorStore.addDocuments(docs);
        return vectorStore;
    }
    async init(nodeData, _, options) {
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
        return super.init(nodeData, _, options, finalDocs);
    }
}
module.exports = { nodeClass: ElasicsearchUpsert_VectorStores };
//# sourceMappingURL=Elasticsearch_Upsert.js.map