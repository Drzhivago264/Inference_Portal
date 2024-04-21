"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const internalFlowiseError_1 = require("../../errors/internalFlowiseError");
const apikey_1 = __importDefault(require("../../services/apikey"));
// Get api keys
const getAllApiKeys = async (req, res, next) => {
    try {
        const apiResponse = await apikey_1.default.getAllApiKeys();
        return res.json(apiResponse);
    }
    catch (error) {
        next(error);
    }
};
const createApiKey = async (req, res, next) => {
    try {
        if (typeof req.body === 'undefined' || !req.body.keyName) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.PRECONDITION_FAILED, `Error: apikeyController.createApiKey - keyName not provided!`);
        }
        const apiResponse = await apikey_1.default.createApiKey(req.body.keyName);
        return res.json(apiResponse);
    }
    catch (error) {
        next(error);
    }
};
// Update api key
const updateApiKey = async (req, res, next) => {
    try {
        if (typeof req.params === 'undefined' || !req.params.id) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.PRECONDITION_FAILED, `Error: apikeyController.updateApiKey - id not provided!`);
        }
        if (typeof req.body === 'undefined' || !req.body.keyName) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.PRECONDITION_FAILED, `Error: apikeyController.updateApiKey - keyName not provided!`);
        }
        const apiResponse = await apikey_1.default.updateApiKey(req.params.id, req.body.keyName);
        return res.json(apiResponse);
    }
    catch (error) {
        next(error);
    }
};
// Delete api key
const deleteApiKey = async (req, res, next) => {
    try {
        if (typeof req.params === 'undefined' || !req.params.id) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.PRECONDITION_FAILED, `Error: apikeyController.deleteApiKey - id not provided!`);
        }
        const apiResponse = await apikey_1.default.deleteApiKey(req.params.id);
        return res.json(apiResponse);
    }
    catch (error) {
        next(error);
    }
};
// Verify api key
const verifyApiKey = async (req, res, next) => {
    try {
        if (typeof req.params === 'undefined' || !req.params.apiKey) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.PRECONDITION_FAILED, `Error: apikeyController.verifyApiKey - apiKey not provided!`);
        }
        const apiResponse = await apikey_1.default.verifyApiKey(req.params.apiKey);
        return res.json(apiResponse);
    }
    catch (error) {
        next(error);
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