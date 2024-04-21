"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const http_status_codes_1 = require("http-status-codes");
const getRunningExpressApp_1 = require("../../utils/getRunningExpressApp");
const flowise_components_1 = require("flowise-components");
const utils_1 = require("../../utils");
const logger_1 = __importDefault(require("../../utils/logger"));
const internalFlowiseError_1 = require("../../errors/internalFlowiseError");
const utils_2 = require("../../errors/utils");
// Get all component nodes
const getAllNodes = async () => {
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        const dbResponse = [];
        for (const nodeName in appServer.nodesPool.componentNodes) {
            const clonedNode = (0, lodash_1.cloneDeep)(appServer.nodesPool.componentNodes[nodeName]);
            dbResponse.push(clonedNode);
        }
        return dbResponse;
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: nodesService.getAllNodes - ${(0, utils_2.getErrorMessage)(error)}`);
    }
};
// Get specific component node via name
const getNodeByName = async (nodeName) => {
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        if (Object.prototype.hasOwnProperty.call(appServer.nodesPool.componentNodes, nodeName)) {
            const dbResponse = appServer.nodesPool.componentNodes[nodeName];
            return dbResponse;
        }
        else {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `Node ${nodeName} not found`);
        }
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: nodesService.getAllNodes - ${(0, utils_2.getErrorMessage)(error)}`);
    }
};
// Returns specific component node icon via name
const getSingleNodeIcon = async (nodeName) => {
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        if (Object.prototype.hasOwnProperty.call(appServer.nodesPool.componentNodes, nodeName)) {
            const nodeInstance = appServer.nodesPool.componentNodes[nodeName];
            if (nodeInstance.icon === undefined) {
                throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `Node ${nodeName} icon not found`);
            }
            if (nodeInstance.icon.endsWith('.svg') || nodeInstance.icon.endsWith('.png') || nodeInstance.icon.endsWith('.jpg')) {
                const filepath = nodeInstance.icon;
                return filepath;
            }
            else {
                throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Node ${nodeName} icon is missing icon`);
            }
        }
        else {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `Node ${nodeName} not found`);
        }
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: nodesService.getSingleNodeIcon - ${(0, utils_2.getErrorMessage)(error)}`);
    }
};
const getSingleNodeAsyncOptions = async (nodeName, requestBody) => {
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        const nodeData = requestBody;
        if (Object.prototype.hasOwnProperty.call(appServer.nodesPool.componentNodes, nodeName)) {
            try {
                const nodeInstance = appServer.nodesPool.componentNodes[nodeName];
                const methodName = nodeData.loadMethod || '';
                const dbResponse = await nodeInstance.loadMethods[methodName].call(nodeInstance, nodeData, {
                    appDataSource: appServer.AppDataSource,
                    databaseEntities: utils_1.databaseEntities
                });
                return dbResponse;
            }
            catch (error) {
                return [];
            }
        }
        else {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `Node ${nodeName} not found`);
        }
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: nodesService.getSingleNodeAsyncOptions - ${(0, utils_2.getErrorMessage)(error)}`);
    }
};
// execute custom function node
const executeCustomFunction = async (requestBody) => {
    var _a;
    var _b;
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        const body = requestBody;
        const functionInputVariables = Object.fromEntries([...((_b = body === null || body === void 0 ? void 0 : body.javascriptFunction) !== null && _b !== void 0 ? _b : '').matchAll(/\$([a-zA-Z0-9_]+)/g)].map((g) => [g[1], undefined]));
        const nodeData = { inputs: Object.assign({ functionInputVariables }, body) };
        if (Object.prototype.hasOwnProperty.call(appServer.nodesPool.componentNodes, 'customFunction')) {
            try {
                const nodeInstanceFilePath = appServer.nodesPool.componentNodes['customFunction'].filePath;
                const nodeModule = await (_a = nodeInstanceFilePath, Promise.resolve().then(() => __importStar(require(_a))));
                const newNodeInstance = new nodeModule.nodeClass();
                const options = {
                    appDataSource: appServer.AppDataSource,
                    databaseEntities: utils_1.databaseEntities,
                    logger: logger_1.default
                };
                const returnData = await newNodeInstance.init(nodeData, '', options);
                const dbResponse = typeof returnData === 'string' ? (0, flowise_components_1.handleEscapeCharacters)(returnData, true) : returnData;
                return dbResponse;
            }
            catch (error) {
                throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error running custom function: ${error}`);
            }
        }
        else {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `Node customFunction not found`);
        }
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: nodesService.executeCustomFunction - ${(0, utils_2.getErrorMessage)(error)}`);
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