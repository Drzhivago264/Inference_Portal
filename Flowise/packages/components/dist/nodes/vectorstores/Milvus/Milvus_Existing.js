"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const milvus2_sdk_node_1 = require("@zilliz/milvus2-sdk-node");
const milvus_1 = require("@langchain/community/vectorstores/milvus");
const documents_1 = require("@langchain/core/documents");
const utils_1 = require("../../../src/utils");
class Milvus_Existing_VectorStores {
    constructor() {
        this.label = 'Milvus Load Existing collection';
        this.name = 'milvusExistingCollection';
        this.version = 2.0;
        this.type = 'Milvus';
        this.icon = 'milvus.svg';
        this.category = 'Vector Stores';
        this.description = 'Load existing collection from Milvus (i.e: Document has been upserted)';
        this.baseClasses = [this.type, 'VectorStoreRetriever', 'BaseRetriever'];
        this.badge = 'DEPRECATING';
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            optional: true,
            credentialNames: ['milvusAuth']
        };
        this.inputs = [
            {
                label: 'Embeddings',
                name: 'embeddings',
                type: 'Embeddings'
            },
            {
                label: 'Milvus Server URL',
                name: 'milvusServerUrl',
                type: 'string',
                placeholder: 'http://localhost:19530'
            },
            {
                label: 'Milvus Collection Name',
                name: 'milvusCollection',
                type: 'string'
            },
            {
                label: 'Milvus Filter',
                name: 'milvusFilter',
                type: 'string',
                optional: true,
                description: 'Filter data with a simple string query. Refer Milvus <a target="_blank" href="https://milvus.io/blog/2022-08-08-How-to-use-string-data-to-empower-your-similarity-search-applications.md#Hybrid-search">docs</a> for more details.',
                placeholder: 'doc=="a"',
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
                label: 'Milvus Retriever',
                name: 'retriever',
                baseClasses: this.baseClasses
            },
            {
                label: 'Milvus Vector Store',
                name: 'vectorStore',
                baseClasses: [this.type, ...(0, utils_1.getBaseClasses)(milvus_1.Milvus)]
            }
        ];
    }
    async init(nodeData, _, options) {
        // server setup
        const address = nodeData.inputs?.milvusServerUrl;
        const collectionName = nodeData.inputs?.milvusCollection;
        const milvusFilter = nodeData.inputs?.milvusFilter;
        // embeddings
        const embeddings = nodeData.inputs?.embeddings;
        const topK = nodeData.inputs?.topK;
        // output
        const output = nodeData.outputs?.output;
        // format data
        const k = topK ? parseInt(topK, 10) : 4;
        // credential
        const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
        const milvusUser = (0, utils_1.getCredentialParam)('milvusUser', credentialData, nodeData);
        const milvusPassword = (0, utils_1.getCredentialParam)('milvusPassword', credentialData, nodeData);
        // init MilvusLibArgs
        const milVusArgs = {
            url: address,
            collectionName: collectionName
        };
        if (milvusUser)
            milVusArgs.username = milvusUser;
        if (milvusPassword)
            milVusArgs.password = milvusPassword;
        const vectorStore = await milvus_1.Milvus.fromExistingCollection(embeddings, milVusArgs);
        // Avoid Illegal Invocation
        vectorStore.similaritySearchVectorWithScore = async (query, k, filter) => {
            const hasColResp = await vectorStore.client.hasCollection({
                collection_name: vectorStore.collectionName
            });
            if (hasColResp.status.error_code !== milvus2_sdk_node_1.ErrorCode.SUCCESS) {
                throw new Error(`Error checking collection: ${hasColResp}`);
            }
            if (hasColResp.value === false) {
                throw new Error(`Collection not found: ${vectorStore.collectionName}, please create collection before search.`);
            }
            const filterStr = milvusFilter ?? filter ?? '';
            await vectorStore.grabCollectionFields();
            const loadResp = await vectorStore.client.loadCollectionSync({
                collection_name: vectorStore.collectionName
            });
            if (loadResp.error_code !== milvus2_sdk_node_1.ErrorCode.SUCCESS) {
                throw new Error(`Error loading collection: ${loadResp}`);
            }
            const outputFields = vectorStore.fields.filter((field) => field !== vectorStore.vectorField);
            const searchResp = await vectorStore.client.search({
                collection_name: vectorStore.collectionName,
                search_params: {
                    anns_field: vectorStore.vectorField,
                    topk: k.toString(),
                    metric_type: vectorStore.indexCreateParams.metric_type,
                    params: vectorStore.indexSearchParams
                },
                output_fields: outputFields,
                vector_type: milvus2_sdk_node_1.DataType.FloatVector,
                vectors: [query],
                filter: filterStr
            });
            if (searchResp.status.error_code !== milvus2_sdk_node_1.ErrorCode.SUCCESS) {
                throw new Error(`Error searching data: ${JSON.stringify(searchResp)}`);
            }
            const results = [];
            searchResp.results.forEach((result) => {
                const fields = {
                    pageContent: '',
                    metadata: {}
                };
                Object.keys(result).forEach((key) => {
                    if (key === vectorStore.textField) {
                        fields.pageContent = result[key];
                    }
                    else if (vectorStore.fields.includes(key) || key === vectorStore.primaryField) {
                        if (typeof result[key] === 'string') {
                            const { isJson, obj } = checkJsonString(result[key]);
                            fields.metadata[key] = isJson ? obj : result[key];
                        }
                        else {
                            fields.metadata[key] = result[key];
                        }
                    }
                });
                results.push([new documents_1.Document(fields), result.score]);
            });
            return results;
        };
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
function checkJsonString(value) {
    try {
        const result = JSON.parse(value);
        return { isJson: true, obj: result };
    }
    catch (e) {
        return { isJson: false, obj: null };
    }
}
module.exports = { nodeClass: Milvus_Existing_VectorStores };
//# sourceMappingURL=Milvus_Existing.js.map