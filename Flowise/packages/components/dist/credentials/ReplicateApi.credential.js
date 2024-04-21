"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReplicateApi {
    constructor() {
        this.label = 'Replicate API';
        this.name = 'replicateApi';
        this.version = 1.0;
        this.inputs = [
            {
                label: 'Replicate Api Key',
                name: 'replicateApiKey',
                type: 'password'
            }
        ];
    }
}
module.exports = { credClass: ReplicateApi };
//# sourceMappingURL=ReplicateApi.credential.js.map