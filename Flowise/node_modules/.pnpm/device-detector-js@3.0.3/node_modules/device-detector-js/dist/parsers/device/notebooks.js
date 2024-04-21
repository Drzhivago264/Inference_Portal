"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const notebooks_json_1 = __importDefault(require("../../fixtures/regexes/device/notebooks.json"));
const variable_replacement_1 = require("../../utils/variable-replacement");
const user_agent_1 = require("../../utils/user-agent");
const model_1 = require("../../utils/model");
class NotebooksParser {
    constructor() {
        this.parse = (userAgent) => {
            const result = {
                type: "",
                brand: "",
                model: ""
            };
            if (!user_agent_1.userAgentParser("FBMD/", userAgent)) {
                return result;
            }
            for (const [brand, notebook] of Object.entries(notebooks_json_1.default)) {
                const match = user_agent_1.userAgentParser(notebook.regex, userAgent);
                if (!match)
                    continue;
                result.type = "desktop";
                result.brand = brand;
                if ("model" in notebook && notebook.model) {
                    result.model = model_1.buildModel(variable_replacement_1.variableReplacement(notebook.model, match)).trim();
                }
                else if ("models" in notebook && notebook.models) {
                    for (const model of notebook.models) {
                        const match = user_agent_1.userAgentParser(model.regex, userAgent);
                        if (!match)
                            continue;
                        result.model = variable_replacement_1.variableReplacement(model.model, match).trim();
                    }
                }
                break;
            }
            return result;
        };
    }
}
exports.default = NotebooksParser;
