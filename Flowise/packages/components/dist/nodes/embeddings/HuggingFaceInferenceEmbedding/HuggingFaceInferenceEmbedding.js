"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../src/utils");
const core_1 = require("./core");
class HuggingFaceInferenceEmbedding_Embeddings {
    constructor() {
        this.label = 'HuggingFace Inference Embeddings';
        this.name = 'huggingFaceInferenceEmbeddings';
        this.version = 1.0;
        this.type = 'HuggingFaceInferenceEmbeddings';
        this.icon = 'HuggingFace.svg';
        this.category = 'Embeddings';
        this.description = 'HuggingFace Inference API to generate embeddings for a given text';
        this.baseClasses = [this.type, ...(0, utils_1.getBaseClasses)(core_1.HuggingFaceInferenceEmbeddings)];
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['huggingFaceApi']
        };
        this.inputs = [
            {
                label: 'Model',
                name: 'modelName',
                type: 'string',
                description: 'If using own inference endpoint, leave this blank',
                placeholder: 'sentence-transformers/distilbert-base-nli-mean-tokens',
                optional: true
            },
            {
                label: 'Endpoint',
                name: 'endpoint',
                type: 'string',
                placeholder: 'https://xyz.eu-west-1.aws.endpoints.huggingface.cloud/sentence-transformers/all-MiniLM-L6-v2',
                description: 'Using your own inference endpoint',
                optional: true
            }
        ];
    }
    async init(nodeData, _, options) {
        const modelName = nodeData.inputs?.modelName;
        const endpoint = nodeData.inputs?.endpoint;
        const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
        const huggingFaceApiKey = (0, utils_1.getCredentialParam)('huggingFaceApiKey', credentialData, nodeData);
        const obj = {
            apiKey: huggingFaceApiKey
        };
        if (modelName)
            obj.model = modelName;
        if (endpoint)
            obj.endpoint = endpoint;
        const model = new core_1.HuggingFaceInferenceEmbeddings(obj);
        return model;
    }
}
module.exports = { nodeClass: HuggingFaceInferenceEmbedding_Embeddings };
//# sourceMappingURL=HuggingFaceInferenceEmbedding.js.map