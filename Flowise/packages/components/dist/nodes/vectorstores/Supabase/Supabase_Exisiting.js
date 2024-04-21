"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const supabase_1 = require("@langchain/community/vectorstores/supabase");
const supabase_js_1 = require("@supabase/supabase-js");
const utils_1 = require("../../../src/utils");
class Supabase_Existing_VectorStores {
    constructor() {
        this.label = 'Supabase Load Existing Index';
        this.name = 'supabaseExistingIndex';
        this.version = 1.0;
        this.type = 'Supabase';
        this.icon = 'supabase.svg';
        this.category = 'Vector Stores';
        this.description = 'Load existing index from Supabase (i.e: Document has been upserted)';
        this.baseClasses = [this.type, 'VectorStoreRetriever', 'BaseRetriever'];
        this.badge = 'DEPRECATING';
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['supabaseApi']
        };
        this.inputs = [
            {
                label: 'Embeddings',
                name: 'embeddings',
                type: 'Embeddings'
            },
            {
                label: 'Supabase Project URL',
                name: 'supabaseProjUrl',
                type: 'string'
            },
            {
                label: 'Table Name',
                name: 'tableName',
                type: 'string'
            },
            {
                label: 'Query Name',
                name: 'queryName',
                type: 'string'
            },
            {
                label: 'Supabase Metadata Filter',
                name: 'supabaseMetadataFilter',
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
                label: 'Supabase Retriever',
                name: 'retriever',
                baseClasses: this.baseClasses
            },
            {
                label: 'Supabase Vector Store',
                name: 'vectorStore',
                baseClasses: [this.type, ...(0, utils_1.getBaseClasses)(supabase_1.SupabaseVectorStore)]
            }
        ];
    }
    async init(nodeData, _, options) {
        const supabaseProjUrl = nodeData.inputs?.supabaseProjUrl;
        const tableName = nodeData.inputs?.tableName;
        const queryName = nodeData.inputs?.queryName;
        const embeddings = nodeData.inputs?.embeddings;
        const supabaseMetadataFilter = nodeData.inputs?.supabaseMetadataFilter;
        const output = nodeData.outputs?.output;
        const topK = nodeData.inputs?.topK;
        const k = topK ? parseFloat(topK) : 4;
        const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
        const supabaseApiKey = (0, utils_1.getCredentialParam)('supabaseApiKey', credentialData, nodeData);
        const client = (0, supabase_js_1.createClient)(supabaseProjUrl, supabaseApiKey);
        const obj = {
            client,
            tableName,
            queryName
        };
        if (supabaseMetadataFilter) {
            const metadatafilter = typeof supabaseMetadataFilter === 'object' ? supabaseMetadataFilter : JSON.parse(supabaseMetadataFilter);
            obj.filter = metadatafilter;
        }
        const vectorStore = await supabase_1.SupabaseVectorStore.fromExistingIndex(embeddings, obj);
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
module.exports = { nodeClass: Supabase_Existing_VectorStores };
//# sourceMappingURL=Supabase_Exisiting.js.map