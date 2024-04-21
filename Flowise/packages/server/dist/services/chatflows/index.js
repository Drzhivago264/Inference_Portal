"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const http_status_codes_1 = require("http-status-codes");
const internalFlowiseError_1 = require("../../errors/internalFlowiseError");
const getRunningExpressApp_1 = require("../../utils/getRunningExpressApp");
const ChatFlow_1 = require("../../database/entities/ChatFlow");
const utils_1 = require("../../utils");
const logger_1 = __importDefault(require("../../utils/logger"));
const flowise_components_1 = require("flowise-components");
const getUploadsConfig_1 = require("../../utils/getUploadsConfig");
const ChatMessage_1 = require("../../database/entities/ChatMessage");
const ChatMessageFeedback_1 = require("../../database/entities/ChatMessageFeedback");
const UpsertHistory_1 = require("../../database/entities/UpsertHistory");
const fileRepository_1 = require("../../utils/fileRepository");
const utils_2 = require("../../errors/utils");
// Check if chatflow valid for streaming
const checkIfChatflowIsValidForStreaming = async (chatflowId) => {
    var _a;
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        //**
        const chatflow = await appServer.AppDataSource.getRepository(ChatFlow_1.ChatFlow).findOneBy({
            id: chatflowId
        });
        if (!chatflow) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `Chatflow ${chatflowId} not found`);
        }
        /*** Get Ending Node with Directed Graph  ***/
        const flowData = chatflow.flowData;
        const parsedFlowData = JSON.parse(flowData);
        const nodes = parsedFlowData.nodes;
        const edges = parsedFlowData.edges;
        const { graph, nodeDependencies } = (0, utils_1.constructGraphs)(nodes, edges);
        const endingNodes = (0, utils_1.getEndingNodes)(nodeDependencies, graph, nodes);
        let isStreaming = false;
        for (const endingNode of endingNodes) {
            const endingNodeData = endingNode.data;
            const isEndingNode = ((_a = endingNodeData === null || endingNodeData === void 0 ? void 0 : endingNodeData.outputs) === null || _a === void 0 ? void 0 : _a.output) === 'EndingNode';
            // Once custom function ending node exists, flow is always unavailable to stream
            if (isEndingNode) {
                return { isStreaming: false };
            }
            isStreaming = (0, utils_1.isFlowValidForStream)(nodes, endingNodeData);
        }
        const dbResponse = { isStreaming: isStreaming };
        return dbResponse;
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: chatflowsService.checkIfChatflowIsValidForStreaming - ${(0, utils_2.getErrorMessage)(error)}`);
    }
};
// Check if chatflow valid for uploads
const checkIfChatflowIsValidForUploads = async (chatflowId) => {
    try {
        const dbResponse = await (0, getUploadsConfig_1.utilGetUploadsConfig)(chatflowId);
        return dbResponse;
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: chatflowsService.checkIfChatflowIsValidForUploads - ${(0, utils_2.getErrorMessage)(error)}`);
    }
};
const deleteChatflow = async (chatflowId) => {
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        const dbResponse = await appServer.AppDataSource.getRepository(ChatFlow_1.ChatFlow).delete({ id: chatflowId });
        try {
            // Delete all uploads corresponding to this chatflow
            const directory = path_1.default.join((0, flowise_components_1.getStoragePath)(), chatflowId);
            (0, utils_1.deleteFolderRecursive)(directory);
            // Delete all chat messages
            await appServer.AppDataSource.getRepository(ChatMessage_1.ChatMessage).delete({ chatflowid: chatflowId });
            // Delete all chat feedback
            await appServer.AppDataSource.getRepository(ChatMessageFeedback_1.ChatMessageFeedback).delete({ chatflowid: chatflowId });
            // Delete all upsert history
            await appServer.AppDataSource.getRepository(UpsertHistory_1.UpsertHistory).delete({ chatflowid: chatflowId });
        }
        catch (e) {
            logger_1.default.error(`[server]: Error deleting file storage for chatflow ${chatflowId}: ${e}`);
        }
        return dbResponse;
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: chatflowsService.deleteChatflow - ${(0, utils_2.getErrorMessage)(error)}`);
    }
};
const getAllChatflows = async () => {
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        const dbResponse = await appServer.AppDataSource.getRepository(ChatFlow_1.ChatFlow).find();
        return dbResponse;
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: chatflowsService.getAllChatflows - ${(0, utils_2.getErrorMessage)(error)}`);
    }
};
const getChatflowByApiKey = async (apiKeyId) => {
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        const dbResponse = await appServer.AppDataSource.getRepository(ChatFlow_1.ChatFlow)
            .createQueryBuilder('cf')
            .where('cf.apikeyid = :apikeyid', { apikeyid: apiKeyId })
            .orWhere('cf.apikeyid IS NULL')
            .orWhere('cf.apikeyid = ""')
            .orderBy('cf.name', 'ASC')
            .getMany();
        if (dbResponse.length < 1) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `Chatflow not found in the database!`);
        }
        return dbResponse;
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: chatflowsService.getChatflowByApiKey - ${(0, utils_2.getErrorMessage)(error)}`);
    }
};
const getChatflowById = async (chatflowId) => {
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        const dbResponse = await appServer.AppDataSource.getRepository(ChatFlow_1.ChatFlow).findOneBy({
            id: chatflowId
        });
        if (!dbResponse) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `Chatflow ${chatflowId} not found in the database!`);
        }
        return dbResponse;
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: chatflowsService.getChatflowById - ${(0, utils_2.getErrorMessage)(error)}`);
    }
};
const saveChatflow = async (newChatFlow) => {
    var _a, _b;
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        let dbResponse;
        if ((0, fileRepository_1.containsBase64File)(newChatFlow)) {
            // we need a 2-step process, as we need to save the chatflow first and then update the file paths
            // this is because we need the chatflow id to create the file paths
            // step 1 - save with empty flowData
            const incomingFlowData = newChatFlow.flowData;
            newChatFlow.flowData = JSON.stringify({});
            const chatflow = appServer.AppDataSource.getRepository(ChatFlow_1.ChatFlow).create(newChatFlow);
            const step1Results = await appServer.AppDataSource.getRepository(ChatFlow_1.ChatFlow).save(chatflow);
            // step 2 - convert base64 to file paths and update the chatflow
            step1Results.flowData = (0, fileRepository_1.updateFlowDataWithFilePaths)(step1Results.id, incomingFlowData);
            dbResponse = await appServer.AppDataSource.getRepository(ChatFlow_1.ChatFlow).save(step1Results);
        }
        else {
            const chatflow = appServer.AppDataSource.getRepository(ChatFlow_1.ChatFlow).create(newChatFlow);
            dbResponse = await appServer.AppDataSource.getRepository(ChatFlow_1.ChatFlow).save(chatflow);
        }
        await appServer.telemetry.sendTelemetry('chatflow_created', {
            version: await (0, utils_1.getAppVersion)(),
            chatflowId: dbResponse.id,
            flowGraph: (0, utils_1.getTelemetryFlowObj)((_a = JSON.parse(dbResponse.flowData)) === null || _a === void 0 ? void 0 : _a.nodes, (_b = JSON.parse(dbResponse.flowData)) === null || _b === void 0 ? void 0 : _b.edges)
        });
        return dbResponse;
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: chatflowsService.saveChatflow - ${(0, utils_2.getErrorMessage)(error)}`);
    }
};
const updateChatflow = async (chatflow, updateChatFlow) => {
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        if (updateChatFlow.flowData && (0, fileRepository_1.containsBase64File)(updateChatFlow)) {
            updateChatFlow.flowData = (0, fileRepository_1.updateFlowDataWithFilePaths)(chatflow.id, updateChatFlow.flowData);
        }
        const newDbChatflow = appServer.AppDataSource.getRepository(ChatFlow_1.ChatFlow).merge(chatflow, updateChatFlow);
        const dbResponse = await appServer.AppDataSource.getRepository(ChatFlow_1.ChatFlow).save(newDbChatflow);
        // chatFlowPool is initialized only when a flow is opened
        // if the user attempts to rename/update category without opening any flow, chatFlowPool will be undefined
        if (appServer.chatflowPool) {
            // Update chatflowpool inSync to false, to build flow from scratch again because data has been changed
            appServer.chatflowPool.updateInSync(chatflow.id, false);
        }
        return dbResponse;
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: chatflowsService.updateChatflow - ${(0, utils_2.getErrorMessage)(error)}`);
    }
};
// Get specific chatflow via id (PUBLIC endpoint, used when sharing chatbot link)
const getSinglePublicChatflow = async (chatflowId) => {
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        const dbResponse = await appServer.AppDataSource.getRepository(ChatFlow_1.ChatFlow).findOneBy({
            id: chatflowId
        });
        if (dbResponse && dbResponse.isPublic) {
            return dbResponse;
        }
        else if (dbResponse && !dbResponse.isPublic) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.UNAUTHORIZED, `Unauthorized`);
        }
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `Chatflow ${chatflowId} not found`);
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: chatflowsService.getSinglePublicChatflow - ${(0, utils_2.getErrorMessage)(error)}`);
    }
};
// Get specific chatflow chatbotConfig via id (PUBLIC endpoint, used to retrieve config for embedded chat)
// Safe as public endpoint as chatbotConfig doesn't contain sensitive credential
const getSinglePublicChatbotConfig = async (chatflowId) => {
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        const dbResponse = await appServer.AppDataSource.getRepository(ChatFlow_1.ChatFlow).findOneBy({
            id: chatflowId
        });
        if (!dbResponse) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `Chatflow ${chatflowId} not found`);
        }
        const uploadsConfig = await (0, getUploadsConfig_1.utilGetUploadsConfig)(chatflowId);
        // even if chatbotConfig is not set but uploads are enabled
        // send uploadsConfig to the chatbot
        if (dbResponse.chatbotConfig || uploadsConfig) {
            try {
                const parsedConfig = dbResponse.chatbotConfig ? JSON.parse(dbResponse.chatbotConfig) : {};
                return Object.assign(Object.assign({}, parsedConfig), { uploads: uploadsConfig });
            }
            catch (e) {
                throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error parsing Chatbot Config for Chatflow ${chatflowId}`);
            }
        }
        return 'OK';
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: chatflowsService.getSinglePublicChatbotConfig - ${(0, utils_2.getErrorMessage)(error)}`);
    }
};
exports.default = {
    checkIfChatflowIsValidForStreaming,
    checkIfChatflowIsValidForUploads,
    deleteChatflow,
    getAllChatflows,
    getChatflowByApiKey,
    getChatflowById,
    saveChatflow,
    updateChatflow,
    getSinglePublicChatflow,
    getSinglePublicChatbotConfig
};
//# sourceMappingURL=index.js.map