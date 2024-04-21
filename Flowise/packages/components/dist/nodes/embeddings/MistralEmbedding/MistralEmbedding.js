"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mistralai_1 = require("@langchain/mistralai");
const utils_1 = require("../../../src/utils");
const modelLoader_1 = require("../../../src/modelLoader");
class MistralEmbedding_Embeddings {
    constructor() {
        //@ts-ignore
        this.loadMethods = {
            async listModels() {
                return await (0, modelLoader_1.getModels)(modelLoader_1.MODEL_TYPE.EMBEDDING, 'mistralAIEmbeddings');
            }
        };
        this.label = 'MistralAI Embeddings';
        this.name = 'mistralAIEmbeddings';
        this.version = 2.0;
        this.type = 'MistralAIEmbeddings';
        this.icon = 'MistralAI.svg';
        this.category = 'Embeddings';
        this.description = 'MistralAI API to generate embeddings for a given text';
        this.baseClasses = [this.type, ...(0, utils_1.getBaseClasses)(mistralai_1.MistralAIEmbeddings)];
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['mistralAIApi']
        };
        this.inputs = [
            {
                label: 'Model Name',
                name: 'modelName',
                type: 'asyncOptions',
                loadMethod: 'listModels',
                default: 'mistral-embed'
            },
            {
                label: 'Batch Size',
                name: 'batchSize',
                type: 'number',
                step: 1,
                default: 512,
                optional: true,
                additionalParams: true
            },
            {
                label: 'Strip New Lines',
                name: 'stripNewLines',
                type: 'boolean',
                default: true,
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
        const modelName = nodeData.inputs?.modelName;
        const batchSize = nodeData.inputs?.batchSize;
        const stripNewLines = nodeData.inputs?.stripNewLines;
        const overrideEndpoint = nodeData.inputs?.overrideEndpoint;
        const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
        const apiKey = (0, utils_1.getCredentialParam)('mistralAIAPIKey', credentialData, nodeData);
        const obj = {
            apiKey: apiKey,
            modelName: modelName
        };
        if (batchSize)
            obj.batchSize = parseInt(batchSize, 10);
        if (stripNewLines)
            obj.stripNewLines = stripNewLines;
        if (overrideEndpoint)
            obj.endpoint = overrideEndpoint;
        const model = new mistralai_1.MistralAIEmbeddings(obj);
        return model;
    }
}
module.exports = { nodeClass: MistralEmbedding_Embeddings };
//# sourceMappingURL=MistralEmbedding.js.map