"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Interface_1 = require("../../../src/Interface");
const utils_1 = require("../../../src/utils");
const memory_1 = require("langchain/memory");
class BufferMemory_Memory {
    constructor() {
        this.label = 'Buffer Memory';
        this.name = 'bufferMemory';
        this.version = 2.0;
        this.type = 'BufferMemory';
        this.icon = 'memory.svg';
        this.category = 'Memory';
        this.description = 'Retrieve chat messages stored in database';
        this.baseClasses = [this.type, ...(0, utils_1.getBaseClasses)(memory_1.BufferMemory)];
        this.inputs = [
            {
                label: 'Session Id',
                name: 'sessionId',
                type: 'string',
                description: 'If not specified, a random id will be used. Learn <a target="_blank" href="https://docs.flowiseai.com/memory#ui-and-embedded-chat">more</a>',
                default: '',
                additionalParams: true,
                optional: true
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
        const sessionId = nodeData.inputs?.sessionId;
        const memoryKey = nodeData.inputs?.memoryKey ?? 'chat_history';
        const appDataSource = options.appDataSource;
        const databaseEntities = options.databaseEntities;
        const chatflowid = options.chatflowid;
        return new BufferMemoryExtended({
            returnMessages: true,
            memoryKey,
            sessionId,
            appDataSource,
            databaseEntities,
            chatflowid
        });
    }
}
class BufferMemoryExtended extends Interface_1.FlowiseMemory {
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
        const chatMessage = await this.appDataSource.getRepository(this.databaseEntities['ChatMessage']).find({
            where: {
                sessionId: id,
                chatflowid: this.chatflowid
            },
            order: {
                createdDate: 'ASC'
            }
        });
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
module.exports = { nodeClass: BufferMemory_Memory };
//# sourceMappingURL=BufferMemory.js.map