import { IComponentCredentials, IComponentNodes, ICredentialDataDecrypted, ICredentialReqBody, IDepthQueue, INodeData, INodeDependencies, INodeDirectedGraph, IOverrideConfig, IReactFlowEdge, IReactFlowNode, IncomingInput } from '../Interface';
import { ICommonObject, IDatabaseEntity, IMessage, IFileUpload } from 'flowise-components';
import { Credential } from '../database/entities/Credential';
import { DataSource } from 'typeorm';
import { CachePool } from '../CachePool';
export declare const databaseEntities: IDatabaseEntity;
/**
 * Returns the home folder path of the user if
 * none can be found it falls back to the current
 * working directory
 *
 */
export declare const getUserHome: () => string;
/**
 * Returns the path of node modules package
 * @param {string} packageName
 * @returns {string}
 */
export declare const getNodeModulesPackagePath: (packageName: string) => string;
/**
 * Construct graph and node dependencies score
 * @param {IReactFlowNode[]} reactFlowNodes
 * @param {IReactFlowEdge[]} reactFlowEdges
 * @param {{ isNonDirected?: boolean, isReversed?: boolean }} options
 */
export declare const constructGraphs: (reactFlowNodes: IReactFlowNode[], reactFlowEdges: IReactFlowEdge[], options?: {
    isNonDirected?: boolean;
    isReversed?: boolean;
}) => {
    graph: INodeDirectedGraph;
    nodeDependencies: INodeDependencies;
};
/**
 * Get starting nodes and check if flow is valid
 * @param {INodeDependencies} graph
 * @param {string} endNodeId
 */
export declare const getStartingNodes: (graph: INodeDirectedGraph, endNodeId: string) => {
    startingNodeIds: string[];
    depthQueue: IDepthQueue;
};
/**
 * Get all connected nodes from startnode
 * @param {INodeDependencies} graph
 * @param {string} startNodeId
 */
export declare const getAllConnectedNodes: (graph: INodeDirectedGraph, startNodeId: string) => string[];
/**
 * Get ending node and check if flow is valid
 * @param {INodeDependencies} nodeDependencies
 * @param {INodeDirectedGraph} graph
 * @param {IReactFlowNode[]} allNodes
 */
export declare const getEndingNodes: (nodeDependencies: INodeDependencies, graph: INodeDirectedGraph, allNodes: IReactFlowNode[]) => IReactFlowNode[];
/**
 * Get file name from base64 string
 * @param {string} fileBase64
 */
export declare const getFileName: (fileBase64: string) => string;
/**
 * Save upsert flowData
 * @param {INodeData} nodeData
 * @param {Record<string, any>} upsertHistory
 */
export declare const saveUpsertFlowData: (nodeData: INodeData, upsertHistory: Record<string, any>) => ICommonObject[];
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
export declare const buildFlow: (startingNodeIds: string[], reactFlowNodes: IReactFlowNode[], reactFlowEdges: IReactFlowEdge[], graph: INodeDirectedGraph, depthQueue: IDepthQueue, componentNodes: IComponentNodes, question: string, chatHistory: IMessage[], chatId: string, sessionId: string, chatflowid: string, appDataSource: DataSource, overrideConfig?: ICommonObject, cachePool?: CachePool, isUpsert?: boolean, stopNodeId?: string, uploads?: IFileUpload[]) => Promise<any>;
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
export declare const clearSessionMemory: (reactFlowNodes: IReactFlowNode[], componentNodes: IComponentNodes, chatId: string, appDataSource: DataSource, sessionId?: string, memoryType?: string, isClearFromViewMessageDialog?: string) => Promise<void>;
/**
 * Get variable value from outputResponses.output
 * @param {string} paramValue
 * @param {IReactFlowNode[]} reactFlowNodes
 * @param {string} question
 * @param {boolean} isAcceptVariable
 * @returns {string}
 */
export declare const getVariableValue: (paramValue: string | object, reactFlowNodes: IReactFlowNode[], question: string, chatHistory: IMessage[], isAcceptVariable?: boolean) => any;
/**
 * Loop through each inputs and resolve variable if neccessary
 * @param {INodeData} reactFlowNodeData
 * @param {IReactFlowNode[]} reactFlowNodes
 * @param {string} question
 * @returns {INodeData}
 */
export declare const resolveVariables: (reactFlowNodeData: INodeData, reactFlowNodes: IReactFlowNode[], question: string, chatHistory: IMessage[]) => INodeData;
/**
 * Loop through each inputs and replace their value with override config values
 * @param {INodeData} flowNodeData
 * @param {ICommonObject} overrideConfig
 * @returns {INodeData}
 */
export declare const replaceInputsWithConfig: (flowNodeData: INodeData, overrideConfig: ICommonObject) => INodeData;
/**
 * Rebuild flow if LLMChain has dependency on other chains
 * User Question => Prompt_0 => LLMChain_0 => Prompt-1 => LLMChain_1
 * @param {IReactFlowNode[]} startingNodes
 * @returns {boolean}
 */
