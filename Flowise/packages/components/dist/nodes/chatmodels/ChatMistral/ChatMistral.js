"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mistralai_1 = require("@langchain/mistralai");
const utils_1 = require("../../../src/utils");
const modelLoader_1 = require("../../../src/modelLoader");
class ChatMistral_ChatModels {
    constructor() {
        //@ts-ignore
        this.loadMethods = {
            async listModels() {
                return await (0, modelLoader_1.getModels)(modelLoader_1.MODEL_TYPE.CHAT, 'chatMistralAI');
            }
        };
        this.label = 'ChatMistralAI';
        this.name = 'chatMistralAI';
        this.version = 3.0;
        this.type = 'ChatMistralAI';
        this.icon = 'MistralAI.svg';
        this.category = 'Chat Models';
        this.description = 'Wrapper around Mistral large language models that use the Chat endpoint';
        this.baseClasses = [this.type, ...(0, utils_1.getBaseClasses)(mistralai_1.ChatMistralAI)];
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['mistralAIApi']
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
                default: 'mistral-tiny'
            },
            {
                label: 'Temperature',
                name: 'temperature',
                type: 'number',
                description: 'What sampling temperature to use, between 0.0 and 1.0. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.',
                step: 0.1,
                default: 0.9,
                optional: true
            },
            {
                label: 'Max Output Tokens',
                name: 'maxOutputTokens',
                type: 'number',
                description: 'The maximum number of tokens to generate in the completion.',
                step: 1,
                optional: true,
                additionalParams: true
            },
            {
                label: 'Top Probability',
                name: 'topP',
                type: 'number',
                description: 'Nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.',
                step: 0.1,
                optional: true,
                additionalParams: true
            },
            {
                label: 'Random Seed',
                name: 'randomSeed',
                type: 'number',
                description: 'The seed to use for random sampling. If set, different calls will generate deterministic results.',
                step: 1,
                optional: true,
                additionalParams: true
            },
            {
                label: 'Safe Mode',
                name: 'safeMode',
                type: 'boolean',
                description: 'Whether to inject a safety prompt before all conversations.',
                optional: true,
                additionalParams: true
            },
            {
                label: 'Override Endpoint',
                name: 'overrideEndpoint',
                type: 'string',
                optional: true,
                additionalParams: true
            }
        ];
    }
    async init(nodeData, _, options) {
        const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
        const apiKey = (0, utils_1.getCredentialParam)('mistralAIAPIKey', credentialData, nodeData);
        const temperature = nodeData.inputs?.temperature;
        const modelName = nodeData.inputs?.modelName;
        const maxOutputTokens = nodeData.inputs?.maxOutputTokens;
        const topP = nodeData.inputs?.topP;
        const safeMode = nodeData.inputs?.safeMode;
        const randomSeed = nodeData.inputs?.safeMode;
        const overrideEndpoint = nodeData.inputs?.overrideEndpoint;
        const streaming = nodeData.inputs?.streaming;
        const cache = nodeData.inputs?.cache;
        const obj = {
            apiKey: apiKey,
            modelName: modelName,
            streaming: streaming ?? true
        };
        if (maxOutputTokens)
            obj.maxTokens = parseInt(maxOutputTokens, 10);
        if (topP)
            obj.topP = parseFloat(topP);
        if (cache)
            obj.cache = cache;
        if (temperature)
            obj.temperature = parseFloat(temperature);
        if (randomSeed)
            obj.randomSeed = parseFloat(randomSeed);
        if (safeMode)
            obj.safeMode = safeMode;
        if (overrideEndpoint)
            obj.endpoint = overrideEndpoint;
        const model = new mistralai_1.ChatMistralAI(obj);
        return model;
    }
}
module.exports = { nodeClass: ChatMistral_ChatModels };
//# sourceMappingURL=ChatMistral.js.map