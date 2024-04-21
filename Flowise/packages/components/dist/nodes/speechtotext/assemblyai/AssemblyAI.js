"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AssemblyAI_SpeechToText {
    constructor() {
        this.label = 'AssemblyAI';
        this.name = 'assemblyAI';
        this.version = 1.0;
        this.type = 'AssemblyAI';
        this.icon = 'assemblyai.png';
        this.category = 'SpeechToText';
        this.baseClasses = [this.type];
        this.inputs = [];
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['assemblyAIApi']
        };
    }
}
module.exports = { nodeClass: AssemblyAI_SpeechToText };
//# sourceMappingURL=AssemblyAI.js.map