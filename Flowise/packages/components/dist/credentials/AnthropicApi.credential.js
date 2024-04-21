"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AnthropicApi {
    constructor() {
        this.label = 'Anthropic API';
        this.name = 'anthropicApi';
        this.version = 1.0;
        this.inputs = [
            {
                label: 'Anthropic Api Key',
                name: 'anthropicApiKey',
                type: 'password'
            }
        ];
    }
}
module.exports = { credClass: AnthropicApi };
//# sourceMappingURL=AnthropicApi.credential.js.map