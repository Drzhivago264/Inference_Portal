"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WeaviateApi {
    constructor() {
        this.label = 'Weaviate API';
        this.name = 'weaviateApi';
        this.version = 1.0;
        this.inputs = [
            {
                label: 'Weaviate API Key',
                name: 'weaviateApiKey',
                type: 'password'
            }
        ];
    }
}
module.exports = { credClass: WeaviateApi };
//# sourceMappingURL=WeaviateApi.credential.js.map