"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const js_yaml_1 = require("js-yaml");
const agents_1 = require("langchain/agents");
const core_1 = require("./core");
const src_1 = require("../../../src");
const src_2 = require("../../../src");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class OpenAPIToolkit_Tools {
    constructor() {
        this.label = 'OpenAPI Toolkit';
        this.name = 'openAPIToolkit';
        this.version = 1.0;
        this.type = 'OpenAPIToolkit';
        this.icon = 'openapi.svg';
        this.category = 'Tools';
        this.description = 'Load OpenAPI specification';
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            description: 'Only needed if the YAML OpenAPI Spec requires authentication',
            optional: true,
            credentialNames: ['openAPIAuth']
        };
        this.inputs = [
            {
                label: 'Language Model',
                name: 'model',
                type: 'BaseLanguageModel'
            },
            {
                label: 'YAML File',
                name: 'yamlFile',
                type: 'file',
                fileType: '.yaml'
            }
        ];
        this.baseClasses = [this.type, 'Tool'];
    }
    async init(nodeData, _, options) {
        const model = nodeData.inputs?.model;
        const yamlFileBase64 = nodeData.inputs?.yamlFile;
        const credentialData = await (0, src_1.getCredentialData)(nodeData.credential ?? '', options);
        const openAPIToken = (0, src_1.getCredentialParam)('openAPIToken', credentialData, nodeData);
        let data;
        if (yamlFileBase64.startsWith('FILE-STORAGE::')) {
            const file = yamlFileBase64.replace('FILE-STORAGE::', '');
            const chatflowid = options.chatflowid;
            const fileInStorage = path_1.default.join((0, src_2.getStoragePath)(), chatflowid, file);
            const fileData = fs_1.default.readFileSync(fileInStorage);
            const utf8String = fileData.toString('utf-8');
            data = (0, js_yaml_1.load)(utf8String);
        }
        else {
            const splitDataURI = yamlFileBase64.split(',');
            splitDataURI.pop();
            const bf = Buffer.from(splitDataURI.pop() || '', 'base64');
            const utf8String = bf.toString('utf-8');
            data = (0, js_yaml_1.load)(utf8String);
        }
        if (!data) {
            throw new Error('Failed to load OpenAPI spec');
        }
        const headers = {
            'Content-Type': 'application/json'
        };
        if (openAPIToken)
            headers.Authorization = `Bearer ${openAPIToken}`;
        const toolkit = new agents_1.OpenApiToolkit(new core_1.JsonSpec(data), model, headers);
        return toolkit.tools;
    }
}
module.exports = { nodeClass: OpenAPIToolkit_Tools };
//# sourceMappingURL=OpenAPIToolkit.js.map