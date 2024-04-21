"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../src/utils");
const llamaindex_1 = require("llamaindex");
class AzureOpenAIEmbedding_LlamaIndex_Embeddings {
    constructor() {
        this.label = 'Azure OpenAI Embeddings';
        this.name = 'azureOpenAIEmbeddingsLlamaIndex';
        this.version = 1.0;
        this.type = 'AzureOpenAIEmbeddings';
        this.icon = 'Azure.svg';
        this.category = 'Embeddings';
        this.description = 'Azure OpenAI API embeddings specific for LlamaIndex';
        this.baseClasses = [this.type, 'BaseEmbedding_LlamaIndex', ...(0, utils_1.getBaseClasses)(llamaindex_1.OpenAIEmbedding)];
        this.tags = ['LlamaIndex'];
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['azureOpenAIApi']
        };
        this.inputs = [
            {
                label: 'Timeout',
                name: 'timeout',
                type: 'number',
                optional: true,
                additionalParams: true
            }
        ];
    }
    async init(nodeData, _, options) {
        const timeout = nodeData.inputs?.timeout;
        const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
        const azureOpenAIApiKey = (0, utils_1.getCredentialParam)('azureOpenAIApiKey', credentialData, nodeData);
        const azureOpenAIApiInstanceName = (0, utils_1.getCredentialParam)('azureOpenAIApiInstanceName', credentialData, nodeData);
        const azureOpenAIApiDeploymentName = (0, utils_1.getCredentialParam)('azureOpenAIApiDeploymentName', credentialData, nodeData);
        const azureOpenAIApiVersion = (0, utils_1.getCredentialParam)('azureOpenAIApiVersion', credentialData, nodeData);
        const obj = {
            azure: {
                apiKey: azureOpenAIApiKey,
                endpoint: `https://${azureOpenAIApiInstanceName}.openai.azure.com`,
                apiVersion: azureOpenAIApiVersion,
                deploymentName: azureOpenAIApiDeploymentName
            }
        };
        if (timeout)
            obj.timeout = parseInt(timeout, 10);
        const model = new llamaindex_1.OpenAIEmbedding(obj);
        return model;
    }
}
module.exports = { nodeClass: AzureOpenAIEmbedding_LlamaIndex_Embeddings };
//# sourceMappingURL=AzureOpenAIEmbedding_LlamaIndex.js.map