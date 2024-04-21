"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Interface_1 = require("../../../src/Interface");
const utils_1 = require("../../../src/utils");
const messages_1 = require("@langchain/core/messages");
const memory_1 = require("langchain/memory");
class ConversationSummaryMemory_Memory {
    constructor() {
        this.label = 'Conversation Summary Memory';
        this.name = 'conversationSummaryMemory';
        this.version = 2.0;
        this.type = 'ConversationSummaryMemory';
        this.icon = 'memory.svg';
        this.category = 'Memory';
        this.description = 'Summarizes the conversation and stores the current summary in memory';
        this.baseClasses = [this.type, ...(0, utils_1.getBaseClasses)(memory_1.ConversationSummaryMemory)];
        this.inputs = [
            {
                label: 'Chat Model',
                name: 'model',
                type: 'BaseChatModel'
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
        const model = nodeData.inputs?.model;
        const sessionId = nodeData.inputs?.sessionId;
        const memoryKey = nodeData.inputs?.memoryKey ?? 'chat_history';
        const appDataSource = options.appDataSource;
        const databaseEntities = options.databaseEntities;
        const chatflowid = options.chatflowid;
        const obj = {
            llm: model,
            memoryKey,
            returnMessages: true,
            sessionId,
            appDataSource,
            databaseEntities,
            chatflowid
        };
        return new ConversationSummaryMemoryExtended(obj);
    }
}
class ConversationSummaryMemoryExtended extends Interface_1.FlowiseSummaryMemory {
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
        this.buffer = '';
        let chatMessage = await this.appDataSource.getRepository(this.databaseEntities['ChatMessage']).find({
            where: {
                sessionId: id,
                chatflowid: this.chatflowid
            },
            order: {
                createdDate: 'ASC'
            }
        });
        const baseMessages = (0, utils_1.mapChatMessageToBaseMessage)(chatMessage);
        // Get summary
        if (this.llm && typeof this.llm !== 'string') {
            this.buffer = baseMessages.length ? await this.predictNewSummary(baseMessages.slice(-2), this.buffer) : '';
        }
        if (returnBaseMessages) {
            return [new messages_1.SystemMessage(this.buffer)];
        }
        if (this.buffer) {
            return [
                {
                    message: this.buffer,
                    type: 'apiMessage'
                }
            ];
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
module.exports = { nodeClass: ConversationSummaryMemory_Memory };
//# sourceMappingURL=ConversationSummaryMemory.js.map