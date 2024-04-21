"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobile_apps_json_1 = __importDefault(require("../../fixtures/regexes/client/mobile_apps.json"));
const version_1 = require("../../utils/version");
const variable_replacement_1 = require("../../utils/variable-replacement");
const user_agent_1 = require("../../utils/user-agent");
class MobileAppParser {
    constructor(options) {
        this.options = {
            versionTruncation: 1
        };
        this.parse = (userAgent) => {
            const result = {
                type: "",
                name: "",
                version: ""
            };
            for (const mobileApp of mobile_apps_json_1.default) {
                const match = user_agent_1.userAgentParser(mobileApp.regex, userAgent);
                if (!match)
                    continue;
                result.type = "mobile app";
                result.name = variable_replacement_1.variableReplacement(mobileApp.name, match);
                result.version = version_1.formatVersion(variable_replacement_1.variableReplacement(mobileApp.version, match), this.options.versionTruncation);
                break;
            }
            return result;
        };
        this.options = Object.assign(Object.assign({}, this.options), options);
    }
}
exports.default = MobileAppParser;
