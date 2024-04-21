"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vectara_1 = require("@langchain/community/vectorstores/vectara");
const utils_1 = require("../../../src/utils");
class VectaraExisting_VectorStores {
    constructor() {
        this.label = 'Vectara Load Existing Index';
        this.name = 'vectaraExistingIndex';
        this.version = 1.0;
        this.type = 'Vectara';
        this.icon = 'vectara.png';
        this.category = 'Vector Stores';
        this.description = 'Load existing index from Vectara (i.e: Document has been upserted)';
        this.baseClasses = [this.type, 'VectorStoreRetriever', 'BaseRetriever'];
        this.badge = 'DEPRECATING';
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['vectaraApi']
        };
        this.inputs = [
            {
                label: 'Metadata Filter',
                name: 'filter',
                description: 'Filter to apply to Vectara metadata. Refer to the <a target="_blank" href="https://docs.flowiseai.com/vector-stores/vectara">documentation</a> on how to use Vectara filters with Flowise.',
                type: 'string',
                additionalParams: true,
                optional: true
            },
            {
                label: 'Sentences Before',
                name: 'sentencesBefore',
                description: 'Number of sentences to fetch before the matched sentence. Defaults to 2.',
                type: 'number',
                additionalParams: true,
                optional: true
            },
            {
                label: 'Sentences After',
                name: 'sentencesAfter',
                description: 'Number of sentences to fetch after the matched sentence. Defaults to 2.',
                type: 'number',
                additionalParams: true,
                optional: true
            },
            {
                label: 'Lambda',
                name: 'lambda',
                description: 'Improves retrieval accuracy by adjusting the balance (from 0 to 1) between neural search and keyword-based search factors.',
                type: 'number',
                additionalParams: true,
                optional: true
            },
            {
                label: 'Top K',
                name: 'topK',
                description: 'Number of top results to fetch. Defaults to 4',
                placeholder: '4',
                type: 'number',
                additionalParams: true,
                optional: true
            }
        ];
        this.outputs = [
            {
                label: 'Vectara Retriever',
                name: 'retriever',
                baseClasses: this.baseClasses
            },
            {
                label: 'Vectara Vector Store',
                name: 'vectorStore',
                baseClasses: [this.type, ...(0, utils_1.getBaseClasses)(vectara_1.VectaraStore)]
            }
        ];
    }
    async init(nodeData, _, options) {
        const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
        const apiKey = (0, utils_1.getCredentialParam)('apiKey', credentialData, nodeData);
        const customerId = (0, utils_1.getCredentialParam)('customerID', credentialData, nodeData);
        const corpusId = (0, utils_1.getCredentialParam)('corpusID', credentialData, nodeData).split(',');
        const vectaraMetadataFilter = nodeData.inputs?.filter;
        const sentencesBefore = nodeData.inputs?.sentencesBefore;
        const sentencesAfter = nodeData.inputs?.sentencesAfter;
        const lambda = nodeData.inputs?.lambda;
        const output = nodeData.outputs?.output;
        const topK = nodeData.inputs?.topK;
        const k = topK ? parseInt(topK, 10) : 4;
        const vectaraArgs = {
            apiKey: apiKey,
            customerId: customerId,
            corpusId: corpusId,
            source: 'flowise'
        };
        const vectaraFilter = {};
        if (vectaraMetadataFilter)
            vectaraFilter.filter = vectaraMetadataFilter;
        if (lambda)
            vectaraFilter.lambda = lambda;
        const vectaraContextConfig = {};
        if (sentencesBefore)
            vectaraContextConfig.sentencesBefore = sentencesBefore;
        if (sentencesAfter)
            vectaraContextConfig.sentencesAfter = sentencesAfter;
        vectaraFilter.contextConfig = vectaraContextConfig;
        const vectorStore = new vectara_1.VectaraStore(vectaraArgs);
        if (output === 'retriever') {
            const retriever = vectorStore.asRetriever(k, vectaraFilter);
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
module.exports = { nodeClass: VectaraExisting_VectorStores };
//# sourceMappingURL=Vectara_Existing.js.map