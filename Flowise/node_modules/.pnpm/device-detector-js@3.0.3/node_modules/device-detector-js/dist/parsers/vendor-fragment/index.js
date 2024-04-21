"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vendorfragments_json_1 = __importDefault(require("../../fixtures/regexes/vendorfragments.json"));
const user_agent_1 = require("../../utils/user-agent");
class VendorFragmentParser {
    constructor() {
        this.parse = (userAgent) => {
            for (const [brand, vendorFragment] of Object.entries(vendorfragments_json_1.default)) {
                for (const regex of vendorFragment) {
                    const match = user_agent_1.userAgentParser(regex, userAgent);
                    if (!match)
                        continue;
                    return brand;
                }
            }
            return "";
        };
    }
}
exports.default = VendorFragmentParser;
