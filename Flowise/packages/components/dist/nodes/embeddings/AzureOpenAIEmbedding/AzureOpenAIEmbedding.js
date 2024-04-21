"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = require("@langchain/openai");
const utils_1 = require("../../../src/utils");
class AzureOpenAIEmbedding_Embeddings {
    constructor() {
        this.label = 'Azure OpenAI Embeddings';
        this.name = 'azureOpenAIEmbeddings';
        this.version = 1.0;
        this.type = 'AzureOpenAIEmbeddings';
        this.icon = 'Azure.svg';
        this.category = 'Embeddings';
        this.description = 'Azure OpenAI API to generate embeddings for a given text';
        this.baseClasses = [this.type, ...(0, utils_1.getBaseClasses)(openai_1.OpenAIEmbeddings)];
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['azureOpenAIApi']
        };
        this.inputs = [
            {
                label: 'Batch Size',
                name: 'batchSize',
                type: 'number',
                default: '100',
                optional: true,
                additionalParams: true
            },
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
        const batchSize = nodeData.inputs?.batchSize;
        const timeout = nodeData.inputs?.timeout;
        const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
        const azureOpenAIApiKey = (0, utils_1.getCredentialParam)('azureOpenAIApiKey', credentialData, nodeData);
        const azureOpenAIApiInstanceName = (0, utils_1.getCredentialParam)('azureOpenAIApiInstanceName', credentialData, nodeData);
        const azureOpenAIApiDeploymentName = (0, utils_1.getCredentialParam)('azureOpenAIApiDeploymentName', credentialData, nodeData);
        const azureOpenAIApiVersion = (0, utils_1.getCredentialParam)('azureOpenAIApiVersion', credentialData, nodeData);
        const obj = {
            azureOpenAIApiKey,
            azureOpenAIApiInstanceName,
            azureOpenAIApiDeploymentName,
            azureOpenAIApiVersion
        };
        if (batchSize)
            obj.batchSize = parseInt(batchSize, 10);
        if (timeout)
            obj.timeout = parseInt(timeout, 10);
        const model = new openai_1.OpenAIEmbeddings(obj);
        return model;
    }
}
module.exports = { nodeClass: AzureOpenAIEmbedding_Embeddings };
//# sourceMappingURL=AzureOpenAIEmbedding.js.map