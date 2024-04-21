"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const oss_json_1 = __importDefault(require("../../fixtures/regexes/oss.json"));
const version_1 = require("../../utils/version");
const variable_replacement_1 = require("../../utils/variable-replacement");
const user_agent_1 = require("../../utils/user-agent");
const operating_system_json_1 = __importDefault(require("./fixtures/operating-system.json"));
const desktopOsArray = ["AmigaOS", "IBM", "GNU/Linux", "Mac", "Unix", "Windows", "BeOS", "Chrome OS"];
const shortOsNames = operating_system_json_1.default.operatingSystem;
const osFamilies = operating_system_json_1.default.osFamilies;
class OperatingSystemParser {
    constructor(options) {
        this.options = {
            versionTruncation: 1
        };
        this.parse = (userAgent) => {
            const result = {
                name: "",
                version: "",
                platform: this.parsePlatform(userAgent)
            };
            for (const operatingSystem of oss_json_1.default) {
                const match = user_agent_1.userAgentParser(operatingSystem.regex, userAgent);
                if (!match)
                    continue;
                result.name = variable_replacement_1.variableReplacement(operatingSystem.name, match);
                result.version = version_1.formatVersion(variable_replacement_1.variableReplacement(operatingSystem.version, match), this.options.versionTruncation);
                if (result.name === "lubuntu") {
                    result.name = "Lubuntu";
                }
                if (result.name === "debian") {
                    result.name = "Debian";
                }
                if (result.name === "YunOS") {
                    result.name = "YunOs";
                }
                return result;
            }
            return null;
        };
        this.parsePlatform = (userAgent) => {
            if (user_agent_1.userAgentParser("arm|aarch64|Watch ?OS|Watch1,[12]", userAgent)) {
                return "ARM";
            }
            if (user_agent_1.userAgentParser("mips", userAgent)) {
                return "MIPS";
            }
            if (user_agent_1.userAgentParser("sh4", userAgent)) {
                return "SuperH";
            }
            if (user_agent_1.userAgentParser("WOW64|x64|win64|amd64|x86_?64", userAgent)) {
                return "x64";
            }
            if (user_agent_1.userAgentParser("(?:i[0-9]|x)86|i86pc", userAgent)) {
                return "x86";
            }
            return "";
        };
        this.options = Object.assign(Object.assign({}, this.options), options);
    }
}
exports.default = OperatingSystemParser;
OperatingSystemParser.getDesktopOsArray = () => desktopOsArray;
OperatingSystemParser.getOsFamily = (osName) => {
    const osShortName = OperatingSystemParser.getOsShortName(osName);
    for (const [osFamily, shortNames] of Object.entries(osFamilies)) {
        if (shortNames.includes(osShortName)) {
            return osFamily;
        }
    }
    return "";
};
OperatingSystemParser.getOsShortName = (osName) => {
    for (const [shortName, name] of Object.entries(shortOsNames)) {
        if (name === osName)
            return shortName;
    }
    return "";
};
