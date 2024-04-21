"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const googlepalm_1 = require("@langchain/community/embeddings/googlepalm");
const utils_1 = require("../../../src/utils");
const modelLoader_1 = require("../../../src/modelLoader");
class GooglePaLMEmbedding_Embeddings {
    constructor() {
        //@ts-ignore
        this.loadMethods = {
            async listModels() {
                return await (0, modelLoader_1.getModels)(modelLoader_1.MODEL_TYPE.EMBEDDING, 'googlePaLMEmbeddings');
            }
        };
        this.label = 'Google PaLM Embeddings';
        this.name = 'googlePaLMEmbeddings';
        this.version = 2.0;
        this.type = 'GooglePaLMEmbeddings';
        this.icon = 'GooglePaLM.svg';
        this.category = 'Embeddings';
        this.description = 'Google MakerSuite PaLM API to generate embeddings for a given text';
        this.baseClasses = [this.type, ...(0, utils_1.getBaseClasses)(googlepalm_1.GooglePaLMEmbeddings)];
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['googleMakerSuite']
        };
        this.inputs = [
            {
                label: 'Model Name',
                name: 'modelName',
                type: 'asyncOptions',
                loadMethod: 'listModels',
                default: 'models/embedding-gecko-001'
            }
        ];
    }
    async init(nodeData, _, options) {
        const modelName = nodeData.inputs?.modelName;
        const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
        const googleMakerSuiteKey = (0, utils_1.getCredentialParam)('googleMakerSuiteKey', credentialData, nodeData);
        const obj = {
            modelName: modelName,
            apiKey: googleMakerSuiteKey
        };
        const model = new googlepalm_1.GooglePaLMEmbeddings(obj);
        return model;
    }
}
module.exports = { nodeClass: GooglePaLMEmbedding_Embeddings };
//# sourceMappingURL=GooglePaLMEmbedding.js.map