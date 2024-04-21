"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CohereApi {
    constructor() {
        this.label = 'Cohere API';
        this.name = 'cohereApi';
        this.version = 1.0;
        this.inputs = [
            {
                label: 'Cohere Api Key',
                name: 'cohereApiKey',
                type: 'password'
            }
        ];
    }
}
module.exports = { credClass: CohereApi };
//# sourceMappingURL=CohereApi.credential.js.map