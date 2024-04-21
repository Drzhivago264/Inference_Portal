"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MistralAICredential {
    constructor() {
        this.label = 'MistralAI API';
        this.name = 'mistralAIApi';
        this.version = 1.0;
        this.description = 'You can get your API key from official <a target="_blank" href="https://console.mistral.ai/">console</a> here.';
        this.inputs = [
            {
                label: 'MistralAI API Key',
                name: 'mistralAIAPIKey',
                type: 'password'
            }
        ];
    }
}
module.exports = { credClass: MistralAICredential };
//# sourceMappingURL=MistralApi.credential.js.map