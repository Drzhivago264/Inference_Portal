"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OpenAIApi {
    constructor() {
        this.label = 'OpenAI API';
        this.name = 'openAIApi';
        this.version = 1.0;
        this.inputs = [
            {
                label: 'OpenAI Api Key',
                name: 'openAIApiKey',
                type: 'password'
            }
        ];
    }
}
module.exports = { credClass: OpenAIApi };
//# sourceMappingURL=OpenAIApi.credential.js.map