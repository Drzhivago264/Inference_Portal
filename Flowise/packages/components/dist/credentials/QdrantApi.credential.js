"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QdrantApi {
    constructor() {
        this.label = 'Qdrant API';
        this.name = 'qdrantApi';
        this.version = 1.0;
        this.inputs = [
            {
                label: 'Qdrant API Key',
                name: 'qdrantApiKey',
                type: 'password'
            }
        ];
    }
}
module.exports = { credClass: QdrantApi };
//# sourceMappingURL=QdrantApi.credential.js.map