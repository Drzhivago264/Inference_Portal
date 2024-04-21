"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = require("ioredis");
const lodash_1 = require("lodash");
const memory_1 = require("langchain/memory");
const ioredis_2 = require("@langchain/community/stores/message/ioredis");
const messages_1 = require("@langchain/core/messages");
const Interface_1 = require("../../../src/Interface");
const utils_1 = require("../../../src/utils");
let redisClientSingleton;
let redisClientOption;
let redisClientUrl;
const getRedisClientbyOption = (option) => {
    if (!redisClientSingleton) {
        // if client doesn't exists
        redisClientSingleton = new ioredis_1.Redis(option);
        redisClientOption = option;
        return redisClientSingleton;
    }
    else if (redisClientSingleton && !(0, lodash_1.isEqual)(option, redisClientOption)) {
        // if client exists but option changed
        redisClientSingleton.quit();
        redisClientSingleton = new ioredis_1.Redis(option);
        redisClientOption = option;
        return redisClientSingleton;
    }
    return redisClientSingleton;
};
const getRedisClientbyUrl = (url) => {
    if (!redisClientSingleton) {
        // if client doesn't exists
        redisClientSingleton = new ioredis_1.Redis(url);
        redisClientUrl = url;
        return redisClientSingleton;
    }
    else if (redisClientSingleton && url !== redisClientUrl) {
        // if client exists but option changed
        redisClientSingleton.quit();
        redisClientSingleton = new ioredis_1.Redis(url);
        redisClientUrl = url;
        return redisClientSingleton;
    }
    return redisClientSingleton;
};
class RedisBackedChatMemory_Memory {
    constructor() {
        this.label = 'Redis-Backed Chat Memory';
        this.name = 'RedisBackedChatMemory';
        this.version = 2.0;
        this.type = 'RedisBackedChatMemory';
        this.icon = 'redis.svg';
        this.category = 'Memory';
        this.description = 'Summarizes the conversation and stores the memory in Redis server';
        this.baseClasses = [this.type, ...(0, utils_1.getBaseClasses)(memory_1.BufferMemory)];
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            optional: true,
            credentialNames: ['redisCacheApi', 'redisCacheUrlApi']
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
            },
            {
                label: 'Window Size',
                name: 'windowSize',
                type: 'number',
                description: 'Window of size k to surface the last k back-and-forth to use as memory.',
                additionalParams: true,
                optional: true
            }
        ];
    }
    async init(nodeData, _, options) {
        return await initalizeRedis(nodeData, options);
    }
}
const initalizeRedis = async (nodeData, options) => {
    const sessionTTL = nodeData.inputs?.sessionTTL;
    const memoryKey = nodeData.inputs?.memoryKey;
    const sessionId = nodeData.inputs?.sessionId;
    const windowSize = nodeData.inputs?.windowSize;
    const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
    const redisUrl = (0, utils_1.getCredentialParam)('redisUrl', credentialData, nodeData);
    let client;
    if (!redisUrl || redisUrl === '') {
        const username = (0, utils_1.getCredentialParam)('redisCacheUser', credentialData, nodeData);
        const password = (0, utils_1.getCredentialParam)('redisCachePwd', credentialData, nodeData);
        const portStr = (0, utils_1.getCredentialParam)('redisCachePort', credentialData, nodeData);
        const host = (0, utils_1.getCredentialParam)('redisCacheHost', credentialData, nodeData);
        const sslEnabled = (0, utils_1.getCredentialParam)('redisCacheSslEnabled', credentialData, nodeData);
        const tlsOptions = sslEnabled === true ? { tls: { rejectUnauthorized: false } } : {};
        client = getRedisClientbyOption({
            port: portStr ? parseInt(portStr) : 6379,
            host,
            username,
            password,
            ...tlsOptions
        });
    }
    else {
        client = getRedisClientbyUrl(redisUrl);
    }
    let obj = {
        sessionId,
        client
    };
    if (sessionTTL) {
        obj = {
            ...obj,
            sessionTTL
        };
    }
    const redisChatMessageHistory = new ioredis_2.RedisChatMessageHistory(obj);
    const memory = new BufferMemoryExtended({
        memoryKey: memoryKey ?? 'chat_history',
        chatHistory: redisChatMessageHistory,
        sessionId,
        windowSize,
        redisClient: client,
        sessionTTL
    });
    return memory;
};
class BufferMemoryExtended extends Interface_1.FlowiseMemory {
    constructor(fields) {
        super(fields);
        this.sessionId = '';
        this.sessionId = fields.sessionId;
        this.redisClient = fields.redisClient;
        this.windowSize = fields.windowSize;
        this.sessionTTL = fields.sessionTTL;
    }
    async getChatMessages(overrideSessionId = '', returnBaseMessages = false) {
        if (!this.redisClient)
            return [];
        const id = overrideSessionId ? overrideSessionId : this.sessionId;
        const rawStoredMessages = await this.redisClient.lrange(id, this.windowSize ? this.windowSize * -1 : 0, -1);
        const orderedMessages = rawStoredMessages.reverse().map((message) => JSON.parse(message));
        const baseMessages = orderedMessages.map(messages_1.mapStoredMessageToChatMessage);
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
module.exports = { nodeClass: RedisBackedChatMemory_Memory };
//# sourceMappingURL=RedisBackedChatMemory.js.map