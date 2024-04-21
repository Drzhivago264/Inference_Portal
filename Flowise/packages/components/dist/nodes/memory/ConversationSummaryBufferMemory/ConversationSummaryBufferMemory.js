"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Interface_1 = require("../../../src/Interface");
const utils_1 = require("../../../src/utils");
const messages_1 = require("@langchain/core/messages");
const memory_1 = require("langchain/memory");
class ConversationSummaryBufferMemory_Memory {
    constructor() {
        this.label = 'Conversation Summary Buffer Memory';
        this.name = 'conversationSummaryBufferMemory';
        this.version = 1.0;
        this.type = 'ConversationSummaryBufferMemory';
        this.icon = 'memory.svg';
        this.category = 'Memory';
        this.description = 'Uses token length to decide when to summarize conversations';
        this.baseClasses = [this.type, ...(0, utils_1.getBaseClasses)(memory_1.ConversationSummaryBufferMemory)];
        this.inputs = [
            {
                label: 'Chat Model',
                name: 'model',
                type: 'BaseChatModel'
            },
            {
                label: 'Max Token Limit',
                name: 'maxTokenLimit',
                type: 'number',
                default: 2000,
                description: 'Summarize conversations once token limit is reached. Default to 2000'
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
        const _maxTokenLimit = nodeData.inputs?.maxTokenLimit;
        const maxTokenLimit = _maxTokenLimit ? parseInt(_maxTokenLimit, 10) : 2000;
        const sessionId = nodeData.inputs?.sessionId;
        const memoryKey = nodeData.inputs?.memoryKey ?? 'chat_history';
        const appDataSource = options.appDataSource;
        const databaseEntities = options.databaseEntities;
        const chatflowid = options.chatflowid;
        const obj = {
            llm: model,
            sessionId,
            memoryKey,
            maxTokenLimit,
            returnMessages: true,
            appDataSource,
            databaseEntities,
            chatflowid
        };
        return new ConversationSummaryBufferMemoryExtended(obj);
    }
}
class ConversationSummaryBufferMemoryExtended extends Interface_1.FlowiseSummaryBufferMemory {
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
            order: {
                createdDate: 'ASC'
            }
        });
        let baseMessages = (0, utils_1.mapChatMessageToBaseMessage)(chatMessage);
        // Prune baseMessages if it exceeds max token limit
        if (this.movingSummaryBuffer) {
            baseMessages = [new this.summaryChatMessageClass(this.movingSummaryBuffer), ...baseMessages];
        }
        let currBufferLength = 0;
        if (this.llm && typeof this.llm !== 'string') {
            currBufferLength = await this.llm.getNumTokens((0, messages_1.getBufferString)(baseMessages, this.humanPrefix, this.aiPrefix));
            if (currBufferLength > this.maxTokenLimit) {
                const prunedMemory = [];
                while (currBufferLength > this.maxTokenLimit) {
                    const poppedMessage = baseMessages.shift();
                    if (poppedMessage) {
                        prunedMemory.push(poppedMessage);
                        currBufferLength = await this.llm.getNumTokens((0, messages_1.getBufferString)(baseMessages, this.humanPrefix, this.aiPrefix));
                    }
                }
                this.movingSummaryBuffer = await this.predictNewSummary(prunedMemory, this.movingSummaryBuffer);
            }
        }
        // ----------- Finished Pruning ---------------
        if (this.movingSummaryBuffer) {
            baseMessages = [new this.summaryChatMessageClass(this.movingSummaryBuffer), ...baseMessages];
        }
        if (returnBaseMessages) {
            return baseMessages;
        }
        let returnIMessages = [];
        for (const m of baseMessages) {
            returnIMessages.push({
                message: m.content,
                type: m._getType() === 'human' ? 'userMessage' : 'apiMessage'
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
module.exports = { nodeClass: ConversationSummaryBufferMemory_Memory };
//# sourceMappingURL=ConversationSummaryBufferMemory.js.map