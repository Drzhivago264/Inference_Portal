"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const llamaindex_1 = require("llamaindex");
const EngineUtils_1 = require("../EngineUtils");
class QueryEngine_LlamaIndex {
    constructor(fields) {
        this.label = 'Query Engine';
        this.name = 'queryEngine';
        this.version = 2.0;
        this.type = 'QueryEngine';
        this.icon = 'query-engine.png';
        this.category = 'Engine';
        this.description = 'Simple query engine built to answer question over your data, without memory';
        this.baseClasses = [this.type, 'BaseQueryEngine'];
        this.tags = ['LlamaIndex'];
        this.inputs = [
            {
                label: 'Vector Store Retriever',
                name: 'vectorStoreRetriever',
                type: 'VectorIndexRetriever'
            },
            {
                label: 'Response Synthesizer',
                name: 'responseSynthesizer',
                type: 'ResponseSynthesizer',
                description: 'ResponseSynthesizer is responsible for sending the query, nodes, and prompt templates to the LLM to generate a response. See <a target="_blank" href="https://ts.llamaindex.ai/modules/low_level/response_synthesizer">more</a>',
                optional: true
            },
            {
                label: 'Return Source Documents',
                name: 'returnSourceDocuments',
                type: 'boolean',
                optional: true
            }
        ];
        this.sessionId = fields?.sessionId;
    }
    async init(nodeData) {
        return prepareEngine(nodeData);
    }
    async run(nodeData, input, options) {
        const returnSourceDocuments = nodeData.inputs?.returnSourceDocuments;
        const queryEngine = prepareEngine(nodeData);
        let text = '';
        let sourceDocuments = [];
        let sourceNodes = [];
        let isStreamingStarted = false;
        const isStreamingEnabled = options.socketIO && options.socketIOClientId;
        if (isStreamingEnabled) {
            const stream = await queryEngine.query({ query: input, stream: true });
            for await (const chunk of stream) {
                text += chunk.response;
                if (chunk.sourceNodes)
                    sourceNodes = chunk.sourceNodes;
                if (!isStreamingStarted) {
                    isStreamingStarted = true;
                    options.socketIO.to(options.socketIOClientId).emit('start', chunk.response);
                }
                options.socketIO.to(options.socketIOClientId).emit('token', chunk.response);
            }
            if (returnSourceDocuments) {
                sourceDocuments = (0, EngineUtils_1.reformatSourceDocuments)(sourceNodes);
                options.socketIO.to(options.socketIOClientId).emit('sourceDocuments', sourceDocuments);
            }
        }
        else {
            const response = await queryEngine.query({ query: input });
            text = response?.response;
            sourceDocuments = (0, EngineUtils_1.reformatSourceDocuments)(response?.sourceNodes ?? []);
        }
        if (returnSourceDocuments)
            return { text, sourceDocuments };
        else
            return { text };
    }
}
const prepareEngine = (nodeData) => {
    const vectorStoreRetriever = nodeData.inputs?.vectorStoreRetriever;
    const responseSynthesizerObj = nodeData.inputs?.responseSynthesizer;
    let queryEngine = new llamaindex_1.RetrieverQueryEngine(vectorStoreRetriever);
    if (responseSynthesizerObj) {
        if (responseSynthesizerObj.type === 'TreeSummarize') {
            const responseSynthesizer = new llamaindex_1.ResponseSynthesizer({
                responseBuilder: new llamaindex_1.TreeSummarize(vectorStoreRetriever.serviceContext, responseSynthesizerObj.textQAPromptTemplate),
                serviceContext: vectorStoreRetriever.serviceContext
            });
            queryEngine = new llamaindex_1.RetrieverQueryEngine(vectorStoreRetriever, responseSynthesizer);
        }
        else if (responseSynthesizerObj.type === 'CompactAndRefine') {
            const responseSynthesizer = new llamaindex_1.ResponseSynthesizer({
                responseBuilder: new llamaindex_1.CompactAndRefine(vectorStoreRetriever.serviceContext, responseSynthesizerObj.textQAPromptTemplate, responseSynthesizerObj.refinePromptTemplate),
                serviceContext: vectorStoreRetriever.serviceContext
            });
            queryEngine = new llamaindex_1.RetrieverQueryEngine(vectorStoreRetriever, responseSynthesizer);
        }
        else if (responseSynthesizerObj.type === 'Refine') {
            const responseSynthesizer = new llamaindex_1.ResponseSynthesizer({
                responseBuilder: new llamaindex_1.Refine(vectorStoreRetriever.serviceContext, responseSynthesizerObj.textQAPromptTemplate, responseSynthesizerObj.refinePromptTemplate),
                serviceContext: vectorStoreRetriever.serviceContext
            });
            queryEngine = new llamaindex_1.RetrieverQueryEngine(vectorStoreRetriever, responseSynthesizer);
        }
        else if (responseSynthesizerObj.type === 'SimpleResponseBuilder') {
            const responseSynthesizer = new llamaindex_1.ResponseSynthesizer({
                responseBuilder: new llamaindex_1.SimpleResponseBuilder(vectorStoreRetriever.serviceContext),
                serviceContext: vectorStoreRetriever.serviceContext
            });
            queryEngine = new llamaindex_1.RetrieverQueryEngine(vectorStoreRetriever, responseSynthesizer);
        }
    }
    return queryEngine;
};
module.exports = { nodeClass: QueryEngine_LlamaIndex };
//# sourceMappingURL=QueryEngine.js.map