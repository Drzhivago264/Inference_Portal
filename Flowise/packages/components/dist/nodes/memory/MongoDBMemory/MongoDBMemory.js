"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const mongodb_2 = require("@langchain/mongodb");
const memory_1 = require("langchain/memory");
const messages_1 = require("@langchain/core/messages");
const utils_1 = require("../../../src/utils");
const Interface_1 = require("../../../src/Interface");
let mongoClientSingleton;
let mongoUrl;
const getMongoClient = async (newMongoUrl) => {
    if (!mongoClientSingleton) {
        // if client does not exist
        mongoClientSingleton = new mongodb_1.MongoClient(newMongoUrl);
        mongoUrl = newMongoUrl;
        return mongoClientSingleton;
    }
    else if (mongoClientSingleton && newMongoUrl !== mongoUrl) {
        // if client exists but url changed
        mongoClientSingleton.close();
        mongoClientSingleton = new mongodb_1.MongoClient(newMongoUrl);
        mongoUrl = newMongoUrl;
        return mongoClientSingleton;
    }
    return mongoClientSingleton;
};
class MongoDB_Memory {
    constructor() {
        this.label = 'MongoDB Atlas Chat Memory';
        this.name = 'MongoDBAtlasChatMemory';
        this.version = 1.0;
        this.type = 'MongoDBAtlasChatMemory';
        this.icon = 'mongodb.svg';
        this.category = 'Memory';
        this.description = 'Stores the conversation in MongoDB Atlas';
        this.baseClasses = [this.type, ...(0, utils_1.getBaseClasses)(memory_1.BufferMemory)];
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['mongoDBUrlApi']
        };
        this.inputs = [
            {
                label: 'Database',
                name: 'databaseName',
                placeholder: '<DB_NAME>',
                type: 'string'
            },
            {
                label: 'Collection Name',
                name: 'collectionName',
                placeholder: '<COLLECTION_NAME>',
                type: 'string'
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
                label: 'Memory Key',
                name: 'memoryKey',
                type: 'string',
                default: 'chat_history',
                additionalParams: true
            }
        ];
    }
    async init(nodeData, _, options) {
        return initializeMongoDB(nodeData, options);
    }
}
const initializeMongoDB = async (nodeData, options) => {
    const databaseName = nodeData.inputs?.databaseName;
    const collectionName = nodeData.inputs?.collectionName;
    const memoryKey = nodeData.inputs?.memoryKey;
    const sessionId = nodeData.inputs?.sessionId;
    const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
    const mongoDBConnectUrl = (0, utils_1.getCredentialParam)('mongoDBConnectUrl', credentialData, nodeData);
    const client = await getMongoClient(mongoDBConnectUrl);
    const collection = client.db(databaseName).collection(collectionName);
    const mongoDBChatMessageHistory = new mongodb_2.MongoDBChatMessageHistory({
        collection,
        sessionId
    });
    mongoDBChatMessageHistory.getMessages = async () => {
        const document = await collection.findOne({
            sessionId: mongoDBChatMessageHistory.sessionId
        });
        const messages = document?.messages || [];
        return messages.map(messages_1.mapStoredMessageToChatMessage);
    };
    mongoDBChatMessageHistory.addMessage = async (message) => {
        const messages = [message].map((msg) => msg.toDict());
        await collection.updateOne({ sessionId: mongoDBChatMessageHistory.sessionId }, {
            $push: { messages: { $each: messages } }
        }, { upsert: true });
    };
    mongoDBChatMessageHistory.clear = async () => {
        await collection.deleteOne({ sessionId: mongoDBChatMessageHistory.sessionId });
    };
    return new BufferMemoryExtended({
        memoryKey: memoryKey ?? 'chat_history',
        chatHistory: mongoDBChatMessageHistory,
        sessionId,
        collection
    });
};
class BufferMemoryExtended extends Interface_1.FlowiseMemory {
    constructor(fields) {
        super(fields);
        this.sessionId = '';
        this.sessionId = fields.sessionId;
        this.collection = fields.collection;
    }
    async getChatMessages(overrideSessionId = '', returnBaseMessages = false) {
        if (!this.collection)
            return [];
        const id = overrideSessionId ? overrideSessionId : this.sessionId;
        const document = await this.collection.findOne({ sessionId: id });
        const messages = document?.messages || [];
        const baseMessages = messages.map(messages_1.mapStoredMessageToChatMessage);
        return returnBaseMessages ? baseMessages : (0, utils_1.convertBaseMessagetoIMessage)(baseMessages);
    }
    async addChatMessages(msgArray, overrideSessionId = '') {
        if (!this.collection)
            return;
        const id = overrideSessionId ? overrideSessionId : this.sessionId;
        const input = msgArray.find((msg) => msg.type === 'userMessage');
        const output = msgArray.find((msg) => msg.type === 'apiMessage');
        if (input) {
            const newInputMessage = new messages_1.HumanMessage(input.text);
            const messageToAdd = [newInputMessage].map((msg) => msg.toDict());
            await this.collection.updateOne({ sessionId: id }, {
                $push: { messages: { $each: messageToAdd } }
            }, { upsert: true });
        }
        if (output) {
            const newOutputMessage = new messages_1.AIMessage(output.text);
            const messageToAdd = [newOutputMessage].map((msg) => msg.toDict());
            await this.collection.updateOne({ sessionId: id }, {
                $push: { messages: { $each: messageToAdd } }
            }, { upsert: true });
        }
    }
    async clearChatMessages(overrideSessionId = '') {
        if (!this.collection)
            return;
        const id = overrideSessionId ? overrideSessionId : this.sessionId;
        await this.collection.deleteOne({ sessionId: id });
        await this.clear();
    }
}
module.exports = { nodeClass: MongoDB_Memory };
//# sourceMappingURL=MongoDBMemory.js.map