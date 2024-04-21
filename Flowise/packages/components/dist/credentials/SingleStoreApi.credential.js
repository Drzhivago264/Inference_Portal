"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SingleStoreApi {
    constructor() {
        this.label = 'SingleStore API';
        this.name = 'singleStoreApi';
        this.version = 1.0;
        this.inputs = [
            {
                label: 'User',
                name: 'user',
                type: 'string',
                placeholder: '<SINGLESTORE_USERNAME>'
            },
            {
                label: 'Password',
                name: 'password',
                type: 'password',
                placeholder: '<SINGLESTORE_PASSWORD>'
            }
        ];
    }
}
module.exports = { credClass: SingleStoreApi };
//# sourceMappingURL=SingleStoreApi.credential.js.map