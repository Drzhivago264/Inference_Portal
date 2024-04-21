"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const llamaindex_1 = require("llamaindex");
const utils_1 = require("../../../src/utils");
class OpenAIFunctionAgent_LlamaIndex_Agents {
    constructor(fields) {
        this.label = 'OpenAI Tool Agent';
        this.name = 'openAIToolAgentLlamaIndex';
        this.version = 1.0;
        this.type = 'OpenAIToolAgent';
        this.category = 'Agents';
        this.icon = 'function.svg';
        this.description = `Agent that uses OpenAI Function Calling to pick the tools and args to call using LlamaIndex`;
        this.baseClasses = [this.type, ...(0, utils_1.getBaseClasses)(llamaindex_1.OpenAIAgent)];
        this.tags = ['LlamaIndex'];
        this.badge = 'NEW';
        this.inputs = [
            {
                label: 'Tools',
                name: 'tools',
                type: 'Tool_LlamaIndex',
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
                type: 'BaseChatModel_LlamaIndex'
            },
            {
                label: 'System Message',
                name: 'systemMessage',
                type: 'string',
                rows: 4,
                optional: true,
                additionalParams: true
            }
        ];
        this.sessionId = fields?.sessionId;
    }
    async init() {
        return null;
    }
    async run(nodeData, input) {
        const memory = nodeData.inputs?.memory;
        const model = nodeData.inputs?.model;
        const systemMessage = nodeData.inputs?.systemMessage;
        let tools = nodeData.inputs?.tools;
        tools = (0, lodash_1.flatten)(tools);
        const chatHistory = [];
        if (systemMessage) {
            chatHistory.push({
                content: systemMessage,
                role: 'system'
            });
        }
        const msgs = (await memory.getChatMessages(this.sessionId, false));
        for (const message of msgs) {
            if (message.type === 'apiMessage') {
                chatHistory.push({
                    content: message.message,
                    role: 'assistant'
                });
            }
            else if (message.type === 'userMessage') {
                chatHistory.push({
                    content: message.message,
                    role: 'user'
                });
            }
        }
        const agent = new llamaindex_1.OpenAIAgent({
            tools,
            llm: model,
            prefixMessages: chatHistory,
            verbose: process.env.DEBUG === 'true' ? true : false
        });
        let text = '';
        const usedTools = [];
        const response = await agent.chat({
            message: input
        });
        if (response.sources.length) {
            for (const sourceTool of response.sources) {
                usedTools.push({
                    tool: sourceTool.toolName,
                    toolInput: sourceTool.rawInput,
                    toolOutput: sourceTool.rawOutput
                });
            }
        }
        text = String(response);
        await memory.addChatMessages([
            {
                text: input,
                type: 'userMessage'
            },
            {
                text: text,
                type: 'apiMessage'
            }
        ], this.sessionId);
        return usedTools.length ? { text: text, usedTools } : text;
    }
}
module.exports = { nodeClass: OpenAIFunctionAgent_LlamaIndex_Agents };
//# sourceMappingURL=OpenAIToolAgent_LlamaIndex.js.map