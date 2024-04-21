"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const llamaindex_1 = require("llamaindex");
const EngineUtils_1 = require("../EngineUtils");
class SubQuestionQueryEngine_LlamaIndex {
    constructor(fields) {
        this.label = 'Sub Question Query Engine';
        this.name = 'subQuestionQueryEngine';
        this.version = 2.0;
        this.type = 'SubQuestionQueryEngine';
        this.icon = 'subQueryEngine.svg';
        this.category = 'Engine';
        this.description =
            'Breaks complex query into sub questions for each relevant data source, then gather all the intermediate reponses and synthesizes a final response';
        this.baseClasses = [this.type, 'BaseQueryEngine'];
        this.tags = ['LlamaIndex'];
        this.inputs = [
            {
                label: 'QueryEngine Tools',
                name: 'queryEngineTools',
                type: 'QueryEngineTool',
                list: true
            },
            {
                label: 'Chat Model',
                name: 'model',
                type: 'BaseChatModel_LlamaIndex'
            },
            {
                label: 'Embeddings',
                name: 'embeddings',
                type: 'BaseEmbedding_LlamaIndex'
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
    const embeddings = nodeData.inputs?.embeddings;
    const model = nodeData.inputs?.model;
    const serviceContext = (0, llamaindex_1.serviceContextFromDefaults)({
        llm: model,
        embedModel: embeddings
    });
    let queryEngineTools = nodeData.inputs?.queryEngineTools;
    queryEngineTools = (0, lodash_1.flatten)(queryEngineTools);
    let queryEngine = llamaindex_1.SubQuestionQueryEngine.fromDefaults({
        serviceContext,
        queryEngineTools,
        questionGen: new llamaindex_1.LLMQuestionGenerator({ llm: model })
    });
    const responseSynthesizerObj = nodeData.inputs?.responseSynthesizer;
    if (responseSynthesizerObj) {
        if (responseSynthesizerObj.type === 'TreeSummarize') {
            const responseSynthesizer = new llamaindex_1.ResponseSynthesizer({
                responseBuilder: new llamaindex_1.TreeSummarize(serviceContext, responseSynthesizerObj.textQAPromptTemplate),
                serviceContext
            });
            queryEngine = llamaindex_1.SubQuestionQueryEngine.fromDefaults({
                responseSynthesizer,
                serviceContext,
                queryEngineTools,
                questionGen: new llamaindex_1.LLMQuestionGenerator({ llm: model })
            });
        }
        else if (responseSynthesizerObj.type === 'CompactAndRefine') {
            const responseSynthesizer = new llamaindex_1.ResponseSynthesizer({
                responseBuilder: new llamaindex_1.CompactAndRefine(serviceContext, responseSynthesizerObj.textQAPromptTemplate, responseSynthesizerObj.refinePromptTemplate),
                serviceContext
            });
            queryEngine = llamaindex_1.SubQuestionQueryEngine.fromDefaults({
                responseSynthesizer,
                serviceContext,
                queryEngineTools,
                questionGen: new llamaindex_1.LLMQuestionGenerator({ llm: model })
            });
        }
        else if (responseSynthesizerObj.type === 'Refine') {
            const responseSynthesizer = new llamaindex_1.ResponseSynthesizer({
                responseBuilder: new llamaindex_1.Refine(serviceContext, responseSynthesizerObj.textQAPromptTemplate, responseSynthesizerObj.refinePromptTemplate),
                serviceContext
            });
            queryEngine = llamaindex_1.SubQuestionQueryEngine.fromDefaults({
                responseSynthesizer,
                serviceContext,
                queryEngineTools,
                questionGen: new llamaindex_1.LLMQuestionGenerator({ llm: model })
            });
        }
        else if (responseSynthesizerObj.type === 'SimpleResponseBuilder') {
            const responseSynthesizer = new llamaindex_1.ResponseSynthesizer({
                responseBuilder: new llamaindex_1.SimpleResponseBuilder(serviceContext),
                serviceContext
            });
            queryEngine = llamaindex_1.SubQuestionQueryEngine.fromDefaults({
                responseSynthesizer,
                serviceContext,
                queryEngineTools,
                questionGen: new llamaindex_1.LLMQuestionGenerator({ llm: model })
            });
        }
    }
    return queryEngine;
};
module.exports = { nodeClass: SubQuestionQueryEngine_LlamaIndex };
//# sourceMappingURL=SubQuestionQueryEngine.js.map