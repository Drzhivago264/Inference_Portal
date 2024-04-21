"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const getRunningExpressApp_1 = require("../../utils/getRunningExpressApp");
const Variable_1 = require("../../database/entities/Variable");
const internalFlowiseError_1 = require("../../errors/internalFlowiseError");
const utils_1 = require("../../errors/utils");
const createVariable = async (newVariable) => {
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        const variable = await appServer.AppDataSource.getRepository(Variable_1.Variable).create(newVariable);
        const dbResponse = await appServer.AppDataSource.getRepository(Variable_1.Variable).save(variable);
        return dbResponse;
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: variablesServices.createVariable - ${(0, utils_1.getErrorMessage)(error)}`);
    }
};
const deleteVariable = async (variableId) => {
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        const dbResponse = await appServer.AppDataSource.getRepository(Variable_1.Variable).delete({ id: variableId });
        return dbResponse;
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: variablesServices.deleteVariable - ${(0, utils_1.getErrorMessage)(error)}`);
    }
};
const getAllVariables = async () => {
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        const dbResponse = await appServer.AppDataSource.getRepository(Variable_1.Variable).find();
        return dbResponse;
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: variablesServices.getAllVariables - ${(0, utils_1.getErrorMessage)(error)}`);
    }
};
const getVariableById = async (variableId) => {
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        const dbResponse = await appServer.AppDataSource.getRepository(Variable_1.Variable).findOneBy({
            id: variableId
        });
        return dbResponse;
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: variablesServices.getVariableById - ${(0, utils_1.getErrorMessage)(error)}`);
    }
};
const updateVariable = async (variable, updatedVariable) => {
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        const tmpUpdatedVariable = await appServer.AppDataSource.getRepository(Variable_1.Variable).merge(variable, updatedVariable);
        const dbResponse = await appServer.AppDataSource.getRepository(Variable_1.Variable).save(tmpUpdatedVariable);
        return dbResponse;
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: variablesServices.updateVariable - ${(0, utils_1.getErrorMessage)(error)}`);
    }
};
exports.default = {
    createVariable,
    deleteVariable,
    getAllVariables,
    getVariableById,
    updateVariable
};
//# sourceMappingURL=index.js.map