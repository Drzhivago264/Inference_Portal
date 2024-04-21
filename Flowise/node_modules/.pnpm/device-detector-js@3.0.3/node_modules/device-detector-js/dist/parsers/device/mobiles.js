"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobiles_json_1 = __importDefault(require("../../fixtures/regexes/device/mobiles.json"));
const variable_replacement_1 = require("../../utils/variable-replacement");
const user_agent_1 = require("../../utils/user-agent");
const model_1 = require("../../utils/model");
class MobileParser {
    constructor() {
        this.parse = (userAgent) => {
            const result = {
                type: "",
                brand: "",
                model: ""
            };
            let resultType = "";
            for (const [brand, mobile] of Object.entries(mobiles_json_1.default)) {
                const match = user_agent_1.userAgentParser(mobile.regex, userAgent);
                if (!match)
                    continue;
                resultType = "device" in mobile && mobile.device || "";
                result.brand = brand;
                if ("model" in mobile && mobile.model) {
                    result.model = model_1.buildModel(variable_replacement_1.variableReplacement(mobile.model, match)).trim();
                }
                else if ("models" in mobile && mobile.models) {
                    for (const model of mobile.models) {
                        const modelMatch = user_agent_1.userAgentParser(model.regex, userAgent);
                        if (!modelMatch)
                            continue;
                        result.model = model_1.buildModel(variable_replacement_1.variableReplacement(model.model, modelMatch)).trim();
                        if ("device" in model && model.device) {
                            resultType = model.device;
                        }
                        if ("brand" in model) {
                            result.brand = model.brand || "";
                        }
                        break;
                    }
                }
                break;
            }
            // Sanitize device type
            if (resultType === "tv") {
                result.type = "television";
            }
            else if (resultType === "car browser") {
                result.type = "car";
            }
            else {
                result.type = resultType;
            }
            // Sanitize device brand
            if (result.brand === "Unknown") {
                result.brand = "";
            }
            return result;
        };
    }
}
exports.default = MobileParser;
