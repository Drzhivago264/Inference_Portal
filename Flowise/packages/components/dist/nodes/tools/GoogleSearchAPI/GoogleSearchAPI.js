"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const google_custom_search_1 = require("@langchain/community/tools/google_custom_search");
const utils_1 = require("../../../src/utils");
class GoogleCustomSearchAPI_Tools {
    constructor() {
        this.label = 'Google Custom Search';
        this.name = 'googleCustomSearch';
        this.version = 1.0;
        this.type = 'GoogleCustomSearchAPI';
        this.icon = 'google.svg';
        this.category = 'Tools';
        this.description = 'Wrapper around Google Custom Search API - a real-time API to access Google search results';
        this.inputs = [];
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['googleCustomSearchApi']
        };
        this.baseClasses = [this.type, ...(0, utils_1.getBaseClasses)(google_custom_search_1.GoogleCustomSearch)];
    }
    async init(nodeData, _, options) {
        const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
        const googleApiKey = (0, utils_1.getCredentialParam)('googleCustomSearchApiKey', credentialData, nodeData);
        const googleCseId = (0, utils_1.getCredentialParam)('googleCustomSearchApiId', credentialData, nodeData);
        return new google_custom_search_1.GoogleCustomSearch({ apiKey: googleApiKey, googleCSEId: googleCseId });
    }
}
module.exports = { nodeClass: GoogleCustomSearchAPI_Tools };
//# sourceMappingURL=GoogleSearchAPI.js.map