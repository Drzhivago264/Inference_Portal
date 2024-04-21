"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GroqApi {
    constructor() {
        this.label = 'Groq API';
        this.name = 'groqApi';
        this.version = 1.0;
        this.inputs = [
            {
                label: 'Groq Api Key',
                name: 'groqApiKey',
                type: 'password'
            }
        ];
    }
}
module.exports = { credClass: GroqApi };
//# sourceMappingURL=GroqApi.credential.js.map