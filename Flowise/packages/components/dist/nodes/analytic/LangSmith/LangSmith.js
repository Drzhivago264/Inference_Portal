"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LangSmith_Analytic {
    constructor() {
        this.label = 'LangSmith';
        this.name = 'langSmith';
        this.version = 1.0;
        this.type = 'LangSmith';
        this.icon = 'langchain.png';
        this.category = 'Analytic';
        this.baseClasses = [this.type];
        this.inputs = [];
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['langsmithApi']
        };
    }
}
module.exports = { nodeClass: LangSmith_Analytic };
//# sourceMappingURL=LangSmith.js.map