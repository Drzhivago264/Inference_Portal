import { BotResult } from "./typing";
declare namespace BotParser {
    type DeviceDetectorBotResult = BotResult | null;
}
declare class BotParser {
    parse: (userAgent: string) => BotParser.DeviceDetectorBotResult;
}
export = BotParser;
