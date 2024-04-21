"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const upsertVector_1 = require("../../utils/upsertVector");
const internalFlowiseError_1 = require("../../errors/internalFlowiseError");
const utils_1 = require("../../errors/utils");
const upsertVectorMiddleware = async (req, isInternal = false) => {
    try {
        return await (0, upsertVector_1.upsertVector)(req, isInternal);
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: vectorsService.upsertVector - ${(0, utils_1.getErrorMessage)(error)}`);
    }
};
exports.default = {
    upsertVectorMiddleware
};
//# sourceMappingURL=index.js.map