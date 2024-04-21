"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const credentials_1 = __importDefault(require("../../services/credentials"));
const internalFlowiseError_1 = require("../../errors/internalFlowiseError");
const http_status_codes_1 = require("http-status-codes");
const createCredential = async (req, res, next) => {
    try {
        if (!req.body) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.PRECONDITION_FAILED, `Error: credentialsController.createCredential - body not provided!`);
        }
        const apiResponse = await credentials_1.default.createCredential(req.body);
        return res.json(apiResponse);
    }
    catch (error) {
        next(error);
    }
};
const deleteCredentials = async (req, res, next) => {
    try {
        if (typeof req.params === 'undefined' || !req.params.id) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.PRECONDITION_FAILED, `Error: credentialsController.deleteCredentials - id not provided!`);
        }
        const apiResponse = await credentials_1.default.deleteCredentials(req.params.id);
        return res.json(apiResponse);
    }
    catch (error) {
        next(error);
    }
};
const getAllCredentials = async (req, res, next) => {
    try {
        const apiResponse = await credentials_1.default.getAllCredentials(req.query.credentialName);
        return res.json(apiResponse);
    }
    catch (error) {
        next(error);
    }
};
const getCredentialById = async (req, res, next) => {
    try {
        if (typeof req.params === 'undefined' || !req.params.id) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.PRECONDITION_FAILED, `Error: credentialsController.getCredentialById - id not provided!`);
        }
        const apiResponse = await credentials_1.default.getCredentialById(req.params.id);
        return res.json(apiResponse);
    }
    catch (error) {
        next(error);
    }
};
const updateCredential = async (req, res, next) => {
    try {
        if (typeof req.params === 'undefined' || !req.params.id) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.PRECONDITION_FAILED, `Error: credentialsController.updateCredential - id not provided!`);
        }
        if (!req.body) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.PRECONDITION_FAILED, `Error: credentialsController.updateCredential - body not provided!`);
        }
        const apiResponse = await credentials_1.default.updateCredential(req.params.id, req.body);
        return res.json(apiResponse);
    }
    catch (error) {
        next(error);
    }
};
exports.default = {
    createCredential,
    deleteCredentials,
    getAllCredentials,
    getCredentialById,
    updateCredential
};
//# sourceMappingURL=index.js.map