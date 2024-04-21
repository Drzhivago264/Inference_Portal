"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatflowPool = void 0;
const logger_1 = __importDefault(require("./utils/logger"));
/**
 * This pool is to keep track of active chatflow pools
 * so we can prevent building langchain flow all over again
 */
class ChatflowPool {
    constructor() {
        this.activeChatflows = {};
    }
    /**
     * Add to the pool
     * @param {string} chatflowid
     * @param {INodeData} endingNodeData
     * @param {IReactFlowNode[]} startingNodes
     * @param {ICommonObject} overrideConfig
     */
    add(chatflowid, endingNodeData, startingNodes, overrideConfig) {
        this.activeChatflows[chatflowid] = {
            startingNodes,
            endingNodeData,
            inSync: true
        };
        if (overrideConfig)
            this.activeChatflows[chatflowid].overrideConfig = overrideConfig;
        logger_1.default.info(`[server]: Chatflow ${chatflowid} added into ChatflowPool`);
    }
    /**
     * Update to the pool
     * @param {string} chatflowid
     * @param {boolean} inSync
     */
    updateInSync(chatflowid, inSync) {
        if (Object.prototype.hasOwnProperty.call(this.activeChatflows, chatflowid)) {
            this.activeChatflows[chatflowid].inSync = inSync;
            logger_1.default.info(`[server]: Chatflow ${chatflowid} updated inSync=${inSync} in ChatflowPool`);
        }
    }
    /**
     * Remove from the pool
     * @param {string} chatflowid
     */
    async remove(chatflowid) {
        if (Object.prototype.hasOwnProperty.call(this.activeChatflows, chatflowid)) {
            delete this.activeChatflows[chatflowid];
            logger_1.default.info(`[server]: Chatflow ${chatflowid} removed from ChatflowPool`);
        }
    }
}
exports.ChatflowPool = ChatflowPool;
//# sourceMappingURL=ChatflowPool.js.map