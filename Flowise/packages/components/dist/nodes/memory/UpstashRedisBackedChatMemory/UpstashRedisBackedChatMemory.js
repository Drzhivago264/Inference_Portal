"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("@upstash/redis");
const lodash_1 = require("lodash");
const memory_1 = require("langchain/memory");
const upstash_redis_1 = require("@langchain/community/stores/message/upstash_redis");
const messages_1 = require("@langchain/core/messages");
const Interface_1 = require("../../../src/Interface");
const utils_1 = require("../../../src/utils");
let redisClientSingleton;
let redisClientOption;
const getRedisClientbyOption = (option) => {
    if (!redisClientSingleton) {
        // if client doesn't exists
        redisClientSingleton = new redis_1.Redis(option);
        redisClientOption = option;
        return redisClientSingleton;
    }
    else if (redisClientSingleton && !(0, lodash_1.isEqual)(option, redisClientOption)) {
        // if client exists but option changed
        redisClientSingleton = new redis_1.Redis(option);
        redisClientOption = option;
        return redisClientSingleton;
    }
    return redisClientSingleton;
};
class UpstashRedisBackedChatMemory_Memory {
    constructor() {
        this.label = 'Upstash Redis-Backed Chat Memory';
        this.name = 'upstashRedisBackedChatMemory';
        this.version = 2.0;
        this.type = 'UpstashRedisBackedChatMemory';
        this.icon = 'upstash.svg';
        this.category = 'Memory';
        this.description = 'Summarizes the conversation and stores the memory in Upstash Redis server';
        this.baseClasses = [this.type, ...(0, utils_1.getBaseClasses)(memory_1.BufferMemory)];
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            description: 'Configure password authentication on your upstash redis instance',
            credentialNames: ['upstashRedisMemoryApi']
        };
        this.inputs = [
            {
                label: 'Upstash Redis REST URL',
                name: 'baseURL',
                type: 'string',
                placeholder: 'https://<your-url>.upstash.io'
            },
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
                label: 'Session Timeouts',
                name: 'sessionTTL',
                type: 'number',
                description: 'Omit this parameter to make sessions never expire',
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
        return initalizeUpstashRedis(nodeData, options);
    }
}
const initalizeUpstashRedis = async (nodeData, options) => {
    const baseURL = nodeData.inputs?.baseURL;
    const sessionId = nodeData.inputs?.sessionId;
    const memoryKey = nodeData.inputs?.memoryKey;
    const _sessionTTL = nodeData.inputs?.sessionTTL;
    const sessionTTL = _sessionTTL ? parseInt(_sessionTTL, 10) : undefined;
    const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
    const upstashRestToken = (0, utils_1.getCredentialParam)('upstashRestToken', credentialData, nodeData);
    const client = getRedisClientbyOption({
        url: baseURL,
        token: upstashRestToken
    });
    const redisChatMessageHistory = new upstash_redis_1.UpstashRedisChatMessageHistory({
        sessionId,
        sessionTTL,
        client
    });
    const memory = new BufferMemoryExtended({
        memoryKey: memoryKey ?? 'chat_history',
        chatHistory: redisChatMessageHistory,
        sessionId,
        sessionTTL,
        redisClient: client
    });
    return memory;
};
class BufferMemoryExtended extends Interface_1.FlowiseMemory {
    constructor(fields) {
        super(fields);
        this.sessionId = '';
        this.sessionId = fields.sessionId;
        this.redisClient = fields.redisClient;
        this.sessionTTL = fields.sessionTTL;
    }
    async getChatMessages(overrideSessionId = '', returnBaseMessages = false) {
        if (!this.redisClient)
            return [];
        const id = overrideSessionId ? overrideSessionId : this.sessionId;
        const rawStoredMessages = await this.redisClient.lrange(id, 0, -1);
        const orderedMessages = rawStoredMessages.reverse();
        const previousMessages = orderedMessages.filter((x) => x.type !== undefined && x.data.content !== undefined);
        const baseMessages = previousMessages.map(messages_1.mapStoredMessageToChatMessage);
        return returnBaseMessages ? baseMessages : (0, utils_1.convertBaseMessagetoIMessage)(baseMessages);
    }
    async addChatMessages(msgArray, overrideSessionId = '') {
        if (!this.redisClient)
            return;
        const id = overrideSessionId ? overrideSessionId : this.sessionId;
        const input = msgArray.find((msg) => msg.type === 'userMessage');
        const output = msgArray.find((msg) => msg.type === 'apiMessage');
        if (input) {
            const newInputMessage = new messages_1.HumanMessage(input.text);
            const messageToAdd = [newInputMessage].map((msg) => msg.toDict());
            await this.redisClient.lpush(id, JSON.stringify(messageToAdd[0]));
            if (this.sessionTTL)
                await this.redisClient.expire(id, this.sessionTTL);
        }
        if (output) {
            const newOutputMessage = new messages_1.AIMessage(output.text);
            const messageToAdd = [newOutputMessage].map((msg) => msg.toDict());
            await this.redisClient.lpush(id, JSON.stringify(messageToAdd[0]));
            if (this.sessionTTL)
                await this.redisClient.expire(id, this.sessionTTL);
        }
    }
    async clearChatMessages(overrideSessionId = '') {
        if (!this.redisClient)
            return;
        const id = overrideSessionId ? overrideSessionId : this.sessionId;
        await this.redisClient.del(id);
        await this.clear();
    }
}
module.exports = { nodeClass: UpstashRedisBackedChatMemory_Memory };
//# sourceMappingURL=UpstashRedisBackedChatMemory.js.map