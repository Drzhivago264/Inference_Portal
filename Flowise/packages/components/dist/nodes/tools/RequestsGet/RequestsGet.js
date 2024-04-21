"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../src/utils");
const core_1 = require("./core");
class RequestsGet_Tools {
    constructor() {
        this.label = 'Requests Get';
        this.name = 'requestsGet';
        this.version = 1.0;
        this.type = 'RequestsGet';
        this.icon = 'requestsget.svg';
        this.category = 'Tools';
        this.description = 'Execute HTTP GET requests';
        this.baseClasses = [this.type, ...(0, utils_1.getBaseClasses)(core_1.RequestsGetTool)];
        this.inputs = [
            {
                label: 'URL',
                name: 'url',
                type: 'string',
                description: 'Agent will make call to this exact URL. If not specified, agent will try to figure out itself from AIPlugin if provided',
                additionalParams: true,
                optional: true
            },
            {
                label: 'Description',
                name: 'description',
                type: 'string',
                rows: 4,
                default: core_1.desc,
                description: 'Acts like a prompt to tell agent when it should use this tool',
                additionalParams: true,
                optional: true
            },
            {
                label: 'Headers',
                name: 'headers',
                type: 'json',
                additionalParams: true,
                optional: true
            }
        ];
    }
    async init(nodeData) {
        const headers = nodeData.inputs?.headers;
        const url = nodeData.inputs?.url;
        const description = nodeData.inputs?.description;
        const obj = {};
        if (url)
            obj.url = url;
        if (description)
            obj.description = description;
        if (headers) {
            const parsedHeaders = typeof headers === 'object' ? headers : JSON.parse(headers);
            obj.headers = parsedHeaders;
        }
        return new core_1.RequestsGetTool(obj);
    }
}
module.exports = { nodeClass: RequestsGet_Tools };
//# sourceMappingURL=RequestsGet.js.map