"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const contextual_compression_1 = require("langchain/retrievers/contextual_compression");
const ReciprocalRankFusion_1 = require("./ReciprocalRankFusion");
const utils_1 = require("../../../src/utils");
class RRFRetriever_Retrievers {
    constructor() {
        this.label = 'Reciprocal Rank Fusion Retriever';
        this.name = 'RRFRetriever';
        this.version = 1.0;
        this.type = 'RRFRetriever';
        this.badge = 'NEW';
        this.icon = 'rrfRetriever.svg';
        this.category = 'Retrievers';
        this.description = 'Reciprocal Rank Fusion to re-rank search results by multiple query generation.';
        this.baseClasses = [this.type, 'BaseRetriever'];
        this.inputs = [
            {
                label: 'Vector Store Retriever',
                name: 'baseRetriever',
                type: 'VectorStoreRetriever'
            },
            {
                label: 'Language Model',
                name: 'model',
                type: 'BaseLanguageModel'
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
                label: 'Query Count',
                name: 'queryCount',
                description: 'Number of synthetic queries to generate. Default to 4',
                placeholder: '4',
                type: 'number',
                default: 4,
                additionalParams: true,
                optional: true
            },
            {
                label: 'Top K',
                name: 'topK',
                description: 'Number of top results to fetch. Default to the TopK of the Base Retriever',
                placeholder: '0',
                type: 'number',
                additionalParams: true,
                optional: true
            },
            {
                label: 'Constant',
                name: 'c',
                description: 'A constant added to the rank, controlling the balance between the importance of high-ranked items and the consideration given to lower-ranked items.\n' +
                    'Default is 60',
                placeholder: '60',
                type: 'number',
                default: 60,
                additionalParams: true,
                optional: true
            }
        ];
        this.outputs = [
            {
                label: 'Reciprocal Rank Fusion Retriever',
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
    async init(nodeData, input) {
        const llm = nodeData.inputs?.model;
        const baseRetriever = nodeData.inputs?.baseRetriever;
        const query = nodeData.inputs?.query;
        const queryCount = nodeData.inputs?.queryCount;
        const q = queryCount ? parseFloat(queryCount) : 4;
        const topK = nodeData.inputs?.topK;
        const k = topK ? parseFloat(topK) : baseRetriever.k ?? 4;
        const constantC = nodeData.inputs?.c;
        const c = topK ? parseFloat(constantC) : 60;
        const output = nodeData.outputs?.output;
        const ragFusion = new ReciprocalRankFusion_1.ReciprocalRankFusion(llm, baseRetriever, q, k, c);
        const retriever = new contextual_compression_1.ContextualCompressionRetriever({
            baseCompressor: ragFusion,
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
            return (0, utils_1.handleEscapeCharacters)(finaltext, false);
        }
        return retriever;
    }
}
module.exports = { nodeClass: RRFRetriever_Retrievers };
//# sourceMappingURL=RRFRetriever.js.map