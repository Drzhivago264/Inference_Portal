"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Lunary_Analytic {
    constructor() {
        this.label = 'Lunary';
        this.name = 'lunary';
        this.version = 1.0;
        this.type = 'Lunary';
        this.icon = 'Lunary.svg';
        this.category = 'Analytic';
        this.baseClasses = [this.type];
        this.inputs = [];
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['lunaryApi']
        };
    }
}
module.exports = { nodeClass: Lunary_Analytic };
//# sourceMappingURL=Lunary.js.map