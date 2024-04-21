"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const contextual_compression_1 = require("langchain/retrievers/contextual_compression");
const CohereRerank_1 = require("./CohereRerank");
const src_1 = require("../../../src");
class CohereRerankRetriever_Retrievers {
    constructor() {
        this.label = 'Cohere Rerank Retriever';
        this.name = 'cohereRerankRetriever';
        this.version = 1.0;
        this.type = 'Cohere Rerank Retriever';
        this.icon = 'Cohere.svg';
        this.category = 'Retrievers';
        this.badge = 'NEW';
        this.description = 'Cohere Rerank indexes the documents from most to least semantically relevant to the query.';
        this.baseClasses = [this.type, 'BaseRetriever'];
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['cohereApi']
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
                        label: 'rerank-english-v2.0',
                        name: 'rerank-english-v2.0'
                    },
                    {
                        label: 'rerank-multilingual-v2.0',
                        name: 'rerank-multilingual-v2.0'
                    }
                ],
                default: 'rerank-english-v2.0',
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
            },
            {
                label: 'Max Chunks Per Doc',
                name: 'maxChunksPerDoc',
                description: 'The maximum number of chunks to produce internally from a document. Default to 10',
                placeholder: '10',
                type: 'number',
                additionalParams: true,
                optional: true
            }
        ];
        this.outputs = [
            {
                label: 'Cohere Rerank Retriever',
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
        const cohereApiKey = (0, src_1.getCredentialParam)('cohereApiKey', credentialData, nodeData);
        const topK = nodeData.inputs?.topK;
        const k = topK ? parseFloat(topK) : baseRetriever.k ?? 4;
        const maxChunksPerDoc = nodeData.inputs?.maxChunksPerDoc;
        const max_chunks_per_doc = maxChunksPerDoc ? parseFloat(maxChunksPerDoc) : 10;
        const output = nodeData.outputs?.output;
        const cohereCompressor = new CohereRerank_1.CohereRerank(cohereApiKey, model, k, max_chunks_per_doc);
        const retriever = new contextual_compression_1.ContextualCompressionRetriever({
            baseCompressor: cohereCompressor,
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
module.exports = { nodeClass: CohereRerankRetriever_Retrievers };
//# sourceMappingURL=CohereRerankRetriever.js.map