"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = require("@langchain/openai");
const utils_1 = require("../../../src/utils");
class ChatLocalAI_ChatModels {
    constructor() {
        this.label = 'ChatLocalAI';
        this.name = 'chatLocalAI';
        this.version = 2.0;
        this.type = 'ChatLocalAI';
        this.icon = 'localai.png';
        this.category = 'Chat Models';
        this.description = 'Use local LLMs like llama.cpp, gpt4all using LocalAI';
        this.baseClasses = [this.type, 'BaseChatModel', ...(0, utils_1.getBaseClasses)(openai_1.ChatOpenAI)];
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['localAIApi'],
            optional: true
        };
        this.inputs = [
            {
                label: 'Cache',
                name: 'cache',
                type: 'BaseCache',
                optional: true
            },
            {
                label: 'Base Path',
                name: 'basePath',
                type: 'string',
                placeholder: 'http://localhost:8080/v1'
            },
            {
                label: 'Model Name',
                name: 'modelName',
                type: 'string',
                placeholder: 'gpt4all-lora-quantized.bin'
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
                name: 'maxTokens',
                type: 'number',
                step: 1,
                optional: true,
                additionalParams: true
            },
            {
                label: 'Top Probability',
                name: 'topP',
                type: 'number',
                step: 0.1,
                optional: true,
                additionalParams: true
            },
            {
                label: 'Timeout',
                name: 'timeout',
                type: 'number',
                step: 1,
                optional: true,
                additionalParams: true
            }
        ];
    }
    async init(nodeData, _, options) {
        const temperature = nodeData.inputs?.temperature;
        const modelName = nodeData.inputs?.modelName;
        const maxTokens = nodeData.inputs?.maxTokens;
        const topP = nodeData.inputs?.topP;
        const timeout = nodeData.inputs?.timeout;
        const basePath = nodeData.inputs?.basePath;
        const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
        const localAIApiKey = (0, utils_1.getCredentialParam)('localAIApiKey', credentialData, nodeData);
        const cache = nodeData.inputs?.cache;
        const obj = {
            temperature: parseFloat(temperature),
            modelName,
            openAIApiKey: 'sk-'
        };
        if (maxTokens)
            obj.maxTokens = parseInt(maxTokens, 10);
        if (topP)
            obj.topP = parseFloat(topP);
        if (timeout)
            obj.timeout = parseInt(timeout, 10);
        if (cache)
            obj.cache = cache;
        if (localAIApiKey)
            obj.openAIApiKey = localAIApiKey;
        const model = new openai_1.ChatOpenAI(obj, { basePath });
        return model;
    }
}
module.exports = { nodeClass: ChatLocalAI_ChatModels };
//# sourceMappingURL=ChatLocalAI.js.map