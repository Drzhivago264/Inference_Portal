"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const getRunningExpressApp_1 = require("../../utils/getRunningExpressApp");
const Tool_1 = require("../../database/entities/Tool");
const utils_1 = require("../../utils");
const internalFlowiseError_1 = require("../../errors/internalFlowiseError");
const utils_2 = require("../../errors/utils");
const createTool = async (requestBody) => {
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        const newTool = new Tool_1.Tool();
        Object.assign(newTool, requestBody);
        const tool = await appServer.AppDataSource.getRepository(Tool_1.Tool).create(newTool);
        const dbResponse = await appServer.AppDataSource.getRepository(Tool_1.Tool).save(tool);
        await appServer.telemetry.sendTelemetry('tool_created', {
            version: await (0, utils_1.getAppVersion)(),
            toolId: dbResponse.id,
            toolName: dbResponse.name
        });
        return dbResponse;
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: toolsService.createTool - ${(0, utils_2.getErrorMessage)(error)}`);
    }
};
const deleteTool = async (toolId) => {
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        const dbResponse = await appServer.AppDataSource.getRepository(Tool_1.Tool).delete({
            id: toolId
        });
        return dbResponse;
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: toolsService.deleteTool - ${(0, utils_2.getErrorMessage)(error)}`);
    }
};
const getAllTools = async () => {
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        const dbResponse = await appServer.AppDataSource.getRepository(Tool_1.Tool).find();
        return dbResponse;
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: toolsService.getAllTools - ${(0, utils_2.getErrorMessage)(error)}`);
    }
};
const getToolById = async (toolId) => {
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        const dbResponse = await appServer.AppDataSource.getRepository(Tool_1.Tool).findOneBy({
            id: toolId
        });
        if (!dbResponse) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `Tool ${toolId} not found`);
        }
        return dbResponse;
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: toolsService.getToolById - ${(0, utils_2.getErrorMessage)(error)}`);
    }
};
const updateTool = async (toolId, toolBody) => {
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        const tool = await appServer.AppDataSource.getRepository(Tool_1.Tool).findOneBy({
            id: toolId
        });
        if (!tool) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `Tool ${toolId} not found`);
        }
        const updateTool = new Tool_1.Tool();
        Object.assign(updateTool, toolBody);
        await appServer.AppDataSource.getRepository(Tool_1.Tool).merge(tool, updateTool);
        const dbResponse = await appServer.AppDataSource.getRepository(Tool_1.Tool).save(tool);
        return dbResponse;
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: toolsService.updateTool - ${(0, utils_2.getErrorMessage)(error)}`);
    }
};
exports.default = {
    createTool,
    deleteTool,
    getAllTools,
    getToolById,
    updateTool
};
//# sourceMappingURL=index.js.map