"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const components_credentials_1 = __importDefault(require("../../services/components-credentials"));
const internalFlowiseError_1 = require("../../errors/internalFlowiseError");
const http_status_codes_1 = require("http-status-codes");
// Get all component credentials
const getAllComponentsCredentials = async (req, res, next) => {
    try {
        const apiResponse = await components_credentials_1.default.getAllComponentsCredentials();
        return res.json(apiResponse);
    }
    catch (error) {
        next(error);
    }
};
// Get component credential via name
const getComponentByName = async (req, res, next) => {
    try {
        if (typeof req.params === 'undefined' || !req.params.name) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.PRECONDITION_FAILED, `Error: componentsCredentialsController.getComponentByName - name not provided!`);
        }
        const apiResponse = await components_credentials_1.default.getComponentByName(req.params.name);
        return res.json(apiResponse);
    }
    catch (error) {
        next(error);
    }
};
// Returns specific component credential icon via name
const getSingleComponentsCredentialIcon = async (req, res, next) => {
    try {
        if (typeof req.params === 'undefined' || !req.params.name) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.PRECONDITION_FAILED, `Error: componentsCredentialsController.getSingleComponentsCredentialIcon - name not provided!`);
        }
        const apiResponse = await components_credentials_1.default.getSingleComponentsCredentialIcon(req.params.name);
        return res.sendFile(apiResponse);
    }
    catch (error) {
        next(error);
    }
};
exports.default = {
    getAllComponentsCredentials,
    getComponentByName,
    getSingleComponentsCredentialIcon
};
//# sourceMappingURL=index.js.map