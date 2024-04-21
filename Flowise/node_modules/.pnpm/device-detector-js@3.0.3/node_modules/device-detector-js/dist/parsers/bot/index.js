"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const bots_json_1 = __importDefault(require("../../fixtures/regexes/bots.json"));
const user_agent_1 = require("../../utils/user-agent");
class BotParser {
    constructor() {
        this.parse = (userAgent) => {
            var _a, _b, _c, _d;
            for (const bot of bots_json_1.default) {
                const match = user_agent_1.userAgentParser(bot.regex, userAgent);
                if (!match)
                    continue;
                return {
                    name: bot.name,
                    category: bot.category || "",
                    url: bot.url || "",
                    producer: {
                        name: ((_b = (_a = bot) === null || _a === void 0 ? void 0 : _a.producer) === null || _b === void 0 ? void 0 : _b.name) || "",
                        url: ((_d = (_c = bot) === null || _c === void 0 ? void 0 : _c.producer) === null || _d === void 0 ? void 0 : _d.url) || ""
                    }
                };
            }
            return null;
        };
    }
}
module.exports = BotParser;
