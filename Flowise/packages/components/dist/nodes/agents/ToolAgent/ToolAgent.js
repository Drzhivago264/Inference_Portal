"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const runnables_1 = require("@langchain/core/runnables");
const prompts_1 = require("@langchain/core/prompts");
const openai_tools_1 = require("langchain/agents/format_scratchpad/openai_tools");
const utils_1 = require("../../../src/utils");
const handler_1 = require("../../../src/handler");
const agents_1 = require("../../../src/agents");
const Moderation_1 = require("../../moderation/Moderation");
const OutputParserHelpers_1 = require("../../outputparsers/OutputParserHelpers");
const multiModalUtils_1 = require("../../../src/multiModalUtils");
class ToolAgent_Agents {
    constructor(fields) {
        this.label = 'Tool Agent';
        this.name = 'toolAgent';
        this.version = 1.0;
        this.type = 'AgentExecutor';
        this.category = 'Agents';
        this.icon = 'toolAgent.png';
        this.description = `Agent that uses Function Calling to pick the tools and args to call`;
        this.baseClasses = [this.type, ...(0, utils_1.getBaseClasses)(agents_1.AgentExecutor)];
        this.badge = 'NEW';
        this.inputs = [
            {
                label: 'Tools',
                name: 'tools',
                type: 'Tool',
                list: true
            },
            {
                label: 'Memory',
                name: 'memory',
                type: 'BaseChatMemory'
            },
            {
                label: 'Tool Calling Chat Model',
                name: 'model',
                type: 'BaseChatModel',
                description: 'Only compatible with models that are capable of function calling. ChatOpenAI, ChatMistral, ChatAnthropic, ChatVertexAI'
            },
            {
                label: 'System Message',
                name: 'systemMessage',
                type: 'string',
                default: `You are a helpful AI assistant.`,
                rows: 4,
                optional: true,
                additionalParams: true
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
                label: 'Max Iterations',
                name: 'maxIterations',
                type: 'number',
                optional: true,
                additionalParams: true
            }
        ];
        this.sessionId = fields?.sessionId;
    }
    async init(nodeData, input, options) {
        return prepareAgent(nodeData, options, { sessionId: this.sessionId, chatId: options.chatId, input });
    }
    async run(nodeData, input, options) {
        const memory = nodeData.inputs?.memory;
        const moderations = nodeData.inputs?.inputModeration;
        const isStreamable = options.socketIO && options.socketIOClientId;
        if (moderations && moderations.length > 0) {
            try {
                // Use the output of the moderation chain as input for the OpenAI Function Agent
                input = await (0, Moderation_1.checkInputs)(moderations, input);
            }
            catch (e) {
                await new Promise((resolve) => setTimeout(resolve, 500));
                if (isStreamable)
                    (0, Moderation_1.streamResponse)(options.socketIO && options.socketIOClientId, e.message, options.socketIO, options.socketIOClientId);
                return (0, OutputParserHelpers_1.formatResponse)(e.message);
            }
        }
        const executor = prepareAgent(nodeData, options, { sessionId: this.sessionId, chatId: options.chatId, input });
        const loggerHandler = new handler_1.ConsoleCallbackHandler(options.logger);
        const callbacks = await (0, handler_1.additionalCallbacks)(nodeData, options);
        let res = {};
        let sourceDocuments = [];
        let usedTools = [];
        if (isStreamable) {
            const handler = new handler_1.CustomChainHandler(options.socketIO, options.socketIOClientId);
            res = await executor.invoke({ input }, { callbacks: [loggerHandler, handler, ...callbacks] });
            if (res.sourceDocuments) {
                options.socketIO.to(options.socketIOClientId).emit('sourceDocuments', (0, lodash_1.flatten)(res.sourceDocuments));
                sourceDocuments = res.sourceDocuments;
            }
            if (res.usedTools) {
                options.socketIO.to(options.socketIOClientId).emit('usedTools', res.usedTools);
                usedTools = res.usedTools;
            }
        }
        else {
            res = await executor.invoke({ input }, { callbacks: [loggerHandler, ...callbacks] });
            if (res.sourceDocuments) {
                sourceDocuments = res.sourceDocuments;
            }
            if (res.usedTools) {
                usedTools = res.usedTools;
            }
        }
        let output = res?.output;
        // Claude 3 Opus tends to spit out <thinking>..</thinking> as well, discard that in final output
        const regexPattern = /<thinking>[\s\S]*?<\/thinking>/;
        const matches = output.match(regexPattern);
        if (matches) {
            for (const match of matches) {
                output = output.replace(match, '');
            }
        }
        await memory.addChatMessages([
            {
                text: input,
                type: 'userMessage'
            },
            {
                text: output,
                type: 'apiMessage'
            }
        ], this.sessionId);
        let finalRes = output;
        if (sourceDocuments.length || usedTools.length) {
            const finalRes = { text: output };
            if (sourceDocuments.length) {
                finalRes.sourceDocuments = (0, lodash_1.flatten)(sourceDocuments);
            }
            if (usedTools.length) {
                finalRes.usedTools = usedTools;
            }
            return finalRes;
        }
        return finalRes;
    }
}
const prepareAgent = (nodeData, options, flowObj) => {
    const model = nodeData.inputs?.model;
    const maxIterations = nodeData.inputs?.maxIterations;
    const memory = nodeData.inputs?.memory;
    const systemMessage = nodeData.inputs?.systemMessage;
    let tools = nodeData.inputs?.tools;
    tools = (0, lodash_1.flatten)(tools);
    const memoryKey = memory.memoryKey ? memory.memoryKey : 'chat_history';
    const inputKey = memory.inputKey ? memory.inputKey : 'input';
    const prompt = prompts_1.ChatPromptTemplate.fromMessages([
        ['system', systemMessage],
        new prompts_1.MessagesPlaceholder(memoryKey),
        ['human', `{${inputKey}}`],
        new prompts_1.MessagesPlaceholder('agent_scratchpad')
    ]);
    if ((0, multiModalUtils_1.llmSupportsVision)(model)) {
        const visionChatModel = model;
        const messageContent = (0, multiModalUtils_1.addImagesToMessages)(nodeData, options, model.multiModalOption);
        if (messageContent?.length) {
            visionChatModel.setVisionModel();
            // Pop the `agent_scratchpad` MessagePlaceHolder
            let messagePlaceholder = prompt.promptMessages.pop();
            if (prompt.promptMessages.at(-1) instanceof prompts_1.HumanMessagePromptTemplate) {
                const lastMessage = prompt.promptMessages.pop();
                const template = lastMessage.prompt.template;
                const msg = prompts_1.HumanMessagePromptTemplate.fromTemplate([
                    ...messageContent,
                    {
                        text: template
                    }
                ]);
                msg.inputVariables = lastMessage.inputVariables;
                prompt.promptMessages.push(msg);
            }
            // Add the `agent_scratchpad` MessagePlaceHolder back
            prompt.promptMessages.push(messagePlaceholder);
        }
        else {
            visionChatModel.revertToOriginalModel();
        }
    }
    if (model.bindTools === undefined) {
        throw new Error(`This agent requires that the "bindTools()" method be implemented on the input model.`);
    }
    const modelWithTools = model.bindTools(tools);
    const runnableAgent = runnables_1.RunnableSequence.from([
        {
            [inputKey]: (i) => i.input,
            agent_scratchpad: (i) => (0, openai_tools_1.formatToOpenAIToolMessages)(i.steps),
            [memoryKey]: async (_) => {
                const messages = (await memory.getChatMessages(flowObj?.sessionId, true));
                return messages ?? [];
            }
        },
        prompt,
        modelWithTools,
        new agents_1.ToolCallingAgentOutputParser()
    ]);
    const executor = agents_1.AgentExecutor.fromAgentAndTools({
        agent: runnableAgent,
        tools,
        sessionId: flowObj?.sessionId,
        chatId: flowObj?.chatId,
        input: flowObj?.input,
        verbose: process.env.DEBUG === 'true' ? true : false,
        maxIterations: maxIterations ? parseFloat(maxIterations) : undefined
    });
    return executor;
};
module.exports = { nodeClass: ToolAgent_Agents };
//# sourceMappingURL=ToolAgent.js.map