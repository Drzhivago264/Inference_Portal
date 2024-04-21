"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modelLoader_1 = require("../../../src/modelLoader");
const utils_1 = require("../../../src/utils");
const voyage_1 = require("langchain/embeddings/voyage");
class VoyageAIEmbedding_Embeddings {
    constructor() {
        //@ts-ignore
        this.loadMethods = {
            async listModels() {
                return await (0, modelLoader_1.getModels)(modelLoader_1.MODEL_TYPE.EMBEDDING, 'voyageAIEmbeddings');
            }
        };
        this.label = 'VoyageAI Embeddings';
        this.name = 'voyageAIEmbeddings';
        this.version = 2.0;
        this.type = 'VoyageAIEmbeddings';
        this.icon = 'voyageai.png';
        this.category = 'Embeddings';
        this.description = 'Voyage AI API to generate embeddings for a given text';
        this.baseClasses = [this.type, ...(0, utils_1.getBaseClasses)(voyage_1.VoyageEmbeddings)];
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['voyageAIApi']
        };
        this.inputs = [
            {
                label: 'Model Name',
                name: 'modelName',
                type: 'asyncOptions',
                loadMethod: 'listModels',
                default: 'voyage-2'
            }
        ];
    }
    async init(nodeData, _, options) {
        const modelName = nodeData.inputs?.modelName;
        const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
        const voyageAiApiKey = (0, utils_1.getCredentialParam)('apiKey', credentialData, nodeData);
        const voyageAiEndpoint = (0, utils_1.getCredentialParam)('endpoint', credentialData, nodeData);
        const obj = {
            apiKey: voyageAiApiKey
        };
        if (modelName)
            obj.modelName = modelName;
        const model = new voyage_1.VoyageEmbeddings(obj);
        if (voyageAiEndpoint)
            model.apiUrl = voyageAiEndpoint;
        return model;
    }
}
module.exports = { nodeClass: VoyageAIEmbedding_Embeddings };
//# sourceMappingURL=VoyageAIEmbedding.js.map