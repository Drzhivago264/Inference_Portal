"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const dynamodb_1 = require("@langchain/community/stores/message/dynamodb");
const messages_1 = require("@langchain/core/messages");
const memory_1 = require("langchain/memory");
const utils_1 = require("../../../src/utils");
const Interface_1 = require("../../../src/Interface");
class DynamoDb_Memory {
    constructor() {
        this.label = 'DynamoDB Chat Memory';
        this.name = 'DynamoDBChatMemory';
        this.version = 1.0;
        this.type = 'DynamoDBChatMemory';
        this.icon = 'dynamodb.svg';
        this.category = 'Memory';
        this.description = 'Stores the conversation in dynamo db table';
        this.baseClasses = [this.type, ...(0, utils_1.getBaseClasses)(memory_1.BufferMemory)];
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['dynamodbMemoryApi']
        };
        this.inputs = [
            {
                label: 'Table Name',
                name: 'tableName',
                type: 'string'
            },
            {
                label: 'Partition Key',
                name: 'partitionKey',
                type: 'string'
            },
            {
                label: 'Region',
                name: 'region',
                type: 'string',
                description: 'The aws region in which table is located',
                placeholder: 'us-east-1'
            },
            {
                label: 'Session ID',
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
        return initializeDynamoDB(nodeData, options);
    }
}
const initializeDynamoDB = async (nodeData, options) => {
    const tableName = nodeData.inputs?.tableName;
    const partitionKey = nodeData.inputs?.partitionKey;
    const region = nodeData.inputs?.region;
    const memoryKey = nodeData.inputs?.memoryKey;
    const sessionId = nodeData.inputs?.sessionId;
    const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
    const accessKeyId = (0, utils_1.getCredentialParam)('accessKey', credentialData, nodeData);
    const secretAccessKey = (0, utils_1.getCredentialParam)('secretAccessKey', credentialData, nodeData);
    const config = {
        region,
        credentials: {
            accessKeyId,
            secretAccessKey
        }
    };
    const client = new client_dynamodb_1.DynamoDBClient(config ?? {});
    const dynamoDb = new dynamodb_1.DynamoDBChatMessageHistory({
        tableName,
        partitionKey,
        sessionId,
        config
    });
    const memory = new BufferMemoryExtended({
        memoryKey: memoryKey ?? 'chat_history',
        chatHistory: dynamoDb,
        sessionId,
        dynamodbClient: client,
        tableName,
        partitionKey,
        dynamoKey: { [partitionKey]: { S: sessionId } }
    });
    return memory;
};
class BufferMemoryExtended extends Interface_1.FlowiseMemory {
    constructor(fields) {
        super(fields);
        this.tableName = '';
        this.partitionKey = '';
        this.sessionId = '';
        this.sessionId = fields.sessionId;
        this.dynamodbClient = fields.dynamodbClient;
        this.tableName = fields.tableName;
        this.partitionKey = fields.partitionKey;
        this.dynamoKey = fields.dynamoKey;
    }
    overrideDynamoKey(overrideSessionId = '') {
        const existingDynamoKey = this.dynamoKey;
        const partitionKey = this.partitionKey;
        let newDynamoKey = {};
        if (Object.keys(existingDynamoKey).includes(partitionKey)) {
            newDynamoKey[partitionKey] = { S: overrideSessionId };
        }
        return Object.keys(newDynamoKey).length ? newDynamoKey : existingDynamoKey;
    }
    async addNewMessage(messages, client, tableName = '', dynamoKey = {}, messageAttributeName = 'messages') {
        const params = {
            TableName: tableName,
            Key: dynamoKey,
            ExpressionAttributeNames: {
                '#m': messageAttributeName
            },
            ExpressionAttributeValues: {
                ':empty_list': {
                    L: []
                },
                ':m': {
                    L: messages.map((message) => {
                        const dynamoSerializedMessage = {
                            M: {
                                type: {
                                    S: message.type
                                },
                                text: {
                                    S: message.data.content
                                }
                            }
                        };
                        if (message.data.role) {
                            dynamoSerializedMessage.M.role = { S: message.data.role };
                        }
                        return dynamoSerializedMessage;
                    })
                }
            },
            UpdateExpression: 'SET #m = list_append(if_not_exists(#m, :empty_list), :m)'
        };
        await client.send(new client_dynamodb_1.UpdateItemCommand(params));
    }
    async getChatMessages(overrideSessionId = '', returnBaseMessages = false) {
        if (!this.dynamodbClient)
            return [];
        const dynamoKey = overrideSessionId ? this.overrideDynamoKey(overrideSessionId) : this.dynamoKey;
        const tableName = this.tableName;
        const messageAttributeName = this.messageAttributeName ? this.messageAttributeName : 'messages';
        const params = {
            TableName: tableName,
            Key: dynamoKey
        };
        const response = await this.dynamodbClient.send(new client_dynamodb_1.GetItemCommand(params));
        const items = response.Item ? response.Item[messageAttributeName]?.L ?? [] : [];
        const messages = items
            .map((item) => ({
            type: item.M?.type.S,
            data: {
                role: item.M?.role?.S,
                content: item.M?.text.S
            }
        }))
            .filter((x) => x.type !== undefined && x.data.content !== undefined);
        const baseMessages = messages.map(messages_1.mapStoredMessageToChatMessage);
        return returnBaseMessages ? baseMessages : (0, utils_1.convertBaseMessagetoIMessage)(baseMessages);
    }
    async addChatMessages(msgArray, overrideSessionId = '') {
        if (!this.dynamodbClient)
            return;
        const dynamoKey = overrideSessionId ? this.overrideDynamoKey(overrideSessionId) : this.dynamoKey;
        const tableName = this.tableName;
        const messageAttributeName = this.messageAttributeName;
        const input = msgArray.find((msg) => msg.type === 'userMessage');
        const output = msgArray.find((msg) => msg.type === 'apiMessage');
        if (input) {
            const newInputMessage = new messages_1.HumanMessage(input.text);
            const messageToAdd = [newInputMessage].map((msg) => msg.toDict());
            await this.addNewMessage(messageToAdd, this.dynamodbClient, tableName, dynamoKey, messageAttributeName);
        }
        if (output) {
            const newOutputMessage = new messages_1.AIMessage(output.text);
            const messageToAdd = [newOutputMessage].map((msg) => msg.toDict());
            await this.addNewMessage(messageToAdd, this.dynamodbClient, tableName, dynamoKey, messageAttributeName);
        }
    }
    async clearChatMessages(overrideSessionId = '') {
        if (!this.dynamodbClient)
            return;
        const dynamoKey = overrideSessionId ? this.overrideDynamoKey(overrideSessionId) : this.dynamoKey;
        const tableName = this.tableName;
        const params = {
            TableName: tableName,
            Key: dynamoKey
        };
        await this.dynamodbClient.send(new client_dynamodb_1.DeleteItemCommand(params));
        await this.clear();
    }
}
module.exports = { nodeClass: DynamoDb_Memory };
//# sourceMappingURL=DynamoDb.js.map