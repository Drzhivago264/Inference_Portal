"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("@langchain/core/messages");
const prompts_1 = require("@langchain/core/prompts");
const output_parsers_1 = require("langchain/output_parsers");
const chains_1 = require("langchain/chains");
const handler_1 = require("../../../src/handler");
const utils_1 = require("../../../src/utils");
const Moderation_1 = require("../../moderation/Moderation");
const OutputParserHelpers_1 = require("../../outputparsers/OutputParserHelpers");
const multiModalUtils_1 = require("../../../src/multiModalUtils");
class LLMChain_Chains {
    constructor() {
        this.label = 'LLM Chain';
        this.name = 'llmChain';
        this.version = 3.0;
        this.type = 'LLMChain';
        this.icon = 'LLM_Chain.svg';
        this.category = 'Chains';
        this.description = 'Chain to run queries against LLMs';
        this.baseClasses = [this.type, ...(0, utils_1.getBaseClasses)(chains_1.LLMChain)];
        this.inputs = [
            {
                label: 'Language Model',
                name: 'model',
                type: 'BaseLanguageModel'
            },
            {
                label: 'Prompt',
                name: 'prompt',
                type: 'BasePromptTemplate'
            },
            {
                label: 'Output Parser',
                name: 'outputParser',
                type: 'BaseLLMOutputParser',
                optional: true
            },
            {
                label: 'Input Moderation',
                description: 'Detect text that could generate harmful output and prevent it from being sent to the language model',
                name: 'inputModeration',
                type: 'Moderation',
                optional: true,
                list: true
            },
            {
                label: 'Chain Name',
                name: 'chainName',
                type: 'string',
                placeholder: 'Name Your Chain',
                optional: true
            }
        ];
        this.outputs = [
            {
                label: 'LLM Chain',
                name: 'llmChain',
                baseClasses: [this.type, ...(0, utils_1.getBaseClasses)(chains_1.LLMChain)]
            },
            {
                label: 'Output Prediction',
                name: 'outputPrediction',
                baseClasses: ['string', 'json']
            }
        ];
    }
    async init(nodeData, input, options) {
        const model = nodeData.inputs?.model;
        const prompt = nodeData.inputs?.prompt;
        const output = nodeData.outputs?.output;
        let promptValues = nodeData.inputs?.prompt.promptValues;
        const llmOutputParser = nodeData.inputs?.outputParser;
        this.outputParser = llmOutputParser;
        if (llmOutputParser) {
            let autoFix = llmOutputParser.autoFix;
            if (autoFix === true) {
                this.outputParser = output_parsers_1.OutputFixingParser.fromLLM(model, llmOutputParser);
            }
        }
        if (output === this.name) {
            const chain = new chains_1.LLMChain({
                llm: model,
                outputParser: this.outputParser,
                prompt,
                verbose: process.env.DEBUG === 'true'
            });
            return chain;
        }
        else if (output === 'outputPrediction') {
            const chain = new chains_1.LLMChain({
                llm: model,
                outputParser: this.outputParser,
                prompt,
                verbose: process.env.DEBUG === 'true'
            });
            const inputVariables = chain.prompt.inputVariables; // ["product"]
            promptValues = (0, OutputParserHelpers_1.injectOutputParser)(this.outputParser, chain, promptValues);
            const res = await runPrediction(inputVariables, chain, input, promptValues, options, nodeData);
            // eslint-disable-next-line no-console
            console.log('\x1b[92m\x1b[1m\n*****OUTPUT PREDICTION*****\n\x1b[0m\x1b[0m');
            // eslint-disable-next-line no-console
            console.log(res);
            let finalRes = res;
            if (this.outputParser && typeof res === 'object' && Object.prototype.hasOwnProperty.call(res, 'json')) {
                finalRes = res.json;
            }
            /**
             * Apply string transformation to convert special chars:
             * FROM: hello i am ben\n\n\thow are you?
             * TO: hello i am benFLOWISE_NEWLINEFLOWISE_NEWLINEFLOWISE_TABhow are you?
             */
            return (0, utils_1.handleEscapeCharacters)(finalRes, false);
        }
    }
    async run(nodeData, input, options) {
        const inputVariables = nodeData.instance.prompt.inputVariables; // ["product"]
        const chain = nodeData.instance;
        let promptValues = nodeData.inputs?.prompt.promptValues;
        const outputParser = nodeData.inputs?.outputParser;
        if (!this.outputParser && outputParser) {
            this.outputParser = outputParser;
        }
        promptValues = (0, OutputParserHelpers_1.injectOutputParser)(this.outputParser, chain, promptValues);
        const res = await runPrediction(inputVariables, chain, input, promptValues, options, nodeData);
        // eslint-disable-next-line no-console
        console.log('\x1b[93m\x1b[1m\n*****FINAL RESULT*****\n\x1b[0m\x1b[0m');
        // eslint-disable-next-line no-console
        console.log(res);
        return res;
    }
}
const runPrediction = async (inputVariables, chain, input, promptValuesRaw, options, nodeData) => {
    const loggerHandler = new handler_1.ConsoleCallbackHandler(options.logger);
    const callbacks = await (0, handler_1.additionalCallbacks)(nodeData, options);
    const isStreaming = options.socketIO && options.socketIOClientId;
    const socketIO = isStreaming ? options.socketIO : undefined;
    const socketIOClientId = isStreaming ? options.socketIOClientId : '';
    const moderations = nodeData.inputs?.inputModeration;
    if (moderations && moderations.length > 0) {
        try {
            // Use the output of the moderation chain as input for the LLM chain
            input = await (0, Moderation_1.checkInputs)(moderations, input);
        }
        catch (e) {
            await new Promise((resolve) => setTimeout(resolve, 500));
            (0, Moderation_1.streamResponse)(isStreaming, e.message, socketIO, socketIOClientId);
            return (0, OutputParserHelpers_1.formatResponse)(e.message);
        }
    }
    /**
     * Apply string transformation to reverse converted special chars:
     * FROM: { "value": "hello i am benFLOWISE_NEWLINEFLOWISE_NEWLINEFLOWISE_TABhow are you?" }
     * TO: { "value": "hello i am ben\n\n\thow are you?" }
     */
    const promptValues = (0, utils_1.handleEscapeCharacters)(promptValuesRaw, true);
    if ((0, multiModalUtils_1.llmSupportsVision)(chain.llm)) {
        const visionChatModel = chain.llm;
        const messageContent = (0, multiModalUtils_1.addImagesToMessages)(nodeData, options, visionChatModel.multiModalOption);
        if (messageContent?.length) {
            // Change model to gpt-4-vision && max token to higher when using gpt-4-vision
            visionChatModel.setVisionModel();
            // Add image to the message
            if (chain.prompt instanceof prompts_1.PromptTemplate) {
                const existingPromptTemplate = chain.prompt.template;
                const msg = prompts_1.HumanMessagePromptTemplate.fromTemplate([
                    ...messageContent,
                    {
                        text: existingPromptTemplate
                    }
                ]);
                msg.inputVariables = chain.prompt.inputVariables;
                chain.prompt = prompts_1.ChatPromptTemplate.fromMessages([msg]);
            }
            else if (chain.prompt instanceof prompts_1.ChatPromptTemplate) {
                if (chain.prompt.promptMessages.at(-1) instanceof prompts_1.HumanMessagePromptTemplate) {
                    const lastMessage = chain.prompt.promptMessages.pop();
                    const template = lastMessage.prompt.template;
                    const msg = prompts_1.HumanMessagePromptTemplate.fromTemplate([
                        ...messageContent,
                        {
                            text: template
                        }
                    ]);
                    msg.inputVariables = lastMessage.inputVariables;
                    chain.prompt.promptMessages.push(msg);
                }
                else {
                    chain.prompt.promptMessages.push(new messages_1.HumanMessage({ content: messageContent }));
                }
            }
            else if (chain.prompt instanceof prompts_1.FewShotPromptTemplate) {
                let existingFewShotPromptTemplate = chain.prompt.examplePrompt.template;
                let newFewShotPromptTemplate = prompts_1.ChatPromptTemplate.fromMessages([
                    prompts_1.HumanMessagePromptTemplate.fromTemplate(existingFewShotPromptTemplate)
                ]);
                newFewShotPromptTemplate.promptMessages.push(new messages_1.HumanMessage({ content: messageContent }));
                // @ts-ignore
                chain.prompt.examplePrompt = newFewShotPromptTemplate;
            }
        }
        else {
            // revert to previous values if image upload is empty
            visionChatModel.revertToOriginalModel();
        }
    }
    if (promptValues && inputVariables.length > 0) {
        let seen = [];
        for (const variable of inputVariables) {
            seen.push(variable);
            if (promptValues[variable]) {
                seen.pop();
            }
        }
        if (seen.length === 0) {
            // All inputVariables have fixed values specified
            const options = { ...promptValues };
            if (isStreaming) {
                const handler = new handler_1.CustomChainHandler(socketIO, socketIOClientId);
                const res = await chain.call(options, [loggerHandler, handler, ...callbacks]);
                return (0, OutputParserHelpers_1.formatResponse)(res?.text);
            }
            else {
                const res = await chain.call(options, [loggerHandler, ...callbacks]);
                return (0, OutputParserHelpers_1.formatResponse)(res?.text);
            }
        }
        else if (seen.length === 1) {
            // If one inputVariable is not specify, use input (user's question) as value
            const lastValue = seen.pop();
            if (!lastValue)
                throw new Error('Please provide Prompt Values');
            const options = {
                ...promptValues,
                [lastValue]: input
            };
            if (isStreaming) {
                const handler = new handler_1.CustomChainHandler(socketIO, socketIOClientId);
                const res = await chain.call(options, [loggerHandler, handler, ...callbacks]);
                return (0, OutputParserHelpers_1.formatResponse)(res?.text);
            }
            else {
                const res = await chain.call(options, [loggerHandler, ...callbacks]);
                return (0, OutputParserHelpers_1.formatResponse)(res?.text);
            }
        }
        else {
            throw new Error(`Please provide Prompt Values for: ${seen.join(', ')}`);
        }
    }
    else {
        if (isStreaming) {
            const handler = new handler_1.CustomChainHandler(socketIO, socketIOClientId);
            const res = await chain.run(input, [loggerHandler, handler, ...callbacks]);
            return (0, OutputParserHelpers_1.formatResponse)(res);
        }
        else {
            const res = await chain.run(input, [loggerHandler, ...callbacks]);
            return (0, OutputParserHelpers_1.formatResponse)(res);
        }
    }
};
module.exports = { nodeClass: LLMChain_Chains };
//# sourceMappingURL=LLMChain.js.map