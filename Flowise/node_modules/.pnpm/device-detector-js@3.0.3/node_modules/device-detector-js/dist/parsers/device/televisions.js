"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const televisions_json_1 = __importDefault(require("../../fixtures/regexes/device/televisions.json"));
const variable_replacement_1 = require("../../utils/variable-replacement");
const user_agent_1 = require("../../utils/user-agent");
const model_1 = require("../../utils/model");
class TelevisionParser {
    constructor() {
        this.parse = (userAgent) => {
            const result = {
                type: "",
                brand: "",
                model: ""
            };
            if (!this.isHbbTv(userAgent))
                return result;
            result.type = "television";
            for (const [brand, television] of Object.entries(televisions_json_1.default)) {
                const match = user_agent_1.userAgentParser(television.regex, userAgent);
                if (!match)
                    continue;
                result.brand = brand;
                if ("model" in television && television.model) {
                    result.model = model_1.buildModel(variable_replacement_1.variableReplacement(television.model, match)).trim();
                }
                else if ("models" in television && television.models) {
                    for (const model of television.models) {
                        const modelMatch = user_agent_1.userAgentParser(model.regex, userAgent);
                        if (!modelMatch)
                            continue;
                        result.model = model_1.buildModel(variable_replacement_1.variableReplacement(model.model, modelMatch)).trim();
                        break;
                    }
                }
                break;
            }
            return result;
        };
        this.isHbbTv = (userAgent) => {
            return user_agent_1.userAgentParser("HbbTV\/([1-9]{1}(?:\.[0-9]{1}){1,2})", userAgent);
        };
    }
}
exports.default = TelevisionParser;
