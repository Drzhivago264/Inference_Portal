"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const version_1 = require("../../utils/version");
const variable_replacement_1 = require("../../utils/variable-replacement");
const user_agent_1 = require("../../utils/user-agent");
const browsers_json_1 = __importDefault(require("../../fixtures/regexes/client/browsers.json"));
const browser_engine_json_1 = __importDefault(require("../../fixtures/regexes/client/browser_engine.json"));
const available_browsers_json_1 = __importDefault(require("./fixtures/available-browsers.json"));
const mobile_only_browsers_json_1 = __importDefault(require("./fixtures/mobile-only-browsers.json"));
class BrowserParser {
    constructor(options) {
        this.options = {
            versionTruncation: 1
        };
        this.parse = (userAgent) => {
            const result = {
                type: "",
                name: "",
                version: "",
                engine: "",
                engineVersion: ""
            };
            for (const browser of browsers_json_1.default) {
                const match = user_agent_1.userAgentParser(browser.regex, userAgent);
                if (!match)
                    continue;
                const vrpVersion = variable_replacement_1.variableReplacement(browser.version, match);
                const version = version_1.formatVersion(vrpVersion, this.options.versionTruncation);
                const shortVersion = version && parseFloat(version_1.formatVersion(vrpVersion, 1)) || "";
                if (browser.engine) {
                    result.engine = browser.engine.default;
                    if (browser.engine && browser.engine.versions && shortVersion) {
                        const sortedEngineVersions = Object.entries(browser.engine.versions).sort((a, b) => {
                            return parseFloat(a[0]) > parseFloat(b[0]) ? 1 : -1;
                        });
                        for (const [versionThreshold, engineByVersion] of sortedEngineVersions) {
                            if (parseFloat(versionThreshold) <= shortVersion) {
                                result.engine = engineByVersion || "";
                            }
                        }
                    }
                }
                result.type = "browser";
                result.name = variable_replacement_1.variableReplacement(browser.name, match);
                result.version = version;
                break;
            }
            if (!result.engine) {
                for (const browserEngine of browser_engine_json_1.default) {
                    let match = null;
                    try {
                        match = RegExp(browserEngine.regex, "i").exec(userAgent);
                    }
                    catch (_a) {
                        // TODO: find out why it fails in some browsers
                    }
                    if (!match)
                        continue;
                    result.engine = browserEngine.name;
                    break;
                }
            }
            result.engineVersion = version_1.formatVersion(version_1.parseBrowserEngineVersion(userAgent, result.engine), this.options.versionTruncation);
            return result;
        };
        this.options = Object.assign(Object.assign({}, this.options), options);
    }
}
exports.default = BrowserParser;
BrowserParser.getBrowserShortName = (browserName) => {
    for (const [shortName, name] of Object.entries(available_browsers_json_1.default)) {
        if (name === browserName) {
            return shortName;
        }
    }
    return "";
};
BrowserParser.isMobileOnlyBrowser = (browserName) => {
    return mobile_only_browsers_json_1.default.includes(BrowserParser.getBrowserShortName(browserName));
};
