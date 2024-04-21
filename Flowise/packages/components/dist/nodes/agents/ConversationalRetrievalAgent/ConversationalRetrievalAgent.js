"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const runnables_1 = require("@langchain/core/runnables");
const openai_1 = require("@langchain/openai");
const prompts_1 = require("@langchain/core/prompts");
const output_parser_1 = require("langchain/agents/openai/output_parser");
const utils_1 = require("../../../src/utils");
const handler_1 = require("../../../src/handler");
const agents_1 = require("../../../src/agents");
const Moderation_1 = require("../../moderation/Moderation");
const OutputParserHelpers_1 = require("../../outputparsers/OutputParserHelpers");
const defaultMessage = `Do your best to answer the questions. Feel free to use any tools available to look up relevant information, only if necessary.`;
class ConversationalRetrievalAgent_Agents {
    constructor(fields) {
        this.label = 'Conversational Retrieval Agent';
        this.name = 'conversationalRetrievalAgent';
        this.version = 4.0;
        this.type = 'AgentExecutor';
        this.category = 'Agents';
        this.badge = 'DEPRECATING';
        this.icon = 'agent.svg';
        this.description = `An agent optimized for retrieval during conversation, answering questions based on past dialogue, all using OpenAI's Function Calling`;
        this.baseClasses = [this.type, ...(0, utils_1.getBaseClasses)(agents_1.AgentExecutor)];
        this.inputs = [
            {
                label: 'Allowed Tools',
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
                label: 'OpenAI/Azure Chat Model',
                name: 'model',
                type: 'BaseChatModel'
            },
            {
                label: 'System Message',
                name: 'systemMessage',
                type: 'string',
                default: defaultMessage,
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
                // Use the output of the moderation chain as input for the BabyAGI agent
                input = await (0, Moderation_1.checkInputs)(moderations, input);
            }
            catch (e) {
                await new Promise((resolve) => setTimeout(resolve, 500));
                //streamResponse(options.socketIO && options.socketIOClientId, e.message, options.socketIO, options.socketIOClientId)
                return (0, OutputParserHelpers_1.formatResponse)(e.message);
            }
        }
        const executor = prepareAgent(nodeData, { sessionId: this.sessionId, chatId: options.chatId, input });
        const loggerHandler = new handler_1.ConsoleCallbackHandler(options.logger);
        const callbacks = await (0, handler_1.additionalCallbacks)(nodeData, options);
        let res = {};
        if (options.socketIO && options.socketIOClientId) {
            const handler = new handler_1.CustomChainHandler(options.socketIO, options.socketIOClientId);
            res = await executor.invoke({ input }, { callbacks: [loggerHandler, handler, ...callbacks] });
        }
        else {
            res = await executor.invoke({ input }, { callbacks: [loggerHandler, ...callbacks] });
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
        return res?.output;
    }
}
const prepareAgent = (nodeData, flowObj) => {
    const model = nodeData.inputs?.model;
    const memory = nodeData.inputs?.memory;
    const systemMessage = nodeData.inputs?.systemMessage;
    const maxIterations = nodeData.inputs?.maxIterations;
    let tools = nodeData.inputs?.tools;
    tools = (0, lodash_1.flatten)(tools);
    const memoryKey = memory.memoryKey ? memory.memoryKey : 'chat_history';
    const inputKey = memory.inputKey ? memory.inputKey : 'input';
    const prompt = prompts_1.ChatPromptTemplate.fromMessages([
        ['ai', systemMessage ? systemMessage : defaultMessage],
        new prompts_1.MessagesPlaceholder(memoryKey),
        ['human', `{${inputKey}}`],
        new prompts_1.MessagesPlaceholder('agent_scratchpad')
    ]);
    const modelWithFunctions = model.bind({
        functions: [...tools.map((tool) => (0, openai_1.formatToOpenAIFunction)(tool))]
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
        modelWithFunctions,
        new output_parser_1.OpenAIFunctionsAgentOutputParser()
    ]);
    const executor = agents_1.AgentExecutor.fromAgentAndTools({
        agent: runnableAgent,
        tools,
        sessionId: flowObj?.sessionId,
        chatId: flowObj?.chatId,
        input: flowObj?.input,
        returnIntermediateSteps: true,
        verbose: process.env.DEBUG === 'true' ? true : false,
        maxIterations: maxIterations ? parseFloat(maxIterations) : undefined
    });
    return executor;
};
module.exports = { nodeClass: ConversationalRetrievalAgent_Agents };
//# sourceMappingURL=ConversationalRetrievalAgent.js.map