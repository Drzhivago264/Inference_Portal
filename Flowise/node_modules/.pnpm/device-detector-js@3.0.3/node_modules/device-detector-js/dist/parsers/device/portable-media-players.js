"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const portable_media_player_json_1 = __importDefault(require("../../fixtures/regexes/device/portable_media_player.json"));
const variable_replacement_1 = require("../../utils/variable-replacement");
const user_agent_1 = require("../../utils/user-agent");
class PortableMediaPlayersParser {
    constructor() {
        this.parse = (userAgent) => {
            const result = {
                type: "",
                brand: "",
                model: ""
            };
            for (const [brand, portableMediaPlayer] of Object.entries(portable_media_player_json_1.default)) {
                const match = user_agent_1.userAgentParser(portableMediaPlayer.regex, userAgent);
                if (!match)
                    continue;
                result.type = portableMediaPlayer.device;
                result.brand = brand;
                if ("model" in portableMediaPlayer && portableMediaPlayer.model) {
                    result.model = variable_replacement_1.variableReplacement(portableMediaPlayer.model, match).trim();
                }
                else if ("models" in portableMediaPlayer && portableMediaPlayer.models) {
                    for (const model of portableMediaPlayer.models) {
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
exports.default = PortableMediaPlayersParser;
