"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UpstashRedisApi {
    constructor() {
        this.label = 'Upstash Redis API';
        this.name = 'upstashRedisApi';
        this.version = 1.0;
        this.description =
            'Refer to <a target="_blank" href="https://upstash.com/docs/redis/overall/getstarted">official guide</a> on how to create redis instance and get redis REST URL and Token';
        this.inputs = [
            {
                label: 'Upstash Redis REST URL',
                name: 'upstashConnectionUrl',
                type: 'string'
            },
            {
                label: 'Token',
                name: 'upstashConnectionToken',
                type: 'password'
            }
        ];
    }
}
module.exports = { credClass: UpstashRedisApi };
//# sourceMappingURL=UpstashRedisApi.credential.js.map