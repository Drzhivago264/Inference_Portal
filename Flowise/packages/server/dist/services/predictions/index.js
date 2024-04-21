"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const buildChatflow_1 = require("../../utils/buildChatflow");
const internalFlowiseError_1 = require("../../errors/internalFlowiseError");
const utils_1 = require("../../errors/utils");
const buildChatflow = async (fullRequest, ioServer) => {
    try {
        const dbResponse = await (0, buildChatflow_1.utilBuildChatflow)(fullRequest, ioServer);
        return dbResponse;
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: predictionsServices.buildChatflow - ${(0, utils_1.getErrorMessage)(error)}`);
    }
};
exports.default = {
    buildChatflow
};
//# sourceMappingURL=index.js.map