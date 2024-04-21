declare const _default: {
    getAllComponentsCredentials: () => Promise<any>;
    getComponentByName: (credentialName: string) => Promise<import("flowise-components").INode | import("flowise-components").INode[]>;
    getSingleComponentsCredentialIcon: (credentialName: string) => Promise<string>;
};
export default _default;
