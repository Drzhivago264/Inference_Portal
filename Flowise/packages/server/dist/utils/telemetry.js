"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Telemetry = void 0;
const uuid_1 = require("uuid");
const posthog_node_1 = require("posthog-node");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const _1 = require(".");
class Telemetry {
    constructor() {
        if (process.env.DISABLE_FLOWISE_TELEMETRY !== 'true') {
            this.postHog = new posthog_node_1.PostHog('phc_jEDuFYnOnuXsws986TLWzuisbRjwFqTl9JL8tDMgqme');
        }
        else {
            this.postHog = undefined;
        }
    }
    async id() {
        try {
            const settingsContent = await fs_1.default.promises.readFile((0, _1.getUserSettingsFilePath)(), 'utf8');
            const settings = JSON.parse(settingsContent);
            return settings.instanceId;
        }
        catch (error) {
            const instanceId = (0, uuid_1.v4)();
            const settings = {
                instanceId
            };
            const defaultLocation = process.env.SECRETKEY_PATH
                ? path_1.default.join(process.env.SECRETKEY_PATH, 'settings.json')
                : path_1.default.join((0, _1.getUserHome)(), '.flowise', 'settings.json');
            await fs_1.default.promises.writeFile(defaultLocation, JSON.stringify(settings, null, 2));
            return instanceId;
        }
    }
    async sendTelemetry(event, properties = {}) {
        if (this.postHog) {
            const distinctId = await this.id();
            this.postHog.capture({
                event,
                distinctId,
                properties
            });
        }
    }
    async flush() {
        if (this.postHog) {
            await this.postHog.shutdownAsync();
        }
    }
}
exports.Telemetry = Telemetry;
//# sourceMappingURL=telemetry.js.map