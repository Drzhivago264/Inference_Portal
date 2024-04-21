"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GoogleMakerSuite {
    constructor() {
        this.label = 'Google MakerSuite';
        this.name = 'googleMakerSuite';
        this.version = 1.0;
        this.description =
            'Use the <a target="_blank" href="https://makersuite.google.com/app/apikey">Google MakerSuite API credential site</a> to get this key.';
        this.inputs = [
            {
                label: 'MakerSuite API Key',
                name: 'googleMakerSuiteKey',
                type: 'password'
            }
        ];
    }
}
module.exports = { credClass: GoogleMakerSuite };
//# sourceMappingURL=GoogleMakerSuite.credential.js.map