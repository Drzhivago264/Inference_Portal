"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodes_1 = __importDefault(require("../../services/nodes"));
const internalFlowiseError_1 = require("../../errors/internalFlowiseError");
const http_status_codes_1 = require("http-status-codes");
const getAllNodes = async (req, res, next) => {
    try {
        const apiResponse = await nodes_1.default.getAllNodes();
        return res.json(apiResponse);
    }
    catch (error) {
        next(error);
    }
};
const getNodeByName = async (req, res, next) => {
    try {
        if (typeof req.params === 'undefined' || !req.params.name) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.PRECONDITION_FAILED, `Error: nodesController.getNodeByName - name not provided!`);
        }
        const apiResponse = await nodes_1.default.getNodeByName(req.params.name);
        return res.json(apiResponse);
    }
    catch (error) {
        next(error);
    }
};
const getSingleNodeIcon = async (req, res, next) => {
    try {
        if (typeof req.params === 'undefined' || !req.params.name) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.PRECONDITION_FAILED, `Error: nodesController.getSingleNodeIcon - name not provided!`);
        }
        const apiResponse = await nodes_1.default.getSingleNodeIcon(req.params.name);
        return res.sendFile(apiResponse);
    }
    catch (error) {
        next(error);
    }
};
const getSingleNodeAsyncOptions = async (req, res, next) => {
    try {
        if (!req.body) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.PRECONDITION_FAILED, `Error: nodesController.getSingleNodeAsyncOptions - body not provided!`);
        }
        if (typeof req.params === 'undefined' || !req.params.name) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.PRECONDITION_FAILED, `Error: nodesController.getSingleNodeAsyncOptions - name not provided!`);
        }
        const apiResponse = await nodes_1.default.getSingleNodeAsyncOptions(req.params.name, req.body);
        return res.json(apiResponse);
    }
    catch (error) {
        next(error);
    }
};
const executeCustomFunction = async (req, res, next) => {
    try {
        if (!req.body) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.PRECONDITION_FAILED, `Error: nodesController.executeCustomFunction - body not provided!`);
        }
        const apiResponse = await nodes_1.default.executeCustomFunction(req.body);
        return res.json(apiResponse);
    }
    catch (error) {
        next(error);
    }
};
exports.default = {
    getAllNodes,
    getNodeByName,
    getSingleNodeIcon,
    getSingleNodeAsyncOptions,
    executeCustomFunction
};
//# sourceMappingURL=index.js.map