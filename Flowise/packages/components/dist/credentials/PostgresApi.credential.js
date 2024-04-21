"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PostgresApi {
    constructor() {
        this.label = 'Postgres API';
        this.name = 'PostgresApi';
        this.version = 1.0;
        this.inputs = [
            {
                label: 'User',
                name: 'user',
                type: 'string',
                placeholder: '<POSTGRES_USERNAME>'
            },
            {
                label: 'Password',
                name: 'password',
                type: 'password',
                placeholder: '<POSTGRES_PASSWORD>'
            }
        ];
    }
}
module.exports = { credClass: PostgresApi };
//# sourceMappingURL=PostgresApi.credential.js.map