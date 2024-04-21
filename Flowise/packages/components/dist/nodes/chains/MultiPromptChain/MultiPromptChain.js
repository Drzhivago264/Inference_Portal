"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chains_1 = require("langchain/chains");
const utils_1 = require("../../../src/utils");
const handler_1 = require("../../../src/handler");
const Moderation_1 = require("../../moderation/Moderation");
const OutputParserHelpers_1 = require("../../outputparsers/OutputParserHelpers");
class MultiPromptChain_Chains {
    constructor() {
        this.label = 'Multi Prompt Chain';
        this.name = 'multiPromptChain';
        this.version = 2.0;
        this.type = 'MultiPromptChain';
        this.icon = 'prompt.svg';
        this.category = 'Chains';
        this.description = 'Chain automatically picks an appropriate prompt from multiple prompt templates';
        this.baseClasses = [this.type, ...(0, utils_1.getBaseClasses)(chains_1.MultiPromptChain)];
        this.inputs = [
            {
                label: 'Language Model',
                name: 'model',
                type: 'BaseLanguageModel'
            },
            {
                label: 'Prompt Retriever',
                name: 'promptRetriever',
                type: 'PromptRetriever',
                list: true
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
        const promptRetriever = nodeData.inputs?.promptRetriever;
        const promptNames = [];
        const promptDescriptions = [];
        const promptTemplates = [];
        for (const prompt of promptRetriever) {
            promptNames.push(prompt.name);
            promptDescriptions.push(prompt.description);
            promptTemplates.push(prompt.systemMessage);
        }
        const chain = chains_1.MultiPromptChain.fromLLMAndPrompts(model, {
            promptNames,
            promptDescriptions,
            promptTemplates,
            llmChainOpts: { verbose: process.env.DEBUG === 'true' ? true : false }
        });
        return chain;
    }
    async run(nodeData, input, options) {
        const chain = nodeData.instance;
        const moderations = nodeData.inputs?.inputModeration;
        if (moderations && moderations.length > 0) {
            try {
                // Use the output of the moderation chain as input for the Multi Prompt Chain
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
            const handler = new handler_1.CustomChainHandler(options.socketIO, options.socketIOClientId, 2);
            const res = await chain.call(obj, [loggerHandler, handler, ...callbacks]);
            return res?.text;
        }
        else {
            const res = await chain.call(obj, [loggerHandler, ...callbacks]);
            return res?.text;
        }
    }
}
module.exports = { nodeClass: MultiPromptChain_Chains };
//# sourceMappingURL=MultiPromptChain.js.map