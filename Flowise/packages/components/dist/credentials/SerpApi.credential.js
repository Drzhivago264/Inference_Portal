"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SerpApi {
    constructor() {
        this.label = 'Serp API';
        this.name = 'serpApi';
        this.version = 1.0;
        this.inputs = [
            {
                label: 'Serp Api Key',
                name: 'serpApiKey',
                type: 'password'
            }
        ];
    }
}
module.exports = { credClass: SerpApi };
//# sourceMappingURL=SerpApi.credential.js.map