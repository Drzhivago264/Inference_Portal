"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chains_1 = require("langchain/chains");
const prompts_1 = require("@langchain/core/prompts");
const runnables_1 = require("@langchain/core/runnables");
const output_parsers_1 = require("@langchain/core/output_parsers");
const messages_1 = require("@langchain/core/messages");
const console_1 = require("@langchain/core/tracers/console");
const Moderation_1 = require("../../moderation/Moderation");
const OutputParserHelpers_1 = require("../../outputparsers/OutputParserHelpers");
const multiModalUtils_1 = require("../../../src/multiModalUtils");
const FlowiseChatOpenAI_1 = require("../../chatmodels/ChatOpenAI/FlowiseChatOpenAI");
const handler_1 = require("../../../src/handler");
const utils_1 = require("../../../src/utils");
let systemMessage = `The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know.`;
const inputKey = 'input';
class ConversationChain_Chains {
    constructor(fields) {
        this.label = 'Conversation Chain';
        this.name = 'conversationChain';
        this.version = 3.0;
        this.type = 'ConversationChain';
        this.icon = 'conv.svg';
        this.category = 'Chains';
        this.description = 'Chat models specific conversational chain with memory';
        this.baseClasses = [this.type, ...(0, utils_1.getBaseClasses)(chains_1.ConversationChain)];
        this.inputs = [
            {
                label: 'Chat Model',
                name: 'model',
                type: 'BaseChatModel'
            },
            {
                label: 'Memory',
                name: 'memory',
                type: 'BaseMemory'
            },
            {
                label: 'Chat Prompt Template',
                name: 'chatPromptTemplate',
                type: 'ChatPromptTemplate',
                description: 'Override existing prompt with Chat Prompt Template. Human Message must includes {input} variable',
                optional: true
            },
            /* Deprecated
            {
                label: 'Document',
                name: 'document',
                type: 'Document',
                description:
                    'Include whole document into the context window, if you get maximum context length error, please use model with higher context window like Claude 100k, or gpt4 32k',
                optional: true,
                list: true
            },*/
            {
                label: 'Input Moderation',
                description: 'Detect text that could generate harmful output and prevent it from being sent to the language model',
                name: 'inputModeration',
                type: 'Moderation',
                optional: true,
                list: true
            },
            {
                label: 'System Message',
                name: 'systemMessagePrompt',
                type: 'string',
                rows: 4,
                description: 'If Chat Prompt Template is provided, this will be ignored',
                additionalParams: true,
                optional: true,
                default: systemMessage,
                placeholder: systemMessage
            }
        ];
        this.sessionId = fields?.sessionId;
    }
    async init(nodeData, _, options) {
        const chain = prepareChain(nodeData, options, this.sessionId);
        return chain;
    }
    async run(nodeData, input, options) {
        const memory = nodeData.inputs?.memory;
        const chain = prepareChain(nodeData, options, this.sessionId);
        const moderations = nodeData.inputs?.inputModeration;
        if (moderations && moderations.length > 0) {
            try {
                // Use the output of the moderation chain as input for the LLM chain
                input = await (0, Moderation_1.checkInputs)(moderations, input);
            }
            catch (e) {
                await new Promise((resolve) => setTimeout(resolve, 500));
                (0, Moderation_1.streamResponse)(options.socketIO && options.socketIOClientId, e.message, options.socketIO, options.socketIOClientId);
                return (0, OutputParserHelpers_1.formatResponse)(e.message);
            }
        }
        const loggerHandler = new handler_1.ConsoleCallbackHandler(options.logger);
        const additionalCallback = await (0, handler_1.additionalCallbacks)(nodeData, options);
        let res = '';
        let callbacks = [loggerHandler, ...additionalCallback];
        if (process.env.DEBUG === 'true') {
            callbacks.push(new console_1.ConsoleCallbackHandler());
        }
        if (options.socketIO && options.socketIOClientId) {
            const handler = new handler_1.CustomChainHandler(options.socketIO, options.socketIOClientId);
            callbacks.push(handler);
            res = await chain.invoke({ input }, { callbacks });
        }
        else {
            res = await chain.invoke({ input }, { callbacks });
        }
        await memory.addChatMessages([
            {
                text: input,
                type: 'userMessage'
            },
            {
                text: res,
                type: 'apiMessage'
            }
        ], this.sessionId);
        return res;
    }
}
const prepareChatPrompt = (nodeData, humanImageMessages) => {
    const memory = nodeData.inputs?.memory;
    const prompt = nodeData.inputs?.systemMessagePrompt;
    const chatPromptTemplate = nodeData.inputs?.chatPromptTemplate;
    let model = nodeData.inputs?.model;
    if (chatPromptTemplate && chatPromptTemplate.promptMessages.length) {
        const sysPrompt = chatPromptTemplate.promptMessages[0];
        const humanPrompt = chatPromptTemplate.promptMessages[chatPromptTemplate.promptMessages.length - 1];
        const messages = [sysPrompt, new prompts_1.MessagesPlaceholder(memory.memoryKey ?? 'chat_history'), humanPrompt];
        // OpenAI works better when separate images into standalone human messages
        if (model instanceof FlowiseChatOpenAI_1.ChatOpenAI && humanImageMessages.length) {
            messages.push(new messages_1.HumanMessage({ content: [...humanImageMessages] }));
        }
        else if (humanImageMessages.length) {
            const lastMessage = messages.pop();
            const template = lastMessage.prompt.template;
            const msg = prompts_1.HumanMessagePromptTemplate.fromTemplate([
                ...humanImageMessages,
                {
                    text: template
                }
            ]);
            msg.inputVariables = lastMessage.inputVariables;
            messages.push(msg);
        }
        const chatPrompt = prompts_1.ChatPromptTemplate.fromMessages(messages);
        if (chatPromptTemplate.promptValues) {
            // @ts-ignore
            chatPrompt.promptValues = chatPromptTemplate.promptValues;
        }
        return chatPrompt;
    }
    const messages = [
        prompts_1.SystemMessagePromptTemplate.fromTemplate(prompt ? prompt : systemMessage),
        new prompts_1.MessagesPlaceholder(memory.memoryKey ?? 'chat_history'),
        prompts_1.HumanMessagePromptTemplate.fromTemplate(`{${inputKey}}`)
    ];
    // OpenAI works better when separate images into standalone human messages
    if (model instanceof FlowiseChatOpenAI_1.ChatOpenAI && humanImageMessages.length) {
        messages.push(new messages_1.HumanMessage({ content: [...humanImageMessages] }));
    }
    else if (humanImageMessages.length) {
        messages.pop();
        messages.push(prompts_1.HumanMessagePromptTemplate.fromTemplate([`{${inputKey}}`, ...humanImageMessages]));
    }
    const chatPrompt = prompts_1.ChatPromptTemplate.fromMessages(messages);
    return chatPrompt;
};
const prepareChain = (nodeData, options, sessionId) => {
    let model = nodeData.inputs?.model;
    const memory = nodeData.inputs?.memory;
    const memoryKey = memory.memoryKey ?? 'chat_history';
    let messageContent = [];
    if ((0, multiModalUtils_1.llmSupportsVision)(model)) {
        messageContent = (0, multiModalUtils_1.addImagesToMessages)(nodeData, options, model.multiModalOption);
        const visionChatModel = model;
        if (messageContent?.length) {
            visionChatModel.setVisionModel();
        }
        else {
            // revert to previous values if image upload is empty
            visionChatModel.revertToOriginalModel();
        }
    }
    const chatPrompt = prepareChatPrompt(nodeData, messageContent);
    let promptVariables = {};
    const promptValuesRaw = chatPrompt.promptValues;
    if (promptValuesRaw) {
        const promptValues = (0, utils_1.handleEscapeCharacters)(promptValuesRaw, true);
        for (const val in promptValues) {
            promptVariables = {
                ...promptVariables,
                [val]: () => {
                    return promptValues[val];
                }
            };
        }
    }
    const conversationChain = runnables_1.RunnableSequence.from([
        {
            [inputKey]: (input) => input.input,
            [memoryKey]: async () => {
                const history = await memory.getChatMessages(sessionId, true);
                return history;
            },
            ...promptVariables
        },
        prepareChatPrompt(nodeData, messageContent),
        model,
        new output_parsers_1.StringOutputParser()
    ]);
    return conversationChain;
};
module.exports = { nodeClass: ConversationChain_Chains };
//# sourceMappingURL=ConversationChain.js.map