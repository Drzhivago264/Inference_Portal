"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const contextual_compression_1 = require("langchain/retrievers/contextual_compression");
const chain_extract_1 = require("langchain/retrievers/document_compressors/chain_extract");
const utils_1 = require("../../../src/utils");
class LLMFilterCompressionRetriever_Retrievers {
    constructor() {
        this.label = 'LLM Filter Retriever';
        this.name = 'llmFilterRetriever';
        this.version = 1.0;
        this.type = 'LLMFilterRetriever';
        this.icon = 'llmFilterRetriever.svg';
        this.category = 'Retrievers';
        this.badge = 'NEW';
        this.description =
            'Iterate over the initially returned documents and extract, from each, only the content that is relevant to the query';
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
            }
        ];
        this.outputs = [
            {
                label: 'LLM Filter Retriever',
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
        const baseRetriever = nodeData.inputs?.baseRetriever;
        const model = nodeData.inputs?.model;
        const query = nodeData.inputs?.query;
        const output = nodeData.outputs?.output;
        if (!model)
            throw new Error('There must be a LLM model connected to LLM Filter Retriever');
        const retriever = new contextual_compression_1.ContextualCompressionRetriever({
            baseCompressor: chain_extract_1.LLMChainExtractor.fromLLM(model),
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
module.exports = { nodeClass: LLMFilterCompressionRetriever_Retrievers };
//# sourceMappingURL=LLMFilterCompressionRetriever.js.map