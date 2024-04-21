"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../src/utils");
const langchain_1 = require("@getzep/zep-cloud/langchain");
class ZepMemoryCloud_Memory {
    constructor() {
        this.label = 'Zep Memory - Cloud';
        this.name = 'ZepMemoryCloud';
        this.version = 2.0;
        this.type = 'ZepMemory';
        this.icon = 'zep.svg';
        this.category = 'Memory';
        this.description = 'Summarizes the conversation and stores the memory in zep server';
        this.baseClasses = [this.type, ...(0, utils_1.getBaseClasses)(langchain_1.ZepMemory)];
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            optional: true,
            description: 'Configure JWT authentication on your Zep instance (Optional)',
            credentialNames: ['zepMemoryApi']
        };
        this.inputs = [
            {
                label: 'Session Id',
                name: 'sessionId',
                type: 'string',
                description: 'If not specified, a random id will be used. Learn <a target="_blank" href="https://docs.flowiseai.com/memory/long-term-memory#ui-and-embedded-chat">more</a>',
                default: '',
                additionalParams: true,
                optional: true
            },
            {
                label: 'Memory Type',
                name: 'memoryType',
                type: 'string',
                default: 'perpetual',
                description: 'Zep Memory Type, can be perpetual or message_window',
                additionalParams: true
            },
            {
                label: 'AI Prefix',
                name: 'aiPrefix',
                type: 'string',
                default: 'ai',
                additionalParams: true
            },
            {
                label: 'Human Prefix',
                name: 'humanPrefix',
                type: 'string',
                default: 'human',
                additionalParams: true
            },
            {
                label: 'Memory Key',
                name: 'memoryKey',
                type: 'string',
                default: 'chat_history',
                additionalParams: true
            },
            {
                label: 'Input Key',
                name: 'inputKey',
                type: 'string',
                default: 'input',
                additionalParams: true
            },
            {
                label: 'Output Key',
                name: 'outputKey',
                type: 'string',
                default: 'text',
                additionalParams: true
            }
        ];
    }
    async init(nodeData, _, options) {
        return await initializeZep(nodeData, options);
    }
}
const initializeZep = async (nodeData, options) => {
    const aiPrefix = nodeData.inputs?.aiPrefix;
    const humanPrefix = nodeData.inputs?.humanPrefix;
    const memoryKey = nodeData.inputs?.memoryKey;
    const inputKey = nodeData.inputs?.inputKey;
    const memoryType = nodeData.inputs?.memoryType;
    const sessionId = nodeData.inputs?.sessionId;
    const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
    const apiKey = (0, utils_1.getCredentialParam)('apiKey', credentialData, nodeData);
    const obj = {
        apiKey,
        aiPrefix,
        humanPrefix,
        memoryKey,
        sessionId,
        inputKey,
        memoryType: memoryType,
        returnMessages: true
    };
    return new ZepMemoryExtended(obj);
};
class ZepMemoryExtended extends langchain_1.ZepMemory {
    constructor(fields) {
        super(fields);
        this.memoryType = fields.memoryType ?? 'perpetual';
    }
    async loadMemoryVariables(values, overrideSessionId = '') {
        if (overrideSessionId) {
            this.sessionId = overrideSessionId;
        }
        return super.loadMemoryVariables({ ...values, memoryType: this.memoryType });
    }
    async saveContext(inputValues, outputValues, overrideSessionId = '') {
        if (overrideSessionId) {
            this.sessionId = overrideSessionId;
        }
        return super.saveContext(inputValues, outputValues);
    }
    async clear(overrideSessionId = '') {
        if (overrideSessionId) {
            this.sessionId = overrideSessionId;
        }
        return super.clear();
    }
    async getChatMessages(overrideSessionId = '', returnBaseMessages = false) {
        const id = overrideSessionId ? overrideSessionId : this.sessionId;
        const memoryVariables = await this.loadMemoryVariables({}, id);
        const baseMessages = memoryVariables[this.memoryKey];
        return returnBaseMessages ? baseMessages : (0, utils_1.convertBaseMessagetoIMessage)(baseMessages);
    }
    async addChatMessages(msgArray, overrideSessionId = '') {
        const id = overrideSessionId ? overrideSessionId : this.sessionId;
        const input = msgArray.find((msg) => msg.type === 'userMessage');
        const output = msgArray.find((msg) => msg.type === 'apiMessage');
        const inputValues = { [this.inputKey ?? 'input']: input?.text };
        const outputValues = { output: output?.text };
        await this.saveContext(inputValues, outputValues, id);
    }
    async clearChatMessages(overrideSessionId = '') {
        const id = overrideSessionId ? overrideSessionId : this.sessionId;
        await this.clear(id);
    }
}
module.exports = { nodeClass: ZepMemoryCloud_Memory };
//# sourceMappingURL=ZepMemoryCloud.js.map