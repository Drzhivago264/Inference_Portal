"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const consoles_json_1 = __importDefault(require("../../fixtures/regexes/device/consoles.json"));
const variable_replacement_1 = require("../../utils/variable-replacement");
const user_agent_1 = require("../../utils/user-agent");
class ConsoleParser {
    constructor() {
        this.parse = (userAgent) => {
            const result = {
                type: "",
                brand: "",
                model: ""
            };
            for (const [brand, gameConsole] of Object.entries(consoles_json_1.default)) {
                const match = user_agent_1.userAgentParser(gameConsole.regex, userAgent);
                if (!match)
                    continue;
                result.type = gameConsole.device;
                result.brand = brand;
                if ("model" in gameConsole && gameConsole.model) {
                    result.model = variable_replacement_1.variableReplacement(gameConsole.model, match).trim();
                }
                else if ("models" in gameConsole && gameConsole.models) {
                    for (const model of gameConsole.models) {
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
exports.default = ConsoleParser;
