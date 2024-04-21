"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const apiKey_1 = require("../../utils/apiKey");
const addChatflowsCount_1 = require("../../utils/addChatflowsCount");
const apiKey_2 = require("../../utils/apiKey");
const internalFlowiseError_1 = require("../../errors/internalFlowiseError");
const utils_1 = require("../../errors/utils");
const getAllApiKeys = async () => {
    try {
        const keys = await (0, apiKey_1.getAPIKeys)();
        const dbResponse = await (0, addChatflowsCount_1.addChatflowsCount)(keys);
        return dbResponse;
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: apikeyService.getAllApiKeys - ${(0, utils_1.getErrorMessage)(error)}`);
    }
};
const createApiKey = async (keyName) => {
    try {
        const keys = await (0, apiKey_1.addAPIKey)(keyName);
        const dbResponse = await (0, addChatflowsCount_1.addChatflowsCount)(keys);
        return dbResponse;
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: apikeyService.createApiKey - ${(0, utils_1.getErrorMessage)(error)}`);
    }
};
// Update api key
const updateApiKey = async (id, keyName) => {
    try {
        const keys = await (0, apiKey_1.updateAPIKey)(id, keyName);
        const dbResponse = await (0, addChatflowsCount_1.addChatflowsCount)(keys);
        return dbResponse;
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: apikeyService.updateApiKey - ${(0, utils_1.getErrorMessage)(error)}`);
    }
};
const deleteApiKey = async (id) => {
    try {
        const keys = await (0, apiKey_1.deleteAPIKey)(id);
        const dbResponse = await (0, addChatflowsCount_1.addChatflowsCount)(keys);
        return dbResponse;
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: apikeyService.deleteApiKey - ${(0, utils_1.getErrorMessage)(error)}`);
    }
};
const verifyApiKey = async (paramApiKey) => {
    try {
        const apiKey = await (0, apiKey_2.getApiKey)(paramApiKey);
        if (!apiKey) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.UNAUTHORIZED, `Unauthorized`);
        }
        const dbResponse = 'OK';
        return dbResponse;
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: apikeyService.verifyApiKey - ${(0, utils_1.getErrorMessage)(error)}`);
    }
};
exports.default = {
    createApiKey,
    deleteApiKey,
    getAllApiKeys,
    updateApiKey,
    verifyApiKey
};
//# sourceMappingURL=index.js.map