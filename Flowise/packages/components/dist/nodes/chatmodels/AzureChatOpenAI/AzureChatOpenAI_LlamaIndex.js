"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../src/utils");
const llamaindex_1 = require("llamaindex");
const modelLoader_1 = require("../../../src/modelLoader");
class AzureChatOpenAI_LlamaIndex_ChatModels {
    constructor() {
        //@ts-ignore
        this.loadMethods = {
            async listModels() {
                return await (0, modelLoader_1.getModels)(modelLoader_1.MODEL_TYPE.CHAT, 'azureChatOpenAI_LlamaIndex');
            }
        };
        this.label = 'AzureChatOpenAI';
        this.name = 'azureChatOpenAI_LlamaIndex';
        this.version = 2.0;
        this.type = 'AzureChatOpenAI';
        this.icon = 'Azure.svg';
        this.category = 'Chat Models';
        this.description = 'Wrapper around Azure OpenAI Chat LLM specific for LlamaIndex';
        this.baseClasses = [this.type, 'BaseChatModel_LlamaIndex', ...(0, utils_1.getBaseClasses)(llamaindex_1.OpenAI)];
        this.tags = ['LlamaIndex'];
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['azureOpenAIApi']
        };
        this.inputs = [
            {
                label: 'Model Name',
                name: 'modelName',
                type: 'asyncOptions',
                loadMethod: 'listModels',
                default: 'gpt-3.5-turbo-16k'
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
        const modelName = nodeData.inputs?.modelName;
        const temperature = nodeData.inputs?.temperature;
        const maxTokens = nodeData.inputs?.maxTokens;
        const topP = nodeData.inputs?.topP;
        const timeout = nodeData.inputs?.timeout;
        const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
        const azureOpenAIApiKey = (0, utils_1.getCredentialParam)('azureOpenAIApiKey', credentialData, nodeData);
        const azureOpenAIApiInstanceName = (0, utils_1.getCredentialParam)('azureOpenAIApiInstanceName', credentialData, nodeData);
        const azureOpenAIApiDeploymentName = (0, utils_1.getCredentialParam)('azureOpenAIApiDeploymentName', credentialData, nodeData);
        const azureOpenAIApiVersion = (0, utils_1.getCredentialParam)('azureOpenAIApiVersion', credentialData, nodeData);
        const obj = {
            temperature: parseFloat(temperature),
            model: modelName,
            azure: {
                apiKey: azureOpenAIApiKey,
                endpoint: `https://${azureOpenAIApiInstanceName}.openai.azure.com`,
                apiVersion: azureOpenAIApiVersion,
                deploymentName: azureOpenAIApiDeploymentName
            }
        };
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
module.exports = { nodeClass: AzureChatOpenAI_LlamaIndex_ChatModels };
//# sourceMappingURL=AzureChatOpenAI_LlamaIndex.js.map