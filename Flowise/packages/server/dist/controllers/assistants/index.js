"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assistants_1 = __importDefault(require("../../services/assistants"));
const internalFlowiseError_1 = require("../../errors/internalFlowiseError");
const http_status_codes_1 = require("http-status-codes");
const createAssistant = async (req, res, next) => {
    try {
        if (!req.body) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.PRECONDITION_FAILED, `Error: assistantsController.createAssistant - body not provided!`);
        }
        const apiResponse = await assistants_1.default.createAssistant(req.body);
        return res.json(apiResponse);
    }
    catch (error) {
        next(error);
    }
};
const deleteAssistant = async (req, res, next) => {
    try {
        if (typeof req.params === 'undefined' || !req.params.id) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.PRECONDITION_FAILED, `Error: assistantsController.deleteAssistant - id not provided!`);
        }
        const apiResponse = await assistants_1.default.deleteAssistant(req.params.id, req.query.isDeleteBoth);
        return res.json(apiResponse);
    }
    catch (error) {
        next(error);
    }
};
const getAllAssistants = async (req, res, next) => {
    try {
        const apiResponse = await assistants_1.default.getAllAssistants();
        return res.json(apiResponse);
    }
    catch (error) {
        next(error);
    }
};
const getAssistantById = async (req, res, next) => {
    try {
        if (typeof req.params === 'undefined' || !req.params.id) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.PRECONDITION_FAILED, `Error: assistantsController.getAssistantById - id not provided!`);
        }
        const apiResponse = await assistants_1.default.getAssistantById(req.params.id);
        return res.json(apiResponse);
    }
    catch (error) {
        next(error);
    }
};
const updateAssistant = async (req, res, next) => {
    try {
        if (typeof req.params === 'undefined' || !req.params.id) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.PRECONDITION_FAILED, `Error: assistantsController.updateAssistant - id not provided!`);
        }
        if (!req.body) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.PRECONDITION_FAILED, `Error: assistantsController.updateAssistant - body not provided!`);
        }
        const apiResponse = await assistants_1.default.updateAssistant(req.params.id, req.body);
        return res.json(apiResponse);
    }
    catch (error) {
        next(error);
    }
};
exports.default = {
    createAssistant,
    deleteAssistant,
    getAllAssistants,
    getAssistantById,
    updateAssistant
};
//# sourceMappingURL=index.js.map