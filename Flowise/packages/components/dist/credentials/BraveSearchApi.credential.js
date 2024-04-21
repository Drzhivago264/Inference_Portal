"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BraveSearchApi {
    constructor() {
        this.label = 'Brave Search API';
        this.name = 'braveSearchApi';
        this.version = 1.0;
        this.inputs = [
            {
                label: 'BraveSearch Api Key',
                name: 'braveApiKey',
                type: 'password'
            }
        ];
    }
}
module.exports = { credClass: BraveSearchApi };
//# sourceMappingURL=BraveSearchApi.credential.js.map