"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const contextual_compression_1 = require("langchain/retrievers/contextual_compression");
const VoyageAIRerank_1 = require("./VoyageAIRerank");
const src_1 = require("../../../src");
class VoyageAIRerankRetriever_Retrievers {
    constructor() {
        this.label = 'Voyage AI Rerank Retriever';
        this.name = 'voyageAIRerankRetriever';
        this.version = 1.0;
        this.type = 'VoyageAIRerankRetriever';
        this.icon = 'voyageai.png';
        this.category = 'Retrievers';
        this.badge = 'NEW';
        this.description = 'Voyage AI Rerank indexes the documents from most to least semantically relevant to the query.';
        this.baseClasses = [this.type, 'BaseRetriever'];
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['voyageAIApi']
        };
        this.inputs = [
            {
                label: 'Vector Store Retriever',
                name: 'baseRetriever',
                type: 'VectorStoreRetriever'
            },
            {
                label: 'Model Name',
                name: 'model',
                type: 'options',
                options: [
                    {
                        label: 'rerank-lite-1',
                        name: 'rerank-lite-1'
                    }
                ],
                default: 'rerank-lite-1',
                optional: true
            },
            {
                label: 'Query',
                name: 'query',
                type: 'string',
                description: 'Query to retrieve documents from retriever. If not specified, user question will be used',
                optional: true,
                acceptVariable: true
            },
            {
                label: 'Top K',
                name: 'topK',
                description: 'Number of top results to fetch. Default to the TopK of the Base Retriever',
                placeholder: '4',
                type: 'number',
                additionalParams: true,
                optional: true
            }
        ];
        this.outputs = [
            {
                label: 'Voyage AI Rerank Retriever',
                name: 'retriever',
                baseClasses: this.baseClasses
            },
            {
                label: 'Document',
                name: 'document',
                description: 'Array of document objects containing metadata and pageContent',
                baseClasses: ['Document', 'json']
            },
            {
                label: 'Text',
                name: 'text',
                description: 'Concatenated string from pageContent of documents',
                baseClasses: ['string', 'json']
            }
        ];
    }
    async init(nodeData, input, options) {
        const baseRetriever = nodeData.inputs?.baseRetriever;
        const model = nodeData.inputs?.model;
        const query = nodeData.inputs?.query;
        const credentialData = await (0, src_1.getCredentialData)(nodeData.credential ?? '', options);
        const voyageAiApiKey = (0, src_1.getCredentialParam)('apiKey', credentialData, nodeData);
        const topK = nodeData.inputs?.topK;
        const k = topK ? parseFloat(topK) : baseRetriever.k ?? 4;
        const output = nodeData.outputs?.output;
        const voyageAICompressor = new VoyageAIRerank_1.VoyageAIRerank(voyageAiApiKey, model, k);
        const retriever = new contextual_compression_1.ContextualCompressionRetriever({
            baseCompressor: voyageAICompressor,
            baseRetriever: baseRetriever
        });
        if (output === 'retriever')
            return retriever;
        else if (output === 'document')
            return await retriever.getRelevantDocuments(query ? query : input);
        else if (output === 'text') {
            let finaltext = '';
            const docs = await retriever.getRelevantDocuments(query ? query : input);
            for (const doc of docs)
                finaltext += `${doc.pageContent}\n`;
            return (0, src_1.handleEscapeCharacters)(finaltext, false);
        }
        return retriever;
    }
}
module.exports = { nodeClass: VoyageAIRerankRetriever_Retrievers };
//# sourceMappingURL=VoyageAIRerankRetriever.js.map