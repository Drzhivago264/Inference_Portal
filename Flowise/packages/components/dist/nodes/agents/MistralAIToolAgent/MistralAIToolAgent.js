"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const runnables_1 = require("@langchain/core/runnables");
const function_calling_1 = require("@langchain/core/utils/function_calling");
const prompts_1 = require("@langchain/core/prompts");
const output_parser_1 = require("langchain/agents/openai/output_parser");
const utils_1 = require("../../../src/utils");
const handler_1 = require("../../../src/handler");
const agents_1 = require("../../../src/agents");
const Moderation_1 = require("../../moderation/Moderation");
const OutputParserHelpers_1 = require("../../outputparsers/OutputParserHelpers");
class MistralAIToolAgent_Agents {
    constructor(fields) {
        this.label = 'MistralAI Tool Agent';
        this.name = 'mistralAIToolAgent';
        this.version = 1.0;
        this.type = 'AgentExecutor';
        this.category = 'Agents';
        this.icon = 'MistralAI.svg';
        this.badge = 'DEPRECATING';
        this.description = `Agent that uses MistralAI Function Calling to pick the tools and args to call`;
        this.baseClasses = [this.type, ...(0, utils_1.getBaseClasses)(agents_1.AgentExecutor)];
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
                label: 'MistralAI Chat Model',
                name: 'model',
                type: 'BaseChatModel'
            },
            {
                label: 'System Message',
                name: 'systemMessage',
                type: 'string',
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
        return prepareAgent(nodeData, { sessionId: this.sessionId, chatId: options.chatId, input });
    }
    async run(nodeData, input, options) {
        const memory = nodeData.inputs?.memory;
        const moderations = nodeData.inputs?.inputModeration;
        if (moderations && moderations.length > 0) {
            try {
                // Use the output of the moderation chain as input for the OpenAI Function Agent
                input = await (0, Moderation_1.checkInputs)(moderations, input);
            }
            catch (e) {
                await new Promise((resolve) => setTimeout(resolve, 500));
                (0, Moderation_1.streamResponse)(options.socketIO && options.socketIOClientId, e.message, options.socketIO, options.socketIOClientId);
                return (0, OutputParserHelpers_1.formatResponse)(e.message);
            }
        }
        const executor = prepareAgent(nodeData, { sessionId: this.sessionId, chatId: options.chatId, input });
        const loggerHandler = new handler_1.ConsoleCallbackHandler(options.logger);
        const callbacks = await (0, handler_1.additionalCallbacks)(nodeData, options);
        let res = {};
        let sourceDocuments = [];
        let usedTools = [];
        if (options.socketIO && options.socketIOClientId) {
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
        await memory.addChatMessages([
            {
                text: input,
                type: 'userMessage'
            },
            {
                text: res?.output,
                type: 'apiMessage'
            }
        ], this.sessionId);
        let finalRes = res?.output;
        if (sourceDocuments.length || usedTools.length) {
            finalRes = { text: res?.output };
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
const prepareAgent = (nodeData, flowObj) => {
    const model = nodeData.inputs?.model;
    const memory = nodeData.inputs?.memory;
    const maxIterations = nodeData.inputs?.maxIterations;
    const systemMessage = nodeData.inputs?.systemMessage;
    let tools = nodeData.inputs?.tools;
    tools = (0, lodash_1.flatten)(tools);
    const memoryKey = memory.memoryKey ? memory.memoryKey : 'chat_history';
    const inputKey = memory.inputKey ? memory.inputKey : 'input';
    const prompt = prompts_1.ChatPromptTemplate.fromMessages([
        ['system', systemMessage ? systemMessage : `You are a helpful AI assistant.`],
        new prompts_1.MessagesPlaceholder(memoryKey),
        ['human', `{${inputKey}}`],
        new prompts_1.MessagesPlaceholder('agent_scratchpad')
    ]);
    const llmWithTools = model.bind({
        tools: tools.map(function_calling_1.convertToOpenAITool)
    });
    const runnableAgent = runnables_1.RunnableSequence.from([
        {
            [inputKey]: (i) => i.input,
            agent_scratchpad: (i) => (0, agents_1.formatAgentSteps)(i.steps),
            [memoryKey]: async (_) => {
                const messages = (await memory.getChatMessages(flowObj?.sessionId, true));
                return messages ?? [];
            }
        },
        prompt,
        llmWithTools,
        new output_parser_1.OpenAIToolsAgentOutputParser()
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
module.exports = { nodeClass: MistralAIToolAgent_Agents };
//# sourceMappingURL=MistralAIToolAgent.js.map