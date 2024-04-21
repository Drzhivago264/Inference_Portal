"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VectaraAPI {
    constructor() {
        this.label = 'Vectara API';
        this.name = 'vectaraApi';
        this.version = 1.0;
        this.inputs = [
            {
                label: 'Vectara Customer ID',
                name: 'customerID',
                type: 'string'
            },
            {
                label: 'Vectara Corpus ID',
                name: 'corpusID',
                type: 'string'
            },
            {
                label: 'Vectara API Key',
                name: 'apiKey',
                type: 'password'
            }
        ];
    }
}
module.exports = { credClass: VectaraAPI };
//# sourceMappingURL=VectaraApi.credential.js.map