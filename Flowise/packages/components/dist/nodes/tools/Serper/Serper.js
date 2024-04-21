"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const serper_1 = require("@langchain/community/tools/serper");
const utils_1 = require("../../../src/utils");
class Serper_Tools {
    constructor() {
        this.label = 'Serper';
        this.name = 'serper';
        this.version = 1.0;
        this.type = 'Serper';
        this.icon = 'serper.svg';
        this.category = 'Tools';
        this.description = 'Wrapper around Serper.dev - Google Search API';
        this.inputs = [];
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['serperApi']
        };
        this.baseClasses = [this.type, ...(0, utils_1.getBaseClasses)(serper_1.Serper)];
    }
    async init(nodeData, _, options) {
        const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
        const serperApiKey = (0, utils_1.getCredentialParam)('serperApiKey', credentialData, nodeData);
        return new serper_1.Serper(serperApiKey);
    }
}
module.exports = { nodeClass: Serper_Tools };
//# sourceMappingURL=Serper.js.map