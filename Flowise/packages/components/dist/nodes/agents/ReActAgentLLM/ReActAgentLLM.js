"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const agents_1 = require("langchain/agents");
const hub_1 = require("langchain/hub");
const handler_1 = require("../../../src/handler");
const utils_1 = require("../../../src/utils");
const agents_2 = require("../../../src/agents");
const Moderation_1 = require("../../moderation/Moderation");
const OutputParserHelpers_1 = require("../../outputparsers/OutputParserHelpers");
class ReActAgentLLM_Agents {
    constructor() {
        this.label = 'ReAct Agent for LLMs';
        this.name = 'reactAgentLLM';
        this.version = 2.0;
        this.type = 'AgentExecutor';
        this.category = 'Agents';
        this.icon = 'agent.svg';
        this.description = 'Agent that uses the ReAct logic to decide what action to take, optimized to be used with LLMs';
        this.baseClasses = [this.type, ...(0, utils_1.getBaseClasses)(agents_1.AgentExecutor)];
        this.inputs = [
            {
                label: 'Allowed Tools',
                name: 'tools',
                type: 'Tool',
                list: true
            },
            {
                label: 'Language Model',
                name: 'model',
                type: 'BaseLanguageModel'
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
    }
    async init() {
        return null;
    }
    async run(nodeData, input, options) {
        const model = nodeData.inputs?.model;
        const maxIterations = nodeData.inputs?.maxIterations;
        let tools = nodeData.inputs?.tools;
        const moderations = nodeData.inputs?.inputModeration;
        if (moderations && moderations.length > 0) {
            try {
                // Use the output of the moderation chain as input for the ReAct Agent for LLMs
                input = await (0, Moderation_1.checkInputs)(moderations, input);
            }
            catch (e) {
                await new Promise((resolve) => setTimeout(resolve, 500));
                //streamResponse(options.socketIO && options.socketIOClientId, e.message, options.socketIO, options.socketIOClientId)
                return (0, OutputParserHelpers_1.formatResponse)(e.message);
            }
        }
        tools = (0, lodash_1.flatten)(tools);
        const prompt = await (0, hub_1.pull)('hwchase17/react');
        const agent = await (0, agents_2.createReactAgent)({
            llm: model,
            tools,
            prompt
        });
        const executor = new agents_1.AgentExecutor({
            agent,
            tools,
            verbose: process.env.DEBUG === 'true' ? true : false,
            maxIterations: maxIterations ? parseFloat(maxIterations) : undefined
        });
        const callbacks = await (0, handler_1.additionalCallbacks)(nodeData, options);
        const result = await executor.invoke({ input }, { callbacks });
        return result?.output;
    }
}
module.exports = { nodeClass: ReActAgentLLM_Agents };
//# sourceMappingURL=ReActAgentLLM.js.map