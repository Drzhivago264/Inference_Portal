"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const searchapi_1 = require("@langchain/community/tools/searchapi");
const utils_1 = require("../../../src/utils");
class SearchAPI_Tools {
    constructor() {
        this.label = 'SearchApi';
        this.name = 'searchAPI';
        this.version = 1.0;
        this.type = 'SearchAPI';
        this.icon = 'searchapi.svg';
        this.category = 'Tools';
        this.description = 'Real-time API for accessing Google Search data';
        this.inputs = [];
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['searchApi']
        };
        this.baseClasses = [this.type, ...(0, utils_1.getBaseClasses)(searchapi_1.SearchApi)];
    }
    async init(nodeData, _, options) {
        const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
        const searchApiKey = (0, utils_1.getCredentialParam)('searchApiKey', credentialData, nodeData);
        return new searchapi_1.SearchApi(searchApiKey);
    }
}
module.exports = { nodeClass: SearchAPI_Tools };
//# sourceMappingURL=SearchAPI.js.map