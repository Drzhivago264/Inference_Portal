"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const variables_1 = __importDefault(require("../../services/variables"));
const Variable_1 = require("../../database/entities/Variable");
const internalFlowiseError_1 = require("../../errors/internalFlowiseError");
const http_status_codes_1 = require("http-status-codes");
const createVariable = async (req, res, next) => {
    try {
        if (typeof req.body === 'undefined') {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.PRECONDITION_FAILED, `Error: variablesController.createVariable - body not provided!`);
        }
        const body = req.body;
        const newVariable = new Variable_1.Variable();
        Object.assign(newVariable, body);
        const apiResponse = await variables_1.default.createVariable(newVariable);
        return res.json(apiResponse);
    }
    catch (error) {
        next(error);
    }
};
const deleteVariable = async (req, res, next) => {
    try {
        if (typeof req.params === 'undefined' || !req.params.id) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.PRECONDITION_FAILED, 'Error: variablesController.deleteVariable - id not provided!');
        }
        const apiResponse = await variables_1.default.deleteVariable(req.params.id);
        return res.json(apiResponse);
    }
    catch (error) {
        next(error);
    }
};
const getAllVariables = async (req, res, next) => {
    try {
        const apiResponse = await variables_1.default.getAllVariables();
        return res.json(apiResponse);
    }
    catch (error) {
        next(error);
    }
};
const updateVariable = async (req, res, next) => {
    try {
        if (typeof req.params === 'undefined' || !req.params.id) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.PRECONDITION_FAILED, 'Error: variablesController.updateVariable - id not provided!');
        }
        if (typeof req.body === 'undefined') {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.PRECONDITION_FAILED, 'Error: variablesController.updateVariable - body not provided!');
        }
        const variable = await variables_1.default.getVariableById(req.params.id);
        if (!variable) {
            return res.status(404).send(`Variable ${req.params.id} not found in the database`);
        }
        const body = req.body;
        const updatedVariable = new Variable_1.Variable();
        Object.assign(updatedVariable, body);
        const apiResponse = await variables_1.default.updateVariable(variable, updatedVariable);
        return res.json(apiResponse);
    }
    catch (error) {
        next(error);
    }
};
exports.default = {
    createVariable,
    deleteVariable,
    getAllVariables,
    updateVariable
};
//# sourceMappingURL=index.js.map