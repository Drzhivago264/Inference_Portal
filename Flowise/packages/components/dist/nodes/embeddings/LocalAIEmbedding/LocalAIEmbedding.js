"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = require("@langchain/openai");
const utils_1 = require("../../../src/utils");
class LocalAIEmbedding_Embeddings {
    constructor() {
        this.label = 'LocalAI Embeddings';
        this.name = 'localAIEmbeddings';
        this.version = 1.0;
        this.type = 'LocalAI Embeddings';
        this.icon = 'localai.png';
        this.category = 'Embeddings';
        this.description = 'Use local embeddings models like llama.cpp';
        this.baseClasses = [this.type, 'Embeddings'];
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['localAIApi'],
            optional: true
        };
        this.inputs = [
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
                placeholder: 'text-embedding-ada-002'
            }
        ];
    }
    async init(nodeData, _, options) {
        const modelName = nodeData.inputs?.modelName;
        const basePath = nodeData.inputs?.basePath;
        const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
        const localAIApiKey = (0, utils_1.getCredentialParam)('localAIApiKey', credentialData, nodeData);
        const obj = {
            modelName,
            openAIApiKey: 'sk-'
        };
        if (localAIApiKey)
            obj.openAIApiKey = localAIApiKey;
        const model = new openai_1.OpenAIEmbeddings(obj, { basePath });
        return model;
    }
}
module.exports = { nodeClass: LocalAIEmbedding_Embeddings };
//# sourceMappingURL=LocalAIEmbedding.js.map