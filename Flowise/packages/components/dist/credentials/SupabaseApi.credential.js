"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SupabaseApi {
    constructor() {
        this.label = 'Supabase API';
        this.name = 'supabaseApi';
        this.version = 1.0;
        this.inputs = [
            {
                label: 'Supabase API Key',
                name: 'supabaseApiKey',
                type: 'password'
            }
        ];
    }
}
module.exports = { credClass: SupabaseApi };
//# sourceMappingURL=SupabaseApi.credential.js.map