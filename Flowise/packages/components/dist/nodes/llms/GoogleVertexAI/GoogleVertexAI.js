"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const googlevertexai_1 = require("@langchain/community/llms/googlevertexai");
const utils_1 = require("../../../src/utils");
const modelLoader_1 = require("../../../src/modelLoader");
class GoogleVertexAI_LLMs {
    constructor() {
        //@ts-ignore
        this.loadMethods = {
            async listModels() {
                return await (0, modelLoader_1.getModels)(modelLoader_1.MODEL_TYPE.LLM, 'googlevertexai');
            }
        };
        this.label = 'GoogleVertexAI';
        this.name = 'googlevertexai';
        this.version = 3.0;
        this.type = 'GoogleVertexAI';
        this.icon = 'GoogleVertex.svg';
        this.category = 'LLMs';
        this.description = 'Wrapper around GoogleVertexAI large language models';
        this.baseClasses = [this.type, ...(0, utils_1.getBaseClasses)(googlevertexai_1.GoogleVertexAI)];
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['googleVertexAuth'],
            optional: true,
            description: 'Google Vertex AI credential. If you are using a GCP service like Cloud Run, or if you have installed default credentials on your local machine, you do not need to set this credential.'
        };
        this.inputs = [
            {
                label: 'Cache',
                name: 'cache',
                type: 'BaseCache',
                optional: true
            },
            {
                label: 'Model Name',
                name: 'modelName',
                type: 'asyncOptions',
                loadMethod: 'listModels',
                default: 'text-bison'
            },
            {
                label: 'Temperature',
                name: 'temperature',
                type: 'number',
                step: 0.1,
                default: 0.7,
                optional: true
            },
            {
                label: 'max Output Tokens',
                name: 'maxOutputTokens',
                type: 'number',
                step: 1,
                optional: true,
                additionalParams: true
            },
            {
                label: 'Top Probability',
                name: 'topP',
                type: 'number',
                step: 0.1,
                optional: true,
                additionalParams: true
            }
        ];
    }
    async init(nodeData, _, options) {
        const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
        const googleApplicationCredentialFilePath = (0, utils_1.getCredentialParam)('googleApplicationCredentialFilePath', credentialData, nodeData);
        const googleApplicationCredential = (0, utils_1.getCredentialParam)('googleApplicationCredential', credentialData, nodeData);
        const projectID = (0, utils_1.getCredentialParam)('projectID', credentialData, nodeData);
        const authOptions = {};
        if (Object.keys(credentialData).length !== 0) {
            if (!googleApplicationCredentialFilePath && !googleApplicationCredential)
                throw new Error('Please specify your Google Application Credential');
            if (!googleApplicationCredentialFilePath && !googleApplicationCredential)
                throw new Error('Error: More than one component has been inputted. Please use only one of the following: Google Application Credential File Path or Google Credential JSON Object');
            if (googleApplicationCredentialFilePath && !googleApplicationCredential)
                authOptions.keyFile = googleApplicationCredentialFilePath;
            else if (!googleApplicationCredentialFilePath && googleApplicationCredential)
                authOptions.credentials = JSON.parse(googleApplicationCredential);
            if (projectID)
                authOptions.projectId = projectID;
        }
        const temperature = nodeData.inputs?.temperature;
        const modelName = nodeData.inputs?.modelName;
        const maxOutputTokens = nodeData.inputs?.maxOutputTokens;
        const topP = nodeData.inputs?.topP;
        const cache = nodeData.inputs?.cache;
        const obj = {
            temperature: parseFloat(temperature),
            model: modelName
        };
        if (Object.keys(authOptions).length !== 0)
            obj.authOptions = authOptions;
        if (maxOutputTokens)
            obj.maxOutputTokens = parseInt(maxOutputTokens, 10);
        if (topP)
            obj.topP = parseFloat(topP);
        if (cache)
            obj.cache = cache;
        const model = new googlevertexai_1.GoogleVertexAI(obj);
        return model;
    }
}
module.exports = { nodeClass: GoogleVertexAI_LLMs };
//# sourceMappingURL=GoogleVertexAI.js.map