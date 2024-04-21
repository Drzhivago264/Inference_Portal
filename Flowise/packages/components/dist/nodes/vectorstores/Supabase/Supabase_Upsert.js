"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const documents_1 = require("@langchain/core/documents");
const supabase_1 = require("@langchain/community/vectorstores/supabase");
const supabase_js_1 = require("@supabase/supabase-js");
const lodash_1 = require("lodash");
const utils_1 = require("../../../src/utils");
class SupabaseUpsert_VectorStores {
    constructor() {
        this.label = 'Supabase Upsert Document';
        this.name = 'supabaseUpsert';
        this.version = 1.0;
        this.type = 'Supabase';
        this.icon = 'supabase.svg';
        this.category = 'Vector Stores';
        this.description = 'Upsert documents to Supabase';
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
        const docs = nodeData.inputs?.document;
        const embeddings = nodeData.inputs?.embeddings;
        const output = nodeData.outputs?.output;
        const topK = nodeData.inputs?.topK;
        const k = topK ? parseFloat(topK) : 4;
        const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
        const supabaseApiKey = (0, utils_1.getCredentialParam)('supabaseApiKey', credentialData, nodeData);
        const client = (0, supabase_js_1.createClient)(supabaseProjUrl, supabaseApiKey);
        const flattenDocs = docs && docs.length ? (0, lodash_1.flatten)(docs) : [];
        const finalDocs = [];
        for (let i = 0; i < flattenDocs.length; i += 1) {
            finalDocs.push(new documents_1.Document(flattenDocs[i]));
        }
        const vectorStore = await SupabaseUpsertVectorStore.fromDocuments(finalDocs, embeddings, {
            client,
            tableName: tableName,
            queryName: queryName
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
class SupabaseUpsertVectorStore extends supabase_1.SupabaseVectorStore {
    async addVectors(vectors, documents) {
        if (vectors.length === 0) {
            return [];
        }
        const rows = vectors.map((embedding, idx) => ({
            content: documents[idx].pageContent,
            embedding,
            metadata: documents[idx].metadata
        }));
        let returnedIds = [];
        for (let i = 0; i < rows.length; i += this.upsertBatchSize) {
            const chunk = rows.slice(i, i + this.upsertBatchSize).map((row, index) => {
                return { id: index, ...row };
            });
            const res = await this.client.from(this.tableName).upsert(chunk).select();
            if (res.error) {
                throw new Error(`Error inserting: ${res.error.message} ${res.status} ${res.statusText}`);
            }
            if (res.data) {
                returnedIds = returnedIds.concat(res.data.map((row) => row.id));
            }
        }
        return returnedIds;
    }
}
module.exports = { nodeClass: SupabaseUpsert_VectorStores };
//# sourceMappingURL=Supabase_Upsert.js.map