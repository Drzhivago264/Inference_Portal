"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chains_1 = require("langchain/chains");
const utils_1 = require("../../../src/utils");
const handler_1 = require("../../../src/handler");
const Moderation_1 = require("../../moderation/Moderation");
const OutputParserHelpers_1 = require("../../outputparsers/OutputParserHelpers");
const src_1 = require("../../../src");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class OpenApiChain_Chains {
    constructor() {
        this.label = 'OpenAPI Chain';
        this.name = 'openApiChain';
        this.version = 2.0;
        this.type = 'OpenAPIChain';
        this.icon = 'openapi.svg';
        this.category = 'Chains';
        this.description = 'Chain that automatically select and call APIs based only on an OpenAPI spec';
        this.baseClasses = [this.type, ...(0, utils_1.getBaseClasses)(chains_1.APIChain)];
        this.inputs = [
            {
                label: 'ChatOpenAI Model',
                name: 'model',
                type: 'ChatOpenAI'
            },
            {
                label: 'YAML Link',
                name: 'yamlLink',
                type: 'string',
                placeholder: 'https://api.speak.com/openapi.yaml',
                description: 'If YAML link is provided, uploaded YAML File will be ignored and YAML link will be used instead'
            },
            {
                label: 'YAML File',
                name: 'yamlFile',
                type: 'file',
                fileType: '.yaml',
                description: 'If YAML link is provided, uploaded YAML File will be ignored and YAML link will be used instead'
            },
            {
                label: 'Headers',
                name: 'headers',
                type: 'json',
                additionalParams: true,
                optional: true
            },
            {
                label: 'Input Moderation',
                description: 'Detect text that could generate harmful output and prevent it from being sent to the language model',
                name: 'inputModeration',
                type: 'Moderation',
                optional: true,
                list: true
            }
        ];
    }
    async init(nodeData, _, options) {
        return await initChain(nodeData, options);
    }
    async run(nodeData, input, options) {
        const chain = await initChain(nodeData, options);
        const loggerHandler = new handler_1.ConsoleCallbackHandler(options.logger);
        const callbacks = await (0, handler_1.additionalCallbacks)(nodeData, options);
        const moderations = nodeData.inputs?.inputModeration;
        if (moderations && moderations.length > 0) {
            try {
                // Use the output of the moderation chain as input for the OpenAPI chain
                input = await (0, Moderation_1.checkInputs)(moderations, input);
            }
            catch (e) {
                await new Promise((resolve) => setTimeout(resolve, 500));
                (0, Moderation_1.streamResponse)(options.socketIO && options.socketIOClientId, e.message, options.socketIO, options.socketIOClientId);
                return (0, OutputParserHelpers_1.formatResponse)(e.message);
            }
        }
        if (options.socketIO && options.socketIOClientId) {
            const handler = new handler_1.CustomChainHandler(options.socketIO, options.socketIOClientId);
            const res = await chain.run(input, [loggerHandler, handler, ...callbacks]);
            return res;
        }
        else {
            const res = await chain.run(input, [loggerHandler, ...callbacks]);
            return res;
        }
    }
}
const initChain = async (nodeData, options) => {
    const model = nodeData.inputs?.model;
    const headers = nodeData.inputs?.headers;
    const yamlLink = nodeData.inputs?.yamlLink;
    const yamlFileBase64 = nodeData.inputs?.yamlFile;
    let yamlString = '';
    if (yamlLink) {
        yamlString = yamlLink;
    }
    else {
        if (yamlFileBase64.startsWith('FILE-STORAGE::')) {
            const file = yamlFileBase64.replace('FILE-STORAGE::', '');
            const chatflowid = options.chatflowid;
            const fileInStorage = path_1.default.join((0, src_1.getStoragePath)(), chatflowid, file);
            const fileData = fs_1.default.readFileSync(fileInStorage);
            yamlString = fileData.toString();
        }
        else {
            const splitDataURI = yamlFileBase64.split(',');
            splitDataURI.pop();
            const bf = Buffer.from(splitDataURI.pop() || '', 'base64');
            yamlString = bf.toString('utf-8');
        }
    }
    return await (0, chains_1.createOpenAPIChain)(yamlString, {
        llm: model,
        headers: typeof headers === 'object' ? headers : headers ? JSON.parse(headers) : {},
        verbose: process.env.DEBUG === 'true' ? true : false
    });
};
module.exports = { nodeClass: OpenApiChain_Chains };
//# sourceMappingURL=OpenAPIChain.js.map