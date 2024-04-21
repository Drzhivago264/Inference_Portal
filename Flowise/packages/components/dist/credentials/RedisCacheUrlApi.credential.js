"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RedisCacheUrlApi {
    constructor() {
        this.label = 'Redis URL';
        this.name = 'redisCacheUrlApi';
        this.version = 1.0;
        this.inputs = [
            {
                label: 'Redis URL',
                name: 'redisUrl',
                type: 'string',
                default: 'redis://localhost:6379'
            }
        ];
    }
}
module.exports = { credClass: RedisCacheUrlApi };
//# sourceMappingURL=RedisCacheUrlApi.credential.js.map