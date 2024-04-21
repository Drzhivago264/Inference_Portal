"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const car_browsers_json_1 = __importDefault(require("../../fixtures/regexes/device/car_browsers.json"));
const variable_replacement_1 = require("../../utils/variable-replacement");
const user_agent_1 = require("../../utils/user-agent");
class CarParser {
    constructor() {
        this.parse = (userAgent) => {
            const result = {
                type: "",
                brand: "",
                model: ""
            };
            for (const [brand, car] of Object.entries(car_browsers_json_1.default)) {
                const match = user_agent_1.userAgentParser(car.regex, userAgent);
                if (!match)
                    continue;
                result.type = "car";
                result.brand = brand;
                for (const model of car.models) {
                    const match = user_agent_1.userAgentParser(model.regex, userAgent);
                    if (!match)
                        continue;
                    result.model = variable_replacement_1.variableReplacement(model.model, match).trim();
                }
                break;
            }
            return result;
        };
    }
}
exports.default = CarParser;
