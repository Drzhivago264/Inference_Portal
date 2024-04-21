"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = require("@langchain/openai");
const utils_1 = require("../../../src/utils");
class OpenAIEmbeddingCustom_Embeddings {
    constructor() {
        this.label = 'OpenAI Embeddings Custom';
        this.name = 'openAIEmbeddingsCustom';
        this.version = 1.0;
        this.type = 'OpenAIEmbeddingsCustom';
        this.icon = 'openai.svg';
        this.category = 'Embeddings';
        this.description = 'OpenAI API to generate embeddings for a given text';
        this.baseClasses = [this.type, ...(0, utils_1.getBaseClasses)(openai_1.OpenAIEmbeddings)];
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['openAIApi']
        };
        this.inputs = [
            {
                label: 'Strip New Lines',
                name: 'stripNewLines',
                type: 'boolean',
                optional: true,
                additionalParams: true
            },
            {
                label: 'Batch Size',
                name: 'batchSize',
                type: 'number',
                optional: true,
                additionalParams: true
            },
            {
                label: 'Timeout',
                name: 'timeout',
                type: 'number',
                optional: true,
                additionalParams: true
            },
            {
                label: 'BasePath',
                name: 'basepath',
                type: 'string',
                optional: true,
                additionalParams: true
            },
            {
                label: 'Model Name',
                name: 'modelName',
                type: 'string',
                optional: true
            }
        ];
    }
    async init(nodeData, _, options) {
        const stripNewLines = nodeData.inputs?.stripNewLines;
        const batchSize = nodeData.inputs?.batchSize;
        const timeout = nodeData.inputs?.timeout;
        const basePath = nodeData.inputs?.basepath;
        const modelName = nodeData.inputs?.modelName;
        const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
        const openAIApiKey = (0, utils_1.getCredentialParam)('openAIApiKey', credentialData, nodeData);
        const obj = {
            openAIApiKey
        };
        if (stripNewLines)
            obj.stripNewLines = stripNewLines;
        if (batchSize)
            obj.batchSize = parseInt(batchSize, 10);
        if (timeout)
            obj.timeout = parseInt(timeout, 10);
        if (modelName)
            obj.modelName = modelName;
        const model = new openai_1.OpenAIEmbeddings(obj, { basePath });
        return model;
    }
}
module.exports = { nodeClass: OpenAIEmbeddingCustom_Embeddings };
//# sourceMappingURL=OpenAIEmbeddingCustom.js.map