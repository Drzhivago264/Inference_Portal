"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../src/utils");
const llamaindex_1 = require("llamaindex");
const modelLoader_1 = require("../../../src/modelLoader");
class ChatOpenAI_LlamaIndex_LLMs {
    constructor() {
        //@ts-ignore
        this.loadMethods = {
            async listModels() {
                return await (0, modelLoader_1.getModels)(modelLoader_1.MODEL_TYPE.CHAT, 'chatOpenAI_LlamaIndex');
            }
        };
        this.label = 'ChatOpenAI';
        this.name = 'chatOpenAI_LlamaIndex';
        this.version = 2.0;
        this.type = 'ChatOpenAI';
        this.icon = 'openai.svg';
        this.category = 'Chat Models';
        this.description = 'Wrapper around OpenAI Chat LLM specific for LlamaIndex';
        this.baseClasses = [this.type, 'BaseChatModel_LlamaIndex', ...(0, utils_1.getBaseClasses)(llamaindex_1.OpenAI)];
        this.tags = ['LlamaIndex'];
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['openAIApi']
        };
        this.inputs = [
            {
                label: 'Model Name',
                name: 'modelName',
                type: 'asyncOptions',
                loadMethod: 'listModels',
                default: 'gpt-3.5-turbo'
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
            },
            {
                label: 'BasePath',
                name: 'basepath',
                type: 'string',
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
        const basePath = nodeData.inputs?.basepath;
        const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
        const openAIApiKey = (0, utils_1.getCredentialParam)('openAIApiKey', credentialData, nodeData);
        const obj = {
            temperature: parseFloat(temperature),
            model: modelName,
            apiKey: openAIApiKey
        };
        if (basePath) {
            obj.additionalSessionOptions = {
                baseURL: basePath
            };
        }
        if (maxTokens)
            obj.maxTokens = parseInt(maxTokens, 10);
        if (topP)
            obj.topP = parseFloat(topP);
        if (timeout)
            obj.timeout = parseInt(timeout, 10);
        const model = new llamaindex_1.OpenAI(obj);
        return model;
    }
}
module.exports = { nodeClass: ChatOpenAI_LlamaIndex_LLMs };
//# sourceMappingURL=ChatOpenAI_LlamaIndex.js.map