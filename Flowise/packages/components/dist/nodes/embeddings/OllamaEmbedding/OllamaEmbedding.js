"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ollama_1 = require("@langchain/community/embeddings/ollama");
const utils_1 = require("../../../src/utils");
class OllamaEmbedding_Embeddings {
    constructor() {
        this.label = 'Ollama Embeddings';
        this.name = 'ollamaEmbedding';
        this.version = 1.0;
        this.type = 'OllamaEmbeddings';
        this.icon = 'Ollama.svg';
        this.category = 'Embeddings';
        this.description = 'Generate embeddings for a given text using open source model on Ollama';
        this.baseClasses = [this.type, ...(0, utils_1.getBaseClasses)(ollama_1.OllamaEmbeddings)];
        this.inputs = [
            {
                label: 'Base URL',
                name: 'baseUrl',
                type: 'string',
                default: 'http://localhost:11434'
            },
            {
                label: 'Model Name',
                name: 'modelName',
                type: 'string',
                placeholder: 'llama2'
            },
            {
                label: 'Number of GPU',
                name: 'numGpu',
                type: 'number',
                description: 'The number of layers to send to the GPU(s). On macOS it defaults to 1 to enable metal support, 0 to disable. Refer to <a target="_blank" href="https://github.com/jmorganca/ollama/blob/main/docs/modelfile.md#valid-parameters-and-values">docs</a> for more details',
                step: 1,
                optional: true,
                additionalParams: true
            },
            {
                label: 'Number of Thread',
                name: 'numThread',
                type: 'number',
                description: 'Sets the number of threads to use during computation. By default, Ollama will detect this for optimal performance. It is recommended to set this value to the number of physical CPU cores your system has (as opposed to the logical number of cores). Refer to <a target="_blank" href="https://github.com/jmorganca/ollama/blob/main/docs/modelfile.md#valid-parameters-and-values">docs</a> for more details',
                step: 1,
                optional: true,
                additionalParams: true
            },
            {
                label: 'Use MMap',
                name: 'useMMap',
                type: 'boolean',
                optional: true,
                additionalParams: true
            }
        ];
    }
    async init(nodeData) {
        const modelName = nodeData.inputs?.modelName;
        const baseUrl = nodeData.inputs?.baseUrl;
        const numThread = nodeData.inputs?.numThread;
        const numGpu = nodeData.inputs?.numGpu;
        const useMMap = nodeData.inputs?.useMMap;
        const obj = {
            model: modelName,
            baseUrl,
            requestOptions: {}
        };
        const requestOptions = {};
        if (numThread)
            requestOptions.numThread = parseFloat(numThread);
        if (numGpu)
            requestOptions.numGpu = parseFloat(numGpu);
        if (useMMap !== undefined)
            requestOptions.useMMap = useMMap;
        if (Object.keys(requestOptions).length)
            obj.requestOptions = requestOptions;
        const model = new ollama_1.OllamaEmbeddings(obj);
        return model;
    }
}
module.exports = { nodeClass: OllamaEmbedding_Embeddings };
//# sourceMappingURL=OllamaEmbedding.js.map