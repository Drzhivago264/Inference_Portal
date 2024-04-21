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
exports.getAppVersion = exports.getUserSettingsFilePath = exports.getTelemetryFlowObj = exports.deleteFolderRecursive = exports.getAllValuesFromJson = exports.findMemoryNode = exports.getSessionChatHistory = exports.getMemorySessionId = exports.redactCredentialWithPasswordType = exports.transformToCredentialEntity = exports.decryptCredentialData = exports.encryptCredentialData = exports.getEncryptionKey = exports.generateEncryptKey = exports.isFlowValidForStream = exports.findAvailableConfigs = exports.mapMimeTypeToInputField = exports.isSameOverrideConfig = exports.isStartNodeDependOnInput = exports.replaceInputsWithConfig = exports.resolveVariables = exports.getVariableValue = exports.clearSessionMemory = exports.buildFlow = exports.saveUpsertFlowData = exports.getFileName = exports.getEndingNodes = exports.getAllConnectedNodes = exports.getStartingNodes = exports.constructGraphs = exports.getNodeModulesPackagePath = exports.getUserHome = exports.databaseEntities = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const logger_1 = __importDefault(require("./logger"));
const lodash_1 = require("lodash");
const flowise_components_1 = require("flowise-components");
const crypto_1 = require("crypto");
const crypto_js_1 = require("crypto-js");
const ChatFlow_1 = require("../database/entities/ChatFlow");
const ChatMessage_1 = require("../database/entities/ChatMessage");
const Credential_1 = require("../database/entities/Credential");
const Tool_1 = require("../database/entities/Tool");
const Assistant_1 = require("../database/entities/Assistant");
const Variable_1 = require("../database/entities/Variable");
const internalFlowiseError_1 = require("../errors/internalFlowiseError");
const http_status_codes_1 = require("http-status-codes");
const QUESTION_VAR_PREFIX = 'question';
const CHAT_HISTORY_VAR_PREFIX = 'chat_history';
const REDACTED_CREDENTIAL_VALUE = '_FLOWISE_BLANK_07167752-1a71-43b1-bf8f-4f32252165db';
exports.databaseEntities = {
    ChatFlow: ChatFlow_1.ChatFlow,
    ChatMessage: ChatMessage_1.ChatMessage,
    Tool: Tool_1.Tool,
    Credential: Credential_1.Credential,
    Assistant: Assistant_1.Assistant,
    Variable: Variable_1.Variable
};
/**
 * Returns the home folder path of the user if
 * none can be found it falls back to the current
 * working directory
 *
 */
const getUserHome = () => {
    let variableName = 'HOME';
    if (process.platform === 'win32') {
        variableName = 'USERPROFILE';
    }
    if (process.env[variableName] === undefined) {
        // If for some reason the variable does not exist
        // fall back to current folder
        return process.cwd();
    }
    return process.env[variableName];
};
exports.getUserHome = getUserHome;
/**
 * Returns the path of node modules package
 * @param {string} packageName
 * @returns {string}
 */
const getNodeModulesPackagePath = (packageName) => {
    const checkPaths = [
        path_1.default.join(__dirname, '..', 'node_modules', packageName),
        path_1.default.join(__dirname, '..', '..', 'node_modules', packageName),
        path_1.default.join(__dirname, '..', '..', '..', 'node_modules', packageName),
        path_1.default.join(__dirname, '..', '..', '..', '..', 'node_modules', packageName),
        path_1.default.join(__dirname, '..', '..', '..', '..', '..', 'node_modules', packageName)
    ];
    for (const checkPath of checkPaths) {
        if (fs_1.default.existsSync(checkPath)) {
            return checkPath;
        }
    }
    return '';
};
exports.getNodeModulesPackagePath = getNodeModulesPackagePath;
/**
 * Construct graph and node dependencies score
 * @param {IReactFlowNode[]} reactFlowNodes
 * @param {IReactFlowEdge[]} reactFlowEdges
 * @param {{ isNonDirected?: boolean, isReversed?: boolean }} options
 */
const constructGraphs = (reactFlowNodes, reactFlowEdges, options) => {
    const nodeDependencies = {};
    const graph = {};
    for (let i = 0; i < reactFlowNodes.length; i += 1) {
        const nodeId = reactFlowNodes[i].id;
        nodeDependencies[nodeId] = 0;
        graph[nodeId] = [];
    }
    if (options && options.isReversed) {
        for (let i = 0; i < reactFlowEdges.length; i += 1) {
            const source = reactFlowEdges[i].source;
            const target = reactFlowEdges[i].target;
            if (Object.prototype.hasOwnProperty.call(graph, target)) {
                graph[target].push(source);
            }
            else {
                graph[target] = [source];
            }
            nodeDependencies[target] += 1;
        }
        return { graph, nodeDependencies };
    }
    for (let i = 0; i < reactFlowEdges.length; i += 1) {
        const source = reactFlowEdges[i].source;
        const target = reactFlowEdges[i].target;
        if (Object.prototype.hasOwnProperty.call(graph, source)) {
            graph[source].push(target);
        }
        else {
            graph[source] = [target];
        }
        if (options && options.isNonDirected) {
            if (Object.prototype.hasOwnProperty.call(graph, target)) {
                graph[target].push(source);
            }
            else {
                graph[target] = [source];
            }
        }
        nodeDependencies[target] += 1;
    }
    return { graph, nodeDependencies };
};
exports.constructGraphs = constructGraphs;
/**
 * Get starting nodes and check if flow is valid
 * @param {INodeDependencies} graph
 * @param {string} endNodeId
 */
const getStartingNodes = (graph, endNodeId) => {
    const depthQueue = {
        [endNodeId]: 0
    };
    // Assuming that this is a directed acyclic graph, there will be no infinite loop problem.
    const walkGraph = (nodeId) => {
        const depth = depthQueue[nodeId];
        graph[nodeId].flatMap((id) => {
            var _a;
            depthQueue[id] = Math.max((_a = depthQueue[id]) !== null && _a !== void 0 ? _a : 0, depth + 1);
            walkGraph(id);
        });
    };
    walkGraph(endNodeId);
    const maxDepth = Math.max(...Object.values(depthQueue));
    const depthQueueReversed = {};
    for (const nodeId in depthQueue) {
        if (Object.prototype.hasOwnProperty.call(depthQueue, nodeId)) {
            depthQueueReversed[nodeId] = Math.abs(depthQueue[nodeId] - maxDepth);
        }
    }
    const startingNodeIds = Object.entries(depthQueueReversed)
        .filter(([_, depth]) => depth === 0)
        .map(([id, _]) => id);
    return { startingNodeIds, depthQueue: depthQueueReversed };
};
exports.getStartingNodes = getStartingNodes;
/**
 * Get all connected nodes from startnode
 * @param {INodeDependencies} graph
 * @param {string} startNodeId
 */
