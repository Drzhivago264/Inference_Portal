"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chroma_1 = require("@langchain/community/vectorstores/chroma");
const utils_1 = require("../../../src/utils");
const core_1 = require("./core");
class Chroma_Existing_VectorStores {
    constructor() {
        this.label = 'Chroma Load Existing Index';
        this.name = 'chromaExistingIndex';
        this.version = 1.0;
        this.type = 'Chroma';
        this.icon = 'chroma.svg';
        this.category = 'Vector Stores';
        this.description = 'Load existing index from Chroma (i.e: Document has been upserted)';
        this.baseClasses = [this.type, 'VectorStoreRetriever', 'BaseRetriever'];
        this.badge = 'DEPRECATING';
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            description: 'Only needed if you have chroma on cloud services with X-Api-key',
            optional: true,
            credentialNames: ['chromaApi']
        };
        this.inputs = [
            {
                label: 'Embeddings',
                name: 'embeddings',
                type: 'Embeddings'
            },
            {
                label: 'Collection Name',
                name: 'collectionName',
                type: 'string'
            },
            {
                label: 'Chroma URL',
                name: 'chromaURL',
                type: 'string',
                optional: true
            },
            {
                label: 'Chroma Metadata Filter',
                name: 'chromaMetadataFilter',
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
                label: 'Chroma Retriever',
                name: 'retriever',
                baseClasses: this.baseClasses
            },
            {
                label: 'Chroma Vector Store',
                name: 'vectorStore',
                baseClasses: [this.type, ...(0, utils_1.getBaseClasses)(chroma_1.Chroma)]
            }
        ];
    }
    async init(nodeData, _, options) {
        const collectionName = nodeData.inputs?.collectionName;
        const embeddings = nodeData.inputs?.embeddings;
        const chromaURL = nodeData.inputs?.chromaURL;
        const output = nodeData.outputs?.output;
        const topK = nodeData.inputs?.topK;
        const k = topK ? parseFloat(topK) : 4;
        const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
        const chromaApiKey = (0, utils_1.getCredentialParam)('chromaApiKey', credentialData, nodeData);
        const chromaMetadataFilter = nodeData.inputs?.chromaMetadataFilter;
        const obj = { collectionName };
        if (chromaURL)
            obj.url = chromaURL;
        if (chromaApiKey)
            obj.chromaApiKey = chromaApiKey;
        if (chromaMetadataFilter) {
            const metadatafilter = typeof chromaMetadataFilter === 'object' ? chromaMetadataFilter : JSON.parse(chromaMetadataFilter);
            obj.filter = metadatafilter;
        }
        const vectorStore = await core_1.ChromaExtended.fromExistingCollection(embeddings, obj);
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
module.exports = { nodeClass: Chroma_Existing_VectorStores };
//# sourceMappingURL=Chroma_Existing.js.map