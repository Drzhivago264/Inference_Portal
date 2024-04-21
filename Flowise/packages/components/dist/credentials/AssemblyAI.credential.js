"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AssemblyAIApi {
    constructor() {
        this.label = 'AssemblyAI API';
        this.name = 'assemblyAIApi';
        this.version = 1.0;
        this.inputs = [
            {
                label: 'AssemblyAI Api Key',
                name: 'assemblyAIApiKey',
                type: 'password'
            }
        ];
    }
}
module.exports = { credClass: AssemblyAIApi };
//# sourceMappingURL=AssemblyAI.credential.js.map