"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UnstructuredApi {
    constructor() {
        this.label = 'Unstructured API';
        this.name = 'unstructuredApi';
        this.version = 1.0;
        this.description =
            'Refer to <a target="_blank" href="https://unstructured.io/#get-api-key">official guide</a> on how to get api key on Unstructured';
        this.inputs = [
            {
                label: 'API Key',
                name: 'unstructuredAPIKey',
                type: 'password'
            }
        ];
    }
}
module.exports = { credClass: UnstructuredApi };
//# sourceMappingURL=UnstructuredApi.credential.js.map