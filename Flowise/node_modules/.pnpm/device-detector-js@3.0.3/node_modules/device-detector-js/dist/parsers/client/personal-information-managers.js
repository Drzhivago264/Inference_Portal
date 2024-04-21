"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pim_json_1 = __importDefault(require("../../fixtures/regexes/client/pim.json"));
const version_1 = require("../../utils/version");
const variable_replacement_1 = require("../../utils/variable-replacement");
const user_agent_1 = require("../../utils/user-agent");
class PersonalInformationManagerParser {
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
            for (const personalInformationManager of pim_json_1.default) {
                const match = user_agent_1.userAgentParser(personalInformationManager.regex, userAgent);
                if (!match)
                    continue;
                result.type = "personal information manager";
                result.name = variable_replacement_1.variableReplacement(personalInformationManager.name, match);
                result.version = version_1.formatVersion(variable_replacement_1.variableReplacement(personalInformationManager.version, match), this.options.versionTruncation);
                break;
            }
            return result;
        };
        this.options = Object.assign(Object.assign({}, this.options), options);
    }
}
exports.default = PersonalInformationManagerParser;
