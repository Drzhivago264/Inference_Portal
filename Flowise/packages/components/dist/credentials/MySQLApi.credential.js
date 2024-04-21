"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MySQLApi {
    constructor() {
        this.label = 'MySQL API';
        this.name = 'MySQLApi';
        this.version = 1.0;
        this.inputs = [
            {
                label: 'User',
                name: 'user',
                type: 'string',
                placeholder: '<MYSQL_USERNAME>'
            },
            {
                label: 'Password',
                name: 'password',
                type: 'password',
                placeholder: '<MYSQL_PASSWORD>'
            }
        ];
    }
}
module.exports = { credClass: MySQLApi };
//# sourceMappingURL=MySQLApi.credential.js.map