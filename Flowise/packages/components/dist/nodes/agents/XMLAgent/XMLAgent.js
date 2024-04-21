"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const runnables_1 = require("@langchain/core/runnables");
const prompts_1 = require("@langchain/core/prompts");
const log_to_message_1 = require("langchain/agents/format_scratchpad/log_to_message");
const utils_1 = require("../../../src/utils");
const handler_1 = require("../../../src/handler");
const agents_1 = require("../../../src/agents");
const Moderation_1 = require("../../moderation/Moderation");
const OutputParserHelpers_1 = require("../../outputparsers/OutputParserHelpers");
const defaultSystemMessage = `You are a helpful assistant. Help the user answer any questions.

You have access to the following tools:

{tools}

In order to use a tool, you can use <tool></tool> and <tool_input></tool_input> tags. You will then get back a response in the form <observation></observation>
For example, if you have a tool called 'search' that could run a google search, in order to search for the weather in SF you would respond:

<tool>search</tool><tool_input>weather in SF</tool_input>
<observation>64 degrees</observation>

When you are done, respond with a final answer between <final_answer></final_answer>. For example:

<final_answer>The weather in SF is 64 degrees</final_answer>

Begin!

Previous Conversation:
{chat_history}

Question: {input}
{agent_scratchpad}`;
class XMLAgent_Agents {
    constructor(fields) {
        this.label = 'XML Agent';
        this.name = 'xmlAgent';
        this.version = 2.0;
        this.type = 'XMLAgent';
        this.category = 'Agents';
        this.icon = 'xmlagent.svg';
        this.description = `Agent that is designed for LLMs that are good for reasoning/writing XML (e.g: Anthropic Claude)`;
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
                label: 'Chat Model',
                name: 'model',
                type: 'BaseChatModel'
            },
            {
                label: 'System Message',
                name: 'systemMessage',
                type: 'string',
                warning: 'Prompt must include input variables: {tools}, {chat_history}, {input} and {agent_scratchpad}',
                rows: 4,
                default: defaultSystemMessage,
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
    async init() {
        return null;
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
                //streamResponse(options.socketIO && options.socketIOClientId, e.message, options.socketIO, options.socketIOClientId)
                return (0, OutputParserHelpers_1.formatResponse)(e.message);
            }
        }
        const executor = await prepareAgent(nodeData, { sessionId: this.sessionId, chatId: options.chatId, input });
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
const prepareAgent = async (nodeData, flowObj) => {
    const model = nodeData.inputs?.model;
    const maxIterations = nodeData.inputs?.maxIterations;
    const memory = nodeData.inputs?.memory;
    const systemMessage = nodeData.inputs?.systemMessage;
    let tools = nodeData.inputs?.tools;
    tools = (0, lodash_1.flatten)(tools);
    const inputKey = memory.inputKey ? memory.inputKey : 'input';
    const memoryKey = memory.memoryKey ? memory.memoryKey : 'chat_history';
    let promptMessage = systemMessage ? systemMessage : defaultSystemMessage;
    if (memory.memoryKey)
        promptMessage = promptMessage.replaceAll('{chat_history}', `{${memory.memoryKey}}`);
    if (memory.inputKey)
        promptMessage = promptMessage.replaceAll('{input}', `{${memory.inputKey}}`);
    const prompt = prompts_1.ChatPromptTemplate.fromMessages([
        prompts_1.HumanMessagePromptTemplate.fromTemplate(promptMessage),
        new prompts_1.MessagesPlaceholder('agent_scratchpad')
    ]);
    const missingVariables = ['tools', 'agent_scratchpad'].filter((v) => !prompt.inputVariables.includes(v));
    if (missingVariables.length > 0) {
        throw new Error(`Provided prompt is missing required input variables: ${JSON.stringify(missingVariables)}`);
    }
    const llmWithStop = model.bind({ stop: ['</tool_input>', '</final_answer>'] });
    const messages = (await memory.getChatMessages(flowObj.sessionId, false));
    let chatHistoryMsgTxt = '';
    for (const message of messages) {
        if (message.type === 'apiMessage') {
            chatHistoryMsgTxt += `\\nAI:${message.message}`;
        }
        else if (message.type === 'userMessage') {
            chatHistoryMsgTxt += `\\nHuman:${message.message}`;
        }
    }
    const runnableAgent = runnables_1.RunnableSequence.from([
        {
            [inputKey]: (i) => i.input,
            agent_scratchpad: (i) => (0, log_to_message_1.formatLogToMessage)(i.steps),
            tools: (_) => tools.map((tool) => `${tool.name}: ${tool.description}`),
            [memoryKey]: (_) => chatHistoryMsgTxt
        },
        prompt,
        llmWithStop,
        new agents_1.XMLAgentOutputParser()
    ]);
    const executor = agents_1.AgentExecutor.fromAgentAndTools({
        agent: runnableAgent,
        tools,
        sessionId: flowObj?.sessionId,
        chatId: flowObj?.chatId,
        input: flowObj?.input,
        isXML: true,
        verbose: process.env.DEBUG === 'true' ? true : false,
        maxIterations: maxIterations ? parseFloat(maxIterations) : undefined
    });
    return executor;
};
module.exports = { nodeClass: XMLAgent_Agents };
//# sourceMappingURL=XMLAgent.js.map