const getAllConnectedNodes = (graph, startNodeId) => {
    const visited = new Set();
    const queue = [[startNodeId]];
    while (queue.length > 0) {
        const [currentNode] = queue.shift();
        if (visited.has(currentNode)) {
            continue;
        }
        visited.add(currentNode);
        for (const neighbor of graph[currentNode]) {
            if (!visited.has(neighbor)) {
                queue.push([neighbor]);
            }
        }
    }
    return [...visited];
};
exports.getAllConnectedNodes = getAllConnectedNodes;
/**
 * Get ending node and check if flow is valid
 * @param {INodeDependencies} nodeDependencies
 * @param {INodeDirectedGraph} graph
 * @param {IReactFlowNode[]} allNodes
 */
const getEndingNodes = (nodeDependencies, graph, allNodes) => {
    var _a;
    const endingNodeIds = [];
    Object.keys(graph).forEach((nodeId) => {
        if (Object.keys(nodeDependencies).length === 1) {
            endingNodeIds.push(nodeId);
        }
        else if (!graph[nodeId].length && nodeDependencies[nodeId] > 0) {
            endingNodeIds.push(nodeId);
        }
    });
    let endingNodes = allNodes.filter((nd) => endingNodeIds.includes(nd.id));
    // If there are multiple endingnodes, the failed ones will be automatically ignored.
    // And only ensure that at least one can pass the verification.
    const verifiedEndingNodes = [];
    let error = null;
    for (const endingNode of endingNodes) {
        const endingNodeData = endingNode.data;
        if (!endingNodeData) {
            error = new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Ending node ${endingNode.id} data not found`);
            continue;
        }
        const isEndingNode = ((_a = endingNodeData === null || endingNodeData === void 0 ? void 0 : endingNodeData.outputs) === null || _a === void 0 ? void 0 : _a.output) === 'EndingNode';
        if (!isEndingNode) {
            if (endingNodeData &&
                endingNodeData.category !== 'Chains' &&
                endingNodeData.category !== 'Agents' &&
                endingNodeData.category !== 'Engine') {
                error = new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Ending node must be either a Chain or Agent`);
                continue;
            }
        }
        verifiedEndingNodes.push(endingNode);
    }
    if (verifiedEndingNodes.length > 0) {
        return verifiedEndingNodes;
    }
    if (endingNodes.length === 0 || error === null) {
        error = new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Ending nodes not found`);
    }
    throw error;
};
exports.getEndingNodes = getEndingNodes;
/**
 * Get file name from base64 string
 * @param {string} fileBase64
 */
const getFileName = (fileBase64) => {
    let fileNames = [];
    if (fileBase64.startsWith('FILE-STORAGE::')) {
        const names = fileBase64.substring(14);
        if (names.includes('[') && names.includes(']')) {
            const files = JSON.parse(names);
            return files.join(', ');
        }
        else {
            return fileBase64.substring(14);
        }
    }
    if (fileBase64.startsWith('[') && fileBase64.endsWith(']')) {
        const files = JSON.parse(fileBase64);
        for (const file of files) {
            const splitDataURI = file.split(',');
            const filename = splitDataURI[splitDataURI.length - 1].split(':')[1];
            fileNames.push(filename);
        }
        return fileNames.join(', ');
    }
    else {
        const splitDataURI = fileBase64.split(',');
        const filename = splitDataURI[splitDataURI.length - 1].split(':')[1];
        return filename;
    }
};
exports.getFileName = getFileName;
/**
 * Save upsert flowData
 * @param {INodeData} nodeData
 * @param {Record<string, any>} upsertHistory
 */
const saveUpsertFlowData = (nodeData, upsertHistory) => {
    var _a, _b;
    const existingUpsertFlowData = (_a = upsertHistory['flowData']) !== null && _a !== void 0 ? _a : [];
    const paramValues = [];
    for (const input in nodeData.inputs) {
        const inputParam = nodeData.inputParams.find((inp) => inp.name === input);
        if (!inputParam)
            continue;
        let paramValue = {};
        if (!nodeData.inputs[input]) {
            continue;
        }
        if (typeof nodeData.inputs[input] === 'string' &&
            nodeData.inputs[input].startsWith('{{') &&
            nodeData.inputs[input].endsWith('}}')) {
            continue;
        }
        // Get file name instead of the base64 string
        if (nodeData.category === 'Document Loaders' && ((_b = nodeData.inputParams.find((inp) => inp.name === input)) === null || _b === void 0 ? void 0 : _b.type) === 'file') {
            paramValue = {
                label: inputParam === null || inputParam === void 0 ? void 0 : inputParam.label,
                name: inputParam === null || inputParam === void 0 ? void 0 : inputParam.name,
                type: inputParam === null || inputParam === void 0 ? void 0 : inputParam.type,
                value: (0, exports.getFileName)(nodeData.inputs[input])
            };
            paramValues.push(paramValue);
            continue;
        }
        paramValue = {
            label: inputParam === null || inputParam === void 0 ? void 0 : inputParam.label,
            name: inputParam === null || inputParam === void 0 ? void 0 : inputParam.name,
            type: inputParam === null || inputParam === void 0 ? void 0 : inputParam.type,
            value: nodeData.inputs[input]
        };
        paramValues.push(paramValue);
    }
    const newFlowData = {
        label: nodeData.label,
        name: nodeData.name,
        category: nodeData.category,
        id: nodeData.id,
        paramValues
    };
    existingUpsertFlowData.push(newFlowData);
    return existingUpsertFlowData;
};
exports.saveUpsertFlowData = saveUpsertFlowData;
/**
 * Build langchain from start to end
 * @param {string[]} startingNodeIds
 * @param {IReactFlowNode[]} reactFlowNodes
 * @param {INodeDirectedGraph} graph
 * @param {IDepthQueue} depthQueue
 * @param {IComponentNodes} componentNodes
 * @param {string} question
 * @param {string} chatId
 * @param {string} chatflowid
 * @param {DataSource} appDataSource
 * @param {ICommonObject} overrideConfig
 * @param {CachePool} cachePool
 */
const buildFlow = async (startingNodeIds, reactFlowNodes, reactFlowEdges, graph, depthQueue, componentNodes, question, chatHistory, chatId, sessionId, chatflowid, appDataSource, overrideConfig, cachePool, isUpsert, stopNodeId, uploads) => {
    var _a;
    var _b;
    const flowNodes = (0, lodash_1.cloneDeep)(reactFlowNodes);
    let upsertHistory = {};
    // Create a Queue and add our initial node in it
    const nodeQueue = [];
    const exploredNode = {};
    const dynamicVariables = {};
    let ignoreNodeIds = [];
    // In the case of infinite loop, only max 3 loops will be executed
    const maxLoop = 3;
    for (let i = 0; i < startingNodeIds.length; i += 1) {
        nodeQueue.push({ nodeId: startingNodeIds[i], depth: 0 });
        exploredNode[startingNodeIds[i]] = { remainingLoop: maxLoop, lastSeenDepth: 0 };
    }
    const initializedNodes = new Set();
    const reversedGraph = (0, exports.constructGraphs)(reactFlowNodes, reactFlowEdges, { isReversed: true }).graph;
    while (nodeQueue.length) {
        const { nodeId, depth } = nodeQueue.shift();
        const reactFlowNode = flowNodes.find((nd) => nd.id === nodeId);
        const nodeIndex = flowNodes.findIndex((nd) => nd.id === nodeId);
        if (!reactFlowNode || reactFlowNode === undefined || nodeIndex < 0)
            continue;
        try {
            const nodeInstanceFilePath = componentNodes[reactFlowNode.data.name].filePath;
            const nodeModule = await (_a = nodeInstanceFilePath, Promise.resolve().then(() => __importStar(require(_a))));
            const newNodeInstance = new nodeModule.nodeClass();
            let flowNodeData = (0, lodash_1.cloneDeep)(reactFlowNode.data);
            if (overrideConfig)
                flowNodeData = (0, exports.replaceInputsWithConfig)(flowNodeData, overrideConfig);
            if (isUpsert)
                upsertHistory['flowData'] = (0, exports.saveUpsertFlowData)(flowNodeData, upsertHistory);
            const reactFlowNodeData = (0, exports.resolveVariables)(flowNodeData, flowNodes, question, chatHistory);
            // TODO: Avoid processing Text Splitter + Doc Loader once Upsert & Load Existing Vector Nodes are deprecated
            if (isUpsert && stopNodeId && nodeId === stopNodeId) {
                logger_1.default.debug(`[server]: Upserting ${reactFlowNode.data.label} (${reactFlowNode.data.id})`);
                const indexResult = await newNodeInstance.vectorStoreMethods['upsert'].call(newNodeInstance, reactFlowNodeData, {
                    chatId,
                    sessionId,
                    chatflowid,
                    chatHistory,
                    logger: logger_1.default,
                    appDataSource,
                    databaseEntities: exports.databaseEntities,
                    cachePool,
                    dynamicVariables,
                    uploads
                });
                if (indexResult)
                    upsertHistory['result'] = indexResult;
                logger_1.default.debug(`[server]: Finished upserting ${reactFlowNode.data.label} (${reactFlowNode.data.id})`);
                break;
            }
            else {
                logger_1.default.debug(`[server]: Initializing ${reactFlowNode.data.label} (${reactFlowNode.data.id})`);
                let outputResult = await newNodeInstance.init(reactFlowNodeData, question, {
                    chatId,
                    sessionId,
                    chatflowid,
                    chatHistory,
                    logger: logger_1.default,
                    appDataSource,
                    databaseEntities: exports.databaseEntities,
                    cachePool,
                    dynamicVariables,
                    uploads
                });
                // Save dynamic variables
                if (reactFlowNode.data.name === 'setVariable') {
                    const dynamicVars = (_b = outputResult === null || outputResult === void 0 ? void 0 : outputResult.dynamicVariables) !== null && _b !== void 0 ? _b : {};
                    for (const variableKey in dynamicVars) {
                        dynamicVariables[variableKey] = dynamicVars[variableKey];
                    }
                    outputResult = outputResult === null || outputResult === void 0 ? void 0 : outputResult.output;
                }
                // Determine which nodes to route next when it comes to ifElse
                if (reactFlowNode.data.name === 'ifElseFunction' && typeof outputResult === 'object') {
                    let sourceHandle = '';
                    if (outputResult.type === true) {
                        sourceHandle = `${nodeId}-output-returnFalse-string|number|boolean|json|array`;
                    }
                    else if (outputResult.type === false) {
                        sourceHandle = `${nodeId}-output-returnTrue-string|number|boolean|json|array`;
                    }
                    const ifElseEdge = reactFlowEdges.find((edg) => edg.source === nodeId && edg.sourceHandle === sourceHandle);
                    if (ifElseEdge) {
                        const { graph } = (0, exports.constructGraphs)(reactFlowNodes, reactFlowEdges.filter((edg) => !(edg.source === nodeId && edg.sourceHandle === sourceHandle)), { isNonDirected: true });
                        ignoreNodeIds.push(ifElseEdge.target, ...(0, exports.getAllConnectedNodes)(graph, ifElseEdge.target));
                        ignoreNodeIds = [...new Set(ignoreNodeIds)];
                    }
                    outputResult = outputResult === null || outputResult === void 0 ? void 0 : outputResult.output;
                }
                flowNodes[nodeIndex].data.instance = outputResult;
                logger_1.default.debug(`[server]: Finished initializing ${reactFlowNode.data.label} (${reactFlowNode.data.id})`);
                initializedNodes.add(reactFlowNode.data.id);
            }
        }
        catch (e) {
            logger_1.default.error(e);
            throw new Error(e);
        }
        let neighbourNodeIds = graph[nodeId];
        const nextDepth = depth + 1;
        // Find other nodes that are on the same depth level
        const sameDepthNodeIds = Object.keys(depthQueue).filter((key) => depthQueue[key] === nextDepth);
        for (const id of sameDepthNodeIds) {
            if (neighbourNodeIds.includes(id))
                continue;
            neighbourNodeIds.push(id);
        }
        neighbourNodeIds = neighbourNodeIds.filter((neigh) => !ignoreNodeIds.includes(neigh));
        for (let i = 0; i < neighbourNodeIds.length; i += 1) {
            const neighNodeId = neighbourNodeIds[i];
            if (ignoreNodeIds.includes(neighNodeId))
                continue;
            if (initializedNodes.has(neighNodeId))
                continue;
            if (reversedGraph[neighNodeId].some((dependId) => !initializedNodes.has(dependId)))
                continue;
            // If nodeId has been seen, cycle detected
            if (Object.prototype.hasOwnProperty.call(exploredNode, neighNodeId)) {
                const { remainingLoop, lastSeenDepth } = exploredNode[neighNodeId];
                if (lastSeenDepth === nextDepth)
                    continue;
                if (remainingLoop === 0) {
                    break;
                }
                const remainingLoopMinusOne = remainingLoop - 1;
                exploredNode[neighNodeId] = { remainingLoop: remainingLoopMinusOne, lastSeenDepth: nextDepth };
                nodeQueue.push({ nodeId: neighNodeId, depth: nextDepth });
            }
            else {
                exploredNode[neighNodeId] = { remainingLoop: maxLoop, lastSeenDepth: nextDepth };
                nodeQueue.push({ nodeId: neighNodeId, depth: nextDepth });
            }
        }
        // Move end node to last
        if (!neighbourNodeIds.length) {
            const index = flowNodes.findIndex((nd) => nd.data.id === nodeId);
            flowNodes.push(flowNodes.splice(index, 1)[0]);
        }
    }
    return isUpsert ? upsertHistory : flowNodes;
};
exports.buildFlow = buildFlow;
/**
 * Clear session memories
 * @param {IReactFlowNode[]} reactFlowNodes
 * @param {IComponentNodes} componentNodes
 * @param {string} chatId
 * @param {DataSource} appDataSource
 * @param {string} sessionId
 * @param {string} memoryType
 * @param {string} isClearFromViewMessageDialog
 */
const clearSessionMemory = async (reactFlowNodes, componentNodes, chatId, appDataSource, sessionId, memoryType, isClearFromViewMessageDialog) => {
    var _a;
    for (const node of reactFlowNodes) {
        if (node.data.category !== 'Memory' && node.data.type !== 'OpenAIAssistant')
            continue;
        // Only clear specific session memory from View Message Dialog UI
        if (isClearFromViewMessageDialog && memoryType && node.data.label !== memoryType)
            continue;
        const nodeInstanceFilePath = componentNodes[node.data.name].filePath;
        const nodeModule = await (_a = nodeInstanceFilePath, Promise.resolve().then(() => __importStar(require(_a))));
        const newNodeInstance = new nodeModule.nodeClass();
        const options = { chatId, appDataSource, databaseEntities: exports.databaseEntities, logger: logger_1.default };
        // SessionId always take priority first because it is the sessionId used for 3rd party memory node
        if (sessionId && node.data.inputs) {
            if (node.data.type === 'OpenAIAssistant') {
                await newNodeInstance.clearChatMessages(node.data, options, { type: 'threadId', id: sessionId });
            }
            else {
                node.data.inputs.sessionId = sessionId;
                const initializedInstance = await newNodeInstance.init(node.data, '', options);
                await initializedInstance.clearChatMessages(sessionId);
            }
        }
        else if (chatId && node.data.inputs) {
            if (node.data.type === 'OpenAIAssistant') {
                await newNodeInstance.clearChatMessages(node.data, options, { type: 'chatId', id: chatId });
            }
            else {
                node.data.inputs.sessionId = chatId;
                const initializedInstance = await newNodeInstance.init(node.data, '', options);
                await initializedInstance.clearChatMessages(chatId);
            }
        }
    }
};
exports.clearSessionMemory = clearSessionMemory;
/**
 * Get variable value from outputResponses.output
 * @param {string} paramValue
 * @param {IReactFlowNode[]} reactFlowNodes
 * @param {string} question
 * @param {boolean} isAcceptVariable
 * @returns {string}
 */
const getVariableValue = (paramValue, reactFlowNodes, question, chatHistory, isAcceptVariable = false) => {
    var _a;
    const isObject = typeof paramValue === 'object';
    let returnVal = (_a = (isObject ? JSON.stringify(paramValue) : paramValue)) !== null && _a !== void 0 ? _a : '';
    const variableStack = [];
    const variableDict = {};
    let startIdx = 0;
    const endIdx = returnVal.length - 1;
    while (startIdx < endIdx) {
        const substr = returnVal.substring(startIdx, startIdx + 2);
        // Store the opening double curly bracket
        if (substr === '{{') {
            variableStack.push({ substr, startIdx: startIdx + 2 });
        }
        // Found the complete variable
        if (substr === '}}' && variableStack.length > 0 && variableStack[variableStack.length - 1].substr === '{{') {
            const variableStartIdx = variableStack[variableStack.length - 1].startIdx;
            const variableEndIdx = startIdx;
            const variableFullPath = returnVal.substring(variableStartIdx, variableEndIdx);
            /**
             * Apply string transformation to convert special chars:
             * FROM: hello i am ben\n\n\thow are you?
             * TO: hello i am benFLOWISE_NEWLINEFLOWISE_NEWLINEFLOWISE_TABhow are you?
             */
            if (isAcceptVariable && variableFullPath === QUESTION_VAR_PREFIX) {
                variableDict[`{{${variableFullPath}}}`] = (0, flowise_components_1.handleEscapeCharacters)(question, false);
            }
            if (isAcceptVariable && variableFullPath === CHAT_HISTORY_VAR_PREFIX) {
                variableDict[`{{${variableFullPath}}}`] = (0, flowise_components_1.handleEscapeCharacters)((0, flowise_components_1.convertChatHistoryToText)(chatHistory), false);
            }
            // Resolve values with following case.
            // 1: <variableNodeId>.data.instance
            // 2: <variableNodeId>.data.instance.pathtokey
            const variableFullPathParts = variableFullPath.split('.');
            const variableNodeId = variableFullPathParts[0];
            const executedNode = reactFlowNodes.find((nd) => nd.id === variableNodeId);
            if (executedNode) {
                let variableValue = (0, lodash_1.get)(executedNode.data, 'instance');
                // Handle path such as `<variableNodeId>.data.instance.key`
                if (variableFullPathParts.length > 3) {
                    let variableObj = null;
                    switch (typeof variableValue) {
                        case 'string': {
                            const unEscapedVariableValue = (0, flowise_components_1.handleEscapeCharacters)(variableValue, true);
                            if (unEscapedVariableValue.startsWith('{') && unEscapedVariableValue.endsWith('}')) {
                                try {
                                    variableObj = JSON.parse(unEscapedVariableValue);
                                }
                                catch (e) {
                                    // ignore
                                }
                            }
                            break;
                        }
                        case 'object': {
                            variableObj = variableValue;
                            break;
                        }
                        default:
                            break;
                    }
                    if (variableObj) {
                        variableObj = (0, lodash_1.get)(variableObj, variableFullPathParts.slice(3));
                        variableValue = (0, flowise_components_1.handleEscapeCharacters)(typeof variableObj === 'object' ? JSON.stringify(variableObj) : variableObj, false);
                    }
                }
                if (isAcceptVariable) {
                    variableDict[`{{${variableFullPath}}}`] = variableValue;
                }
                else {
                    returnVal = variableValue;
                }
            }
            variableStack.pop();
        }
        startIdx += 1;
    }
    if (isAcceptVariable) {
        const variablePaths = Object.keys(variableDict);
        variablePaths.sort(); // Sort by length of variable path because longer path could possibly contains nested variable
        variablePaths.forEach((path) => {
            const variableValue = variableDict[path];
            // Replace all occurrence
            if (typeof variableValue === 'object') {
                returnVal = returnVal.split(path).join(JSON.stringify(variableValue).replace(/"/g, '\\"'));
            }
            else {
                returnVal = returnVal.split(path).join(variableValue);
            }
        });
        return returnVal;
    }
    return isObject ? JSON.parse(returnVal) : returnVal;
};
exports.getVariableValue = getVariableValue;
/**
 * Loop through each inputs and resolve variable if neccessary
 * @param {INodeData} reactFlowNodeData
 * @param {IReactFlowNode[]} reactFlowNodes
 * @param {string} question
 * @returns {INodeData}
 */
const resolveVariables = (reactFlowNodeData, reactFlowNodes, question, chatHistory) => {
    var _a;
    let flowNodeData = (0, lodash_1.cloneDeep)(reactFlowNodeData);
    const types = 'inputs';
    const getParamValues = (paramsObj) => {
        var _a, _b;
        for (const key in paramsObj) {
            const paramValue = paramsObj[key];
            if (Array.isArray(paramValue)) {
                const resolvedInstances = [];
                for (const param of paramValue) {
                    const resolvedInstance = (0, exports.getVariableValue)(param, reactFlowNodes, question, chatHistory);
                    resolvedInstances.push(resolvedInstance);
                }
                paramsObj[key] = resolvedInstances;
            }
            else {
                const isAcceptVariable = (_b = (_a = reactFlowNodeData.inputParams.find((param) => param.name === key)) === null || _a === void 0 ? void 0 : _a.acceptVariable) !== null && _b !== void 0 ? _b : false;
                const resolvedInstance = (0, exports.getVariableValue)(paramValue, reactFlowNodes, question, chatHistory, isAcceptVariable);
                paramsObj[key] = resolvedInstance;
            }
        }
    };
    const paramsObj = (_a = flowNodeData[types]) !== null && _a !== void 0 ? _a : {};
    getParamValues(paramsObj);
    return flowNodeData;
};
exports.resolveVariables = resolveVariables;
/**
 * Loop through each inputs and replace their value with override config values
 * @param {INodeData} flowNodeData
 * @param {ICommonObject} overrideConfig
 * @returns {INodeData}
 */
const replaceInputsWithConfig = (flowNodeData, overrideConfig) => {
    var _a;
    const types = 'inputs';
    const getParamValues = (inputsObj) => {
        for (const config in overrideConfig) {
            // If overrideConfig[key] is object
            if (overrideConfig[config] && typeof overrideConfig[config] === 'object') {
                const nodeIds = Object.keys(overrideConfig[config]);
                if (nodeIds.includes(flowNodeData.id)) {
                    inputsObj[config] = overrideConfig[config][flowNodeData.id];
                    continue;
                }
                else if (nodeIds.some((nodeId) => nodeId.includes(flowNodeData.name))) {
                    /*
                     * "systemMessagePrompt": {
                     *   "chatPromptTemplate_0": "You are an assistant" <---- continue for loop if current node is chatPromptTemplate_1
                     * }
                     */
                    continue;
                }
            }
            let paramValue = inputsObj[config];
            const overrideConfigValue = overrideConfig[config];
            if (overrideConfigValue) {
                if (typeof overrideConfigValue === 'object') {
                    switch (typeof paramValue) {
                        case 'string':
                            if (paramValue.startsWith('{') && paramValue.endsWith('}')) {
                                try {
                                    paramValue = Object.assign({}, JSON.parse(paramValue), overrideConfigValue);
                                    break;
                                }
                                catch (e) {
                                    // ignore
                                }
                            }
                            paramValue = overrideConfigValue;
                            break;
                        case 'object':
                            paramValue = Object.assign({}, paramValue, overrideConfigValue);
                            break;
                        default:
                            paramValue = overrideConfigValue;
                            break;
                    }
                }
                else {
                    paramValue = overrideConfigValue;
                }
            }
            // Check if boolean
            if (paramValue === 'true')
                paramValue = true;
            else if (paramValue === 'false')
                paramValue = false;
            inputsObj[config] = paramValue;
        }
    };
    const inputsObj = (_a = flowNodeData[types]) !== null && _a !== void 0 ? _a : {};
    getParamValues(inputsObj);
    return flowNodeData;
};
exports.replaceInputsWithConfig = replaceInputsWithConfig;
/**
 * Rebuild flow if LLMChain has dependency on other chains
 * User Question => Prompt_0 => LLMChain_0 => Prompt-1 => LLMChain_1
 * @param {IReactFlowNode[]} startingNodes
 * @returns {boolean}
 */
const isStartNodeDependOnInput = (startingNodes, nodes) => {
    var _a;
    for (const node of startingNodes) {
        if (node.data.category === 'Cache')
            return true;
        for (const inputName in node.data.inputs) {
            const inputVariables = (0, flowise_components_1.getInputVariables)(node.data.inputs[inputName]);
            if (inputVariables.length > 0)
                return true;
        }
    }
    const whitelistNodeNames = ['vectorStoreToDocument', 'autoGPT', 'chatPromptTemplate', 'promptTemplate']; //If these nodes are found, chatflow cannot be reused
    for (const node of nodes) {
        if (node.data.name === 'chatPromptTemplate' || node.data.name === 'promptTemplate') {
            let promptValues = {};
            const promptValuesRaw = (_a = node.data.inputs) === null || _a === void 0 ? void 0 : _a.promptValues;
            if (promptValuesRaw) {
                try {
                    promptValues = typeof promptValuesRaw === 'object' ? promptValuesRaw : JSON.parse(promptValuesRaw);
                }
                catch (exception) {
                    console.error(exception);
                }
            }
            if ((0, exports.getAllValuesFromJson)(promptValues).includes(`{{${QUESTION_VAR_PREFIX}}}`))
                return true;
        }
        else if (whitelistNodeNames.includes(node.data.name))
            return true;
    }
    return false;
};
exports.isStartNodeDependOnInput = isStartNodeDependOnInput;
/**
 * Rebuild flow if new override config is provided
 * @param {boolean} isInternal
 * @param {ICommonObject} existingOverrideConfig
 * @param {ICommonObject} newOverrideConfig
 * @returns {boolean}
 */
const isSameOverrideConfig = (isInternal, existingOverrideConfig, newOverrideConfig) => {
    if (isInternal) {
        if (existingOverrideConfig && Object.keys(existingOverrideConfig).length)
            return false;
        return true;
    }
    // If existing and new overrideconfig are the same
    if (existingOverrideConfig &&
        Object.keys(existingOverrideConfig).length &&
        newOverrideConfig &&
        Object.keys(newOverrideConfig).length &&
        (0, lodash_1.isEqual)(existingOverrideConfig, newOverrideConfig)) {
        return true;
    }
    // If there is no existing and new overrideconfig
    if (!existingOverrideConfig && !newOverrideConfig)
        return true;
    return false;
};
exports.isSameOverrideConfig = isSameOverrideConfig;
/**
 * Map MimeType to InputField
 * @param {string} mimeType
 * @returns {Promise<string>}
 */
const mapMimeTypeToInputField = (mimeType) => {
    switch (mimeType) {
        case 'text/plain':
            return 'txtFile';
        case 'application/pdf':
            return 'pdfFile';
        case 'application/json':
            return 'jsonFile';
        case 'text/csv':
            return 'csvFile';
        case 'application/json-lines':
        case 'application/jsonl':
        case 'text/jsonl':
            return 'jsonlinesFile';
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            return 'docxFile';
        case 'application/vnd.yaml':
        case 'application/x-yaml':
        case 'text/vnd.yaml':
        case 'text/x-yaml':
        case 'text/yaml':
            return 'yamlFile';
        default:
            return '';
    }
};
exports.mapMimeTypeToInputField = mapMimeTypeToInputField;
/**
 * Find all available input params config
 * @param {IReactFlowNode[]} reactFlowNodes
 * @param {IComponentCredentials} componentCredentials
 * @returns {IOverrideConfig[]}
 */
const findAvailableConfigs = (reactFlowNodes, componentCredentials) => {
    var _a, _b, _c, _d, _e;
    const configs = [];
    for (const flowNode of reactFlowNodes) {
        for (const inputParam of flowNode.data.inputParams) {
            let obj;
            if (inputParam.type === 'file') {
                obj = {
                    node: flowNode.data.label,
                    nodeId: flowNode.data.id,
                    label: inputParam.label,
                    name: 'files',
                    type: (_a = inputParam.fileType) !== null && _a !== void 0 ? _a : inputParam.type
                };
            }
            else if (inputParam.type === 'options') {
                obj = {
                    node: flowNode.data.label,
                    nodeId: flowNode.data.id,
                    label: inputParam.label,
                    name: inputParam.name,
                    type: inputParam.options
                        ? (_b = inputParam.options) === null || _b === void 0 ? void 0 : _b.map((option) => {
                            return option.name;
                        }).join(', ')
                        : 'string'
                };
            }
            else if (inputParam.type === 'credential') {
                // get component credential inputs
                for (const name of (_c = inputParam.credentialNames) !== null && _c !== void 0 ? _c : []) {
                    if (Object.prototype.hasOwnProperty.call(componentCredentials, name)) {
                        const inputs = (_e = (_d = componentCredentials[name]) === null || _d === void 0 ? void 0 : _d.inputs) !== null && _e !== void 0 ? _e : [];
                        for (const input of inputs) {
                            obj = {
                                node: flowNode.data.label,
                                nodeId: flowNode.data.id,
                                label: input.label,
                                name: input.name,
                                type: input.type === 'password' ? 'string' : input.type
                            };
                            configs.push(obj);
                        }
                    }
                }
                continue;
            }
            else {
                obj = {
                    node: flowNode.data.label,
                    nodeId: flowNode.data.id,
                    label: inputParam.label,
                    name: inputParam.name,
                    type: inputParam.type === 'password' ? 'string' : inputParam.type
                };
            }
            if (!configs.some((config) => JSON.stringify(config) === JSON.stringify(obj))) {
                configs.push(obj);
            }
        }
    }
    return configs;
};
exports.findAvailableConfigs = findAvailableConfigs;
/**
 * Check to see if flow valid for stream
 * TODO: perform check from component level. i.e: set streaming on component, and check here
 * @param {IReactFlowNode[]} reactFlowNodes
 * @param {INodeData} endingNodeData
 * @returns {boolean}
 */
const isFlowValidForStream = (reactFlowNodes, endingNodeData) => {
    var _a;
    const streamAvailableLLMs = {
        'Chat Models': [
            'azureChatOpenAI',
            'chatOpenAI',
            'chatOpenAI_LlamaIndex',
            'chatAnthropic',
            'chatAnthropic_LlamaIndex',
            'chatOllama',
            'awsChatBedrock',
            'chatMistralAI',
            'groqChat',
            'chatCohere',
            'chatGoogleGenerativeAI'
        ],
        LLMs: ['azureOpenAI', 'openAI', 'ollama']
    };
    let isChatOrLLMsExist = false;
    for (const flowNode of reactFlowNodes) {
        const data = flowNode.data;
        if (data.category === 'Chat Models' || data.category === 'LLMs') {
            isChatOrLLMsExist = true;
            const validLLMs = streamAvailableLLMs[data.category];
            if (!validLLMs.includes(data.name))
                return false;
        }
    }
    let isValidChainOrAgent = false;
    if (endingNodeData.category === 'Chains') {
        // Chains that are not available to stream
        const blacklistChains = ['openApiChain', 'vectaraQAChain'];
        isValidChainOrAgent = !blacklistChains.includes(endingNodeData.name);
    }
    else if (endingNodeData.category === 'Agents') {
        // Agent that are available to stream
        const whitelistAgents = [
            'openAIFunctionAgent',
            'mistralAIToolAgent',
            'csvAgent',
            'airtableAgent',
            'conversationalRetrievalAgent',
            'openAIToolAgent',
            'toolAgent'
        ];
        isValidChainOrAgent = whitelistAgents.includes(endingNodeData.name);
        // Anthropic & Groq Function Calling streaming is still not supported - https://docs.anthropic.com/claude/docs/tool-use
        const model = (_a = endingNodeData.inputs) === null || _a === void 0 ? void 0 : _a.model;
        if (endingNodeData.name.includes('toolAgent')) {
            if (typeof model === 'string' && (model.includes('chatAnthropic') || model.includes('groqChat'))) {
                return false;
            }
            else if (typeof model === 'object' && 'id' in model && model['id'].includes('chatAnthropic')) {
                return false;
            }
        }
    }
    else if (endingNodeData.category === 'Engine') {
        // Engines that are available to stream
        const whitelistEngine = ['contextChatEngine', 'simpleChatEngine', 'queryEngine', 'subQuestionQueryEngine'];
        isValidChainOrAgent = whitelistEngine.includes(endingNodeData.name);
    }
    // If no output parser, flow is available to stream
    let isOutputParserExist = false;
    for (const flowNode of reactFlowNodes) {
        const data = flowNode.data;
        if (data.category.includes('Output Parser')) {
            isOutputParserExist = true;
        }
    }
    return isChatOrLLMsExist && isValidChainOrAgent && !isOutputParserExist;
};
exports.isFlowValidForStream = isFlowValidForStream;
/**
 * Generate an encryption key
 * @returns {string}
 */
const generateEncryptKey = () => {
    return (0, crypto_1.randomBytes)(24).toString('base64');
};
exports.generateEncryptKey = generateEncryptKey;
/**
 * Returns the encryption key
 * @returns {Promise<string>}
 */
const getEncryptionKey = async () => {
    if (process.env.FLOWISE_SECRETKEY_OVERWRITE !== undefined && process.env.FLOWISE_SECRETKEY_OVERWRITE !== '') {
        return process.env.FLOWISE_SECRETKEY_OVERWRITE;
    }
    try {
        return await fs_1.default.promises.readFile((0, flowise_components_1.getEncryptionKeyPath)(), 'utf8');
    }
    catch (error) {
        const encryptKey = (0, exports.generateEncryptKey)();
        const defaultLocation = process.env.SECRETKEY_PATH
            ? path_1.default.join(process.env.SECRETKEY_PATH, 'encryption.key')
            : path_1.default.join((0, exports.getUserHome)(), '.flowise', 'encryption.key');
        await fs_1.default.promises.writeFile(defaultLocation, encryptKey);
        return encryptKey;
    }
};
exports.getEncryptionKey = getEncryptionKey;
/**
 * Encrypt credential data
 * @param {ICredentialDataDecrypted} plainDataObj
 * @returns {Promise<string>}
 */
const encryptCredentialData = async (plainDataObj) => {
    const encryptKey = await (0, exports.getEncryptionKey)();
    return crypto_js_1.AES.encrypt(JSON.stringify(plainDataObj), encryptKey).toString();
};
exports.encryptCredentialData = encryptCredentialData;
/**
 * Decrypt credential data
 * @param {string} encryptedData
 * @param {string} componentCredentialName
 * @param {IComponentCredentials} componentCredentials
 * @returns {Promise<ICredentialDataDecrypted>}
 */
const decryptCredentialData = async (encryptedData, componentCredentialName, componentCredentials) => {
    const encryptKey = await (0, exports.getEncryptionKey)();
    const decryptedData = crypto_js_1.AES.decrypt(encryptedData, encryptKey);
    const decryptedDataStr = decryptedData.toString(crypto_js_1.enc.Utf8);
    if (!decryptedDataStr)
        return {};
    try {
        if (componentCredentialName && componentCredentials) {
            const plainDataObj = JSON.parse(decryptedData.toString(crypto_js_1.enc.Utf8));
            return (0, exports.redactCredentialWithPasswordType)(componentCredentialName, plainDataObj, componentCredentials);
        }
        return JSON.parse(decryptedData.toString(crypto_js_1.enc.Utf8));
    }
    catch (e) {
        console.error(e);
        return {};
    }
};
exports.decryptCredentialData = decryptCredentialData;
/**
 * Transform ICredentialBody from req to Credential entity
 * @param {ICredentialReqBody} body
 * @returns {Credential}
 */
const transformToCredentialEntity = async (body) => {
    const credentialBody = {
        name: body.name,
        credentialName: body.credentialName
    };
    if (body.plainDataObj) {
        const encryptedData = await (0, exports.encryptCredentialData)(body.plainDataObj);
        credentialBody.encryptedData = encryptedData;
    }
    const newCredential = new Credential_1.Credential();
    Object.assign(newCredential, credentialBody);
    return newCredential;
};
exports.transformToCredentialEntity = transformToCredentialEntity;
/**
 * Redact values that are of password type to avoid sending back to client
 * @param {string} componentCredentialName
 * @param {ICredentialDataDecrypted} decryptedCredentialObj
 * @param {IComponentCredentials} componentCredentials
 * @returns {ICredentialDataDecrypted}
 */
const redactCredentialWithPasswordType = (componentCredentialName, decryptedCredentialObj, componentCredentials) => {
    var _a;
    const plainDataObj = (0, lodash_1.cloneDeep)(decryptedCredentialObj);
    for (const cred in plainDataObj) {
        const inputParam = (_a = componentCredentials[componentCredentialName].inputs) === null || _a === void 0 ? void 0 : _a.find((inp) => inp.type === 'password' && inp.name === cred);
        if (inputParam) {
            plainDataObj[cred] = REDACTED_CREDENTIAL_VALUE;
        }
    }
    return plainDataObj;
};
exports.redactCredentialWithPasswordType = redactCredentialWithPasswordType;
/**
 * Get sessionId
 * Hierarchy of sessionId (top down)
 * API/Embed:
 * (1) Provided in API body - incomingInput.overrideConfig: { sessionId: 'abc' }
 * (2) Provided in API body - incomingInput.chatId
 *
 * API/Embed + UI:
 * (3) Hard-coded sessionId in UI
 * (4) Not specified on UI nor API, default to chatId
 * @param {IReactFlowNode | undefined} memoryNode
 * @param {IncomingInput} incomingInput
 * @param {string} chatId
 * @param {boolean} isInternal
 * @returns {string}
 */
const getMemorySessionId = (memoryNode, incomingInput, chatId, isInternal) => {
    var _a, _b, _c;
    if (!isInternal) {
        // Provided in API body - incomingInput.overrideConfig: { sessionId: 'abc' }
        if ((_a = incomingInput.overrideConfig) === null || _a === void 0 ? void 0 : _a.sessionId) {
            return (_b = incomingInput.overrideConfig) === null || _b === void 0 ? void 0 : _b.sessionId;
        }
        // Provided in API body - incomingInput.chatId
        if (incomingInput.chatId) {
            return incomingInput.chatId;
        }
    }
    // Hard-coded sessionId in UI
    if (memoryNode && ((_c = memoryNode.data.inputs) === null || _c === void 0 ? void 0 : _c.sessionId)) {
        return memoryNode.data.inputs.sessionId;
    }
    // Default chatId
    return chatId;
};
exports.getMemorySessionId = getMemorySessionId;
/**
 * Get chat messages from sessionId
 * @param {IReactFlowNode} memoryNode
 * @param {string} sessionId
 * @param {IReactFlowNode} memoryNode
 * @param {IComponentNodes} componentNodes
 * @param {DataSource} appDataSource
 * @param {IDatabaseEntity} databaseEntities
 * @param {any} logger
 * @returns {IMessage[]}
 */
const getSessionChatHistory = async (chatflowid, sessionId, memoryNode, componentNodes, appDataSource, databaseEntities, logger) => {
    var _a;
    const nodeInstanceFilePath = componentNodes[memoryNode.data.name].filePath;
    const nodeModule = await (_a = nodeInstanceFilePath, Promise.resolve().then(() => __importStar(require(_a))));
    const newNodeInstance = new nodeModule.nodeClass();
    // Replace memory's sessionId/chatId
    if (memoryNode.data.inputs) {
        memoryNode.data.inputs.sessionId = sessionId;
    }
    const initializedInstance = await newNodeInstance.init(memoryNode.data, '', {
        chatflowid,
        appDataSource,
        databaseEntities,
        logger
    });
    return (await initializedInstance.getChatMessages(sessionId));
};
exports.getSessionChatHistory = getSessionChatHistory;
/**
 * Method that find memory that is connected within chatflow
 * In a chatflow, there should only be 1 memory node
 * @param {IReactFlowNode[]} nodes
 * @param {IReactFlowEdge[]} edges
 * @returns {IReactFlowNode | undefined}
 */
const findMemoryNode = (nodes, edges) => {
    const memoryNodes = nodes.filter((node) => node.data.category === 'Memory');
    const memoryNodeIds = memoryNodes.map((mem) => mem.data.id);
    for (const edge of edges) {
        if (memoryNodeIds.includes(edge.source)) {
            const memoryNode = nodes.find((node) => node.data.id === edge.source);
            return memoryNode;
        }
    }
    return undefined;
};
exports.findMemoryNode = findMemoryNode;
/**
 * Get all values from a JSON object
 * @param {any} obj
 * @returns {any[]}
 */
const getAllValuesFromJson = (obj) => {
    const values = [];
    function extractValues(data) {
        if (typeof data === 'object' && data !== null) {
            if (Array.isArray(data)) {
                for (const item of data) {
                    extractValues(item);
                }
            }
            else {
                for (const key in data) {
                    extractValues(data[key]);
                }
            }
        }
        else {
            values.push(data);
        }
    }
    extractValues(obj);
    return values;
};
exports.getAllValuesFromJson = getAllValuesFromJson;
/**
 * Delete file & folder recursively
 * @param {string} directory
 */
const deleteFolderRecursive = (directory) => {
    if (fs_1.default.existsSync(directory)) {
        fs_1.default.readdir(directory, (error, files) => {
            if (error)
                throw new Error('Could not read directory');
            files.forEach((file) => {
                const file_path = path_1.default.join(directory, file);
                fs_1.default.stat(file_path, (error, stat) => {
                    if (error)
                        throw new Error('File do not exist');
                    if (!stat.isDirectory()) {
                        fs_1.default.unlink(file_path, (error) => {
                            if (error)
                                throw new Error('Could not delete file');
                        });
                    }
                    else {
                        (0, exports.deleteFolderRecursive)(file_path);
                    }
                });
            });
        });
    }
};
exports.deleteFolderRecursive = deleteFolderRecursive;
/**
 * Get only essential flow data items for telemetry
 * @param {IReactFlowNode[]} nodes
 * @param {IReactFlowEdge[]} edges
 */
const getTelemetryFlowObj = (nodes, edges) => {
    const nodeData = nodes.map((node) => node.id);
    const edgeData = edges.map((edge) => ({ source: edge.source, target: edge.target }));
    return { nodes: nodeData, edges: edgeData };
};
exports.getTelemetryFlowObj = getTelemetryFlowObj;
/**
 * Get user settings file
 * TODO: move env variables to settings json file, easier configuration
 */
const getUserSettingsFilePath = () => {
    if (process.env.SECRETKEY_PATH)
        return path_1.default.join(process.env.SECRETKEY_PATH, 'settings.json');
    const checkPaths = [path_1.default.join((0, exports.getUserHome)(), '.flowise', 'settings.json')];
    for (const checkPath of checkPaths) {
        if (fs_1.default.existsSync(checkPath)) {
            return checkPath;
        }
    }
    return '';
};
exports.getUserSettingsFilePath = getUserSettingsFilePath;
/**
 * Get app current version
 */
const getAppVersion = async () => {
    const getPackageJsonPath = () => {
        const checkPaths = [
            path_1.default.join(__dirname, '..', 'package.json'),
            path_1.default.join(__dirname, '..', '..', 'package.json'),
            path_1.default.join(__dirname, '..', '..', '..', 'package.json'),
            path_1.default.join(__dirname, '..', '..', '..', '..', 'package.json'),
            path_1.default.join(__dirname, '..', '..', '..', '..', '..', 'package.json')
        ];
        for (const checkPath of checkPaths) {
            if (fs_1.default.existsSync(checkPath)) {
                return checkPath;
            }
        }
        return '';
    };
    const packagejsonPath = getPackageJsonPath();
    if (!packagejsonPath)
        return '';
    try {
        const content = await fs_1.default.promises.readFile(packagejsonPath, 'utf8');
        const parsedContent = JSON.parse(content);
        return parsedContent.version;
    }
    catch (error) {
        return '';
    }
};
exports.getAppVersion = getAppVersion;
//# sourceMappingURL=index.js.map