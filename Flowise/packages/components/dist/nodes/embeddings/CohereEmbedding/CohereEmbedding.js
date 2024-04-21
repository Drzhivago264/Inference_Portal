"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cohere_1 = require("@langchain/cohere");
const utils_1 = require("../../../src/utils");
const modelLoader_1 = require("../../../src/modelLoader");
class CohereEmbedding_Embeddings {
    constructor() {
        //@ts-ignore
        this.loadMethods = {
            async listModels() {
                return await (0, modelLoader_1.getModels)(modelLoader_1.MODEL_TYPE.EMBEDDING, 'cohereEmbeddings');
            }
        };
        this.label = 'Cohere Embeddings';
        this.name = 'cohereEmbeddings';
        this.version = 3.0;
        this.type = 'CohereEmbeddings';
        this.icon = 'Cohere.svg';
        this.category = 'Embeddings';
        this.description = 'Cohere API to generate embeddings for a given text';
        this.baseClasses = [this.type, ...(0, utils_1.getBaseClasses)(cohere_1.CohereEmbeddings)];
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['cohereApi']
        };
        this.inputs = [
            {
                label: 'Model Name',
                name: 'modelName',
                type: 'asyncOptions',
                loadMethod: 'listModels',
                default: 'embed-english-v2.0'
            },
            {
                label: 'Type',
                name: 'inputType',
                type: 'options',
                description: 'Specifies the type of input passed to the model. Required for embedding models v3 and higher. <a target="_blank" href="https://docs.cohere.com/reference/embed">Official Docs</a>',
                options: [
                    {
                        label: 'search_document',
                        name: 'search_document',
                        description: 'Use this to encode documents for embeddings that you store in a vector database for search use-cases'
                    },
                    {
                        label: 'search_query',
                        name: 'search_query',
                        description: 'Use this when you query your vector DB to find relevant documents.'
                    },
                    {
                        label: 'classification',
                        name: 'classification',
                        description: 'Use this when you use the embeddings as an input to a text classifier'
                    },
                    {
                        label: 'clustering',
                        name: 'clustering',
                        description: 'Use this when you want to cluster the embeddings.'
                    }
                ],
                default: 'search_query',
                optional: true
            }
        ];
    }
    async init(nodeData, _, options) {
        const modelName = nodeData.inputs?.modelName;
        const inputType = nodeData.inputs?.inputType;
        const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
        const cohereApiKey = (0, utils_1.getCredentialParam)('cohereApiKey', credentialData, nodeData);
        const obj = {
            apiKey: cohereApiKey
        };
        if (modelName)
            obj.model = modelName;
        if (inputType)
            obj.inputType = inputType;
        const model = new cohere_1.CohereEmbeddings(obj);
        return model;
    }
}
module.exports = { nodeClass: CohereEmbedding_Embeddings };
//# sourceMappingURL=CohereEmbedding.js.map