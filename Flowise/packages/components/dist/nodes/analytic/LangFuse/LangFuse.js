"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LangFuse_Analytic {
    constructor() {
        this.label = 'LangFuse';
        this.name = 'langFuse';
        this.version = 1.0;
        this.type = 'LangFuse';
        this.icon = 'Langfuse.svg';
        this.category = 'Analytic';
        this.baseClasses = [this.type];
        this.inputs = [];
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['langfuseApi']
        };
    }
}
module.exports = { nodeClass: LangFuse_Analytic };
//# sourceMappingURL=LangFuse.js.map