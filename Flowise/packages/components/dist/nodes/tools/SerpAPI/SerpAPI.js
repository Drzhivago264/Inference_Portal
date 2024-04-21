"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const serpapi_1 = require("@langchain/community/tools/serpapi");
const utils_1 = require("../../../src/utils");
class SerpAPI_Tools {
    constructor() {
        this.label = 'Serp API';
        this.name = 'serpAPI';
        this.version = 1.0;
        this.type = 'SerpAPI';
        this.icon = 'serp.svg';
        this.category = 'Tools';
        this.description = 'Wrapper around SerpAPI - a real-time API to access Google search results';
        this.inputs = [];
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['serpApi']
        };
        this.baseClasses = [this.type, ...(0, utils_1.getBaseClasses)(serpapi_1.SerpAPI)];
    }
    async init(nodeData, _, options) {
        const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
        const serpApiKey = (0, utils_1.getCredentialParam)('serpApiKey', credentialData, nodeData);
        return new serpapi_1.SerpAPI(serpApiKey);
    }
}
module.exports = { nodeClass: SerpAPI_Tools };
//# sourceMappingURL=SerpAPI.js.map