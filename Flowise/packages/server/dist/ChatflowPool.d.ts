import { ICommonObject } from 'flowise-components';
import { IActiveChatflows, INodeData, IReactFlowNode } from './Interface';
/**
 * This pool is to keep track of active chatflow pools
 * so we can prevent building langchain flow all over again
 */
export declare class ChatflowPool {
    activeChatflows: IActiveChatflows;
    /**
     * Add to the pool
     * @param {string} chatflowid
     * @param {INodeData} endingNodeData
     * @param {IReactFlowNode[]} startingNodes
     * @param {ICommonObject} overrideConfig
     */
    add(chatflowid: string, endingNodeData: INodeData | undefined, startingNodes: IReactFlowNode[], overrideConfig?: ICommonObject): void;
    /**
     * Update to the pool
     * @param {string} chatflowid
     * @param {boolean} inSync
     */
    updateInSync(chatflowid: string, inSync: boolean): void;
    /**
     * Remove from the pool
     * @param {string} chatflowid
     */
    remove(chatflowid: string): Promise<void>;
}
