"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chains_1 = require("langchain/chains");
const utils_1 = require("../../../src/utils");
const handler_1 = require("../../../src/handler");
const Moderation_1 = require("../../moderation/Moderation");
const OutputParserHelpers_1 = require("../../outputparsers/OutputParserHelpers");
class MultiRetrievalQAChain_Chains {
    constructor() {
        this.label = 'Multi Retrieval QA Chain';
        this.name = 'multiRetrievalQAChain';
        this.version = 2.0;
        this.type = 'MultiRetrievalQAChain';
        this.icon = 'qa.svg';
        this.category = 'Chains';
        this.description = 'QA Chain that automatically picks an appropriate vector store from multiple retrievers';
        this.baseClasses = [this.type, ...(0, utils_1.getBaseClasses)(chains_1.MultiRetrievalQAChain)];
        this.inputs = [
            {
                label: 'Language Model',
                name: 'model',
                type: 'BaseLanguageModel'
            },
            {
                label: 'Vector Store Retriever',
                name: 'vectorStoreRetriever',
                type: 'VectorStoreRetriever',
                list: true
            },
            {
                label: 'Return Source Documents',
                name: 'returnSourceDocuments',
                type: 'boolean',
                optional: true
            },
            {
                label: 'Input Moderation',
                description: 'Detect text that could generate harmful output and prevent it from being sent to the language model',
                name: 'inputModeration',
                type: 'Moderation',
                optional: true,
                list: true
            }
        ];
    }
    async init(nodeData) {
        const model = nodeData.inputs?.model;
        const vectorStoreRetriever = nodeData.inputs?.vectorStoreRetriever;
        const returnSourceDocuments = nodeData.inputs?.returnSourceDocuments;
        const retrieverNames = [];
        const retrieverDescriptions = [];
        const retrievers = [];
        for (const vs of vectorStoreRetriever) {
            retrieverNames.push(vs.name);
            retrieverDescriptions.push(vs.description);
            retrievers.push(vs.vectorStore.asRetriever(vs.vectorStore.k ?? 4));
        }
        const chain = chains_1.MultiRetrievalQAChain.fromLLMAndRetrievers(model, {
            retrieverNames,
            retrieverDescriptions,
            retrievers,
            retrievalQAChainOpts: { verbose: process.env.DEBUG === 'true' ? true : false, returnSourceDocuments }
        });
        return chain;
    }
    async run(nodeData, input, options) {
        const chain = nodeData.instance;
        const returnSourceDocuments = nodeData.inputs?.returnSourceDocuments;
        const moderations = nodeData.inputs?.inputModeration;
        if (moderations && moderations.length > 0) {
            try {
                // Use the output of the moderation chain as input for the Multi Retrieval QA Chain
                input = await (0, Moderation_1.checkInputs)(moderations, input);
            }
            catch (e) {
                await new Promise((resolve) => setTimeout(resolve, 500));
                (0, Moderation_1.streamResponse)(options.socketIO && options.socketIOClientId, e.message, options.socketIO, options.socketIOClientId);
                return (0, OutputParserHelpers_1.formatResponse)(e.message);
            }
        }
        const obj = { input };
        const loggerHandler = new handler_1.ConsoleCallbackHandler(options.logger);
        const callbacks = await (0, handler_1.additionalCallbacks)(nodeData, options);
        if (options.socketIO && options.socketIOClientId) {
            const handler = new handler_1.CustomChainHandler(options.socketIO, options.socketIOClientId, 2, returnSourceDocuments);
            const res = await chain.call(obj, [loggerHandler, handler, ...callbacks]);
            if (res.text && res.sourceDocuments)
                return res;
            return res?.text;
        }
        else {
            const res = await chain.call(obj, [loggerHandler, ...callbacks]);
            if (res.text && res.sourceDocuments)
                return res;
            return res?.text;
        }
    }
}
module.exports = { nodeClass: MultiRetrievalQAChain_Chains };
//# sourceMappingURL=MultiRetrievalQAChain.js.map