"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const elasticsearch_1 = require("@langchain/community/vectorstores/elasticsearch");
const ElasticSearchBase_1 = require("./ElasticSearchBase");
class ElasicsearchExisting_VectorStores extends ElasticSearchBase_1.ElasticSearchBase {
    constructor() {
        super();
        this.label = 'Elasticsearch Load Existing Index';
        this.name = 'ElasticsearchIndex';
        this.version = 1.0;
        this.description = 'Load existing index from Elasticsearch (i.e: Document has been upserted)';
    }
    async constructVectorStore(embeddings, elasticSearchClientArgs, _) {
        return await elasticsearch_1.ElasticVectorSearch.fromExistingIndex(embeddings, elasticSearchClientArgs);
    }
    async init(nodeData, _, options) {
        return super.init(nodeData, _, options, undefined);
    }
}
module.exports = { nodeClass: ElasicsearchExisting_VectorStores };
//# sourceMappingURL=Elasticsearch_Existing.js.map