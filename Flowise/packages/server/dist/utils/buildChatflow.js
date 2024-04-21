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
exports.utilBuildChatflow = void 0;
const flowise_components_1 = require("flowise-components");
const http_status_codes_1 = require("http-status-codes");
const Interface_1 = require("../Interface");
const path_1 = __importDefault(require("path"));
const internalFlowiseError_1 = require("../errors/internalFlowiseError");
const ChatFlow_1 = require("../database/entities/ChatFlow");
const getRunningExpressApp_1 = require("../utils/getRunningExpressApp");
const utils_1 = require("../utils");
const validateKey_1 = require("./validateKey");
const _1 = require(".");
const uuid_1 = require("uuid");
const lodash_1 = require("lodash");
const fs = __importStar(require("fs"));
const logger_1 = __importDefault(require("./logger"));
const addChatMesage_1 = require("./addChatMesage");
/**
 * Build Chatflow
 * @param {Request} req
 * @param {Server} socketIO
 * @param {boolean} isInternal
 */
const utilBuildChatflow = async (req, socketIO, isInternal = false) => {
    var _a;
    var _b, _c, _d, _e, _f, _g, _h, _j;
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        const chatflowid = req.params.id;
        let incomingInput = req.body;
        let nodeToExecuteData;
        const chatflow = await appServer.AppDataSource.getRepository(ChatFlow_1.ChatFlow).findOneBy({
            id: chatflowid
        });
        if (!chatflow) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `Chatflow ${chatflowid} not found`);
        }
        const chatId = (_d = (_b = incomingInput.chatId) !== null && _b !== void 0 ? _b : (_c = incomingInput.overrideConfig) === null || _c === void 0 ? void 0 : _c.sessionId) !== null && _d !== void 0 ? _d : (0, uuid_1.v4)();
        const userMessageDateTime = new Date();
        if (!isInternal) {
            const isKeyValidated = await (0, validateKey_1.utilValidateKey)(req, chatflow);
            if (!isKeyValidated) {
                throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.UNAUTHORIZED, `Unauthorized`);
            }
        }
        let fileUploads = [];
        if (incomingInput.uploads) {
            fileUploads = incomingInput.uploads;
            for (let i = 0; i < fileUploads.length; i += 1) {
                const upload = fileUploads[i];
                if ((upload.type === 'file' || upload.type === 'audio') && upload.data) {
                    const filename = upload.name;
                    const dir = path_1.default.join((0, flowise_components_1.getStoragePath)(), chatflowid, chatId);
                    if (!fs.existsSync(dir)) {
                        fs.mkdirSync(dir, { recursive: true });
                    }
                    const filePath = path_1.default.join(dir, filename);
                    const splitDataURI = upload.data.split(',');
                    const bf = Buffer.from(splitDataURI.pop() || '', 'base64');
                    fs.writeFileSync(filePath, bf);
                    // Omit upload.data since we don't store the content in database
                    upload.type = 'stored-file';
                    fileUploads[i] = (0, lodash_1.omit)(upload, ['data']);
                }
                // Run Speech to Text conversion
                if (upload.mime === 'audio/webm' || upload.mime === 'audio/mp4') {
                    let speechToTextConfig = {};
                    if (chatflow.speechToText) {
                        const speechToTextProviders = JSON.parse(chatflow.speechToText);
                        for (const provider in speechToTextProviders) {
                            const providerObj = speechToTextProviders[provider];
                            if (providerObj.status) {
                                speechToTextConfig = providerObj;
                                speechToTextConfig['name'] = provider;
                                break;
                            }
                        }
                    }
                    if (speechToTextConfig) {
                        const options = {
                            chatId,
                            chatflowid,
                            appDataSource: appServer.AppDataSource,
                            databaseEntities: _1.databaseEntities
                        };
                        const speechToTextResult = await (0, flowise_components_1.convertSpeechToText)(upload, speechToTextConfig, options);
                        if (speechToTextResult) {
                            incomingInput.question = speechToTextResult;
                        }
                    }
                }
            }
        }
        let isStreamValid = false;
        const files = req.files || [];
        if (files.length) {
            const overrideConfig = Object.assign({}, req.body);
            for (const file of files) {
                const fileData = fs.readFileSync(file.path, { encoding: 'base64' });
                const dataBase64String = `data:${file.mimetype};base64,${fileData},filename:${file.filename}`;
                const fileInputField = (0, utils_1.mapMimeTypeToInputField)(file.mimetype);
                if (overrideConfig[fileInputField]) {
                    overrideConfig[fileInputField] = JSON.stringify([...JSON.parse(overrideConfig[fileInputField]), dataBase64String]);
                }
                else {
                    overrideConfig[fileInputField] = JSON.stringify([dataBase64String]);
                }
            }
            incomingInput = {
                question: (_e = req.body.question) !== null && _e !== void 0 ? _e : 'hello',
                overrideConfig,
                socketIOClientId: req.body.socketIOClientId
            };
        }
        /*** Get chatflows and prepare data  ***/
        const flowData = chatflow.flowData;
        const parsedFlowData = JSON.parse(flowData);
        const nodes = parsedFlowData.nodes;
        const edges = parsedFlowData.edges;
        // Get session ID
        const memoryNode = (0, utils_1.findMemoryNode)(nodes, edges);
        const memoryType = memoryNode === null || memoryNode === void 0 ? void 0 : memoryNode.data.label;
        let sessionId = (0, utils_1.getMemorySessionId)(memoryNode, incomingInput, chatId, isInternal);
        /*   Reuse the flow without having to rebuild (to avoid duplicated upsert, recomputation, reinitialization of memory) when all these conditions met:
         * - Node Data already exists in pool
         * - Still in sync (i.e the flow has not been modified since)
         * - Existing overrideConfig and new overrideConfig are the same
         * - Flow doesn't start with/contain nodes that depend on incomingInput.question
         * TODO: convert overrideConfig to hash when we no longer store base64 string but filepath
         ***/
        const isFlowReusable = () => {
            return (Object.prototype.hasOwnProperty.call(appServer.chatflowPool.activeChatflows, chatflowid) &&
                appServer.chatflowPool.activeChatflows[chatflowid].inSync &&
                appServer.chatflowPool.activeChatflows[chatflowid].endingNodeData &&
                (0, utils_1.isSameOverrideConfig)(isInternal, appServer.chatflowPool.activeChatflows[chatflowid].overrideConfig, incomingInput.overrideConfig) &&
                !(0, utils_1.isStartNodeDependOnInput)(appServer.chatflowPool.activeChatflows[chatflowid].startingNodes, nodes));
        };
        if (isFlowReusable()) {
            nodeToExecuteData = appServer.chatflowPool.activeChatflows[chatflowid].endingNodeData;
            isStreamValid = (0, utils_1.isFlowValidForStream)(nodes, nodeToExecuteData);
            logger_1.default.debug(`[server]: Reuse existing chatflow ${chatflowid} with ending node ${nodeToExecuteData.label} (${nodeToExecuteData.id})`);
        }
        else {
            /*** Get Ending Node with Directed Graph  ***/
            const { graph, nodeDependencies } = (0, utils_1.constructGraphs)(nodes, edges);
            const directedGraph = graph;
            const endingNodes = (0, utils_1.getEndingNodes)(nodeDependencies, directedGraph, nodes);
            let isCustomFunctionEndingNode = endingNodes.some((node) => { var _a, _b; return ((_b = (_a = node.data) === null || _a === void 0 ? void 0 : _a.outputs) === null || _b === void 0 ? void 0 : _b.output) === 'EndingNode'; });
            for (const endingNode of endingNodes) {
                const endingNodeData = endingNode.data;
                const isEndingNode = ((_f = endingNodeData === null || endingNodeData === void 0 ? void 0 : endingNodeData.outputs) === null || _f === void 0 ? void 0 : _f.output) === 'EndingNode';
                // Once custom function ending node exists, no need to do follow-up checks.
                if (isEndingNode)
                    continue;
                if (endingNodeData.outputs &&
                    Object.keys(endingNodeData.outputs).length &&
                    !Object.values((_g = endingNodeData.outputs) !== null && _g !== void 0 ? _g : {}).includes(endingNodeData.name)) {
                    throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Output of ${endingNodeData.label} (${endingNodeData.id}) must be ${endingNodeData.label}, can't be an Output Prediction`);
                }
                isStreamValid = (0, utils_1.isFlowValidForStream)(nodes, endingNodeData);
            }
            // Once custom function ending node exists, flow is always unavailable to stream
            isStreamValid = isCustomFunctionEndingNode ? false : isStreamValid;
            let chatHistory = [];
            // When {{chat_history}} is used in Format Prompt Value, fetch the chat conversations from memory node
            for (const endingNode of endingNodes) {
                const endingNodeData = endingNode.data;
                if (!((_h = endingNodeData.inputs) === null || _h === void 0 ? void 0 : _h.memory))
                    continue;
                const memoryNodeId = (_j = endingNodeData.inputs) === null || _j === void 0 ? void 0 : _j.memory.split('.')[0].replace('{{', '');
                const memoryNode = nodes.find((node) => node.data.id === memoryNodeId);
                if (!memoryNode)
                    continue;
                chatHistory = await (0, utils_1.getSessionChatHistory)(chatflowid, (0, utils_1.getMemorySessionId)(memoryNode, incomingInput, chatId, isInternal), memoryNode, appServer.nodesPool.componentNodes, appServer.AppDataSource, _1.databaseEntities, logger_1.default);
            }
            /*** Get Starting Nodes with Reversed Graph ***/
            const constructedObj = (0, utils_1.constructGraphs)(nodes, edges, { isReversed: true });
            const nonDirectedGraph = constructedObj.graph;
            let startingNodeIds = [];
            let depthQueue = {};
            const endingNodeIds = endingNodes.map((n) => n.id);
            for (const endingNodeId of endingNodeIds) {
                const resx = (0, utils_1.getStartingNodes)(nonDirectedGraph, endingNodeId);
                startingNodeIds.push(...resx.startingNodeIds);
                depthQueue = Object.assign(depthQueue, resx.depthQueue);
            }
            startingNodeIds = [...new Set(startingNodeIds)];
            const startingNodes = nodes.filter((nd) => startingNodeIds.includes(nd.id));
            logger_1.default.debug(`[server]: Start building chatflow ${chatflowid}`);
            /*** BFS to traverse from Starting Nodes to Ending Node ***/
            const reactFlowNodes = await (0, utils_1.buildFlow)(startingNodeIds, nodes, edges, graph, depthQueue, appServer.nodesPool.componentNodes, incomingInput.question, chatHistory, chatId, sessionId !== null && sessionId !== void 0 ? sessionId : '', chatflowid, appServer.AppDataSource, incomingInput === null || incomingInput === void 0 ? void 0 : incomingInput.overrideConfig, appServer.cachePool, false, undefined, incomingInput.uploads);
            const nodeToExecute = endingNodeIds.length === 1
                ? reactFlowNodes.find((node) => endingNodeIds[0] === node.id)
                : reactFlowNodes[reactFlowNodes.length - 1];
            if (!nodeToExecute) {
                throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `Node not found`);
            }
            if (incomingInput.overrideConfig) {
                nodeToExecute.data = (0, utils_1.replaceInputsWithConfig)(nodeToExecute.data, incomingInput.overrideConfig);
            }
            const reactFlowNodeData = (0, utils_1.resolveVariables)(nodeToExecute.data, reactFlowNodes, incomingInput.question, chatHistory);
            nodeToExecuteData = reactFlowNodeData;
            appServer.chatflowPool.add(chatflowid, nodeToExecuteData, startingNodes, incomingInput === null || incomingInput === void 0 ? void 0 : incomingInput.overrideConfig);
        }
        logger_1.default.debug(`[server]: Running ${nodeToExecuteData.label} (${nodeToExecuteData.id})`);
        const nodeInstanceFilePath = appServer.nodesPool.componentNodes[nodeToExecuteData.name].filePath;
        const nodeModule = await (_a = nodeInstanceFilePath, Promise.resolve().then(() => __importStar(require(_a))));
        const nodeInstance = new nodeModule.nodeClass({ sessionId });
        let result = isStreamValid
            ? await nodeInstance.run(nodeToExecuteData, incomingInput.question, {
                chatId,
                chatflowid,
                logger: logger_1.default,
                appDataSource: appServer.AppDataSource,
                databaseEntities: _1.databaseEntities,
                analytic: chatflow.analytic,
                uploads: incomingInput.uploads,
                socketIO,
                socketIOClientId: incomingInput.socketIOClientId
            })
            : await nodeInstance.run(nodeToExecuteData, incomingInput.question, {
                chatId,
                chatflowid,
                logger: logger_1.default,
                appDataSource: appServer.AppDataSource,
                databaseEntities: _1.databaseEntities,
                analytic: chatflow.analytic,
                uploads: incomingInput.uploads
            });
        result = typeof result === 'string' ? { text: result } : result;
        // Retrieve threadId from assistant if exists
        if (typeof result === 'object' && result.assistant) {
            sessionId = result.assistant.threadId;
        }
        const userMessage = {
            role: 'userMessage',
            content: incomingInput.question,
            chatflowid,
            chatType: isInternal ? Interface_1.chatType.INTERNAL : Interface_1.chatType.EXTERNAL,
            chatId,
            memoryType,
            sessionId,
            createdDate: userMessageDateTime,
            fileUploads: incomingInput.uploads ? JSON.stringify(fileUploads) : undefined
        };
        await (0, addChatMesage_1.utilAddChatMessage)(userMessage);
        let resultText = '';
        if (result.text)
            resultText = result.text;
        else if (result.json)
            resultText = '```json\n' + JSON.stringify(result.json, null, 2);
        else
            resultText = JSON.stringify(result, null, 2);
        const apiMessage = {
            role: 'apiMessage',
            content: resultText,
            chatflowid,
            chatType: isInternal ? Interface_1.chatType.INTERNAL : Interface_1.chatType.EXTERNAL,
            chatId,
            memoryType,
            sessionId
        };
        if (result === null || result === void 0 ? void 0 : result.sourceDocuments)
            apiMessage.sourceDocuments = JSON.stringify(result.sourceDocuments);
        if (result === null || result === void 0 ? void 0 : result.usedTools)
            apiMessage.usedTools = JSON.stringify(result.usedTools);
        if (result === null || result === void 0 ? void 0 : result.fileAnnotations)
            apiMessage.fileAnnotations = JSON.stringify(result.fileAnnotations);
        const chatMessage = await (0, addChatMesage_1.utilAddChatMessage)(apiMessage);
        logger_1.default.debug(`[server]: Finished running ${nodeToExecuteData.label} (${nodeToExecuteData.id})`);
        await appServer.telemetry.sendTelemetry('prediction_sent', {
            version: await (0, utils_1.getAppVersion)(),
            chatflowId: chatflowid,
            chatId,
            type: isInternal ? Interface_1.chatType.INTERNAL : Interface_1.chatType.EXTERNAL,
            flowGraph: (0, utils_1.getTelemetryFlowObj)(nodes, edges)
        });
        // Prepare response
        // return the question in the response
        // this is used when input text is empty but question is in audio format
        result.question = incomingInput.question;
        result.chatId = chatId;
        result.chatMessageId = chatMessage.id;
        if (sessionId)
            result.sessionId = sessionId;
        if (memoryType)
            result.memoryType = memoryType;
        return result;
    }
    catch (e) {
        logger_1.default.error('[server]: Error:', e);
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, e.message);
    }
};
exports.utilBuildChatflow = utilBuildChatflow;
//# sourceMappingURL=buildChatflow.js.map