"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DynamodbMemoryApi {
    constructor() {
        this.label = 'DynamodbMemory API';
        this.name = 'dynamodbMemoryApi';
        this.version = 1.0;
        this.inputs = [
            {
                label: 'Access Key',
                name: 'accessKey',
                type: 'password'
            },
            {
                label: 'Secret Access Key',
                name: 'secretAccessKey',
                type: 'password'
            }
        ];
    }
}
module.exports = { credClass: DynamodbMemoryApi };
//# sourceMappingURL=DynamodbMemoryApi.credential.js.map