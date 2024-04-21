"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FigmaApi {
    constructor() {
        this.label = 'Figma API';
        this.name = 'figmaApi';
        this.version = 1.0;
        this.description =
            'Refer to <a target="_blank" href="https://www.figma.com/developers/api#access-tokens">official guide</a> on how to get accessToken on Figma';
        this.inputs = [
            {
                label: 'Access Token',
                name: 'accessToken',
                type: 'password',
                placeholder: '<FIGMA_ACCESS_TOKEN>'
            }
        ];
    }
}
module.exports = { credClass: FigmaApi };
//# sourceMappingURL=FigmaApi.credential.js.map