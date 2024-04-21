"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const brave_search_1 = require("@langchain/community/tools/brave_search");
const utils_1 = require("../../../src/utils");
class BraveSearchAPI_Tools {
    constructor() {
        this.label = 'BraveSearch API';
        this.name = 'braveSearchAPI';
        this.version = 1.0;
        this.type = 'BraveSearchAPI';
        this.icon = 'brave.svg';
        this.category = 'Tools';
        this.description = 'Wrapper around BraveSearch API - a real-time API to access Brave search results';
        this.inputs = [];
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['braveSearchApi']
        };
        this.baseClasses = [this.type, ...(0, utils_1.getBaseClasses)(brave_search_1.BraveSearch)];
    }
    async init(nodeData, _, options) {
        const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
        const braveApiKey = (0, utils_1.getCredentialParam)('braveApiKey', credentialData, nodeData);
        return new brave_search_1.BraveSearch({ apiKey: braveApiKey });
    }
}
module.exports = { nodeClass: BraveSearchAPI_Tools };
//# sourceMappingURL=BraveSearchAPI.js.map