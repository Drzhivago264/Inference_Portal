"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AstraDBApi {
    constructor() {
        this.label = 'Astra DB API';
        this.name = 'AstraDBApi';
        this.version = 2.0;
        this.inputs = [
            {
                label: 'Astra DB Application Token',
                name: 'applicationToken',
                type: 'password'
            },
            {
                label: 'Astra DB Api Endpoint',
                name: 'dbEndPoint',
                type: 'string'
            }
        ];
    }
}
module.exports = { credClass: AstraDBApi };
//# sourceMappingURL=AstraApi.credential.js.map