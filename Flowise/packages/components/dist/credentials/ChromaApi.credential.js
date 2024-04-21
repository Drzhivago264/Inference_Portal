"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ChromaApi {
    constructor() {
        this.label = 'Chroma API';
        this.name = 'chromaApi';
        this.version = 1.0;
        this.inputs = [
            {
                label: 'Chroma Api Key',
                name: 'chromaApiKey',
                type: 'password'
            }
        ];
    }
}
module.exports = { credClass: ChromaApi };
//# sourceMappingURL=ChromaApi.credential.js.map