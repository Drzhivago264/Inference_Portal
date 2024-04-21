"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getRunningExpressApp_1 = require("../../utils/getRunningExpressApp");
const createEvent = async (eventInfo) => {
    const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
    await appServer.telemetry.sendTelemetry(eventInfo.name, eventInfo.data);
};
exports.default = {
    createEvent
};
//# sourceMappingURL=index.js.map