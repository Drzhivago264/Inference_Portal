"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cameras_json_1 = __importDefault(require("../../fixtures/regexes/device/cameras.json"));
const variable_replacement_1 = require("../../utils/variable-replacement");
const user_agent_1 = require("../../utils/user-agent");
class CameraParser {
    constructor() {
        this.parse = (userAgent) => {
            const result = {
                type: "",
                brand: "",
                model: ""
            };
            for (const [brand, camera] of Object.entries(cameras_json_1.default)) {
                const match = user_agent_1.userAgentParser(camera.regex, userAgent);
                if (!match)
                    continue;
                result.type = "camera";
                result.brand = brand;
                if ("model" in camera && camera.model) {
                    result.model = variable_replacement_1.variableReplacement(camera.model, match).trim();
                }
                else if ("models" in camera && camera.models) {
                    for (const model of camera.models) {
                        const modelMatch = user_agent_1.userAgentParser(model.regex, userAgent);
                        if (!modelMatch)
                            continue;
                        result.model = variable_replacement_1.variableReplacement(model.model, modelMatch).trim();
                        break;
                    }
                }
                break;
            }
            return result;
        };
    }
}
exports.default = CameraParser;
