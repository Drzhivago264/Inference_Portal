"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PineconeApi {
    constructor() {
        this.label = 'Pinecone API';
        this.name = 'pineconeApi';
        this.version = 1.0;
        this.inputs = [
            {
                label: 'Pinecone Api Key',
                name: 'pineconeApiKey',
                type: 'password'
            }
        ];
    }
}
module.exports = { credClass: PineconeApi };
//# sourceMappingURL=PineconeApi.credential.js.map