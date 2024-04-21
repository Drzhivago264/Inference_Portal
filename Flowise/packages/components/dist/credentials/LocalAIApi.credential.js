"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LocalAIApi {
    constructor() {
        this.label = 'LocalAI API';
        this.name = 'localAIApi';
        this.version = 1.0;
        this.inputs = [
            {
                label: 'LocalAI Api Key',
                name: 'localAIApiKey',
                type: 'password'
            }
        ];
    }
}
module.exports = { credClass: LocalAIApi };
//# sourceMappingURL=LocalAIApi.credential.js.map