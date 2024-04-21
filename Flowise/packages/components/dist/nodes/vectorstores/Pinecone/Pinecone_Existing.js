"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pinecone_1 = require("@pinecone-database/pinecone");
const pinecone_2 = require("@langchain/pinecone");
const utils_1 = require("../../../src/utils");
class Pinecone_Existing_VectorStores {
    constructor() {
        this.label = 'Pinecone Load Existing Index';
        this.name = 'pineconeExistingIndex';
        this.version = 1.0;
        this.type = 'Pinecone';
        this.icon = 'pinecone.svg';
        this.category = 'Vector Stores';
        this.description = 'Load existing index from Pinecone (i.e: Document has been upserted)';
        this.baseClasses = [this.type, 'VectorStoreRetriever', 'BaseRetriever'];
        this.badge = 'DEPRECATING';
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['pineconeApi']
        };
        this.inputs = [
            {
                label: 'Embeddings',
                name: 'embeddings',
                type: 'Embeddings'
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
                label: 'Pinecone Vector Store',
                name: 'vectorStore',
                baseClasses: [this.type, ...(0, utils_1.getBaseClasses)(pinecone_2.PineconeStore)]
            }
        ];
    }
    async init(nodeData, _, options) {
        const index = nodeData.inputs?.pineconeIndex;
        const pineconeNamespace = nodeData.inputs?.pineconeNamespace;
        const pineconeMetadataFilter = nodeData.inputs?.pineconeMetadataFilter;
        const embeddings = nodeData.inputs?.embeddings;
        const output = nodeData.outputs?.output;
        const topK = nodeData.inputs?.topK;
        const k = topK ? parseFloat(topK) : 4;
        const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
        const pineconeApiKey = (0, utils_1.getCredentialParam)('pineconeApiKey', credentialData, nodeData);
        const client = new pinecone_1.Pinecone({
            apiKey: pineconeApiKey
        });
        const pineconeIndex = client.Index(index);
        const obj = {
            pineconeIndex
        };
        if (pineconeNamespace)
            obj.namespace = pineconeNamespace;
        if (pineconeMetadataFilter) {
            const metadatafilter = typeof pineconeMetadataFilter === 'object' ? pineconeMetadataFilter : JSON.parse(pineconeMetadataFilter);
            obj.filter = metadatafilter;
        }
        const vectorStore = await pinecone_2.PineconeStore.fromExistingIndex(embeddings, obj);
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
module.exports = { nodeClass: Pinecone_Existing_VectorStores };
//# sourceMappingURL=Pinecone_Existing.js.map