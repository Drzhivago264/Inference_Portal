"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GoogleSearchApi {
    constructor() {
        this.label = 'Google Custom Search API';
        this.name = 'googleCustomSearchApi';
        this.version = 1.0;
        this.description =
            'Please refer to the <a target="_blank" href="https://console.cloud.google.com/apis/credentials">Google Cloud Console</a> for instructions on how to create an API key, and visit the <a target="_blank" href="https://programmablesearchengine.google.com/controlpanel/create">Search Engine Creation page</a> to learn how to generate your Search Engine ID.';
        this.inputs = [
            {
                label: 'Google Custom Search Api Key',
                name: 'googleCustomSearchApiKey',
                type: 'password'
            },
            {
                label: 'Programmable Search Engine ID',
                name: 'googleCustomSearchApiId',
                type: 'string'
            }
        ];
    }
}
module.exports = { credClass: GoogleSearchApi };
//# sourceMappingURL=GoogleSearchApi.credential.js.map