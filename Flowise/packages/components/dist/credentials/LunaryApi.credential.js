"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LunaryApi {
    constructor() {
        this.label = 'Lunary API';
        this.name = 'lunaryApi';
        this.version = 1.0;
        this.description = 'Refer to <a target="_blank" href="https://lunary.ai/docs">official guide</a> to get APP ID';
        this.inputs = [
            {
                label: 'APP ID',
                name: 'lunaryAppId',
                type: 'password',
                placeholder: '<Lunary_APP_ID>'
            },
            {
                label: 'Endpoint',
                name: 'lunaryEndpoint',
                type: 'string',
                default: 'https://app.lunary.ai'
            }
        ];
    }
}
module.exports = { credClass: LunaryApi };
//# sourceMappingURL=LunaryApi.credential.js.map