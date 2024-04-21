"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const utils_1 = require("../../utils");
const getRunningExpressApp_1 = require("../../utils/getRunningExpressApp");
const internalFlowiseError_1 = require("../../errors/internalFlowiseError");
const utils_2 = require("../../errors/utils");
const getAllNodeConfigs = async (requestBody) => {
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        const nodes = [{ data: requestBody }];
        const dbResponse = (0, utils_1.findAvailableConfigs)(nodes, appServer.nodesPool.componentCredentials);
        return dbResponse;
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: nodeConfigsService.getAllNodeConfigs - ${(0, utils_2.getErrorMessage)(error)}`);
    }
};
exports.default = {
    getAllNodeConfigs
};
//# sourceMappingURL=index.js.map