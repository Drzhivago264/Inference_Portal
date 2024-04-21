"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const agents_1 = require("langchain/agents");
const prompts_1 = require("@langchain/core/prompts");
const hub_1 = require("langchain/hub");
const handler_1 = require("../../../src/handler");
const utils_1 = require("../../../src/utils");
const agents_2 = require("../../../src/agents");
const multiModalUtils_1 = require("../../../src/multiModalUtils");
const Moderation_1 = require("../../moderation/Moderation");
const OutputParserHelpers_1 = require("../../outputparsers/OutputParserHelpers");
class ReActAgentChat_Agents {
    constructor(fields) {
        this.label = 'ReAct Agent for Chat Models';
        this.name = 'reactAgentChat';
        this.version = 4.0;
        this.type = 'AgentExecutor';
        this.category = 'Agents';
        this.icon = 'agent.svg';
        this.description = 'Agent that uses the ReAct logic to decide what action to take, optimized to be used with Chat Models';
        this.baseClasses = [this.type, ...(0, utils_1.getBaseClasses)(agents_1.AgentExecutor)];
        this.inputs = [
            {
                label: 'Allowed Tools',
                name: 'tools',
                type: 'Tool',
                list: true
            },
            {
                label: 'Chat Model',
                name: 'model',
                type: 'BaseChatModel'
            },
            {
                label: 'Memory',
                name: 'memory',
                type: 'BaseChatMemory'
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
        const maxIterations = nodeData.inputs?.maxIterations;
        const model = nodeData.inputs?.model;
        let tools = nodeData.inputs?.tools;
        const moderations = nodeData.inputs?.inputModeration;
        if (moderations && moderations.length > 0) {
            try {
                // Use the output of the moderation chain as input for the ReAct Agent for Chat Models
                input = await (0, Moderation_1.checkInputs)(moderations, input);
            }
            catch (e) {
                await new Promise((resolve) => setTimeout(resolve, 500));
                //streamResponse(options.socketIO && options.socketIOClientId, e.message, options.socketIO, options.socketIOClientId)
                return (0, OutputParserHelpers_1.formatResponse)(e.message);
            }
        }
        tools = (0, lodash_1.flatten)(tools);
        const prompt = await (0, hub_1.pull)('hwchase17/react-chat');
        let chatPromptTemplate = undefined;
        if ((0, multiModalUtils_1.llmSupportsVision)(model)) {
            const visionChatModel = model;
            const messageContent = (0, multiModalUtils_1.addImagesToMessages)(nodeData, options, model.multiModalOption);
            if (messageContent?.length) {
                // Change model to vision supported
                visionChatModel.setVisionModel();
                const oldTemplate = prompt.template;
                const msg = prompts_1.HumanMessagePromptTemplate.fromTemplate([
                    ...messageContent,
                    {
                        text: oldTemplate
                    }
                ]);
                msg.inputVariables = prompt.inputVariables;
                chatPromptTemplate = prompts_1.ChatPromptTemplate.fromMessages([msg]);
            }
            else {
                // revert to previous values if image upload is empty
                visionChatModel.revertToOriginalModel();
            }
        }
        const agent = await (0, agents_2.createReactAgent)({
            llm: model,
            tools,
            prompt: chatPromptTemplate ?? prompt
        });
        const executor = new agents_1.AgentExecutor({
            agent,
            tools,
            verbose: process.env.DEBUG === 'true',
            maxIterations: maxIterations ? parseFloat(maxIterations) : undefined
        });
        const callbacks = await (0, handler_1.additionalCallbacks)(nodeData, options);
        const chatHistory = (await memory.getChatMessages(this.sessionId, false)) ?? [];
        const chatHistoryString = chatHistory.map((hist) => hist.message).join('\\n');
        const result = await executor.invoke({ input, chat_history: chatHistoryString }, { callbacks });
        await memory.addChatMessages([
            {
                text: input,
                type: 'userMessage'
            },
            {
                text: result?.output,
                type: 'apiMessage'
            }
        ], this.sessionId);
        return result?.output;
    }
}
module.exports = { nodeClass: ReActAgentChat_Agents };
//# sourceMappingURL=ReActAgentChat.js.map