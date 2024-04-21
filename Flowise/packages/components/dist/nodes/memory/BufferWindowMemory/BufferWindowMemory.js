"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Interface_1 = require("../../../src/Interface");
const utils_1 = require("../../../src/utils");
const memory_1 = require("langchain/memory");
class BufferWindowMemory_Memory {
    constructor() {
        this.label = 'Buffer Window Memory';
        this.name = 'bufferWindowMemory';
        this.version = 2.0;
        this.type = 'BufferWindowMemory';
        this.icon = 'memory.svg';
        this.category = 'Memory';
        this.description = 'Uses a window of size k to surface the last k back-and-forth to use as memory';
        this.baseClasses = [this.type, ...(0, utils_1.getBaseClasses)(memory_1.BufferWindowMemory)];
        this.inputs = [
            {
                label: 'Size',
                name: 'k',
                type: 'number',
                default: '4',
                description: 'Window of size k to surface the last k back-and-forth to use as memory.'
            },
            {
                label: 'Session Id',
                name: 'sessionId',
                type: 'string',
                description: 'If not specified, a random id will be used. Learn <a target="_blank" href="https://docs.flowiseai.com/memory#ui-and-embedded-chat">more</a>',
                default: '',
                optional: true,
                additionalParams: true
            },
            {
                label: 'Memory Key',
                name: 'memoryKey',
                type: 'string',
                default: 'chat_history',
                additionalParams: true
            }
        ];
    }
    async init(nodeData, _, options) {
        const k = nodeData.inputs?.k;
        const sessionId = nodeData.inputs?.sessionId;
        const memoryKey = nodeData.inputs?.memoryKey ?? 'chat_history';
        const appDataSource = options.appDataSource;
        const databaseEntities = options.databaseEntities;
        const chatflowid = options.chatflowid;
        const obj = {
            returnMessages: true,
            sessionId,
            memoryKey,
            k: parseInt(k, 10),
            appDataSource,
            databaseEntities,
            chatflowid
        };
        return new BufferWindowMemoryExtended(obj);
    }
}
class BufferWindowMemoryExtended extends Interface_1.FlowiseWindowMemory {
    constructor(fields) {
        super(fields);
        this.sessionId = '';
        this.sessionId = fields.sessionId;
        this.appDataSource = fields.appDataSource;
        this.databaseEntities = fields.databaseEntities;
        this.chatflowid = fields.chatflowid;
    }
    async getChatMessages(overrideSessionId = '', returnBaseMessages = false) {
        const id = overrideSessionId ? overrideSessionId : this.sessionId;
        if (!id)
            return [];
        let chatMessage = await this.appDataSource.getRepository(this.databaseEntities['ChatMessage']).find({
            where: {
                sessionId: id,
                chatflowid: this.chatflowid
            },
            take: this.k + 1,
            order: {
                createdDate: 'DESC' // we get the latest top K
            }
        });
        // reverse the order of human and ai messages
        if (chatMessage.length)
            chatMessage.reverse();
        if (returnBaseMessages) {
            return (0, utils_1.mapChatMessageToBaseMessage)(chatMessage);
        }
        let returnIMessages = [];
        for (const m of chatMessage) {
            returnIMessages.push({
                message: m.content,
                type: m.role
            });
        }
        return returnIMessages;
    }
    async addChatMessages() {
        // adding chat messages is done on server level
        return;
    }
    async clearChatMessages() {
        // clearing chat messages is done on server level
        return;
    }
}
module.exports = { nodeClass: BufferWindowMemory_Memory };
//# sourceMappingURL=BufferWindowMemory.js.map