export declare const isStartNodeDependOnInput: (startingNodes: IReactFlowNode[], nodes: IReactFlowNode[]) => boolean;
/**
 * Rebuild flow if new override config is provided
 * @param {boolean} isInternal
 * @param {ICommonObject} existingOverrideConfig
 * @param {ICommonObject} newOverrideConfig
 * @returns {boolean}
 */
export declare const isSameOverrideConfig: (isInternal: boolean, existingOverrideConfig?: ICommonObject, newOverrideConfig?: ICommonObject) => boolean;
/**
 * Map MimeType to InputField
 * @param {string} mimeType
 * @returns {Promise<string>}
 */
export declare const mapMimeTypeToInputField: (mimeType: string) => "" | "txtFile" | "pdfFile" | "jsonFile" | "csvFile" | "jsonlinesFile" | "docxFile" | "yamlFile";
/**
 * Find all available input params config
 * @param {IReactFlowNode[]} reactFlowNodes
 * @param {IComponentCredentials} componentCredentials
 * @returns {IOverrideConfig[]}
 */
export declare const findAvailableConfigs: (reactFlowNodes: IReactFlowNode[], componentCredentials: IComponentCredentials) => IOverrideConfig[];
/**
 * Check to see if flow valid for stream
 * TODO: perform check from component level. i.e: set streaming on component, and check here
 * @param {IReactFlowNode[]} reactFlowNodes
 * @param {INodeData} endingNodeData
 * @returns {boolean}
 */
export declare const isFlowValidForStream: (reactFlowNodes: IReactFlowNode[], endingNodeData: INodeData) => boolean;
/**
 * Generate an encryption key
 * @returns {string}
 */
export declare const generateEncryptKey: () => string;
/**
 * Returns the encryption key
 * @returns {Promise<string>}
 */
export declare const getEncryptionKey: () => Promise<string>;
/**
 * Encrypt credential data
 * @param {ICredentialDataDecrypted} plainDataObj
 * @returns {Promise<string>}
 */
export declare const encryptCredentialData: (plainDataObj: ICredentialDataDecrypted) => Promise<string>;
/**
 * Decrypt credential data
 * @param {string} encryptedData
 * @param {string} componentCredentialName
 * @param {IComponentCredentials} componentCredentials
 * @returns {Promise<ICredentialDataDecrypted>}
 */
export declare const decryptCredentialData: (encryptedData: string, componentCredentialName?: string, componentCredentials?: IComponentCredentials) => Promise<ICredentialDataDecrypted>;
/**
 * Transform ICredentialBody from req to Credential entity
 * @param {ICredentialReqBody} body
 * @returns {Credential}
 */
export declare const transformToCredentialEntity: (body: ICredentialReqBody) => Promise<Credential>;
/**
 * Redact values that are of password type to avoid sending back to client
 * @param {string} componentCredentialName
 * @param {ICredentialDataDecrypted} decryptedCredentialObj
 * @param {IComponentCredentials} componentCredentials
 * @returns {ICredentialDataDecrypted}
 */
export declare const redactCredentialWithPasswordType: (componentCredentialName: string, decryptedCredentialObj: ICredentialDataDecrypted, componentCredentials: IComponentCredentials) => ICredentialDataDecrypted;
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
export declare const getMemorySessionId: (memoryNode: IReactFlowNode | undefined, incomingInput: IncomingInput, chatId: string, isInternal: boolean) => string;
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
export declare const getSessionChatHistory: (chatflowid: string, sessionId: string, memoryNode: IReactFlowNode, componentNodes: IComponentNodes, appDataSource: DataSource, databaseEntities: IDatabaseEntity, logger: any) => Promise<IMessage[]>;
/**
 * Method that find memory that is connected within chatflow
 * In a chatflow, there should only be 1 memory node
 * @param {IReactFlowNode[]} nodes
 * @param {IReactFlowEdge[]} edges
 * @returns {IReactFlowNode | undefined}
 */
export declare const findMemoryNode: (nodes: IReactFlowNode[], edges: IReactFlowEdge[]) => IReactFlowNode | undefined;
/**
 * Get all values from a JSON object
 * @param {any} obj
 * @returns {any[]}
 */
export declare const getAllValuesFromJson: (obj: any) => any[];
/**
 * Delete file & folder recursively
 * @param {string} directory
 */
export declare const deleteFolderRecursive: (directory: string) => void;
/**
 * Get only essential flow data items for telemetry
 * @param {IReactFlowNode[]} nodes
 * @param {IReactFlowEdge[]} edges
 */
export declare const getTelemetryFlowObj: (nodes: IReactFlowNode[], edges: IReactFlowEdge[]) => {
    nodes: string[];
    edges: {
        source: string;
        target: string;
    }[];
};
/**
 * Get user settings file
 * TODO: move env variables to settings json file, easier configuration
 */
export declare const getUserSettingsFilePath: () => string;
/**
 * Get app current version
 */
export declare const getAppVersion: () => Promise<any>;
