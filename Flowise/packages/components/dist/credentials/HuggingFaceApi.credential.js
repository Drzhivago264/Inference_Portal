"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HuggingFaceApi {
    constructor() {
        this.label = 'HuggingFace API';
        this.name = 'huggingFaceApi';
        this.version = 1.0;
        this.inputs = [
            {
                label: 'HuggingFace Api Key',
                name: 'huggingFaceApiKey',
                type: 'password'
            }
        ];
    }
}
module.exports = { credClass: HuggingFaceApi };
//# sourceMappingURL=HuggingFaceApi.credential.js.map