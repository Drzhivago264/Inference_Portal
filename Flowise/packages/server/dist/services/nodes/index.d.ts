declare const _default: {
    getAllNodes: () => Promise<import("flowise-components").INode[]>;
    getNodeByName: (nodeName: string) => Promise<import("flowise-components").INode>;
    getSingleNodeIcon: (nodeName: string) => Promise<string>;
    getSingleNodeAsyncOptions: (nodeName: string, requestBody: any) => Promise<any>;
    executeCustomFunction: (requestBody: any) => Promise<any>;
};
export default _default;
