"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.utilGetUploadsConfig = void 0;
const http_status_codes_1 = require("http-status-codes");
const ChatFlow_1 = require("../database/entities/ChatFlow");
const getRunningExpressApp_1 = require("../utils/getRunningExpressApp");
const internalFlowiseError_1 = require("../errors/internalFlowiseError");
/**
 * Method that checks if uploads are enabled in the chatflow
 * @param {string} chatflowid
 */
const utilGetUploadsConfig = async (chatflowid) => {
    const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
    const chatflow = await appServer.AppDataSource.getRepository(ChatFlow_1.ChatFlow).findOneBy({
        id: chatflowid
    });
    if (!chatflow) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `Chatflow ${chatflowid} not found`);
    }
    const uploadAllowedNodes = ['llmChain', 'conversationChain', 'reactAgentChat', 'conversationalAgent', 'toolAgent'];
    const uploadProcessingNodes = ['chatOpenAI', 'chatAnthropic', 'awsChatBedrock', 'azureChatOpenAI', 'chatGoogleGenerativeAI'];
    const flowObj = JSON.parse(chatflow.flowData);
    const imgUploadSizeAndTypes = [];
    let isSpeechToTextEnabled = false;
    if (chatflow.speechToText) {
        const speechToTextProviders = JSON.parse(chatflow.speechToText);
        for (const provider in speechToTextProviders) {
            if (provider !== 'none') {
                const providerObj = speechToTextProviders[provider];
                if (providerObj.status) {
                    isSpeechToTextEnabled = true;
                    break;
                }
            }
        }
    }
    let isImageUploadAllowed = false;
    const nodes = flowObj.nodes;
    /*
     * Condition for isImageUploadAllowed
     * 1.) one of the uploadAllowedNodes exists
     * 2.) one of the uploadProcessingNodes exists + allowImageUploads is ON
     */
    if (!nodes.some((node) => uploadAllowedNodes.includes(node.data.name))) {
        return {
            isSpeechToTextEnabled,
            isImageUploadAllowed: false,
            imgUploadSizeAndTypes
        };
    }
    nodes.forEach((node) => {
        if (uploadProcessingNodes.indexOf(node.data.name) > -1) {
            // TODO: for now the maxUploadSize is hardcoded to 5MB, we need to add it to the node properties
            node.data.inputParams.map((param) => {
                var _a;
                if (param.name === 'allowImageUploads' && ((_a = node.data.inputs) === null || _a === void 0 ? void 0 : _a['allowImageUploads'])) {
                    imgUploadSizeAndTypes.push({
                        fileTypes: 'image/gif;image/jpeg;image/png;image/webp;'.split(';'),
                        maxUploadSize: 5
                    });
                    isImageUploadAllowed = true;
                }
            });
        }
    });
    return {
        isSpeechToTextEnabled,
        isImageUploadAllowed,
        imgUploadSizeAndTypes
    };
};
exports.utilGetUploadsConfig = utilGetUploadsConfig;
//# sourceMappingURL=getUploadsConfig.js.map