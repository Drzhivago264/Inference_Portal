"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_bedrock_runtime_1 = require("@aws-sdk/client-bedrock-runtime");
const bedrock_1 = require("@langchain/community/embeddings/bedrock");
const utils_1 = require("../../../src/utils");
const modelLoader_1 = require("../../../src/modelLoader");
class AWSBedrockEmbedding_Embeddings {
    constructor() {
        this.loadMethods = {
            async listModels() {
                return await (0, modelLoader_1.getModels)(modelLoader_1.MODEL_TYPE.EMBEDDING, 'AWSBedrockEmbeddings');
            },
            async listRegions() {
                return await (0, modelLoader_1.getRegions)(modelLoader_1.MODEL_TYPE.EMBEDDING, 'AWSBedrockEmbeddings');
            }
        };
        this.label = 'AWS Bedrock Embeddings';
        this.name = 'AWSBedrockEmbeddings';
        this.version = 5.0;
        this.type = 'AWSBedrockEmbeddings';
        this.icon = 'aws.svg';
        this.category = 'Embeddings';
        this.description = 'AWSBedrock embedding models to generate embeddings for a given text';
        this.baseClasses = [this.type, ...(0, utils_1.getBaseClasses)(bedrock_1.BedrockEmbeddings)];
        this.credential = {
            label: 'AWS Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['awsApi'],
            optional: true
        };
        this.inputs = [
            {
                label: 'Region',
                name: 'region',
                type: 'asyncOptions',
                loadMethod: 'listRegions',
                default: 'us-east-1'
            },
            {
                label: 'Model Name',
                name: 'model',
                type: 'asyncOptions',
                loadMethod: 'listModels',
                default: 'amazon.titan-embed-text-v1'
            },
            {
                label: 'Custom Model Name',
                name: 'customModel',
                description: 'If provided, will override model selected from Model Name option',
                type: 'string',
                optional: true
            },
            {
                label: 'Cohere Input Type',
                name: 'inputType',
                type: 'options',
                description: 'Specifies the type of input passed to the model. Required for cohere embedding models v3 and higher. <a target="_blank" href="https://docs.cohere.com/reference/embed">Official Docs</a>',
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
                optional: true
            }
        ];
    }
    async init(nodeData, _, options) {
        const iRegion = nodeData.inputs?.region;
        const iModel = nodeData.inputs?.model;
        const customModel = nodeData.inputs?.customModel;
        const inputType = nodeData.inputs?.inputType;
        if (iModel.startsWith('cohere') && !inputType) {
            throw new Error('Input Type must be selected for Cohere models.');
        }
        const obj = {
            model: customModel ? customModel : iModel,
            region: iRegion
        };
        const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
        if (credentialData && Object.keys(credentialData).length !== 0) {
            const credentialApiKey = (0, utils_1.getCredentialParam)('awsKey', credentialData, nodeData);
            const credentialApiSecret = (0, utils_1.getCredentialParam)('awsSecret', credentialData, nodeData);
            const credentialApiSession = (0, utils_1.getCredentialParam)('awsSession', credentialData, nodeData);
            obj.credentials = {
                accessKeyId: credentialApiKey,
                secretAccessKey: credentialApiSecret,
                sessionToken: credentialApiSession
            };
        }
        const client = new client_bedrock_runtime_1.BedrockRuntimeClient({
            region: obj.region,
            credentials: obj.credentials
        });
        const model = new bedrock_1.BedrockEmbeddings(obj);
        model.embedQuery = async (document) => {
            if (iModel.startsWith('cohere')) {
                const embeddings = await embedTextCohere([document], client, iModel, inputType);
                return embeddings[0];
            }
            else {
                return await embedTextTitan(document, client, iModel);
            }
        };
        model.embedDocuments = async (documents) => {
            if (iModel.startsWith('cohere')) {
                return await embedTextCohere(documents, client, iModel, inputType);
            }
            else {
                return Promise.all(documents.map((document) => embedTextTitan(document, client, iModel)));
            }
        };
        return model;
    }
}
const embedTextTitan = async (text, client, model) => {
    const cleanedText = text.replace(/\n/g, ' ');
    const res = await client.send(new client_bedrock_runtime_1.InvokeModelCommand({
        modelId: model,
        body: JSON.stringify({
            inputText: cleanedText
        }),
        contentType: 'application/json',
        accept: 'application/json'
    }));
    try {
        const body = new TextDecoder().decode(res.body);
        return JSON.parse(body).embedding;
    }
    catch (e) {
        throw new Error('An invalid response was returned by Bedrock.');
    }
};
const embedTextCohere = async (texts, client, model, inputType) => {
    const cleanedTexts = texts.map((text) => text.replace(/\n/g, ' '));
    const command = {
        modelId: model,
        body: JSON.stringify({
            texts: cleanedTexts,
            input_type: inputType,
            truncate: 'END'
        }),
        contentType: 'application/json',
        accept: 'application/json'
    };
    const res = await client.send(new client_bedrock_runtime_1.InvokeModelCommand(command));
    try {
        const body = new TextDecoder().decode(res.body);
        return JSON.parse(body).embeddings;
    }
    catch (e) {
        throw new Error('An invalid response was returned by Bedrock.');
    }
};
module.exports = { nodeClass: AWSBedrockEmbedding_Embeddings };
//# sourceMappingURL=AWSBedrockEmbedding.js.map