"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ZepMemoryApi {
    constructor() {
        this.label = 'Zep Memory API';
        this.name = 'zepMemoryApi';
        this.version = 1.0;
        this.description =
            'Refer to <a target="_blank" href="https://docs.getzep.com/deployment/auth/">official guide</a> on how to create API key on Zep';
        this.inputs = [
            {
                label: 'API Key',
                name: 'apiKey',
                type: 'password'
            }
        ];
    }
}
module.exports = { credClass: ZepMemoryApi };
//# sourceMappingURL=ZepMemoryApi.credential.js.map