"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SerperApi {
    constructor() {
        this.label = 'Serper API';
        this.name = 'serperApi';
        this.version = 1.0;
        this.inputs = [
            {
                label: 'Serper Api Key',
                name: 'serperApiKey',
                type: 'password'
            }
        ];
    }
}
module.exports = { credClass: SerperApi };
//# sourceMappingURL=SerperApi.credential.js.map