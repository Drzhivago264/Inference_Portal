"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../src/utils");
const core_1 = require("./core");
const modelLoader_1 = require("../../../src/modelLoader");
class Cohere_LLMs {
    constructor() {
        //@ts-ignore
        this.loadMethods = {
            async listModels() {
                return await (0, modelLoader_1.getModels)(modelLoader_1.MODEL_TYPE.LLM, 'cohere');
            }
        };
        this.label = 'Cohere';
        this.name = 'cohere';
        this.version = 3.0;
        this.type = 'Cohere';
        this.icon = 'Cohere.svg';
        this.category = 'LLMs';
        this.description = 'Wrapper around Cohere large language models';
        this.baseClasses = [this.type, ...(0, utils_1.getBaseClasses)(core_1.Cohere)];
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['cohereApi']
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
                default: 'command'
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
                label: 'Max Tokens',
                name: 'maxTokens',
                type: 'number',
                step: 1,
                optional: true
            }
        ];
    }
    async init(nodeData, _, options) {
        const temperature = nodeData.inputs?.temperature;
        const modelName = nodeData.inputs?.modelName;
        const maxTokens = nodeData.inputs?.maxTokens;
        const cache = nodeData.inputs?.cache;
        const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
        const cohereApiKey = (0, utils_1.getCredentialParam)('cohereApiKey', credentialData, nodeData);
        const obj = {
            apiKey: cohereApiKey
        };
        if (maxTokens)
            obj.maxTokens = parseInt(maxTokens, 10);
        if (modelName)
            obj.model = modelName;
        if (temperature)
            obj.temperature = parseFloat(temperature);
        if (cache)
            obj.cache = cache;
        const model = new core_1.Cohere(obj);
        return model;
    }
}
module.exports = { nodeClass: Cohere_LLMs };
//# sourceMappingURL=Cohere.js.map