"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cohere_1 = require("@langchain/cohere");
const utils_1 = require("../../../src/utils");
const modelLoader_1 = require("../../../src/modelLoader");
class ChatCohere_ChatModels {
    constructor() {
        //@ts-ignore
        this.loadMethods = {
            async listModels() {
                return await (0, modelLoader_1.getModels)(modelLoader_1.MODEL_TYPE.CHAT, 'chatCohere');
            }
        };
        this.label = 'ChatCohere';
        this.name = 'chatCohere';
        this.version = 1.0;
        this.type = 'ChatCohere';
        this.icon = 'Cohere.svg';
        this.category = 'Chat Models';
        this.description = 'Wrapper around Cohere Chat Endpoints';
        this.baseClasses = [this.type, ...(0, utils_1.getBaseClasses)(cohere_1.ChatCohere)];
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['cohereApi']
        };
        this.inputs = [
            {
                label: 'Cache',
                name: 'cache',
                type: 'BaseCache',
                optional: true
            },
            {
                label: 'Model Name',
                name: 'modelName',
                type: 'asyncOptions',
                loadMethod: 'listModels',
                default: 'command-r'
            },
            {
                label: 'Temperature',
                name: 'temperature',
                type: 'number',
                step: 0.1,
                default: 0.7,
                optional: true
            }
        ];
    }
    async init(nodeData, _, options) {
        const modelName = nodeData.inputs?.modelName;
        const cache = nodeData.inputs?.cache;
        const temperature = nodeData.inputs?.temperature;
        const streaming = nodeData.inputs?.streaming;
        const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
        const cohereApiKey = (0, utils_1.getCredentialParam)('cohereApiKey', credentialData, nodeData);
        const obj = {
            model: modelName,
            apiKey: cohereApiKey,
            temperature: temperature ? parseFloat(temperature) : undefined,
            streaming: streaming ?? true
        };
        if (cache)
            obj.cache = cache;
        const model = new cohere_1.ChatCohere(obj);
        return model;
    }
}
module.exports = { nodeClass: ChatCohere_ChatModels };
//# sourceMappingURL=ChatCohere.js.map