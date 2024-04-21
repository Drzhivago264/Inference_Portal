"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modelLoader_1 = require("../../../src/modelLoader");
const utils_1 = require("../../../src/utils");
const llamaindex_1 = require("llamaindex");
class ChatAnthropic_LlamaIndex_ChatModels {
    constructor() {
        //@ts-ignore
        this.loadMethods = {
            async listModels() {
                return await (0, modelLoader_1.getModels)(modelLoader_1.MODEL_TYPE.CHAT, 'chatAnthropic_LlamaIndex');
            }
        };
        this.label = 'ChatAnthropic';
        this.name = 'chatAnthropic_LlamaIndex';
        this.version = 3.0;
        this.type = 'ChatAnthropic';
        this.icon = 'Anthropic.svg';
        this.category = 'Chat Models';
        this.description = 'Wrapper around ChatAnthropic LLM specific for LlamaIndex';
        this.baseClasses = [this.type, 'BaseChatModel_LlamaIndex', ...(0, utils_1.getBaseClasses)(llamaindex_1.Anthropic)];
        this.tags = ['LlamaIndex'];
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['anthropicApi']
        };
        this.inputs = [
            {
                label: 'Model Name',
                name: 'modelName',
                type: 'options',
                loadMethod: 'listModels',
                default: 'claude-3-haiku'
            },
            {
                label: 'Temperature',
                name: 'temperature',
                type: 'number',
                step: 0.1,
                default: 0.9,
                optional: true
            },
            {
                label: 'Max Tokens',
                name: 'maxTokensToSample',
                type: 'number',
                step: 1,
                optional: true,
                additionalParams: true
            },
            {
                label: 'Top P',
                name: 'topP',
                type: 'number',
                step: 0.1,
                optional: true,
                additionalParams: true
            }
        ];
    }
    async init(nodeData, _, options) {
        const temperature = nodeData.inputs?.temperature;
        const modelName = nodeData.inputs?.modelName;
        const maxTokensToSample = nodeData.inputs?.maxTokensToSample;
        const topP = nodeData.inputs?.topP;
        const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
        const anthropicApiKey = (0, utils_1.getCredentialParam)('anthropicApiKey', credentialData, nodeData);
        const obj = {
            temperature: parseFloat(temperature),
            model: modelName,
            apiKey: anthropicApiKey
        };
        if (maxTokensToSample)
            obj.maxTokens = parseInt(maxTokensToSample, 10);
        if (topP)
            obj.topP = parseFloat(topP);
        const model = new llamaindex_1.Anthropic(obj);
        return model;
    }
}
module.exports = { nodeClass: ChatAnthropic_LlamaIndex_ChatModels };
//# sourceMappingURL=ChatAnthropic_LlamaIndex.js.map