"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const utils_1 = require("../../utils");
const getRunningExpressApp_1 = require("../../utils/getRunningExpressApp");
const chatflows_1 = __importDefault(require("../chatflows"));
const internalFlowiseError_1 = require("../../errors/internalFlowiseError");
const utils_2 = require("../../errors/utils");
const getSingleFlowConfig = async (chatflowId) => {
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        const chatflow = await chatflows_1.default.getChatflowById(chatflowId);
        if (!chatflow) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `Chatflow ${chatflowId} not found in the database!`);
        }
        const flowData = chatflow.flowData;
        const parsedFlowData = JSON.parse(flowData);
        const nodes = parsedFlowData.nodes;
        const dbResponse = (0, utils_1.findAvailableConfigs)(nodes, appServer.nodesPool.componentCredentials);
        return dbResponse;
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: flowConfigService.getSingleFlowConfig - ${(0, utils_2.getErrorMessage)(error)}`);
    }
};
exports.default = {
    getSingleFlowConfig
};
//# sourceMappingURL=index.js.map